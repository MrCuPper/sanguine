// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "forge-std/console2.sol";
import { HomeHarness } from "./harnesses/HomeHarness.sol";
import { Header } from "../contracts/libs/Header.sol";
import { Message } from "../contracts/libs/Message.sol";
import { IUpdaterManager } from "../contracts/interfaces/IUpdaterManager.sol";
import { SynapseTestWithUpdaterManager } from "./utils/SynapseTest.sol";

contract HomeGasGolfTest is SynapseTestWithUpdaterManager {
    HomeHarness home;

    function setUp() public override {
        super.setUp();
        home = new HomeHarness(localDomain);
        home.initialize(IUpdaterManager(updaterManager));
        updaterManager.setHome(address(home));
    }

    event Dispatch(
        bytes32 indexed messageHash,
        uint256 indexed leafIndex,
        uint64 indexed destinationAndNonce,
        bytes tips,
        bytes message
    );

    function _dispatch() internal returns (bytes32 newRoot) {
        bytes32 recipient = addressToBytes32(vm.addr(1337));
        address sender = vm.addr(1555);
        bytes memory messageBody = bytes("message");
        uint32 nonce = home.nonces(remoteDomain);
        bytes memory _header = Header.formatHeader(
            localDomain,
            addressToBytes32(sender),
            nonce,
            remoteDomain,
            recipient,
            0
        );
        bytes memory _tips = getDefaultTips();
        bytes memory message = Message.formatMessage(_header, _tips, messageBody);
        bytes32 messageHash = keccak256(message);
        vm.expectEmit(true, true, true, true);
        emit Dispatch(
            messageHash,
            home.count(),
            (uint64(remoteDomain) << 32) | nonce,
            _tips,
            message
        );
        hoax(sender);
        home.dispatch{ value: TOTAL_TIPS }(remoteDomain, recipient, 0, _tips, messageBody);
        newRoot = home.root();
    }

    function test_dispatch_30() public {
        uint256 amount = 30;
        bytes32[] memory roots = new bytes32[](amount);
        for (uint256 i = 0; i < amount; ++i) {
            roots[i] = _dispatch();
        }
        for (uint256 i = 0; i < amount; ++i) {
            assertEq(home.historicalRoots(i), roots[i]);
        }
    }
}

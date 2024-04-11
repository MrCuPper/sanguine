// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {InterchainBatch, ModuleBatchLib} from "../../contracts/libs/ModuleBatch.sol";

contract ModuleBatchLibHarness {
    function encodeModuleBatch(
        InterchainBatch memory batch,
        bytes memory moduleData
    )
        external
        pure
        returns (bytes memory)
    {
        return ModuleBatchLib.encodeModuleBatch(batch, moduleData);
    }

    function decodeModuleBatch(bytes memory encodedModuleBatch)
        external
        pure
        returns (InterchainBatch memory, bytes memory)
    {
        return ModuleBatchLib.decodeModuleBatch(encodedModuleBatch);
    }

    function encodeVersionedModuleBatch(
        bytes memory versionedBatch,
        bytes memory moduleData
    )
        external
        pure
        returns (bytes memory)
    {
        return ModuleBatchLib.encodeVersionedModuleBatch(versionedBatch, moduleData);
    }

    function decodeVersionedModuleBatch(bytes memory encodedModuleBatch)
        external
        pure
        returns (bytes memory, bytes memory)
    {
        return ModuleBatchLib.decodeVersionedModuleBatch(encodedModuleBatch);
    }
}

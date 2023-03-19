// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import { DestinationAttestation } from "../libs/Attestation.sol";

interface InterfaceDestination {
    /**
     * @notice Submit an Attestation signed by a Notary.
     * @dev Will revert if any of these is true:
     *  - Attestation payload is not properly formatted.
     *  - Attestation signer is not an active Notary for local domain.
     *  - Attestation's snapshot root has been previously submitted.
     * @param _attPayload       Raw payload with Attestation data
     * @param _attSignature     Notary signature for the reported attestation
     * @return wasAccepted      Whether the Attestation was accepted (resulting in Dispute between the agents)
     */
    function submitAttestation(bytes memory _attPayload, bytes memory _attSignature)
        external
        returns (bool wasAccepted);

    /**
     * @notice Submit an AttestationReport signed by a Guard, as well as Notary signature
     * for the reported Attestation.
     * @dev Will revert if any of these is true:
     *  - Report payload is not properly formatted.
     *  - Report signer is not an active Guard.
     *  - Attestation signer is not an active Notary for local domain.
     * @param _arPayload        Raw payload with AttestationReport data
     * @param _arSignature      Guard signature for the report
     * @param _attSignature     Notary signature for the reported attestation
     * @return wasAccepted      Whether the Report was accepted (resulting in Dispute between the agents)
     */
    function submitAttestationReport(
        bytes memory _arPayload,
        bytes memory _arSignature,
        bytes memory _attSignature
    ) external returns (bool wasAccepted);

    /**
     * @notice Returns the total amount of Notaries attestations that have been accepted.
     */
    function attestationsAmount() external view returns (uint256);

    /**
     * @notice Returns an attestation from the list of all accepted Notary attestations.
     * @dev Index refers to attestation's snapshot root position in `roots` array.
     * @param _index   Attestation index
     * @return root    Snapshot root for the attestation
     * @return destAtt Rest of attestation data that Destination keeps track of
     */
    function getAttestation(uint256 _index)
        external
        view
        returns (bytes32 root, DestinationAttestation memory destAtt);
}

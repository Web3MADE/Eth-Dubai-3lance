// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {SchemaResolver} from "eas-contracts/resolver/SchemaResolver.sol";
import {IEAS, Attestation} from "eas-contracts/IEAS.sol";
import { Address } from "@openzeppelin/contracts/utils/Address.sol";

contract JobResolver is SchemaResolver {
    // TODO later: state vars would be a mapping of jobHash to freelancer/client/requiresPayment
    mapping(bytes32 => address) public freelancers;
    mapping(bytes32 => address) public clients;
    constructor(IEAS eas) SchemaResolver(eas) {}
    // override payable function to set resolver to be payable
     function isPayable() public pure override returns (bool) {
        return true;
    }

    function onAttest(
        Attestation calldata jobAttestation,
        uint256 value
    ) internal override returns (bool) {
        (bytes32 jobHash, bool isComplete, uint256 price) = _decodeAttestationData(jobAttestation.data);
        address selectedFreelancer = freelancers[jobHash];
        address selectedClient = clients[jobHash];

        if (selectedFreelancer == address(0) && selectedClient == address(0)) {
            // TODO Later: reduce fields from JobSchema to just a status + jobHash
            require(price == value, "JobResolver: Incorrect payment amount");
            require(isComplete == false, "JobResolver: Job is already complete");
            // client makes first attestation + payment
            _setClient(jobHash, jobAttestation.attester);
            _setFreelancer(jobHash, jobAttestation.recipient);
            return true;
        } 
    
        // REMOVE SAFEGUARDS FOR HACKATHON
        // require(jobAttestation.attester == selectedClient, "JobResolver: Only Client can send payment");
        // require(jobAttestation.recipient == selectedFreelancer, "JobResolver: Freelancer must be recipient");
        require(isComplete == true, "JobResolver: Job is not complete");
        require(address(this).balance >= value, "Insufficient contract balance");
        // freelancer recieves payment
        payable(selectedFreelancer).transfer(price);
        return true;
    }
    // TODO Later: refund client on revokations
    function onRevoke(
        Attestation calldata jobAttestation,
        uint256 value
    ) internal override returns (bool) {
        return true;
    }

   function _decodeAttestationData(
    bytes memory data
   ) internal returns (bytes32, bool, uint256) {
    bytes32 jobHash;
    bool isComplete;
    uint256 price;

        (jobHash, isComplete, price) = abi.decode(data, (bytes32, bool, uint256));

        return (jobHash, isComplete, price);
   }

    function _setFreelancer(bytes32 jobHash, address _freelancer) internal {
        freelancers[jobHash] = _freelancer;
    }

    function _setClient(bytes32 jobHash, address _client) internal {
        freelancers[jobHash] = _client;
    }
}

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import {JobResolver} from "../src/JobResolver.sol";
import {ISchemaRegistry} from "eas-contracts/ISchemaRegistry.sol";
import {ISchemaResolver} from "eas-contracts/resolver/ISchemaResolver.sol";
import {IEAS} from "eas-contracts/IEAS.sol";
import {
    IEAS,
    AttestationRequest,
    AttestationRequestData,
    RevocationRequestData,
    Attestation,
    RevocationRequest
} from "eas-contracts/IEAS.sol";
import {Job} from "../src/types/Types.sol";
// TODO:
// 1. TDD
// 2. fork sepolia test net for testing attestations

contract JobResolverTest is Test {
    JobResolver public jobResolver;
    ISchemaRegistry public schemaRegistry = ISchemaRegistry(0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0);
    IEAS public eas = IEAS(0xC2679fBD37d54388Ce493F1DB75320D236e1815e);
    bytes32 jobSchema;
    address freelancer = vm.addr(1);
    address client = vm.addr(2);
    uint256 mockPrice = 1 ether;
    bytes32 mockJobHash = keccak256("jobHash");
    bool mockIsComplete = false;

    function setUp() public {
        jobResolver = new JobResolver(eas);

        jobSchema = schemaRegistry.register(
            "bytes32 jobHash, bool isComplete", jobResolver, true
        );
        
    }

    // test resolver receives payment from Client
    function test_onAttest_receivedPaymentFromClient() public {
        // fund the client address - client sends eth in msg.value, but gas fee covered by Biconomy
        startHoax(client);
        // 1. encode atestationData
        bytes memory encodedAttestation =
            _encodeAttestationData(mockJobHash, mockIsComplete, mockPrice);
        // 2. construct the attestationRequest
        AttestationRequest memory attestationRequest = createJobAttestation(encodedAttestation, mockPrice, freelancer, 0x0);
        // 3. attest the job,
        bytes32 attestationUID = eas.attest{value: mockPrice}(attestationRequest);
        // 4. get attestation and assert fields
        Attestation memory attestation = eas.getAttestation(attestationUID);
        assertEq(address(jobResolver).balance, mockPrice, "balance should be 1 ether");
        assertEq(attestation.attester, client, "attester should be client");
        assertEq(attestation.recipient, freelancer, "recipient should be freelancer");
    }

    // test resolver validates attestations from Freelancer/Client ONLY and nobody else

    // Test resolver sends payment to Freelancer on successful completion of job, from Client
    // TODO: implement refUID here? or nah? For now, no.
    function test_onAttest_FreelancerReceivesPayment() public {
        startHoax(client);
        uint256 freelancerBalance = freelancer.balance;
        console.log('jobResolver balance before ', address(jobResolver).balance);
        // 1. encode atestationData
        bytes memory firstEncodedAttestation =
        _encodeAttestationData(mockJobHash, mockIsComplete, mockPrice);
        // 2. construct the attestationRequest
        AttestationRequest memory firstAttestationRequest = createJobAttestation(firstEncodedAttestation, mockPrice, freelancer, 0x0);
        // 3. attest the job,
        eas.attest{value: mockPrice}(firstAttestationRequest);
        // 4. Second attestation flow to complete job
        bytes memory secondEncodedAttestation =
            _encodeAttestationData(mockJobHash, true, mockPrice);
        AttestationRequest memory secondAttestationRequest = createJobAttestation(secondEncodedAttestation, 0, freelancer, 0x0);
        bytes32 secondAttestationUID = eas.attest(secondAttestationRequest);
        Attestation memory attestation = eas.getAttestation(secondAttestationUID);
        uint256 newFreelanceBalance = freelancerBalance + mockPrice;

        assertEq(freelancer.balance, newFreelanceBalance, "freelancer should receive payment");
        assertEq(address(jobResolver).balance, 0, "jobResolver balance should be 0");
        assertEq(attestation.attester, client, "attester should be client");
        assertEq(attestation.recipient, freelancer, "recipient should be freelancer");
    }
    

    function createJobAttestation(bytes memory encodedAttestationData, uint256 value, address recipient, bytes32 refUID)
        private
        returns (AttestationRequest memory)
    {
        AttestationRequest memory jobAttestation = AttestationRequest({
            schema: jobSchema,
            data: _constructJobAttestationData(encodedAttestationData, value, recipient, refUID)
        });
        return jobAttestation;
    }

    function _constructJobAttestationData(bytes memory data, uint256 value, address recipient, bytes32 refUID)
        private
        view
        returns (AttestationRequestData memory)
    {
        return AttestationRequestData({
            data: data,
            value: value,
            recipient: recipient,
            refUID: refUID,
            revocable: true,
            expirationTime: 0
        });
    }

    function _encodeAttestationData(
        bytes32 jobHash,
        bool isComplete,
        uint256 price
    ) private returns (bytes memory) {
        return abi.encode(Job(
            jobHash,
            isComplete,
            price
            ));
    }
}

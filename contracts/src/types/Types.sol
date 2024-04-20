pragma solidity ^0.8.19;

struct Job {
    // For now, mock the jobHash, since it'd need to have a hash function BEFORE attesting
    bytes32 jobHash;
    bool isComplete;
    uint256 price;
}
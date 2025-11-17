// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract HashRegistry {
    mapping(bytes32 => bool) private uploaded;

    event HashUploaded(bytes32 indexed hash, address indexed uploader);

    function uploadHash(bytes32 hash) external {
        require(!uploaded[hash], "Hash already uploaded");
        uploaded[hash] = true;
        emit HashUploaded(hash, msg.sender);
    }

    function verifyHash(bytes32 hash) external view returns (bool) {
        return uploaded[hash];
    }
}
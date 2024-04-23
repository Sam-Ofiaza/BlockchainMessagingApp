// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Keys {
    // Mapping to store the public keys of users
    mapping(address => bytes32) public publicKeys;

    // Mapping to store the private keys of users
    mapping(address => bytes32) private privateKeys;

    // Function to set a public key
    function setPublicKey(bytes32 publicKey) public {
        publicKeys[msg.sender] = publicKey;
    }

    // Function to set a private key
    function setPrivateKey(bytes32 privateKey) public {
        privateKeys[msg.sender] = privateKey;
    }

    // Function to get private key
    function getPrivateKey() public view returns (bytes32) {
        return privateKeys[msg.sender];
    }
}
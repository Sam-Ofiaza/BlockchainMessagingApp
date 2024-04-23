// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Users {
    // Struct to store user information
    struct User {
        string name;         // User's name
        string email;        // User's email address
        bytes32 passwordHash;// User's hashed password
        bool isRegistered;   // User's registration status
    }

    // Array to be able to iterate over all registered addresses
    address[] addresses;

    // Mapping to link each user's Ethereum address with their user information
    mapping(address => User) public users;
    
    // Event to emit when a new user is registered
    event UserRegistered(address indexed userAddress, string name, string email);

    // Function to register a new user
    function registerUser(string memory _name, string memory _email, bytes32 _passwordHash) public {
        require(!users[msg.sender].isRegistered, "User already registered");

        User memory newUser = User({
            name: _name,
            email: _email,
            passwordHash: _passwordHash,
            isRegistered: true
        });
        users[msg.sender] = newUser;

        addresses.push(msg.sender);

        emit UserRegistered(msg.sender, _name, _email);
    }

    // Getter function for addresses that returns the whole array
    function getAllAddresses() public view returns (address[] memory) {
        return addresses;
    }

    // Function to authenticate user based on password hash
    function authenticate(string memory _email, bytes32 _passwordHash) public view returns (bool) {
        require(users[msg.sender].isRegistered, "User must be registered");
        return (keccak256(abi.encodePacked((users[msg.sender].email))) == keccak256(abi.encodePacked((_email)))) && (users[msg.sender].passwordHash == _passwordHash);
    }
}
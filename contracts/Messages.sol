// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Messages {
    // Struct to represent the structure of a message
    struct Message {
        address sender;     // Ethereum address of the sender
        address recipient;  // Ethereum address of the recipient
        string content;     // Content of the message
        uint256 timestamp;  // Timestamp when the message was sent
        bool isRead;        // Flag to indicate if the message has been read
    }

    // Mapping to store each conversation between users (supports 1-on-1 messaging only)
    // To access a conversation history, use the lexicographically smaller address as the first key
    mapping(address => mapping(address => Message[])) public userMessages;

    // Mapping to store who any given user has started a conversation with
    mapping(address => address[]) public contactLists;

    // Event to emit when a new message is sent
    event MessageSent(address indexed sender, address indexed recipient, string content);

    // Event to emit when a conversation is read
    event MessageRead(address indexed sender, address indexed recipient);

    // Custom public getter function for userMessages since compiler can't handle nested mappings well
    function getUserMessages(address contact) public view returns (Message[] memory) {
        address _first;
        address _second;
        if (msg.sender < contact) {
            _first = msg.sender;
            _second = contact;
        } else {
            _first = contact;
            _second = msg.sender;
        }

        return userMessages[_first][_second];
    }

    // Function that returns a user's entire contact list
    function getMyContacts() public view returns (address[] memory) {
        return contactLists[msg.sender];
    }

    // Function to send a new message
    function sendMessage(address _recipient, string memory _content) public {
        Message memory newMessage = Message({
            sender: msg.sender,
            recipient: _recipient,
            content: _content,
            timestamp: block.timestamp,
            isRead: false
        });

        address _first;
        address _second;
        if (msg.sender < _recipient) {
            _first = msg.sender;
            _second = _recipient;
        } else {
            _first = _recipient;
            _second = msg.sender;
        }

        Message[] storage convo = userMessages[_first][_second];
        
        if (convo.length == 0) {
            contactLists[_first].push(_second);
            contactLists[_second].push(_first);
        }

        convo.push(newMessage);


        emit MessageSent(msg.sender, _recipient, _content);
    }

    // Function to retrieve all messages for the caller
    function getMyMessages(address contact) public view returns (Message[] memory) {
        address _first;
        address _second;
        if (msg.sender < contact) {
            _first = msg.sender;
            _second = contact;
        } else {
            _first = contact;
            _second = msg.sender;
        }

        return userMessages[_first][_second];
    }

    // Function to update all messages in a conversation as read
    function markAsRead(address contact) public {
        address _first;
        address _second;
        if (msg.sender < contact) {
            _first = msg.sender;
            _second = contact;
        } else {
            _first = contact;
            _second = msg.sender;
        }

        Message[] storage messages = userMessages[_first][_second];

        // Iterate through conversation history backwards and mark incoming messages as read until an already read message is found
        uint i = messages.length;
        while (i > 0 && (messages[i].recipient != msg.sender || messages[i].isRead == false)) {
            if (messages[i].recipient == msg.sender) {
                messages[i].isRead = true;
            }
            i--;
        }
        emit MessageRead(msg.sender, contact);
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LandRegistry {
    // Mapping from land hash to the owner's address
    mapping(string => address) public landRecords;

    // Event emitted when a new land record is registered
    event LandRegistered(address indexed owner, string landHash);

    // Function to register a new land record (by storing its hash)
    function registerLand(string memory _landHash) public {
        require(landRecords[_landHash] == address(0), "Land already registered");
        landRecords[_landHash] = msg.sender;
        emit LandRegistered(msg.sender, _landHash);
    }

    // Function to verify a land record given its hash
    function verifyLand(string memory _landHash) public view returns (address) {
        return landRecords[_landHash];
    }
}

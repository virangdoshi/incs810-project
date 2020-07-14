pragma solidity ^0.5.16;

contract FileRegistry {
    mapping (string => uint256) files;
    address contractOwner = msg.sender;

    function add(string memory hash) public returns (uint256 dateAdded) {
        //require (msg.sender == contractOwner);
        uint256 timeAdded = block.timestamp;
        files[hash] = timeAdded;
        return timeAdded;
    }

    function verify(string memory hash) view public returns (uint256 dateAdded) {
        return files[hash];
    }
}

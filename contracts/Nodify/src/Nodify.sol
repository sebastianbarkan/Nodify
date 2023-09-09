// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.17;

contract Nodify { 
    struct MediaPost {
        bytes32 msgHash;
        address poster;
        uint blockTimestamp;
        uint postedTimestamp;
        uint PPScore;
        uint attestation; // todo check this data type
        string URILocation;
        string geolocation;
        uint zkProofHash;
    }

    // Events
    event postMsg (string message, uint totalMessages, address messenger, uint timestamp);

    // Global Variables
    uint public totalPosts;
    MediaPost[] public mediaPosts;
    uint public latestPost;
    address private owner;

    constructor() {
        owner = msg.sender;
    }

    function createPost(
        string memory _msg,
        address _poster,
        uint _postedTimestamp,
        uint _PPScore,
        string memory _URI,
        string _location)
        public {

        // create a hash of the message content
        bytes32 msgHash = keccak256(abi.encodePacked(_msg));

        // TODO integrate with 
        
        MediaPost memory newPost = MediaPost({
            msgHash: msgHash,
            poster: _poster,
            blockTimestamp: block.timestamp,
            postedTimestamp: _postedTimestamp,
            PPScore: _PPScore,
            attestation: attestation,
            URILocation: _URI,
            location: _location
        });
        // append the media post to the array of media posts 
    }

    function retrievePost(address user) public view returns (MediaPost memory) {

    }

}
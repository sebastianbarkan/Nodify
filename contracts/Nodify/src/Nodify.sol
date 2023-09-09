// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.17;

contract Nodify { 
    struct MediaPost {
        bytes32 msgHash;
        address poster;
        uint blockTimestamp;
        uint postedTimestamp;
        uint PPScore;
        uint8 credibility;
        string URILocation;
        string geolocation;
        //uint zkProofHash;
    }

    // Events
    // event postMsg (string message, uint totalMessages, address messenger, uint timestamp);

    // Global Variables
    mapping (address => MediaPost[]) public postsByPoster;
    uint public totalPosts;
    address private owner;

    constructor() {
        owner = msg.sender;
    }

    function createPost(
        string memory _msg,
        uint _postedTimestamp,
        uint _PPScore,
        string memory _URI,
        uint8 attestation,
        string memory _location)
        public {

        // create a hash of the message content
        bytes32 msgHash = keccak256(abi.encodePacked(_msg));

        MediaPost memory newPost = MediaPost({
            msgHash: msgHash,
            poster: msg.sender,
            blockTimestamp: block.timestamp,
            postedTimestamp: _postedTimestamp,
            PPScore: _PPScore,
            credibility: attestation,
            URILocation: _URI,
            geolocation: _location
        });

        // append the media post to the array of media posts 
        postsByPoster[msg.sender].push(newPost);
    }

    function retrievePost(address poster) public view returns (MediaPost[] memory) {
        return postsByPoster[poster];
    }

}
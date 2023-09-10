// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.17;


// Define required structs
struct AttestationRequestData {
    address recipient;
    uint64 expirationTime;
    bool revocable;
    bytes32 refUID;
    bytes data;
    uint256 value;
}

struct AttestationRequest {
    bytes32 schema;
    AttestationRequestData data;
}

// Define interface with the function signature
interface IEAS {
    function attest(AttestationRequest calldata request) external payable returns (bytes32);
}

contract Nodify { 
    struct MediaPost {
        uint Id;
        address poster;
        uint blockTimestamp;
        uint postedTimestamp;
        uint PPScore;
        string URILocation;
        string geolocation;
        //uint zkProofHash;
    }

    // Events
    // event postMsg (string message, uint totalMessages, address messenger, uint timestamp);

    // Global Variables
    mapping (address => MediaPost[]) public postsByPoster;
    uint public totalPosts;
    bytes32 nodifySchema = 0xc0b32931ea81c238c32f65088b47e8bc9cda258e299769b3698a26b01efcc91a;
    address EAS = 0xC2679fBD37d54388Ce493F1DB75320D236e1815e;
    IEAS eas = IEAS(EAS);
    address private owner;

    constructor() {
        owner = msg.sender;
    }
    
    // @Dev this function posts to our own internal data structure, as well as attests to the EAS
    function createAttestation(
        uint _Id,
        uint _postedTimestamp,
        uint _PPScore,
        string memory _URI, 
        string memory _location)
        public {

        MediaPost memory newPost = MediaPost({
            Id: _Id,
            poster: msg.sender,
            blockTimestamp: block.timestamp,
            postedTimestamp: _postedTimestamp,
            PPScore: _PPScore,
            URILocation: _URI,
            geolocation: _location
        });

        // append the media post to the array of media posts 
        postsByPoster[msg.sender].push(newPost);

        AttestationRequestData memory newAttestationReq = AttestationRequestData({
            recipient: address(this),
            expirationTime: 0,
            revocable: true,
            refUID: 0x0000000000000000000000000000000000000000000000000000000000000000,
            data: abi.encode(newPost), // serialize into bytes
            value:0
        });

        AttestationRequest memory newAttestation = AttestationRequest({
            schema: nodifySchema,
            data: newAttestationReq
        });

        // attest on EAS
        eas.attest{value: 0}(newAttestation);
    }

    function retrievePost(address poster) public view returns (MediaPost[] memory) {
        return postsByPoster[poster];
    }

    // @Dev allows the change of schema for attestation
    // probably won't be used in prod but in case I messed something up here
    function upgradeSchema (bytes32 _schema) public {
        require (msg.sender == owner, "Only Owner can change");
        nodifySchema = _schema;
    }
    
    function returnPPScore(address user, uint index) public view returns (uint) {
        return postsByPoster[user][index].PPScore;
    }
}
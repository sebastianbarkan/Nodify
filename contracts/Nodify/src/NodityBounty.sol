//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NDBT is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    string private postURI;
    uint256 private duration;
    uint256 private bountyAmount;

    uint256 private bountyAward;
    uint256 private winnerPostId;

    bool public bountryAwarded;

    uint256 public attesterAward;

    uint256 private startTime;
    bool private timerStarted;
    uint256 private endTime;


    address[] private attestWinners;
    mapping(address => bool) public _eligible;
    mapping(address => bool) public _attested;


    event TimerStarted(uint256 startTime);
    event TimerEnded(uint256 endTime);
    event BountyAwarded(address winner, uint256 amount);
    event AttesterAwarded(address attester, uint256 amount);
    
    // postID => number of attests
    mapping(uint256 => uint256) _postAttests;
    mapping(uint256 => address) private _posters; 
    mapping(uint256 => address[]) private _attesters;

    event BountyCreated(address indexed addr, uint256 tokenId);

    constructor(string memory _postURI) payable ERC721("NodifyBounty", "NDBT"){
        require(msg.value >=0.0001 ether, "Bounty amount must be greater than 0.0001 EH");
        postURI = _postURI;
        bountyAmount = msg.value;
    }

    function startTimer(uint256 _duration) external {
        require(!timerStarted, "Timer already started");

        startTime = block.timestamp;
        endTime = startTime + _duration;
        timerStarted = true;

        emit TimerStarted(startTime);

    }

    function getRemainingTime() public view returns (uint256) {
        uint256 currentTime = block.timestamp;
        if (currentTime >= endTime) {
            return 0;
        } else {
            return endTime - currentTime;
        }
    }

    function endBounty() external onlyOwner{
        require(timerStarted, "Bounty not started");
        require(block.timestamp >= endTime, "Bounty not ended");

        timerStarted = false;

        emit TimerEnded(endTime);

        uint256 awardAmount = (bountyAmount*50)/100;
        uint256 tokenIndex = findLargestIndex();

        address winner = _posters[tokenIndex];

        attestWinners = _attesters[tokenIndex];
        payable(winner).transfer(awardAmount);

        bountyAmount -= awardAmount;

        _mintPost(tokenIndex);

        attesterAward = bountyAmount / _postAttests[tokenIndex];
        emit BountyAwarded(winner, awardAmount);

        for (uint i = 0; i< attestWinners.length; i++){
            _eligible[attestWinners[i]] = true;
        }
    }

    function _mintPost(uint256 postId) internal returns (bool) {
        _mint(msg.sender, postId);
        _setTokenURI(postId, postURI);
        return true;
    }

    function getBountyAmount() external view returns (uint256) {
        return bountyAmount;
    }


    function getPostURI() public virtual view returns (string memory) {
        return postURI;
    }
    
    function attest(uint256 postId) public {
        require(_exists(postId), "Post does not exist");
        require(!_attested[msg.sender], "Account has attested");
        
        _attested[msg.sender] = true;
        _postAttests[postId] += 1;

        _attesters[postId].push(msg.sender);
    }


    function findLargestIndex() public view returns (uint256) {

        uint256 largestIndex = 0;
        uint256 largestNumber = _postAttests[0];

        uint256 tokenId = _tokenIdCounter.current();

        for (uint256 i = 1; i < tokenId; i++) {
            if (_postAttests[i] > largestNumber) {
                largestNumber = _postAttests[i];
                largestIndex = i;
            }
        }

        return largestIndex;
    }

    function attesterClaim() public {
        require(_eligible[msg.sender], "Account is not eligible");
        require(bountyAmount > 0, "No bounty remains");
        payable(msg.sender).transfer(attesterAward);
        bountyAmount -= attesterAward;
    }
    
    function getPostAttests(uint256 postId) public view returns (uint256) {
        return _postAttests[postId];
    }

    function getAttesterAddress(uint256 tokenId) public view returns (address[] memory){
        return _attesters[tokenId];
    }

    // The following functions are overrides required by Solidity.
    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _afterTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721)
    {
        super._afterTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
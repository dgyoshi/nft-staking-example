// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Token is ERC721, IERC721Receiver {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    struct POAP {
        address poapAddress;
        uint256 tokenId;
        uint256 stakedAt;
    }

    mapping(address => uint256) private _tokensByOwner;
    mapping(uint256 => POAP[]) private _poaps;

    constructor(
        string memory name_,
        string memory symbol_
    ) ERC721(name_, symbol_) {}

    // receives a POAP and puts it to the token owned by the sender.
    function onERC721Received(
        address ,
        address from,
        uint256 poapTokenId,
        bytes memory
    ) public virtual override returns (bytes4) {
        uint256 tokenId = _tokensByOwner[from];
        require(tokenId != 0);

        _poaps[tokenId].push(POAP(msg.sender, poapTokenId, block.number));

        return this.onERC721Received.selector;
    }

    function poap(uint256 id, uint256 idx) public view returns(POAP memory) {
        return _poaps[id][idx];
    }

    function poapBalanceOf(uint256 id) public view returns(uint256) {
        return _poaps[id].length;
    }

    function mint() public {
        _tokenIdCounter.increment();
        _tokensByOwner[msg.sender] = _tokenIdCounter.current();
        _mint(msg.sender, _tokenIdCounter.current());
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract POAP is ERC721 {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor(
        string memory name_,
        string memory symbol_
    ) ERC721(name_, symbol_) {}

    // mints a token as a POAP and transfer to a contradt address.
    // tokenAddress should be in allowlist.
    function issue(address owner, address tokenAddress) public {
        _tokenIdCounter.increment();
        _mint(owner, _tokenIdCounter.current());
        _safeTransfer(owner, tokenAddress, _tokenIdCounter.current(), '0x00');
    }
}

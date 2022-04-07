//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract EpicNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("SquareNFT", "SQUARE") {
        console.log("My first NFT contract! EPIC!!!");
    }

    function mint() public {
        uint256 tokenID = _tokenIds.current();
        _safeMint(msg.sender, tokenID);
        _setTokenURI(tokenID, "https://jsonkeeper.com/b/EU51"); // points to the metadata JSON file
        console.log("NFT %s minted to %s", tokenID, msg.sender);
        _tokenIds.increment();
    }
}

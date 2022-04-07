//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "../lib/Base64.sol";

contract EpicNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("SquareNFT", "SQUARE") {
        console.log("My first NFT contract! EPIC!!!");
    }

    string baseSvg1 =
        "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><style>.base { fill:";

    string baseSvg2 =
        "; font-family: serif; font-size: 24px; }</style><rect width='100%' height='100%' fill='black' /><text x='50%' y='50%' class='base' dominant-baseline='middle' text-anchor='middle'>";

    string[] colors = [
        "red",
        "green",
        "blue",
        "white",
        "yellow",
        "cyan",
        "pink",
        "magenta",
        "silver",
        "gold"
    ];

    string[] levels = [
        "Epic",
        "Legendary",
        "Heroic",
        "Cool",
        "Fantastic",
        "Terrible",
        "Crazy",
        "Wild",
        "Terrifying",
        "Spooky"
    ];

    string[] classes = [
        "Assassin",
        "Cleric",
        "Rogue",
        "Ninja",
        "Lord",
        "Wizard",
        "Warrior",
        "Berserker",
        "Necromander",
        "Summoner",
        "Bard",
        "Lancer"
    ];

    string[] jobs = [
        "Soldier",
        "Healer",
        "Explorer",
        "Merchant",
        "Developer",
        "BlackSmith",
        "Hitman",
        "Cook",
        "Hunter",
        "Sailor"
    ];

    function mint() public {
        uint256 tokenID = _tokenIds.current();

        string memory color = pickRandomWord(colors, "color", tokenID);
        string memory first = pickRandomWord(levels, "first", tokenID);
        string memory second = pickRandomWord(classes, "second", tokenID);
        string memory third = pickRandomWord(jobs, "third", tokenID);
        string memory finalWord = string(
            abi.encodePacked(color, first, second, third)
        );
        string memory finalSvg = string(
            abi.encodePacked(
                baseSvg1,
                color,
                baseSvg2,
                first,
                second,
                third,
                "</text></svg>"
            )
        );

        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        finalWord,
                        '", "description": "A highly acclaimed collection of squares.", "image": "data:image/svg+xml;base64,',
                        Base64.encode(bytes(finalSvg)),
                        '"}'
                    )
                )
            )
        );

        string memory tokenUri = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        console.log("\n--------------------");
        console.log(tokenUri);
        console.log("--------------------\n");

        _safeMint(msg.sender, tokenID);
        _setTokenURI(tokenID, tokenUri);
        console.log("NFT %s minted to %s", tokenID, msg.sender);
        _tokenIds.increment();
    }

    function pickRandomWord(
        string[] memory words,
        string memory position,
        uint256 tokenID
    ) public pure returns (string memory) {
        uint256 rand = random(
            string(abi.encodePacked(position, Strings.toString(tokenID)))
        );
        rand = rand % words.length;
        return words[rand];
    }

    function random(string memory input) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(input)));
    }
}

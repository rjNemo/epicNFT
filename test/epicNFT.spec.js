const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("EpicNFT", function () {
  it("Should increment token count after each mint", async () => {
    const EpicNFT = await ethers.getContractFactory("EpicNFT");
    const contract = await EpicNFT.deploy();
    await contract.deployed();
    const txn = await contract.mint();
    txn.wait();

    expect(contract._tokenIds).to.equal(1);
  });
});

const { ethers } = require("hardhat"); // this import is optional

async function main() {
  const EpicNFT = await ethers.getContractFactory("EpicNFT");
  const contract = await EpicNFT.deploy();
  await contract.deployed();
  console.log("EpicNFT deployed to:", contract.address);

  let txn = await contract.mint();
  await txn.wait();

  txn = await contract.mint();
  await txn.wait();
}

// run the script
(async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

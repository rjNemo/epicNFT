const hre = require("hardhat"); // this import is optional

async function main() {
  const EpicNFT = await hre.ethers.getContractFactory("EpicNFT");
  const contract = await EpicNFT.deploy();
  await contract.deployed();
  console.log("EpicNFT deployed to:", contract.address);
}

(async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

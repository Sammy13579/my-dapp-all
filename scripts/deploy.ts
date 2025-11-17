const { ethers } = require("hardhat");

async function main() {
  const HashRegistry = await ethers.getContractFactory("HashRegistry");
  const contract = await HashRegistry.deploy();
  await contract.waitForDeployment();

  console.log("HashRegistry deployed to:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
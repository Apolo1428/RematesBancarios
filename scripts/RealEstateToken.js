const hre = require("hardhat");

async function main() {
  const RealEstatToken = await hre.ethers.getContractFactory("RealEstateTokenImplementation");
  const realEstatToken = await RealEstatToken.deploy();


  console.log("Greeter deployed to:", realEstatToken.address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
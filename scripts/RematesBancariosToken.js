const hre = require("hardhat");

async function main() {
  const RematesBancariosToken= await hre.ethers.getContractFactory("RematesBancariosToken");
  const rematesBancariosToken = await RematesBancariosToken.deploy();


  console.log("Contrato RBT desplegado en: ", rematesBancariosToken.target);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
/** @type import('hardhat/config').HardhatUserConfig */

require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // Traer la infomacion de .env
// console.log(process.env) remove this after you've confirmed it is working

const { red_polygon, red_ethereum,clave_privada } = process.env;

module.exports = {
  solidity: "0.8.27", 
  //configurar la red de Polygon
  networks: {
    polygon: {
      url: red_polygon,
      accounts: [`0x${clave_privada }`],
    },
    // red ethereum
    ethereum: {
      url:  red_ethereum,
      accounts: [`0x${clave_privada }`],
    },
  },
};
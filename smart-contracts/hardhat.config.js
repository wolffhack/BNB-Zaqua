require("@nomicfoundation/hardhat-toolbox");
const dotenv = require("dotenv");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",


  networks: {
    hardhat: {
      chainId: 1337,
      gas: "auto", 
    },
    bnbsc: {
      url: "https://data-seed-prebsc-1-s1.bnbchain.org:8545",
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      gasPrice: 1100000000,
    },
  }
};

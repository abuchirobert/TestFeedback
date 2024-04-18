require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({path: ".env"});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "sepolia",

  //for sepolia network
  networks: {
    sepolia: {
      url: process.env.RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 11155111,
    },

    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
    }

  },

  sourcify: {
    enabled: true
  },

  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  },


  solidity: "0.8.24",
};

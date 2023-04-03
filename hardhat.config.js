require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("@openzeppelin/hardhat-upgrades");
require("dotenv").config()
/** @type import('hardhat/config').HardhatUserConfig */
// 合约验证
module.exports = {
  solidity: {
    version: "0.8.18",
  },
  etherscan: {
    apiKey: {
      goerli: process.env.ETHERSCAN_KEY,
      bscTestnet: process.env.BSCSCAN_KEY,
    },
  },

  networks: {
    bsc: {
      url: process.env.BSC_URL,
      accounts: [process.env.PRIVATE_BSC2],
      chainId: 97,
      gas: "auto",
    },
    goerli: {
      url: process.env.GOERLI_URL,
      accounts: [process.env.PRIVATE_KEY1],
      chainId: 5,
    },
  },
};


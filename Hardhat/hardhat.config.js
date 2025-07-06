require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.21",
    settings: {
      optimizer: {
        enabled: true,
        runs: 400,
      },
      viaIR: true,
    },
  },
  sourcify: {
    enabled: true,
  },
  etherscan: {
    apiKey: "RZTT59ZMYNDI5IVU4SNXK1AXYF1RFNY4QY",
  },
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/518eda9b13c849eaae85752808262a20",
      accounts: [
        "4438f1ebcf0d4d6bea4689573eda5063afc815ab9cacdab105c8785612c0b1d2",
      ],
    },
    hardhat: {
      chainId: 1337,
      allowUnlimitedContractSize: true,
      blockGasLimit: 30000000,
      accounts: {
        count: 20,
        balance: "10000000000000",
      },
    },
    localhost: {
      url: "http://0.0.0.0:8545", // listen on all interfaces
    },
  },
};

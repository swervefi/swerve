import { task } from 'hardhat/config'
import '@nomiclabs/hardhat-waffle'
import '@nomiclabs/hardhat-ethers'
import 'hardhat-gas-reporter'
import 'hardhat-contract-sizer'
// ! dont include vyper plugin or sol contracts wont be compiled

// TODO: read from process.env.KOVAN_PRIVATE_KEY
const ETH_PRIVATE_KEY = ''
const INFURA_PROJECT_ID = ''

// This is a sample Buidler task. To learn how to create your own go to
// @see https://hardhat.org/guides/create-task.html
task(
  'accounts',
  'Prints the list of accounts',
  async (_taskArgs, { ethers }) => {
    const accounts = await ethers.getSigners()

    for (const account of accounts) {
      console.log(await account.getAddress())
    }
  }
)

// You have to export an object to set up your config
// This object can have the following optional entries:
// defaultNetwork, networks, solc, and paths.
// @see https://hardhat.org/config/ to learn more
export default {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {},
    local: {
      url: 'http://127.0.0.1:8545',
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${INFURA_PROJECT_ID}`,
      // accounts: [`0x${ETH_PRIVATE_KEY}`],
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`,
      // accounts: [`0x${ETH_PRIVATE_KEY}`],
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`,
    },
  },
  solidity: {
    version: '0.6.10',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 21,
    showTimeSpent: true,
  },
  // contractSizer: {
  //   runOnCompile: true,
  // }
}

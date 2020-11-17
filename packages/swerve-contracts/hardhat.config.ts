import * as dotenv from 'dotenv'
import { task } from 'hardhat/config'
import '@nomiclabs/hardhat-waffle'
import '@nomiclabs/hardhat-ethers'
import 'hardhat-gas-reporter'
import 'hardhat-contract-sizer'
// ! dont include vyper plugin or sol contracts wont be compiled

// Load environment file
dotenv.config()

// Set FORK_URL in `.env` file
// @see https://hardhat.org/hardhat-network/
const FORK_URL = process.env.FORK_URL || ''

// This is a sample Hardhat task. To learn how to create your own go to
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
    hardhat: {
      forking: {
        url: FORK_URL,
      },
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

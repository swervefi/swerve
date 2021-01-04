# Swerve Finance 

a decrentralized finance application for optimal stablecion swaps.

## Key Features

- Swap between DAI, USDC, USDT, and TUSD
- Provide liquidity
- DAO operated

## Community

[Discord](https://discord.gg/6dZtAZP8j3)
[Twitter](https://twitter.com/SwerveFinance)
[Newsletter](https://swervenewsletter.substack.com/)

## Installation

```sh
git clone https://github.com/swervefi/swerve.git
cd swerve
npm install
lerna bootstrap
```

## Architecture

This repository has the following structure:

```sh
.
├── config # Infrastructure files
├── docs # Detailed developer documentation
└── packages 
    ├── swerve-contracts # Solidity and Vyper files
    └── ...
    └── swerve-ui # Swerve website and dApp
```

## Development

- [Swerve User Interface](packages/swerve-ui/README.md)

## Overview

A paragraph or so here about the system as a whole. Doesn't need to be too detailed.

### System Components

Logical system components. Don't get into the individual details of each smart contract here - just go over the system
as a whole and how the main parts interact with each other, including what is accessed from the UI.

### UI

Here we will go over the UI, what we can access from it, in a general overview sense. The UI will be fully detailed inside the swerve-ui package.

### Smart Contracts

Once we create the Solidity interfaces for the Vyper contracts, explain here how they work and what to use them for.

#### Vyper
List individual Vyper smart contracts here, and describe what they do, and how they interact with other smart contracts.

#### Solidity
List individual Solidity smart contract here, and describe what they do, and how they interact with other smart contracts.

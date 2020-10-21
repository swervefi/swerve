# Swerve Finance

a decrentralized finance application for optimal stablecion swaps.

## Key Features

- Swap between DAI, USDC, USDT, and TUSD
- Provide liquidity
- DAO operated

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
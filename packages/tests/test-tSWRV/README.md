Test instructions for the tSWRV.sol contract

Pre-requisites :
- truffle
- ganache-cli
- a working Infura API Key

Commands :
- npm install
- npx ganache-cli -f <YOUR_MAINNET_INFURA_API_KEY> -i 1 --unlock 0x1137952818D5887d9af44995055723967C78B3bb --unlock 0x05D26d76c66c0999561dE89557665B840C383e0c
- in a second terminal : truffle test

Notes :
- in order to be as close as possible to realistic conditions, this test script forks the mainnet at the latest available block
- two addresses are unlocked for the test : first one is the treasury multisig address (so that we can simulate transactions from this address), second one is
a large current swUSD holder whose balance we are using to fund the tSWRV contract --> this second address might need to be updated in the future
- OperationsTest.js checks that the normal operations flow works correctly, while AuthorizationsTest.js checks that undesirable actions are properly blocked


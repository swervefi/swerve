const tSWRV = artifacts.require("tSWRV");
const erc20 = artifacts.require("ERC20");
const truffleAssert = require('truffle-assertions');


const {time} = require('@openzeppelin/test-helpers');


contract("tSWRV", async (accounts) => {

    let TSWRV;

    it("should prevent non-owner accounts from calling any owner function", async() => {

        TSWRV = await tSWRV.new();

        // checking that unlockFunction function cannot be called by anyone else than the contract owner 
        await truffleAssert.reverts(TSWRV.unlockFunction(0, {from: accounts[0]}), "Caller is not the owner");
        await truffleAssert.reverts(TSWRV.unlockFunction(1, {from: accounts[0]}), "Caller is not the owner");

        // checking that lockFunction function cannot be called by anyone else than the contract owner 
            // note : treasury multisig address must be unlocked using --unlock 0x1137952818D5887d9af44995055723967C78B3bb
        const treasuryMultisigAddress = "0x1137952818D5887d9af44995055723967C78B3bb";
            // transferring ETH to the multisig address so it can call contract functions
        await web3.eth.sendTransaction({ from: accounts[0], to: treasuryMultisigAddress, value: web3.utils.toWei("1") })
            // unlocking transferOwnership and setSubcommitteeAddress functions by a call from the treasury multisig
        await TSWRV.unlockFunction(0, {from: treasuryMultisigAddress}); // 0 corresponds to the transferOwnership function
        await TSWRV.unlockFunction(1, {from: treasuryMultisigAddress}); // 1 corresponds to the setSubcommitteeAddress function

        await truffleAssert.reverts(TSWRV.lockFunction(0, {from: accounts[0]}), "Caller is not the owner");
        await truffleAssert.reverts(TSWRV.lockFunction(1, {from: accounts[0]}), "Caller is not the owner");

        // checking that timelocked functions cannot be called after unlock by anyone else than the contract owner
            // increasing blocktime so we can call the timelocked function
        await time.increase(2 * 24 * 3600); // two days in seconds
        
        await truffleAssert.reverts(TSWRV.transferOwnership(accounts[1], {from: accounts[0]}), "Caller is not the owner");
        await truffleAssert.reverts(TSWRV.setSubcommitteeAddress(accounts[1], {from: accounts[0]}), "Caller is not the owner");

        // checking that mint function cannot be called by anyone else than the contract owner
        await truffleAssert.reverts(TSWRV.mint(3000, {from: accounts[0]}), "Caller is not the owner");
        })

    it("should prevent anyone but the designated subcommittee address from creating grants", async() =>{

        TSWRV = await tSWRV.new();
        const treasuryMultisigAddress = "0x1137952818D5887d9af44995055723967C78B3bb";

        // before nomination of the subcommittee address
        await truffleAssert.reverts(TSWRV.createGrant(accounts[1], 5000, 5, 1*24*3600, {from: accounts[0]}), "Only the subcommittee can create a grant");
        await truffleAssert.reverts(TSWRV.createScheduledGrants(accounts[1], [5000, 6000], [5, 10], [1*24*3600, 2*24*3600], {from: accounts[0]}), "Only the subcommittee can create a grant");

        // after nomination of the subcommittee address
            // unlocking setSubcommitteeAddress function by a call from the treasury multisig
        await TSWRV.unlockFunction(1, {from: treasuryMultisigAddress}); // 1 corresponds to the setSubcommitteeAddress function
            // increasing blocktime so we can call the timelocked function
        await time.increase(2 * 24 * 3600); // two days in seconds
            // nominating accounts[1] as the subcommittee address
        await TSWRV.setSubcommitteeAddress(accounts[1], {from: treasuryMultisigAddress});

        await truffleAssert.reverts(TSWRV.createGrant(accounts[2], 5000, 5, 1*24*3600, {from: accounts[0]}), "Only the subcommittee can create a grant");
        await truffleAssert.reverts(TSWRV.createScheduledGrants(accounts[2], [5000, 6000], [5, 10], [1*24*3600, 2*24*3600], {from: accounts[0]}), "Only the subcommittee can create a grant");
        })

    it("should prevent anyone but the grant recipient from redeeming tSWRV tokens", async() =>{

        TSWRV = await tSWRV.new();
        const treasuryMultisigAddress = "0x1137952818D5887d9af44995055723967C78B3bb";

        // unlocking setSubcommitteeAddress function by a call from the treasury multisig
        await TSWRV.unlockFunction(1, {from: treasuryMultisigAddress}); // 1 corresponds to the setSubcommitteeAddress function
        // increasing blocktime so we can call the timelocked function
        await time.increase(2 * 24 * 3600); // two days in seconds
        // nominating accounts[1] as the subcommittee address
        await TSWRV.setSubcommitteeAddress(accounts[1], {from: treasuryMultisigAddress});
        // minting tSWRV tokens to be distributed by the subcommittee address
        await TSWRV.mint(15000, {from: treasuryMultisigAddress});
        // creating a single grant in favor of the accounts[2] address (grantID = 0)
        await TSWRV.createGrant(accounts[2], 4000, 10, 7*24*3600, {from: accounts[1]});
        // creating multiple grants in favor of the accounts[2] address (grantID = 1 and grantID = 2)
        await TSWRV.createScheduledGrants(accounts[2], [5000, 6000], [5, 10], [1*24*3600, 2*24*3600], {from: accounts[1]});


        await truffleAssert.reverts(TSWRV.redeem(0, 4000, {from: accounts[3]}), "Only the grant recipient can redeem its tSWRV tokens");
        await truffleAssert.reverts(TSWRV.redeem(0, 5000, {from: accounts[3]}), "Only the grant recipient can redeem its tSWRV tokens");
        await truffleAssert.reverts(TSWRV.redeem(0, 6000, {from: accounts[3]}), "Only the grant recipient can redeem its tSWRV tokens");

        })

    it("should prevent a grant recipient from redeeming more tSWRV tokens than was granted", async () => {

        TSWRV = await tSWRV.new();
        const treasuryMultisigAddress = "0x1137952818D5887d9af44995055723967C78B3bb";

        // unlocking setSubcommitteeAddress function by a call from the treasury multisig
        await TSWRV.unlockFunction(1, {from: treasuryMultisigAddress}); // 1 corresponds to the setSubcommitteeAddress function
        // increasing blocktime so we can call the timelocked function
        await time.increase(2 * 24 * 3600); // two days in seconds
        // nominating accounts[1] as the subcommittee address
        await TSWRV.setSubcommitteeAddress(accounts[1], {from: treasuryMultisigAddress});
        // minting tSWRV tokens to be distributed by the subcommittee address and funding the tSWRV contract with swUSD
        await TSWRV.mint(10000, {from: treasuryMultisigAddress});
            // note: swUSD holder address must be unlocked using --unlock 0x05D26d76c66c0999561dE89557665B840C383e0c
        const swUSDholder = "0x05D26d76c66c0999561dE89557665B840C383e0c"; // address of a large swUSD taken from Etherscan - might need to be changed in the future
        const swUSDaddress = "0x77C6E4a580c0dCE4E5c7a17d0bc077188a83A059"; // current swUSD address
        const swUSD = new web3.eth.Contract(erc20.abi, swUSDaddress);
        await swUSD.methods.transfer(TSWRV.address, web3.utils.toWei("5000")).send({from: swUSDholder});
        // creating a single grant in favor of the accounts[2] address (grantID = 0)
        await TSWRV.createGrant(accounts[2], 5000, 0, 0, {from: accounts[1]}); // no redemption delay

        // checking that one-time redemption is rejected
        await truffleAssert.reverts(TSWRV.redeem(0, 6000, {from: accounts[2]}), "Amount requested is more than current grant amount");

        // checking that incremental redemptions over the determined amount also get rejected
        await TSWRV.redeem(0, 3000, {from: accounts[2]});
        await truffleAssert.reverts(TSWRV.redeem(0, 3000, {from: accounts[2]}), "Amount requested is more than current grant amount");

        })

    it("should prevent a grant recipient from redeeming tSWRV tokens before the grant's redemption delay has passed", async () => {

        await TSWRV.createGrant(accounts[3], 1000, 0, 30*24*3600, {from: accounts[1]}); // 30-day redemption delay
        await time.increase(15 * 24 * 3600); // 15 days in seconds
        await truffleAssert.reverts(TSWRV.redeem(1, 1000, {from: accounts[3]}), "Grant is not yet redeemable for swUSD");

    })

    it("should prevent the subcommittee from creating scheduled grants with arrays of unequal lengths", async () => {

        // checking that an amounts array with a different length than other arrays gets rejected 
        await truffleAssert.reverts(TSWRV.createScheduledGrants(accounts[4], [100, 100], [10, 10, 10], [15 * 24 * 3600, 30 * 24 * 3600, 45 * 24 * 3600], {from: accounts[1]}), "All arrays must be of the same length");
        // checking that an bonus percentage array with a different length than other arrays gets rejected 
        await truffleAssert.reverts(TSWRV.createScheduledGrants(accounts[4], [100, 100, 100], [10, 10], [15 * 24 * 3600, 30 * 24 * 3600, 45 * 24 * 3600], {from: accounts[1]}), "All arrays must be of the same length");
        // checking that an redemption delay array with a different length than other arrays gets rejected 
        await truffleAssert.reverts(TSWRV.createScheduledGrants(accounts[4], [100, 100, 100], [10, 10, 10], [15 * 24 * 3600, 30 * 24 * 3600], {from: accounts[1]}), "All arrays must be of the same length");

    })

    it("should not allow to mint, transfer or redeem tSWRV tokens with a 0 amount", async () => {

        const treasuryMultisigAddress = "0x1137952818D5887d9af44995055723967C78B3bb";

        // checking that owner cannot try to mint zero tSWRV tokens
        await truffleAssert.reverts(TSWRV.mint(0, {from: treasuryMultisigAddress}), "Amount cannot be zero");

        // checking that subcommittee cannot create a grant for zero tSWRV tokens
        await truffleAssert.reverts(TSWRV.createGrant(accounts[2], 0, 0, 0, {from: accounts[1]}), "Amount cannot be zero");
        await truffleAssert.reverts(TSWRV.createScheduledGrants(accounts[2], [100, 0, 50], [0, 0, 0], [0, 0, 0], {from: accounts[1]}), "Amount cannot be zero");

        // checking that grant recipient cannot redeem zero tSWRV tokens
        const grantID = await TSWRV.counter();
        await TSWRV.createGrant(accounts[4], 500, 0, 0, {from: accounts[1]});
        await truffleAssert.reverts(TSWRV.redeem(grantID, 0, {from: accounts[4]}), "Amount cannot be zero");

    })

    it("should prevent the owner from calling a timelocked function before or during the unlocking process", async() => {

        TSWRV = await tSWRV.new();
        const owner = await TSWRV.owner();

        // before unlock
        await truffleAssert.reverts(TSWRV.transferOwnership(accounts[1], {from: owner}), "Function is timelocked");
        await truffleAssert.reverts(TSWRV.setSubcommitteeAddress(accounts[1], {from: owner}), "Function is timelocked");

        // during unlock period
        await TSWRV.unlockFunction(0, {from: owner}); // 0 corresponds to the transferOwnership function
        await TSWRV.unlockFunction(1, {from: owner}); // 1 corresponds to the setSubcommitteeAddress function
        await time.increase(1 * 24 * 3600); // one day in seconds

        await truffleAssert.reverts(TSWRV.transferOwnership(accounts[1], {from: owner}), "Function is timelocked");
        await truffleAssert.reverts(TSWRV.setSubcommitteeAddress(accounts[1], {from: owner}), "Function is timelocked");

        })
    
    it("should not let the owner transfer ownership or nominate as subcommittee the zero address", async() => {

        TSWRV = await tSWRV.new();
        const owner = await TSWRV.owner();

        // unlocking transferOwnership and setSubcommitteeAddress functions
        await TSWRV.unlockFunction(0, {from: owner}); // 0 corresponds to the transferOwnership function
        await TSWRV.unlockFunction(1, {from: owner}); // 1 corresponds to the setSubcommitteeAddress function
        // increasing time to after the timelock period
        await time.increase(2 * 24 * 3600); // two days in seconds

        await truffleAssert.reverts(TSWRV.transferOwnership("0x0000000000000000000000000000000000000000", {from: owner}), "New owner cannot be the zero address");
        await truffleAssert.reverts(TSWRV.setSubcommitteeAddress("0x0000000000000000000000000000000000000000", {from: owner}), "Subcommittee cannot be the zero address");

        })

    it("should revert when the transfer or transferFrom functions are called", async () => {
        TSWRV = await tSWRV.new();
        await truffleAssert.reverts(TSWRV.transfer(accounts[1], 1000, {from: accounts[0]}));
        await truffleAssert.reverts(TSWRV.transferFrom(accounts[0], accounts[1], 1000, {from: accounts[0]}));

        }) 

    }
)
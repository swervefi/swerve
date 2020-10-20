const tSWRV = artifacts.require("tSWRV");
const erc20 = artifacts.require("ERC20")

const {time} = require('@openzeppelin/test-helpers');


contract("tSWRV", async (accounts) => {

    it("should allow the owner to unlock the function and transfer the ownership", async () => {   
        const TSWRV = await tSWRV.deployed();

        const treasuryMultisigAddress = "0x1137952818D5887d9af44995055723967C78B3bb";
        // transferring ETH to the multisig address so it can call contract functions
        await web3.eth.sendTransaction({ from: accounts[0], to: treasuryMultisigAddress, value: web3.utils.toWei("1") })

        // note : treasury multisig address must be unlocked using --unlock 0x1137952818D5887d9af44995055723967C78B3bb

        // unlocking transferOwnership function by a call from the treasury multisig
        await TSWRV.unlockFunction(0, {from: treasuryMultisigAddress}); // 0 corresponds to the transferOwnership function
        // increasing blocktime so we can call the timelocked function
        await time.increase(2 * 24 * 3600); // two days in seconds
        // transferring ownership to accounts[0]
        await TSWRV.transferOwnership(accounts[0], {from: treasuryMultisigAddress});
        // checking that the new owner address has been correctly registered
        const newOwner = await TSWRV.owner();
        assert.equal(newOwner, accounts[0]);

        })

    it("should allow the owner to unlock the function and nominate the subcommittee address", async() =>{
        const TSWRV = await tSWRV.deployed();
        const owner = await TSWRV.owner();

        // unlocking setSubcommitteeAddress function by a call from the owner
        await TSWRV.unlockFunction(1, {from: owner}); // 1 corresponds to the setSubcommitteeAddress function
        // increasing blocktime so we can call the timelocked function
        await time.increase(2 * 24 * 3600); // two days in seconds
        // setting subcommittee to the address of accounts[1]
        await TSWRV.setSubcommitteeAddress(accounts[1], {from: owner});
        // checking that the subcommittee address has been correctly registered
        const subcommittee = await TSWRV.subcommitteeAddress();
        assert.equal(subcommittee, accounts[1]);
        })

    it("should allow the owner to fund the contract and mint tSWRV tokens", async() => {
        const TSWRV = await tSWRV.deployed();

        const swUSDholder = "0x05D26d76c66c0999561dE89557665B840C383e0c"; // address of a large swUSD taken from Etherscan - might need to be changed in the future
        const swUSDaddress = "0x77C6E4a580c0dCE4E5c7a17d0bc077188a83A059"; // current swUSD address
        const owner = await TSWRV.owner();
        const subcommittee = await TSWRV.subcommitteeAddress();
        const swUSD = new web3.eth.Contract(erc20.abi, swUSDaddress);

        // note: swUSD holder address must be unlocked using --unlock 0x05D26d76c66c0999561dE89557665B840C383e0c

        // sending 5 000 swUSD from a large swUSD holder to the tSWRV contract address
        await swUSD.methods.transfer(TSWRV.address, web3.utils.toWei("5000")).send({from: swUSDholder});
        // minting 3 000 tSWRV for the subcommittee by a call from the owner
        await TSWRV.mint(web3.utils.toWei("3000"), {from: owner});

        // checking that the contract's swUSD balance has the correct amount of 5000 received tokens
        const swUSDbalance = await swUSD.methods.balanceOf(TSWRV.address).call({from : accounts[0]});
        assert.equal(swUSDbalance, web3.utils.toWei("5000")); 

        // checking that the subcommittee's tSWRV balance has the correct amount of 3000 minted tokens
        const tSWRVbalance = await TSWRV.balanceOf(subcommittee);
        assert.equal(tSWRVbalance, web3.utils.toWei("3000"));       

    })

    it("should allow the subcommittee to create grants", async() => {
        const TSWRV = await tSWRV.deployed();

        const subcommittee = await TSWRV.subcommitteeAddress();

        // getting current value of the {counter} variable to have the ID of the next grant
        const firstGrantID = await TSWRV.counter();
        // creating a grant in favor of accounts[2] for 500 tSWRV tokens, with 5% bonus percentage and 0 redemption delay by a call from the subcomittee
        await TSWRV.createGrant(accounts[2], web3.utils.toWei("500"), 5, 0, {from: subcommittee});
        // getting timestamp of the block where grant was created and calculating the grant's redemption date 
        const firstBlockTime = await time.latest();
        const firstGrantRedemptionDate = 0 + parseInt(firstBlockTime);

        // getting current value of the {counter} variable to have the ID of the next grant
        const secondGrantID = await TSWRV.counter();
        // creating a grant in favor of accounts[3] for 1000 tSWRV tokens, with 10% bonus percentage and 30 days redemption delay by a call from the subcommittee
        await TSWRV.createGrant(accounts[3], web3.utils.toWei("1000"), 10, 30*24*3600, {from: subcommittee});
        // getting timestamp of the block where grant was created and calculating the grant's redemption date 
        const secondBlockTime = await time.latest();
        const secondGrantRedemptionDate = 30*24*3600 + parseInt(secondBlockTime);

        // getting current and next two values of the {counter} variable to have the ID of the next three grants
        const thirdGrantID = await TSWRV.counter();
        const fourthGrantID = parseInt(thirdGrantID.toString()) + 1;
        const fifthGrantID = parseInt(fourthGrantID.toString()) + 1;
        // creating multiple grants in favor of account[4] for 200 / 250 / 300 tSWRV tokens, 10% / 20% / 30% bonus, 45 / 90 / 120 days redemption delay respectively by a call from the subcommittee
        await TSWRV.createScheduledGrants(accounts[4], [web3.utils.toWei("200"), web3.utils.toWei("250"), web3.utils.toWei("300")], [10, 20, 30], [45*24*3600, 90*24*3600, 120*24*3600], {from: subcommittee});
        // getting timestamp of the block where the grants were created and calculating their respective redemption dates 
        const thirdBlockTime = await time.latest();
        const thirdGrantRedemptionDate = 45*24*3600 + parseInt(thirdBlockTime);
        const fourthGrantRedemptionDate = 90*24*3600 + parseInt(thirdBlockTime);
        const fifthGrantRedemptionDate = 120*24*3600 + parseInt(thirdBlockTime);

        // checking that recipients have received the correct amount of tSWRV tokens
        const recipientBalance2 = await TSWRV.balanceOf(accounts[2]);
        assert.equal(recipientBalance2, web3.utils.toWei("500"));

        const recipientBalance3 = await TSWRV.balanceOf(accounts[3]);
        assert.equal(recipientBalance3, web3.utils.toWei("1000"));

        const recipientBalance4 = await TSWRV.balanceOf(accounts[4]);
        assert.equal(recipientBalance4, web3.utils.toWei("750"));

        // checking that grants have been correctly registered in the {grants} mapping
        const firstGrant = await TSWRV.grants(firstGrantID);
        assert.equal(firstGrant.recipient, accounts[2]); // accounts[2] is the recipient
        assert.equal(web3.utils.fromWei(firstGrant.amount), web3.utils.fromWei(recipientBalance2)); // grant amount corresponds to accounts[2]'s tSWRV balance
        assert.equal(firstGrant.bonus, 5); // bonus percentage is 5%
        assert.equal(parseInt(firstGrant.redemptionDate.toString()), firstGrantRedemptionDate); // redemption date in the mapping is the same as the one calculate above

        const secondGrant = await TSWRV.grants(secondGrantID);
        assert.equal(secondGrant.recipient, accounts[3]);  // accounts[3] is the recipient
        assert.equal(web3.utils.fromWei(secondGrant.amount), web3.utils.fromWei(recipientBalance3)); // grant amount corresponds to accounts[3]'s tSWRV balance
        assert.equal(secondGrant.bonus, 10); // bonus percentage is 10%
        assert.equal(parseInt(secondGrant.redemptionDate.toString()), secondGrantRedemptionDate);

        const thirdGrant = await TSWRV.grants(thirdGrantID);
        assert.equal(thirdGrant.recipient, accounts[4]); // accounts[4] is the recipient
        assert.equal(web3.utils.fromWei(thirdGrant.amount), 200); // grant amount corresponds to the first input of 200 tSWRV
        assert.equal(thirdGrant.bonus, 10); // bonus percentage is 10%
        assert.equal(parseInt(thirdGrant.redemptionDate.toString()), thirdGrantRedemptionDate);

        const fourthGrant = await TSWRV.grants(fourthGrantID);
        assert.equal(fourthGrant.recipient, accounts[4]); // accounts[4] is the recipient
        assert.equal(web3.utils.fromWei(fourthGrant.amount), 250); // grant amount corresponds to the second input of 250 tSWRV
        assert.equal(fourthGrant.bonus, 20); // bonus percentage is 20%
        assert.equal(parseInt(fourthGrant.redemptionDate.toString()), fourthGrantRedemptionDate);

        const fifthGrant = await TSWRV.grants(fifthGrantID);
        assert.equal(fifthGrant.recipient, accounts[4]); // accounts[4] is the recipient
        assert.equal(web3.utils.fromWei(fifthGrant.amount), 300); // grant amount corresponds to the third input of 300 tSWRV
        assert.equal(fifthGrant.bonus, 30); // bonus percentage is 30%
        assert.equal(parseInt(fifthGrant.redemptionDate.toString()), fifthGrantRedemptionDate);

    })

    it("should allow grant recipients to redeem tSWRV tokens for swUSD", async ()=> {
        const TSWRV = await tSWRV.deployed();
        const swUSDaddress = "0x77C6E4a580c0dCE4E5c7a17d0bc077188a83A059";
        const swUSD = new web3.eth.Contract(erc20.abi, swUSDaddress);

        // redeeming the full amount of 500 tSWRV tokens from the first grant (grantID = 0) for swUSD tokens, with a call from the grant recipient
        await TSWRV.redeem(0, web3.utils.toWei("500"), {from: accounts[2]});
        // checking that the grant recipient's tSWRV balance has been correctly updated
        const tSWRVbalance2 = await TSWRV.balanceOf(accounts[2]);
        assert.equal(web3.utils.fromWei(tSWRVbalance2), 0); // grant fully redeemed
        // checking that the grant recipient swUSD balance has increased by the grant's base amount + bonus
        const swUSDbalance2 = await swUSD.methods.balanceOf(accounts[2]).call({from: accounts[2]});
        assert.equal(web3.utils.fromWei(swUSDbalance2), 525); // 500 base amount + 5% bonus
        // checking that full redemption has triggered the grant data deletion
        const firstGrant = await TSWRV.grants(0);
        assert(firstGrant.recipient, '0x0000000000000000000000000000000000000000'); // recipient address now points to address 0, meaning the mapping data has been deleted

        // increase blocktime by 30 days to reach 30 days delay of the second grant 
        await time.increase(30*24*3600);
        // redeeming a partial amount of 800 tSWRV tokens from the first grant (grantID = 1) for swUSD tokens, with a call from the grant recipient
        await TSWRV.redeem(1, web3.utils.toWei("800"), {from: accounts[3]});
        // checking that the grant recipient's tSWRV balance has been correctly updated
        const tSWRVbalance3 = await TSWRV.balanceOf(accounts[3]);
        assert.equal(web3.utils.fromWei(tSWRVbalance3), 200); // 1000 total minus 800 redemption
        // checking that the grant recipient swUSD balance has increased by the requested base amount + bonus
        const swUSDbalance3 = await swUSD.methods.balanceOf(accounts[3]).call({from: accounts[3]});
        assert.equal(web3.utils.fromWei(swUSDbalance3), 880); // 800 base amount + 10% bonus
        // checking that partial redemption has not triggered the grant data deletion
        const secondGrant = await TSWRV.grants(1);
        assert(secondGrant.recipient, accounts[3]); // recipient address still points to the correct address, meaning the mapping data has not been deleted

        // increase blocktime by 15 days to reach 45 days delay of third grant
        await time.increase(15*24*3600);
        // redeeming the full amount of 200 tSWRV tokens from the third grant (grantID = 2) for swUSD tokens, with a call from the grant recipient
        await TSWRV.redeem(2, web3.utils.toWei("200"), {from: accounts[4]});
        // checking that the grant recipient's tSWRV balance has been correctly updated
        let tSWRVbalance4 = await TSWRV.balanceOf(accounts[4]);
        assert.equal(web3.utils.fromWei(tSWRVbalance4), 550); // 750 total minus 200 redemption
        // checking that the grant recipient swUSD balance has increased by the requested base amount + bonus
        let swUSDbalance4 = await swUSD.methods.balanceOf(accounts[4]).call({from: accounts[4]});
        assert.equal(web3.utils.fromWei(swUSDbalance4), 220); // 200 base amount + 10% bonus

        // increase blocktime by 45 days to reach 90 days delay of fourth grant
        await time.increase(45*24*3600); 
        // redeeming the full amount of 250 tSWRV tokens from the fourth grant (grantID = 3) for swUSD tokens, with a call from the grant recipient
        await TSWRV.redeem(3, web3.utils.toWei("250"), {from: accounts[4]});
        // checking that the grant recipient's tSWRV balance has been correctly updated
        tSWRVbalance4 = await TSWRV.balanceOf(accounts[4]);
        assert.equal(web3.utils.fromWei(tSWRVbalance4), 300); // 750 total minus 200+250 redemption
        // checking that the grant recipient swUSD balance has increased by the requested base amount + bonus
        swUSDbalance4 = await swUSD.methods.balanceOf(accounts[4]).call({from: accounts[4]});
        assert.equal(web3.utils.fromWei(swUSDbalance4), 520); // 220 already redeemed + 250 base amount with 20% bonus

        // increase blocktime by 30 days to reach 120 days delay of fifth grant
        await time.increase(30*24*3600); 
        // redeeming the full amount of 300 tSWRV tokens from the fifth grant (grantID = 4) for swUSD tokens, with a call from the grant recipient
        await TSWRV.redeem(4, web3.utils.toWei("300"), {from: accounts[4]});
        // checking that the grant recipient's tSWRV balance has been correctly updated
        tSWRVbalance4 = await TSWRV.balanceOf(accounts[4]);
        assert.equal(web3.utils.fromWei(tSWRVbalance4), 0); // 750 total minus 200+250+300 redemption
        // checking that the grant recipient swUSD balance has increased by the requested base amount + bonus
        swUSDbalance4 = await swUSD.methods.balanceOf(accounts[4]).call({from: accounts[4]});
        assert.equal(web3.utils.fromWei(swUSDbalance4), 910); // 520 already redeemed + 300 base amount with 30% bonus

        // checking that the contract's initial 5 000 swUSD balance has been correctly debited by the tSWRV redemptions from the three grant recipients
        const swUSDtreasuryBalance = await swUSD.methods.balanceOf(TSWRV.address).call({from: accounts[0]});
        assert.equal(web3.utils.fromWei(swUSDtreasuryBalance), 5000 - web3.utils.fromWei(swUSDbalance2) - web3.utils.fromWei(swUSDbalance3) - web3.utils.fromWei(swUSDbalance4)); // original 5000 transfer minus all redemptions
        
        // checking that the subcommittee's minted 3 000 tSWRV balance has been correctly debited by the five grant creations
        const subcommittee = await TSWRV.subcommitteeAddress();
        const tSWRVsubcommitteeBalance = await TSWRV.balanceOf(subcommittee);
        assert.equal(web3.utils.fromWei(tSWRVsubcommitteeBalance), 3000 - 500 - 1000 - 200 - 250 - 300); // original 3000 minted minus all grant transfers
        
        // checking that the total supply of tSWRV tokens has correctly tracked the original minting and the burns from grant redemptions
        const tSWRVtotalSupply = await TSWRV.totalSupply();
        const distributedSupply = parseInt(web3.utils.fromWei(tSWRVsubcommitteeBalance)) + parseInt(web3.utils.fromWei(tSWRVbalance2)) + parseInt(web3.utils.fromWei(tSWRVbalance3)) + parseInt(web3.utils.fromWei(tSWRVbalance4));
        assert.equal(distributedSupply, parseInt(web3.utils.fromWei(tSWRVtotalSupply))); // total supply must be equal to balances of all addresses involved in the test  
        })
    }
);
  
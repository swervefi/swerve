const tSWRV = artifacts.require("tSWRV");

module.exports = async function (deployer, _network, addresses) {

await deployer.deploy(tSWRV);

const TSWRV = await tSWRV.deployed();

console.log(`tSWRV contract deployed at address : ${TSWRV.address}`);

const owner = await TSWRV.owner();
console.log(`Owner address set to : ${owner}`);

const timelock = await TSWRV._TIMELOCK();
console.log(`Timelock in seconds set to : ${timelock.toString()}`);

const swUSD = await TSWRV.swUSD();
console.log(`swUSD address set to : ${swUSD}`);

const counter = await TSWRV.counter()
console.log(`Counter set to : ${counter.toString()}`);

}
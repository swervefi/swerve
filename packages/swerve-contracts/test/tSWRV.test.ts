import { ethers } from 'hardhat'
import { expect } from 'chai'
import { Contract, ContractFactory, Signer } from 'ethers'

describe('tSWRV', function () {
  let tSWRVFactory: ContractFactory
  let tSWRV: Contract
  let owner: Signer
  let user: Signer

  before(async function () {
    ;[owner, user] = await ethers.getSigners()
    tSWRVFactory = await ethers.getContractFactory('tSWRV')
    tSWRV = await tSWRVFactory.deploy()
    await tSWRV.deployed()
  })

  describe('Default Properties', async function () {
    it('Should have an owner', async function () {
      const default_owner = '0x1137952818D5887d9af44995055723967C78B3bb'
      expect(await tSWRV.owner()).to.equal(default_owner)
    })
  })

  describe('Operations', async function () {
    it.skip('should revert when transferring ownership before time lock', async function () {
      await expect(
        tSWRV.connect(owner).transferOwnership(user)
      ).to.be.revertedWith('Function is timelocked')
    })

    it.skip('should allow the owner to unlock the function and transfer the ownership', async function () {
      const treasuryMultisigAddress =
        '0x1137952818D5887d9af44995055723967C78B3bb'
      // transferring ETH to the multisig address so it can call contract functions
      await owner.sendTransaction({
        to: treasuryMultisigAddress,
        value: ethers.utils.parseEther('1'),
      })

      // note : treasury multisig address must be unlocked using --unlock 0x1137952818D5887d9af44995055723967C78B3bb

      // unlocking transferOwnership function by a call from the treasury multisig
      await tSWRV.unlockFunction(0, { from: treasuryMultisigAddress }) // 0 corresponds to the transferOwnership function
      // increasing blocktime so we can call the timelocked function
      // await time.increase(2 * 24 * 3600) // two days in seconds
      // transferring ownership to owner
      await tSWRV.transferOwnership(owner, {
        from: treasuryMultisigAddress,
      })
      // checking that the new owner address has been correctly registered
      expect(await tSWRV.owner()).to.be(await owner.getAddress())
    })
  })
})

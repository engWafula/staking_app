/* eslint-disable no-undef */

const Tether = artifacts.require("Tether");
const RWD= artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");



module.exports = async function (deployer, network, accounts) {
  //deploy mock tether contract
  await deployer.deploy(Tether);
  const tether = await Tether.deployed();

   //deploy mock RWD contract
   await deployer.deploy(RWD);
   const rwd = await RWD.deployed();

    //deploy mock DecentralBank  contract
 await  deployer.deploy(DecentralBank, rwd.address, tether.address);
  const decentralBank = await DecentralBank.deployed();

  //Transfer all reward tokens to the decentralised banks
  await rwd.transfer(decentralBank.address, '1000000000000000000000000');

  //distribute the reward tokens to investors
  await tether.transfer(accounts[1], '100000000000000000000');
};

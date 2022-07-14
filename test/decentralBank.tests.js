/* eslint-disable no-undef */

const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("DecentralBank", (accounts) => {
  let tether, rwd, decentralBank;

  function tokens(num) {
    return web3.utils.toWei(num, "ether");
  }

  before(async () => {
    //loading contracts
    tether = await Tether.new();
    rwd = await RWD.new();
    decentralBank = await DecentralBank.new(rwd.address, tether.address);

    //Transfer all reward tokens to the decentralised bank

    await rwd.transfer(decentralBank.address, tokens("1000000"));

    //Transfer 100 mock tokens to the first account
    await tether.transfer(accounts[1], tokens("100"), { from: accounts[0] });
  });
  describe("Mock Tether Deployment", async () => {
    it("It Matches Name Successfully", async () => {
      const name = await tether.name();
      assert.equal(name, "Tether");
    });
  });

  describe("RWD token Deployment", async () => {
    it("It Matches Name Successfully", async () => {
      const name = await rwd.name();
      assert.equal(name, "Reward Token");
    });
  });


  describe("DecentralBank Deployment", async () => {
    it("It Matches Name Successfully", async () => {
      const name = await decentralBank.name();
      assert.equal(name, "DecentralBank");
    });
  });

  it("contract has tokens", async () => {
    let balance = await rwd.balanceOf(decentralBank.address);
    assert.equal(balance, tokens("1000000"));
  })

  describe("Yield staked", async()=>{
    it("reward tokens for staking", async()=>{
      let result
      // check investor balance before

      result = await tether.balanceOf(accounts[1]);
    })
  })
});

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
  });

  describe("Yield staked", async () => {
    it("reward tokens for staking", async () => {
      let result;
      // check investor balance before

      result = await tether.balanceOf(accounts[1]);

      assert.equal(
        result.toString(),
        tokens("100"),
        "customer mock tether before staking"
      );

      //check staking
      await tether.approve(decentralBank.address, tokens("100"), {
        from: accounts[1],
      });
      await decentralBank.depositFunds(tokens("100"), { from: accounts[1] });

      //check investor balance after

      result = await tether.balanceOf(accounts[1]);

      assert.equal(
        result.toString(),
        tokens("0"),
        "customer mock tether after staking"
      );

      //check decentralBank balance 
      result = await tether.balanceOf(decentralBank.address);

      assert.equal(
        result.toString(),
        tokens("100"),
        "decentralBank mock tether after staking by customer"
      );
 // is staking balance

      result = await decentralBank.isStaking(accounts[1]);
      assert.equal(result.toString(), "true", "customer is staking");

      //rewarding tokens
   await decentralBank.issueRewardToken( { from: accounts[0] });


   await decentralBank.issueRewardToken( { from: accounts[1] }).should.be.rejected;


   //unstake

   await decentralBank.unStakeTokens( { from: accounts[1] });

   //check unstaking balance
 
   result = await tether.balanceOf(accounts[1]);

   assert.equal(
     result.toString(),
     tokens("100"),
     "customer mock tether after unstaking"
   );


   //unstaking update
   result = await decentralBank.isStaking(accounts[1]);
   assert.equal(result.toString(), "false", "customer is not  staking");


   result = await tether.balanceOf(decentralBank.address);

   assert.equal(
     result.toString(),
     tokens("0"),
     "decentralBank mock tether after staking by customer"
   );
    });

    //update staking balance

  });
});

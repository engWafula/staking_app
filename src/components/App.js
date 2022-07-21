import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./Navbar";
import Web3 from "web3";
import Tether from "../truffle_abis/Tether.json";
import RWD from "../truffle_abis/RWD.json";
import DecentralBank from "../truffle_abis/DecentralBank.json";
import Main from "./Main";
import ParticleSettings from "./particleSettings"

export default function App() {
  const [account, setAccount] = useState("0x0");
  const [tether, setTether] = useState({});
  const [rwd, setRwd] = useState({});
  const [decentralBank, setDecentralBank] = useState({});
  const [tetherBalance, setTetherBalance] = useState("3");
  const [rwdBalance, setRwdBalance] = useState("0");
  const [stakingBalance, setStakingBalance] = useState("0");
  const [loading, setLoading] = useState(true);

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async function loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    console.log(account);
    setAccount(account);
    const networkId = await web3.eth.net.getId();

    //loading tether contract
    const tetherData = Tether.networks[networkId];
    if (tetherData) {
      const tether = new web3.eth.Contract(Tether.abi, tetherData.address);
         console.log(tether);
      setTether(tether);
     
      let tetherBalance = tether.methods.balanceOf(account).call();
   
      console.log(tetherBalance);
      const bal = await tetherBalance;
      setTetherBalance(bal.toString());
    } else {
      window.alert("Tether contract not deployed to detected network");
    }

  

    //loading reward contract
    const rewardData = RWD.networks[networkId];
    if (rewardData) {
      const reward = new web3.eth.Contract(RWD.abi, rewardData.address);
      setRwd(reward);
      console.log(reward);
      let rewardBalance = reward.methods.balanceOf(account).call();
      const bal = await rewardBalance;
      setRwdBalance(bal.toString());
    } else {
      window.alert("Reward contract not deployed to detected network");
    }

    //loading decentral bank contract
    const bankData = DecentralBank.networks[networkId];
    if (bankData) {
      const bank = new web3.eth.Contract(DecentralBank.abi, bankData.address);
      setDecentralBank(bank);
      console.log(bank);
      let stakingBalance = bank.methods.stakingBalance(account).call();
      // setStakingBalance(stakingBalance.toString());
      const bal = await stakingBalance;
      setStakingBalance(bal.toString());
    } else {
      window.alert("DecentralBank contract not deployed to detected network");
    }

    setLoading(false);
  }

  const stakeTokens =  (amount) => {
    // setLoading(true);
   tether.methods
      .approve(decentralBank._address, amount).send({from:account})
      .on("transationHash", (hash) => {
    
      });

      decentralBank.methods
      .depositFunds(amount)
      .send({ from: account })
      .on("transationHash", (hash) => {
        setLoading(false);

      });

      setLoading(false);
  };

  const unStake = () => {
    setLoading(true);

    decentralBank.methods
      .unStakeTokens()
      .send({ from: account })
      .on("transationHash", (hash) => {
        setLoading(false);
      });
      setLoading(false);
  };

  // stakeTokens(20)

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  console.log(rwdBalance);
  console.log(tetherBalance)
  console.log(decentralBank);
  console.log(rwd)
  console.log(stakingBalance);

  return (
    <div>
   
      <Navbar account={account} />
      <div className="container-fluid mt-5">
        <div className="row ">
          <main
            role="main"
            className="col-lg-12 ml-auto  mr-auto  "
            style={{ maxWidth: "600px", minHeight: "100vm" }}
          >
            <div>
              {loading ? (
                <p id="loader" className="text-center m-30">
                  LOADING PLEASE....
                </p>
              ) : (
                <Main
                  tetherBalance={tetherBalance}
                  rwdBalance={rwdBalance}
                  stakingBalance={stakingBalance}
                  stakeTokens={stakeTokens}
                  unStake={unStake}
                />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

import React, {useState, useEffect} from 'react'
import "./App.css"
import Navbar from './Navbar'
import Web3 from 'web3'
import Tether from "../truffle_abis/Tether.json"

export default function App() {

    async function  loadWeb3(){
        if(window.ethereum){
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        }
        else if(window.web3){
            window.web3 = new Web3(window.web3.currentProvider);
        }
        else{
            window.alert("Non-Ethereum browser detected. You should consider trying MetaMask!");
        }

    }


     async function loadBlockchainData(){
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        setAccount(account);
         const networkId = await web3.eth.net.getId();

         //loading tether contract
        const tetherData = Tether.networks[networkId]; 
         if(tetherData){
            const tether = new web3.eth.Contract(Tether.abi, tetherData.address);
            setTether(tether);
            console.log(tether);
             let tetherBalance = tether.methods.balanceOf(account).call();
             setTetherBalance(tetherBalance.toString());
             console.log({tetherBalance});
          }else{
        //     window.alert("Tether contract not deployed to detected network");
         }
     }

    useEffect(() => {
      loadWeb3();
      loadBlockchainData()
    }, [])

    const [account, setAccount] = useState("0x0")
    const [tether, setTether] = useState({})
    const [rwd, setRwd] = useState({})
    const [decentralBank, setDecentralBank] = useState({})
    const [tetherBalance, setTetherBalance] = useState('0')
    const [rwdBalance, setRwdBalance] = useState('0')
    const [stakingBalance, setStakingBalance] = useState('0')
    const [loading, setLoading] = useState(true)

  return (
    <div>
        <Navbar account={account}/>
        <div>

        </div>
    </div>
  )
}

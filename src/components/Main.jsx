import React,{useState} from 'react'
import tether from "../tether.png"

export default function Main({tetherBalance,stakingBalance,rwdBalance,stakeTokens,unStake}) {
 const [amount, setAmount] = useState(0)

 const stake = () =>{
  let stake 

  stake = amount.toString()
  stake = window.web3.utils.toWei(stake, "Ether")

  stakeTokens(stake)
 }
  
  console.log(amount)
  return (
    <div id="content" className='mt-3 p-10'>
        <table className='table text-muted text-center'>
            <thead>
            <tr style={{color:"black"}}>
                <th scope='col'>Staking Balance</th>
                <th scope='col'> Reward Balance</th>
            </tr>
            </thead>
            <tbody>
            <tr style={{color:"black"}}>
                <td>{window.web3.utils.fromWei(stakingBalance, "Ether")} USDT</td>
                <td>{window.web3.utils.fromWei(rwdBalance, "Ether")} Reward</td> 
                </tr>
            </tbody>
        </table>
        <div className='card mb-2 ' style={{opacity:"0.9"}}>
         <form className='mb-3' onSubmit={stake}>
             <div style={{borderSpacing:"0 1em"}}>
               <label className='float-left' style={{marginLeft:"15px"}}>
                <b>Stake Tokens</b>
               </label>
               <span className='float-right' style={{marginRight:"8px"}}> Balance:{window.web3.utils.fromWei(tetherBalance, "Ether")}</span>

               <div className='input-group mb-4'>
                 <input  onChange={e => setAmount(e.target.value)} type='text' placeholder='0' className='form-control' required/>
            
               <div className='input-group-open'>
               <div className='input-group-text'>
                <img src={tether} alt="tether" height='30'/>
                &nbsp;&nbsp;&nbsp;USDT 
                </div>
               </div>
             </div>
             <button type='submit'  className='btn btn-primary btn-lg btn-block' onClick={stake} >DEPOSIT</button>
             </div>
         </form>
         <button onClick={unStake} className='btn btn-secondary btn-lg btn-block'>WITHDRAW</button>
            <div className='card-body text-center' style={{color:'blue'}}>
                  AIRDROP
            </div>
        </div>
    </div>
  )
}

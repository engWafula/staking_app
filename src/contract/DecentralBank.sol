// SPDX-License-Identifier: GPL-3.0
 pragma solidity >=0.5.0 <0.9.0;
import "./Tether.sol";
import "./RWD.sol";
contract DecentralBank {
      address public owner;
      string public name = "DecentralBank";
      Tether public tether;
        RWD public rwd;

      address[] public stakers;

        mapping(address => uint) public stakingBalance;
        mapping(address => bool) public hasStaked;
        mapping(address => bool) public isStaking;

        
        

       constructor(RWD _rwd, Tether _tether ) public {
            rwd = _rwd;
            tether = _tether;
            owner = msg.sender;
       }



       function depositFunds(uint _amount) public{
          // require amount is greater than 0
          require(_amount > 0, "The amount cannot be less or equal to 0");
          //transfer tokens to the contract address
     tether.transferFrom(msg.sender, address(this), _amount);

     //update staking balance
     stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

     if(!hasStaked[msg.sender]){
          stakers.push(msg.sender);
     }

     isStaking[msg.sender] = true;
     hasStaked[msg.sender] = true;
       }

       //unstaking funds

       function unStakeTokens() public{
    uint balance = stakingBalance[msg.sender];
  // require amount is greater than 0
     require(balance > 0, "You must have staked tokens to unstake");

     //transfer tokens to be specified address
      tether.transfer(msg.sender, balance);

      //update staking balance
          stakingBalance[msg.sender] = 0;

          //update staking status
          isStaking[msg.sender] = false;
       }

       //issue  reward token to staker

       function issueRewardToken() public{
          //require owner to issue tokens
          require(msg.sender == owner, "Only the owner can issue tokens");

          for(uint i = 0; i<stakers.length; i++){
      address recepient = stakers[i];

       uint balance = stakingBalance[recepient]/9; //incentive for staking
        if(balance > 0){
       rwd.transfer(recepient, balance);
        }
          }
       }
   }
 
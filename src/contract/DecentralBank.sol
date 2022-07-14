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
        mapping(address => bool) public isStaked;

        

       constructor(RWD _rwd, Tether _tether ) public {
            rwd = _rwd;
            tether = _tether;
       }

       function depositFunds(uint _amount) public{
          // require amount is greater than 0
          require(_amount > 0, "The amount cannot be less or equal to 0");
          //transfer tokens to the contract address
     tether.transferFrom(msg.sender, address(this), _amount);

     //update staking balance
     stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

     if(!hasStaked){
          stakers.push(msg.sender);
     }

     isStaked[msg.sender] = true;
     hasStaked[msg.sender] = true;
       }
   }
 
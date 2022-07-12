// SPDX-License-Identifier: GPL-3.0
 pragma solidity >=0.5.0 <0.9.0;

 contract Tether{
   string   name = "Tether";
   string   symbol = "USDT";
    uint256  totalSupply = 100000000000000;
    uint8  decimals = 18;

    event Transfer(
      address indexed  _from,
      address indexed _to,
      uint _value
    );

    event Approval(
      address indexed _owner,
      address indexed _spender,
      uint _value
    );

    mapping (address => uint256) public  balanceOf;

    constructor() {
      balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to,uint _value, address _from) public  returns (bool success){
    //require that value is greater or equal to transfer
       require(balanceOf[msg.sender] >= _value);
    //transfer the tokens and subtract the value from the sender's balance   
       balanceOf[msg.sender]  = balanceOf[msg.sender] - _value;
        balanceOf[_to] = balanceOf[_to] + _value;
        emit Transfer(_from, _to, _value);
        return true;
    }

    
 }
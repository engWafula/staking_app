// SPDX-License-Identifier: GPL-3.0
 pragma solidity >=0.5.0 <0.9.0;

 contract RWD {
   string public   name = "Reward Token";
   string  public   symbol = "RWD";
    uint256 public  totalSupply = 1000000000000000000000000;
    uint8 public decimals = 18;

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
    mapping(address => mapping (address => uint256)) public  allowance;


    constructor() public{
      balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to,uint _value) public  returns (bool success){
    //require that value is greater or equal to transfer
       require(balanceOf[msg.sender] >= _value);
    //transfer the tokens and subtract the value from the sender's balance   
       balanceOf[msg.sender]  = balanceOf[msg.sender] - _value;
        balanceOf[_to] = balanceOf[_to] + _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }


    function approve(address _spender, uint256 _value) public returns (bool success){
      allowance[msg.sender][_spender] = _value;
      emit Approval(msg.sender, _spender, _value);
      return true;
    }

  function transferFrom(address _from, address _to, uint _value) public returns (bool sucess){
  
    //require that the spender has enough tokens to transfer
    require( _value <= balanceOf[_from]);
    require( _value <= allowance[_from][msg.sender]);
    //transfer the tokens and subtract the value from the sender's balance   
    balanceOf[_from] = balanceOf[_from] - _value;
    balanceOf[_to] = balanceOf[_to] + _value;

    allowance[msg.sender][_from] = allowance[msg.sender][_from] - _value;
    emit Transfer(_from, _to, _value);
    return true;
  }
    
 }
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract LOTtoken{

  string public name = "Lottery Token";
  string public symbol = "LOT";
  uint256 public totalSupply;

  // Returns the account balance of another account with address
  mapping(address => uint256) public balanceOf;
  // Returns the amount which _spender is still allowed to withdraw from _owner
  mapping(address => mapping(address => uint256)) public allowance;
  
  // MUST trigger when tokens are transferred, including zero value transfers.
  event Transfer(
    address indexed _from,
    address indexed _to,
    uint256 _value
  );

  // MUST trigger on any successful call to approve(address _spender, uint256 _value)
  event Approval(
    address indexed _owner,
    address indexed _spender,
    uint256 _value
  );

  constructor() public {
    // initialize the total supply to 1 million
    totalSupply = 1000000;
    // initial supply is allocated to the first address
    // so the first address will contain all of the tokens initially
    balanceOf[msg.sender] = totalSupply;

  }
  
  // Transfers _value amount of tokens to address _to, and MUST fire the Transfer event
  function transfer(address _to, uint256 _value) public returns (bool success){
    require(balanceOf[msg.sender] >= _value);
    balanceOf[_to] += _value;
    balanceOf[msg.sender] -= _value;
    // fire the Transfer event
    emit Transfer(msg.sender, _to, _value);
    return true;
  }

  // Allows _spender to withdraw from your account multiple times, up to the _value amount. 
  // If this function is called again it overwrites the current allowance with _value
  function approve(address _spender, uint256 _value) public returns (bool success) {
    allowance[msg.sender][_spender] = _value;
    // fire the Approval event
    emit Approval(msg.sender, _spender, _value);
    return true;
  }

  // Transfers _value amount of tokens from address _from to address _to, and MUST fire the Transfer event
  function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
    require(balanceOf[_from] >= _value);
    require(allowance[_from][msg.sender] >= _value);

    balanceOf[_from] = balanceOf[_from] - _value;
    balanceOf[_to] = balanceOf[_to] + _value;

    allowance[_from][msg.sender] = allowance[_from][msg.sender] - _value;

    // fire the Transfer event
    emit Transfer(_from, _to, _value);
    return true;

  }





}

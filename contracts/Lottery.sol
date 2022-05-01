// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

contract Lottery {
    address public owner;
    address payable[] public players;
    uint public lotteryId;
    uint public randomResult;
    mapping (uint => address payable) public lotteryHistory;

    constructor() {
        owner = msg.sender;
        lotteryId = 1;
    }

    function getWinnerByLottery(uint lottery) public view returns (address payable) {
        return lotteryHistory[lottery];
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }

    function enter() public payable {
        require(msg.value > .01 ether);

        // address of player entering lottery
        players.push(payable(msg.sender));
    }

    function getRandomNumber() public returns (uint) {
        randomResult=uint(keccak256(abi.encodePacked(owner, block.timestamp)));
        return randomResult;
    }

    function pickWinner() public  payable{
        require(players.length > 0);
        uint index ;
        index= getRandomNumber() % players.length;

        lotteryHistory[lotteryId] = players[index];
        lotteryId++;
    }

    function payWinner() public payable{
        require(randomResult > 0, "Must have a source of randomness before choosing winner");
        lotteryHistory[lotteryId-1].transfer(address(this).balance);

    
        // reset the state of the contract
        players = new address payable[](0);
    }

    modifier onlyowner() {
      require(msg.sender == owner);
      _;
    }
}
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;
import "./LotToken.sol";
contract Lottery {
    address payable public admin;
    address payable[] public players;
    LotToken public tokenContract; //addr of lotTOken!!!!
    uint public lotteryId;
    mapping (uint => address payable) public lotteryHistory;

    constructor(LotToken _tokenContract) {
        tokenContract = _tokenContract;
        admin = payable(msg.sender);
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
        //require(msg.value > .01 ether);

        // address of player entering lottery
        players.push(payable(msg.sender));
    }

    function getRandomNumber() public view returns (uint) {
        return uint(keccak256(abi.encodePacked(admin, block.timestamp)));
    }

    function pickWinner() public returns (address payable){
        uint index = getRandomNumber() % players.length;
        // players[index].transfer(address(this).balance);  //remember to 2 step in frontend@
        address payable winnerAddr = players[index];

        lotteryHistory[lotteryId] = players[index];
        lotteryId++;
        
        // reset the state of the contract
        players = new address payable[](0);
        return winnerAddr;
    }

    modifier onlyowner() {
      require(msg.sender == admin);
      _;
    }
}
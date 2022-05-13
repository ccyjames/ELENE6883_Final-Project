const LotToken = artifacts.require("LotToken");
const LotTokenSale = artifacts.require("LotTokenSale")
const LotLottery = artifacts.require("LotLottery")
// artifacts: allows us to create contract abstraction 
// that truffle can use to run in a JS runtime env
module.exports = function (deployer) {
  deployer.deploy(LotToken, 100000000000000).then(function() {
    // token price 
    var tokenPrice = 1000000000000000; //10^16
    deployer.deploy(LotLottery,LotToken.address);
    return deployer.deploy(LotTokenSale, LotToken.address, tokenPrice);
  });
};

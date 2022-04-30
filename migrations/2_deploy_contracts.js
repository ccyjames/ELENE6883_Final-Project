const LotToken = artifacts.require("LotToken");
const LotTokenSale = artifacts.require("LotTokenSale")
// artifacts: allows us to create contract abstraction 
// that truffle can use to run in a JS runtime env
module.exports = function (deployer) {
  deployer.deploy(LotToken, 1000000).then(function() {
    // token price 
    var tokenPrice = 1000000000000000;
    return deployer.deploy(LotTokenSale, LotToken.address, tokenPrice);
  });
};

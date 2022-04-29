const LOTtoken = artifacts.require("LOTtoken");

module.exports = function (deployer) {
  deployer.deploy(LOTtoken);
};

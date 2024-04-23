const Messages = artifacts.require('Messages');
const Users = artifacts.require('Users');
const Keys = artifacts.require('Keys');

module.exports = function (deployer) {
  deployer.deploy(Messages);
  deployer.deploy(Users);
  deployer.deploy(Keys);
};

const LotToken = artifacts.require("LotToken");

contract('LotToken', function(accounts) {
	var tokenInstance;
	it('initializes the contract with the correct values', function() {
		return LotToken.deployed().then(function(instance){
			tokenInstance = instance;
			return tokenInstance.name();
		}).then(function(name){
			assert.equal(name, 'Lot Token', 'has the correct name');
			return tokenInstance.symbol();
		}).then(function(symbol){
			assert.equal(symbol, 'Lot', 'has the correct symbol');
			return tokenInstance.standard();
		}).then(function(standard){
			assert.equal(standard, 'Lot Token v1.0', 'has the correct standard');
		});
	});
	it('sets the total supply upon deployment', function() {
		return LotToken.deployed().then(function(instance){
			tokenInstance = instance;
			return tokenInstance.totalSupply();
		}).then(function(totalSupply){
			assert.equal(totalSupply.toNumber(), 1000000, 'sets the total supply to 1,000,000');
			// 1st account in ganache / ale wallet
			return tokenInstance.balanceOf(accounts[0]);
		}).then(function(adminBalance){
			assert.equal(adminBalance.toNumber(), 1000000, 'it allocates the initial supply to the admin');
		});
	});

	it('transfers token ownership', function(){
		return LotToken.deployed().then(function(instance) {
			tokenInstance = instance;
			// 'call' after 'transfer' does not actually trigger a transaction
			return tokenInstance.transfer.call(accounts[1], 9999999999999);
		}).then(assert.fail).catch(function(error) {
			assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
			return tokenInstance.transfer.call(accounts[1], 250000, {from: accounts[0]});
		}).then(function(success){
			assert.equal(success, true, 'it returns true');
			return tokenInstance.transfer(accounts[1], 250000, {from: accounts[0]});
		}).then(function(receipt){
			assert.equal(receipt.logs.length, 1, 'triggers one event');
			return tokenInstance.balanceOf(accounts[1]);
		}).then(function(balance) {
			assert.equal(balance.toNumber(), 250000, 'adds the amount to the receiving account');
			return tokenInstance.balanceOf(accounts[0]);
		}).then(function(balance){
			assert.equal(balance.toNumber(), 750000, 'deducts the amount from the sending account');
		});
	});

	it('approves tokens for delegated transfer', function(){
		return LotToken.deployed().then(function(instance){
			tokenInstance = instance;
			return tokenInstance.approve.call(accounts[1], 100);
		}).then(function(success){
			assert.equal(success, true, 'it returns true');
			return tokenInstance.approve(accounts[1], 100);
		}).then(function(receipt){
			assert.equal(receipt.logs.length, 1, 'triggers one event');
			return tokenInstance.allowance(accounts[0], accounts[1]);
		}).then(function(allowance){
			assert.equal(allowance.toNumber(), 100, 'stores the allowance for delegated transfer')
		});
	});

	it('handles delegated token transfers', function() {
		return LotToken.deployed().then(function(instance){
			tokenInstance = instance;
			fromAccount = accounts[2];
			toAccount = accounts[3];
			spendingAccount = accounts[4];
			// Transfer some tokens to fromAccount
			return tokenInstance.transfer(fromAccount, 100, {from: accounts[0]});
		}).then(function(receipt){
			// Approve spendingAccount to spend 10 tokens from fromAccount
			return tokenInstance.approve(spendingAccount, 10, {from:fromAccount});
		}).then(function(receipt){
			// Try transferring something alrger than the sender's balance
			return tokenInstance.transferFrom(fromAccount, toAccount, 1000, {from:spendingAccount});
		}).then(assert.fail).catch(function(error) {
			assert(error.message.indexOf('revert') >= 0, 'cannot transfer value larger than balance');
			// try transferring something larger than the approved amount
			return tokenInstance.transferFrom(fromAccount, toAccount, 20, {from: spendingAccount});
		}).then(assert.fail).catch(function(error){
			assert(error.message.indexOf('revert') >= 0, 'cannot transfer value larger than approved amount');
			return tokenInstance.transferFrom.call(fromAccount, toAccount, 10, {from: spendingAccount});
		}).then(function(success){
			assert.equal(success, true);
			return tokenInstance.transferFrom(fromAccount, toAccount, 10, {from: spendingAccount});
		}).then(function(receipt){
			assert.equal(receipt.logs.length, 1, 'triggers one event');
			return tokenInstance.balanceOf(fromAccount);
		}).then(function(balance){
			assert.equal(balance.toNumber(), 90, 'deducts the amount from the sending account');
			return tokenInstance.balanceOf(toAccount);
		}).then(function(balance){
            assert.equal(balance.toNumber(), 10, 'adds the amount from the receiving account');
            return tokenInstance.allowance(fromAccount, spendingAccount);
		}).then(function(allowance){
			assert.equal(allowance.toNumber(), 0, 'deducts the amount from the allowance');
		});
	});
})
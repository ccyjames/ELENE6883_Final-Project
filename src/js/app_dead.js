App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  loading: false,
  tokenPrice: 1000000000000000,
  tokensSold: 0,
  tokensAvailable: 750000,

  // initMetaMask: function() {

  //   async function enableUser() {
  //       const accounts = await ethereum.enable();
  //       const account = accounts[0];
  //       App.account = account;
  //   }
  //   enableUser();
  // },

  init: function() {
    console.log("App initialized...")
    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      App.web3Provider.enable();
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://18.182.45.18:8765');
      web3 = new Web3(App.web3Provider);
    }
    console.log("web3")
    console.log(web3)
    console.log("window.ethereum")
    console.log(window.ethereum)
    web3=new Web3(web3.currentProvider || 'http://18.182.45.18:8765')
    return App.initContracts();
  },

  initContracts: function() {
    $.getJSON("LotTokenSale.json", function(lotTokenSale) {
      App.contracts.LotTokenSale = TruffleContract(lotTokenSale);
      App.contracts.LotTokenSale.setProvider(App.web3Provider);
      App.contracts.LotTokenSale.deployed().then(function(lotTokenSale) {
        console.log("Lot Token Sale Address:", lotTokenSale.address);
      });
    }).done(function() {
      $.getJSON("LotToken.json", function(lotToken) {
        App.contracts.LotToken = TruffleContract(lotToken);
        App.contracts.LotToken.setProvider(App.web3Provider);
        App.contracts.LotToken.deployed().then(function(lotToken) {
          console.log("Lot Token Address:", lotToken.address);
        });

        App.listenForEvents();
        return App.render();
      });
    })
  },

  // Listen for events emitted from the contract
  listenForEvents: function() {
    App.contracts.LotTokenSale.deployed().then(function(instance) {
      instance.Sell({}, {
        fromBlock: 0,
        toBlock: 'latest',
      })
      App.render();
    })
  },

  render: function() {
    if (App.loading) {
      return;
    }
    App.loading = true;

    var loader  = $('#loader');
    var content = $('#content');

    loader.show();
    content.hide();
    console.log("eth")
    console.log(web3.eth)
    console.log("account")
    // Load account data
    web3.eth.getAccounts(function(err, account) {
      console.log("err")
      console.log(err)
      if(err !=131333) {
        //App.account = account;
        $('#accountAddress').html("Your Account: " + account);
      }
    })
    // Load token sale contract
    App.contracts.LotTokenSale.deployed().then(function(instance) {
      lotTokenSaleInstance = instance;
      return lotTokenSaleInstance.tokenPrice();
    }).then(function(tokenPrice) {
      console.log("tokenPrice", tokenPrice);
      App.tokenPrice = tokenPrice;
      debugger
      //$('.token-price').html(web3.utils.fromWei(App.tokenPrice, "ether").toNumber());
      return lotTokenSaleInstance.tokensSold();
    }).then(function(tokensSold) {
      debugger
      App.tokensSold = tokensSold.toNumber();
      $('.tokens-sold').html(App.tokensSold);
      $('.tokens-available').html(App.tokensAvailable);

      var progressPercent = (Math.ceil(App.tokensSold) / App.tokensAvailable) * 100;
      $('#progress').css('width', progressPercent + '%');

      // Load token contract
      App.contracts.LotToken.deployed().then(function(instance) {
        lotTokenInstance = instance;
        console.log("App.account", App.account);
        return lotTokenInstance.balanceOf(App.account);
      }).then(function(balance) {
        $('.lot-balance').html(balance.toNumber());
        App.loading = false;
        loader.hide();
        content.show();
      })
    });
  },

  buyTokens: function() {
    $('#content').hide();
    $('#loader').show();
    var numberOfTokens = $('#numberOfTokens').val();
    App.contracts.LotTokenSale.deployed().then(function(instance) {
      return instance.buyTokens(numberOfTokens, {
        from: App.account,
        value: numberOfTokens * App.tokenPrice,
        gas: 500000 // Gas limit
      });
    }).then(function(result) {
      console.log("Tokens bought...")
      $('form').trigger('reset') // reset number of tokens in form
      // Wait for Sell event
    });
  }
}

$(function() {
  $(window).load(function() {
    // App.initMetaMask();
    App.init();
  })
});
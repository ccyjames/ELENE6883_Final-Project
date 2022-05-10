<template>



<div class="container" :key="menuKey" style="width: 650px;">

  <div class="hello">
    <h1 v-show="isConnected">{{ account }}</h1>
    <button v-show="!isConnected" @click="connect">Connect Ale</button>
    <div style="color: #f00" v-show="isConnected">Connect Success!</div>
    <button v-show="isConnected" @click="approveMoney">approve $100</button>
  </div>

  <div class="row">
    <div class="col-lg-12">
        <h1 class="text-center">LOT TOKEN ICO SALE</h1>
        <div>
          <button @click="buyTokens2" >Connect to Wallet</button>
        </div>
        <hr/>
        <br/>
    </div>
    <div id="content" class="text-center">
      <p>
        Introducing "Lot Token"!
        Token price is <span class="token-price"></span> Ether. You currently have <span class="lot-balance"></span>&nbsp;Lot.
      </p>
      <br/>
      <form id="buy_form"  role="form">
      <!-- <form role = "form"> -->
        <div class="form-group">
          <div class="input-group">
            <input id="numberOfTokens" class="form-control input-lg" type="number" name="number" value="1" min="1" pattern="[0-9]">
            <span class="input-group-btn">
              <button type="submit" class="btn btn-primary btn-lg" >Buy Tokens</button>
            </span>
          </div>
        </div>
      </form>
      <br>
       <div class="progress">
          <div id="progress" class="progress-bar progress-bar-striped active" aria-valuemin="0" aria-valuemax="100">
          </div>
        </div>
      <p><span class="tokens-sold"></span> / <span class="tokens-available"></span> tokens sold</p>
      <hr>
      <p id="accountAddress"></p>
    </div>
  </div>
</div>



</template>

<script>
import web3 from 'web3'
import services from "@/api";
import $ from 'jquery'
export default {
  data() {
    return {
      account: "",
      isConnected: false,
      key:0,
      remain_token:0,
      tokensAvailable: 750000,
      tokenPrice: 1000000000000000,
      balance:0
    };
  },
  watch: {
    "$store.state.dapp": {
      handler(val) {
        this.account = val.account;
        this.isConnected = val.isConnected;
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    connect() {
      window["aleereum"] && window["aleereum"].connect();
      this.key++;
      this.isConnected=true;
    },
    approveMoney() {
      services.gettest().then(res => {

        console.log(res);
      });
      //services.approve(100).then((res) => {
      //  console.log(res);
      //});
    },
    buyTokens() {
      var numberOfTokens = $('#numberOfTokens').val();

      services.buy_token(numberOfTokens).then((res) => {
        console.log(res);
        $('form').trigger('reset')
      });
      location.reload();
    },

  },
  async created(){
      window["aleereum"] && window["aleereum"].connect();
      let curr_res=await services.getSold();
      services.getBalance(window["aleereum"].account).then(res=>{
        this.balance=res
        $('.lot-balance').html(this.balance.toString());
        console.log("balance   "+this.balance)
      });
      
      
      console.log("curr_res")
      console.log(curr_res)
      services.getSold().then(res => {
        this.remain_token=this.tokensAvailable-res;
        console.log("res")
        console.log(res)
        $('#accountAddress').html("Your Account: " + window["aleereum"].account);
        $('.token-price').html(web3.utils.fromWei(this.tokenPrice.toString(), "ether"));
        
        $('.tokens-sold').html(res.toString());
        $('.tokens-available').html(this.remain_token);
        var progressPercent = (Math.ceil(res) / this.tokensAvailable) * 100;
        $('#progress').css('width', progressPercent + '%');

      });


  },
  mounted(){
    $('#buy_form').submit((e)=>{
      e.preventDefault();
      this.buyTokens();
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

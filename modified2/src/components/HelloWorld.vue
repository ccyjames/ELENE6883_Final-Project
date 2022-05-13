<template>



<div class="container" :key="menuKey" style="width: 650px;">

  <div class="hello">
    <h1 v-show="isConnected">{{ account }}</h1>
    <button v-show="!isConnected" @click="connect">Connect Ale</button>
    <div style="color: #f00" v-show="isConnected">Connect Success!</div>
    <button v-show="isConnected" @click="approveMoney">Do some test(Dev only)</button>
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
        Token price is <span class="token-price"></span> CCN. You currently have <span class="lot-balance"></span>&nbsp;Lot.
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

  <div>
    <main class={{styles.main}}>
      <div class="container">
        <section class="mt-5">
          <div class="columns">
            <div class="column is-two-thirds">
              <section class="mt-5">
                <p>Enter the lottery by sending 0.01 CCN</p>
                <button @click="enterLotteryHandler" class="button is-link is-large is-light mt-3">Play now</button>
              </section>
              <section class="mt-6">
                <p><b>Admin only:</b> Pick winner & Pay winner</p>
                <button @click="pickWinnerHandler" class="button is-primary is-large is-light mt-3">Luckyy!</button>
              </section>

              <section>
                <div class="container has-text-danger mt-6">
                  <p>{{error}}</p>
                </div>
              </section>
              <section>
                <div class="container has-text-success mt-6">
                  <p>{{successMsg}}</p>
                </div>
              </section>
            </div>
            <div class='styles.lotteryinfo column is-one-third'>
              <section class="mt-5">
                <div class="card">
                  <div class="card-content">
                    <div class="content">
                      <h2>Lottery History</h2>
                      <div v-for="(item,i) in lotteryHistory" class="history-entry mt-3" :key="i">
                        <div>Lottery #{{item.id}} winner:</div>
                        <div>
                          <a href='https://etherscan.io/address/${{item.address}}' target="_blank">
                            {{item.address}}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section class="mt-5">
                <div class="card">
                  <div class="card-content">
                    <div class="content">
                      <h2>Players ({{players.length}})</h2>
                      <ul class="ml-0">
                        <li v-for="(item,idx) in players" class="" :key="idx">
                          <a href='https://etherscan.io/address/${{item}}' target="_blank">
                            {{item}}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
              <section class="mt-5">
                <div class="card">
                  <div class="card-content">
                    <div class="content">
                      <h2>Pot</h2>
                      <p>{{lotteryPot}} Ether</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
    </main>

    <footer class={{styles.footer}}>
      <p>&copy; 2022 Block Explorer</p>
    </footer>
  </div>

</div>



</template>

<script>
import web3 from 'web3'
import services from "@/api";
import $ from 'jquery'
import contract from '@/contract.js'
export default {
  data() {
    return {
      account: "",
      isConnected: false,
      key:0,
      remain_token:0,
      tokensAvailable: 750000,
      tokenPrice: 1000000000000000,
      balance:0,
      lotteryPot:0,
      lotteryPlayers:[],
      lotteryHistory:[],
      error:'',
      successMsg:'',
      players:[]
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
    async approveMoney() {
      console.log("addr!!"+this.$store.state.dapp.account)
      services.gettest(this.$store.state.dapp.account).then(res => {
        console.log(res);
      });
      //services.approve(100).then((res) => {
      //  console.log(res);
      //});
    },
    async buyTokens() {
      var numberOfTokens = $('#numberOfTokens').val();

      services.buy_token(numberOfTokens,this.$store.state.dapp.account).then((res) => {
        console.log(res);
        $('form').trigger('reset')
      });
      location.reload();

    },
    async getPot (){

      const pot=await services.getPot(contract.lotteryAddress)
      console.log("pot");
      console.log(pot);
      this.lotteryPot=(web3.utils.fromWei(pot.toString(), 'ether'))

    },

    async getPlayers() {

      const players=await services.getPlayers(this.$store.state.dapp.account)
      this.players=players;
    },

    async getHistory (id) {
      this.lotteryHistory=[]
      for (let i = parseInt(id); i > 0; i--) {

        const winnerAddress=await services.lotteryHistory(i,this.$store.state.dapp.account)
        const historyObj = {}
        historyObj.id = i
        historyObj.address = winnerAddress
        this.lotteryHistory=this.lotteryHistory.concat([historyObj])
      }
    },

    async getLotteryId (){
      const lotteryId=await services.getlotteryId(this.$store.state.dapp.account)

      this.lotteryPot=lotteryId
      await this.getHistory(lotteryId)
    },

    async enterLotteryHandler() {
      this.error=''
      this.successMsg=""
      try {
        let res=await services.enter(this.$store.state.dapp.account)
        console.log(res)
        //updateState()
      } catch(err) {
        this.error=err.message
      }
      location.reload();
    },

    async pickWinnerHandler(){
      this.error=''
      this.successMsg=""
      console.log("ress")
      console.log(this.players.length)
      let ress=await services.pickwinner(this.$store.state.dapp.account,this.players.length)

      console.log(ress)
      //updateState()
 

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
        $('.tokens-available').html(this.tokensAvailable);
        var progressPercent = (Math.ceil(res) / this.tokensAvailable) * 100;
        $('#progress').css('width', progressPercent + '%');

      });
      this.getPot();
      this.getLotteryId();
      this.getPlayers();

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

.header {
    background-color: gray;
    padding: 40px 0 40px 0;
    font-weight: bold;
    font-size: 300%;
}
.subheader {

    padding: 20px 0 20px 0;
    font-weight: bold;
    font-size: 150%;
}
.client-input {
    display: inline-block;
}

.header_item  {
    display: inline-block;
    padding: 20px;
    color: #525252;
    text-decoration-color: #525252;
}
.header_item a{
    color: #525252;
    text-decoration-color: #525252;
}
.btn {
    margin: 5px 0 0 0;
}

#form1{
  display:flex;
}
.main_header{
    color: black;
    font-weight: bold;
}
.col-md-12{
    padding: 5px 0 5px 0;
}

.subheader2{
    text-align: center;
    background-color: gray;
    padding: 15px;
}

.index_items{
    padding: 30px;
    background-color: lightgray;
}

.idx_name{
    font-size: 150%;
    font-weight: bold;
}

.view_link{
    color: #525252;
    text-decoration-color: #525252;
}
.desc{
    color: gray;
}
.site_desc{
    background: lightgray;
}

.empty{
    height: 30px;
    padding: 50px;
}
.view_title{
    color: gray;
    font-size: 110%;

}

.view_ctx{

    font-size: 120%;
    font-weight: bold;
}

.btn_view{
    background-color: lightgray;
    border-color:lightgray;
    position: absolute;
    right: 100px;
}

.wrapper{
    background: #525252;
    display: inline-block;
    padding: 0px;
    margin: 10px;
    color: white;
}
.enemy_search{
    color: black;
}
.wrapper{
    background: #525252;
    display: inline-block;
    padding: 0px;
    margin: 5px;
    color: white;
}
.found{
    font-size: 140%;
    font-weight: bold;
}
.no_result{
    font-size: 180%;
    font-weight: bold;
    padding: 50px 0;
}
.ch_img{
    height: 150px;
    width: 100px;
}
.header-pic2{
    width: 100%;
    height: 220px;
}
.deep_bkg, .found{
    background-color: lightgray;
}
.text-danger{
    background-color: yellow;
}
</style>

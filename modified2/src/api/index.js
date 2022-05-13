import contract from '../contract';

//import store from '../store'

import Big from 'bignumber.js'

export default {
    async getName() {
        return await contract.Instance.methods.name().call();
    },
    async getSymbol() {
        return await contract.Instance.methods.symbol().call();
    },
    async getSold() {
        return await contract.Instance2.methods.tokensSold().call();
    },
    async getBalance(acc) {
        return await contract.Instance.methods.balanceOf(acc).call();
    },
    async getPot(lottery_contract_addr) {
        return await this.getBalance(lottery_contract_addr);
    },
    async getPlayers(addr) {
        return await contract.Instance3.methods.getPlayers().call({from: addr});
    },
    async getlotteryId(addr) {
        return await contract.Instance3.methods.lotteryId().call({from: addr});
    },
    async lotteryHistory(i,addr) {
        return await contract.Instance3.methods.lotteryHistory(i).call({from: addr});
    },
    async enter(addr) {
        return await contract.Instance3.methods.enter()
        .sendBlock({
            from: addr,
            password: 'markmark',
            amount: new Big('1').times('1e18').toString(),
            gas_price: '1000000000',
            gas:'2000000',
        });
    },
    async pickwinner(addr,len) {
        let res1= await contract.Instance3.methods.pickWinner()
        .sendBlock({
            from: addr,
            password: 'markmark',
            amount: "0",
            gas_price: '1000000000',
            gas:'2000000',
        });
        console.log("pic winner res   "+res1)

        let lottery_id=await this.getlotteryId(addr);
        let lottery_history=await this.lotteryHistory(lottery_id-1,addr);
        len=""+len
        console.log("len!!" +len)//contract addr of lottery!!!!
        console.log(lottery_id)
        console.log(lottery_history)
        let res2=await contract.Instance.methods.transferFrom(contract.lotteryAddress,lottery_history,new Big(len).toString())
        .sendBlock({
            from: addr,
            password: 'markmark',
            amount: "0",
            gas_price: '1000000000',
            gas:'2000000',
        });
        console.log("transfer func res   "+res2)
        return res2
    },
    async gettest(addr) {


        //console.log("res1   "+res1)
        let res2=await contract.Instance.methods.transfer(contract.lotteryAddress,new Big('4').times('1e7').toString())
        .sendBlock({
            from: addr,
            password: 'markmark',
            amount: "0",
            gas_price: '1000000000',
            gas:'2000000',
        });//这个函数是将测试转钱功能---测试ok now！
        console.log("res2   "+res2)

        console.log("now michael")
        console.log(new Big('4').times('1e18').toString())
        console.log(new Big('3').times('1e18').toString())
        let res22=await contract.Instance3.methods.enter()
        .sendBlock({
            from: addr,
            password: 'markmark',
            amount: "0",
            gas_price: '1000000000',
            gas:'2000000',
        });//这个函数是将账户加入抽奖池---测试正确！
        console.log("res22  "+res22)


        var res8=await contract.Instance.methods.balanceOf(addr).call({from: addr});
        console.log("balanceof test   "+res8)

        contract.Instance3.methods.getBalance().call({from: addr}).then(data => {console.log('testCall1 data', data)})
        return res2


    },

    async buy_token(limit,addr) {
        console.log("now buying")
        var amount2=''+limit
        console.log(amount2)

        //console.log(CCNAmount.toString())
        const response = await contract.Instance2.methods.buyTokens(new Big(limit).toString())
        .sendBlock({
            from: addr,
            password: 'markmark',
            amount: amount2,
            gas_price: '1000000000',
            gas:'2000000',
        });
        let res2=await contract.Instance.methods.transferFrom(contract.accountAddress,addr,new Big(limit).toString())
        .sendBlock({
            from: addr,
            password: 'markmark',
            amount: "0",
            gas_price: '1000000000',
            gas:'2000000',
        });//这个函数是将测试转钱功能---测试ok now！
        if (response.success) {
            console.log('transaction success: ', res2);
        } else {
            console.log('transaction failed: ', response);
        }

        return response;
    }
}
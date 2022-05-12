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
    async getPot(addr) {
        return await contract.Instance3.methods.getBalance().call({from: addr});
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
            amount: new Big('0.15').times('1e18').toString(),
            gas_price: '1000000000',
            gas:'2000000',
        });
    },
    async pickwinner(addr) {
        return await contract.Instance3.methods.pickWinner().call({from: addr});
    },
    async gettest(addr) {


        //console.log("res1   "+res1)
        let res2=await contract.Instance.methods.transfer("0xE2D7E5628Edd78553766Fc4848fa73428df34532",new Big('3').times('1e18').toString())
        .sendBlock({
            from: addr,
            password: 'markmark',
            amount: new Big('3').times('1e18').toString(),
            gas_price: '1000000000',
            gas:'2000000',
        });
        console.log("res2   "+res2)
        let res22=await contract.Instance3.methods.enter()
        .sendBlock({
            from: addr,
            password: 'markmark',
            amount: new Big('0.15').times('1e18').toString(),
            gas_price: '1000000000',
            gas:'2000000',
        });
        console.log("res22  "+res22)


        var res3=await contract.Instance.methods.balanceOf("0x4667df0025cF47c9D59cA7413df0A3fF59928417").call({from: addr});
        console.log("balance res3   "+res3)
        

        var res4=await contract.Instance2.methods.getTokenSold().call({from: addr});
        console.log("res4   "+res4)

        var res7=await contract.Instance3.methods.getPlayers().call({from: addr});
        console.log("res7   "+res7)

        var res8=await contract.Instance.methods.getBalance().call({from: addr});
        console.log("pottttt   "+res8)

        contract.Instance3.methods.getBalance().call({from: addr}).then(data => {console.log('testCall1 data', data)})
        return res2


    },

    async buy_token(limit,addr) {
        console.log("now buying")
        const approveAmount = new Big(limit).times('1e18').toString();
        const CCNAmount = new Big(limit*0.001).times('1e18').toString();
        console.log(contract.Instance)
        console.log(contract.Instance2)
        console.log(approveAmount)
        const response = await contract.Instance2.methods.buyTokens(approveAmount)
        .sendBlock({
            from: addr,
            password: 'markmark',
            amount: CCNAmount,
            gas_price: '1000000000',
            gas:'2000000',
        });
        if (response.success) {
            console.log('transaction success: ', response);
        } else {
            console.log('transaction failed: ', response);
        }

        return response;
    }
}
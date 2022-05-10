import contract from '../contract';

import store from '../store'

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
    async gettest() {
        let res=await contract.Instance.methods.transferFrom("0xBB40830e311C2Fb903CCDB9E8D8f20e54C94f920","0x3c52AB7a405E90BA3B4800e75DFEBC19259639a0",100).call();
        console.log("res1   "+res)
        let res2=await contract.Instance.methods.balanceOf("0xBB40830e311C2Fb903CCDB9E8D8f20e54C94f920").call();
        console.log("res2   "+res2)
        
        var res3=await contract.Instance.methods.balanceOf("0x3c52AB7a405E90BA3B4800e75DFEBC19259639a0").call();
        
        console.log("res3   "+res3)
        return res3
    },
    async approve(limit) {
        const approveAmount = new Big(limit).times('1e18').toString();
        const response = await contract.Instance.methods.approve(contract.coreAddress, approveAmount).sendToBlock({
            from: store.state.dapp.account,
            amount: new Big('0').toString()
        });

        if (response.success) {
            console.log('transaction success: ', response);
        } else {
            console.log('transaction failed: ', response);
        }

        return response;
    },
    async buy_token(limit) {
        console.log("now buying")
        const approveAmount = new Big(limit).times('1e18').toString();
        console.log(contract.Instance)
        console.log(contract.Instance2)
        console.log(approveAmount)
        const response = await contract.Instance2.methods.buyTokens(100).sendToBlock({
            from: store.state.dapp.account,
            amount: limit* 1000000000000000
        });

        if (response.success) {
            console.log('transaction success: ', response);
        } else {
            console.log('transaction failed: ', response);
        }

        return response;
    }
}
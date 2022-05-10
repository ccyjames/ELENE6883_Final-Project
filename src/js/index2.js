

//let Mcp = require("index.min.js");
const McpFunc = new Mcp();

McpFunc.Contract.setProvider("http://18.182.45.18:8765");

const tokenAddress = "0xBB40830e311C2Fb903CCDB9E8D8f20e54C94f920";
const coreAddress = "0xBB40830e311C2Fb903CCDB9E8D8f20e54C94f920";

const Instance = new McpFunc.Contract(
    abi,
    tokenAddress
);

const Contract = {
    tokenAddress,
    Instance,
    coreAddress
};



async function getName() {
    return await contract.Instance.methods.name().call();
}
async function getSymbol() {
    return await contract.Instance.methods.symbol().call();
}
async function approve(limit) {
    const approveAmount = new BigNumber(limit).times('1e18').toString();
    const response = await contract.Instance.methods.approve(contract.coreAddress, approveAmount).sendToBlock({
        from: store.state.dapp.account,
        amount: new BigNumber('0').toString()
    });

    if (response.success) {
        console.log('transaction success: ', response);
    } else {
        console.log('transaction failed: ', response);
    }

    return response;
}


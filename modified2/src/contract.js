import Mcp from "./mcp";

const abi = require("./token_abi.json");
const sale_abi = require("./sale_abi.json");
const lottery_abi = require("./lottery.json");
const McpFunc = new Mcp();

McpFunc.Contract.setProvider("http://18.182.45.18:8765");


const tokenAddress_lot = "0xE9a535Dc9861111cf73059d43B1c555bF57D171C";//token


const tokenAddress = "0x9955b24eDc65cBfF61D672899c9D1a46F4574Db1"; //sale
const coreAddress = "0x9955b24eDc65cBfF61D672899c9D1a46F4574Db1";
const lotteryAddress = "0xb6C7194b21295a0D12D5F5080391E0ddB2Ff6B7C";//lottery



const Instance = new McpFunc.Contract(
    abi,
    tokenAddress_lot
);

const Instance2 = new McpFunc.Contract(
    sale_abi,
    tokenAddress
);
const Instance3 = new McpFunc.Contract(
    lottery_abi,
    lotteryAddress
);

const Contract = {
    tokenAddress,
    Instance,
    Instance2,
    Instance3,
    coreAddress
};

export default Contract;

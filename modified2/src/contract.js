import Mcp from "./mcp";

const abi = require("./token_abi.json");
const sale_abi = require("./sale_abi.json");
const lottery_abi = require("./lottery.json");
const McpFunc = new Mcp();

McpFunc.Contract.setProvider("http://18.182.45.18:8765");


const tokenAddress_lot = "0xdbb6dF2774fE456B76b41E4eccE161C044616C35";


const tokenAddress = "0xfE8737A0DFCB21aD9cDD53770118edaE92781c97";
const coreAddress = "0xfE8737A0DFCB21aD9cDD53770118edaE92781c97";
const lotteryAddress = "0xB7ff2B82C4842c425f89A8DBaA5c69E7b3E9691e";



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

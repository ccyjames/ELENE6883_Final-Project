import Mcp from "./mcp";

const abi = require("./token_abi.json");
const sale_abi = require("./sale_abi.json");
const lottery_abi = require("./lottery.json");
const McpFunc = new Mcp();

McpFunc.Contract.setProvider("http://18.182.45.18:8765");


const tokenAddress_lot = "0xc7b46515bB1e30e08FC1f945843a900f8837e27b";


const tokenAddress = "0x433a4c6f28947259748097eBF5c73959f13f34c8";
const coreAddress = "0xc7b46515bB1e30e08FC1f945843a900f8837e27b";
const lotteryAddress = "0x433a4c6f28947259748097eBF5c73959f13f34c8";



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

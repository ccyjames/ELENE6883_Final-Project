import Mcp from "./mcp";

const abi = require("./token_abi.json");
const sale_abi = require("./sale_abi.json");
const lottery_abi = require("./lottery.json");
const McpFunc = new Mcp();

McpFunc.Contract.setProvider("http://18.182.45.18:8765");


const tokenAddress_lot = "0x9a55e828E055f98a106d1Bf5B23C358962918584";


const tokenAddress = "0xcFCdf2553C99494F54EC99FFd1361E07540DA8dA";
const coreAddress = "0xcFCdf2553C99494F54EC99FFd1361E07540DA8dA";
const lotteryAddress = "0x622570EB6E7457E0DC976b7e42053755f8a0b2E5";



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

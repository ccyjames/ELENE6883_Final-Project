import Mcp from "./mcp";

const abi = require("./token_abi.json");
const sale_abi = require("./sale_abi.json");
const lottery_abi = require("./lottery.json");
const McpFunc = new Mcp();

McpFunc.Contract.setProvider("http://18.182.45.18:8765");


//<<<<<<< HEAD
const tokenAddress_lot = "0x456625463Fda135c7f920457df1A5187dc57852A";//token

const accountAddress = "0xec13607F3827115fFe4d352f6f9dccb94a92180C"; //account
const tokenAddress = "0xec13607F3827115fFe4d352f6f9dccb94a92180C"; //sale
const coreAddress = "0xec13607F3827115fFe4d352f6f9dccb94a92180C";
const lotteryAddress = "0x393eC7461B1DDa4C513733dFD7b1a84C486CAaC8";//lottery


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
    Instance,
    Instance2,
    Instance3,
    coreAddress,
    accountAddress,
    tokenAddress_lot,
    tokenAddress,
    lotteryAddress
};

export default Contract;

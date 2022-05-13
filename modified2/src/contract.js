import Mcp from "./mcp";

const abi = require("./token_abi.json");
const sale_abi = require("./sale_abi.json");
const lottery_abi = require("./lottery.json");
const McpFunc = new Mcp();

McpFunc.Contract.setProvider("http://18.182.45.18:8765");


//<<<<<<< HEAD
//const tokenAddress_lot = "0xE9a535Dc9861111cf73059d43B1c555bF57D171C";//token


//const tokenAddress = "0x9955b24eDc65cBfF61D672899c9D1a46F4574Db1"; //sale
//const coreAddress = "0x9955b24eDc65cBfF61D672899c9D1a46F4574Db1";
//const lotteryAddress = "0xb6C7194b21295a0D12D5F5080391E0ddB2Ff6B7C";//lottery
//=======
const tokenAddress_lot = "0xc7b46515bB1e30e08FC1f945843a900f8837e27b";


const tokenAddress = "0x433a4c6f28947259748097eBF5c73959f13f34c8";
const coreAddress = "0xc7b46515bB1e30e08FC1f945843a900f8837e27b";
const lotteryAddress = "0x433a4c6f28947259748097eBF5c73959f13f34c8";
//>>>>>>> e570036854a3349f067318c98b6624a488127557



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

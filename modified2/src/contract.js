import Mcp from "./mcp";

const abi = require("./abi.json");
const sale_abi = require("./sale_abi.json");
const McpFunc = new Mcp();

McpFunc.Contract.setProvider("http://18.182.45.18:8765");


const tokenAddress_lot = "0xF304f82B4179C4577c4FC03D81C8B70B709E02C3";


const tokenAddress = "0xc8Df6db9eb7432375eE6141512502582Eea20dE2";
const coreAddress = "0xc8Df6db9eb7432375eE6141512502582Eea20dE2";



const Instance = new McpFunc.Contract(
    abi,
    tokenAddress_lot
);

const Instance2 = new McpFunc.Contract(
    sale_abi,
    tokenAddress
);


const Contract = {
    tokenAddress,
    Instance,
    Instance2,
    coreAddress
};

export default Contract;

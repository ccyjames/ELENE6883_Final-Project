import Mcp from "./mcp";

const abi = require("./abi.json");

const McpFunc = new Mcp();

McpFunc.Contract.setProvider("http://18.182.45.18:8765");

const tokenAddress = "0x3c52AB7a405E90BA3B4800e75DFEBC19259639a0";
const coreAddress = "0x3c52AB7a405E90BA3B4800e75DFEBC19259639a0";

const Instance = new McpFunc.Contract(
    abi,
    tokenAddress
);

const Contract = {
    tokenAddress,
    Instance,
    coreAddress
};

export default Contract;
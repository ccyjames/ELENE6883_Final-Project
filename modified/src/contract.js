import Mcp from "./mcp";

const abi = require("./abi.json");
const sale_abi = require("./sale_abi.json");
const McpFunc = new Mcp();

McpFunc.Contract.setProvider("http://18.182.45.18:8765");

const tokenAddress = "0x5B983bdDD71847BfaB2e64d5F38AE2C256B662C5";
const coreAddress = "0x5B983bdDD71847BfaB2e64d5F38AE2C256B662C5";

const Instance = new McpFunc.Contract(
    abi,
    tokenAddress
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

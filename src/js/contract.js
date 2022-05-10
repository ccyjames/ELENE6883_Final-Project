
//const Mcp = require("./mcp.js");
//const abi = require("./abi.json");

let Mcp = require("mcp.js");
//import abi from './abi.json';


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

export default Contract;
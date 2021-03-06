const version = "0.1.2";
const utils = require('./utils');
const abi = require('./abi');

const Contract = require("./contract");
const HttpRequest = require("./httprequest");
const Accounts = require("./accounts");

class Mcp {
    /**
     * Init MCP
     * @param {object} request Node configuration
     * @param {boolean} request.dev Environment configuration
     * @param {string} request.host Host address
     * @param {string} request.port Host port
     */
    constructor(request) {
        if (request) {
            this.dev = (request.dev === true) ? true : false;
            this.host = request.host ? request.host : '127.0.0.1';
            this.port = request.port ? request.port : '8765';
        } else {
            this.dev = false;
        }
        // RPC server
        this.request = new HttpRequest({
            host: this.host,
            port: this.port
        });
        this.accounts = new Accounts(this.dev);
        this.version = version;
        this.utils = utils;
        this.abi = abi;
        this.Contract = Contract;
    }
}

// console.log(new Mcp());

module.exports = Mcp;


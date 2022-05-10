"use strict";Object.defineProperty(exports,"__esModule",{value:true});var address_1=require("./address");function isCrowdsaleWallet(e){try{var r=JSON.parse(e)}catch(e){return false}return r.encseed&&r.ethaddr}exports.isCrowdsaleWallet=isCrowdsaleWallet;function isSecretStorageWallet(e){try{var r=JSON.parse(e)}catch(e){return false}if(!r.version||parseInt(r.version)!==r.version||parseInt(r.version)!==3){return false}return true}exports.isSecretStorageWallet=isSecretStorageWallet;function getJsonWalletAddress(e){if(isCrowdsaleWallet(e)){try{return address_1.getAddress(JSON.parse(e).ethaddr)}catch(e){return null}}if(isSecretStorageWallet(e)){try{return address_1.getAddress(JSON.parse(e).address)}catch(e){return null}}return null}exports.getJsonWalletAddress=getJsonWalletAddress;
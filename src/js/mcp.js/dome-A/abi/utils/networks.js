"use strict";var __importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var r={};if(e!=null)for(var n in e)if(Object.hasOwnProperty.call(e,n))r[n]=e[n];r["default"]=e;return r};Object.defineProperty(exports,"__esModule",{value:true});var errors=__importStar(require("../utils/errors"));var homestead={chainId:1,ensAddress:"0x314159265dd8dbb310642f98f50c066173c1259b",name:"homestead"};var ropsten={chainId:3,ensAddress:"0x112234455c3a32fd11230c42e7bccd4a84e02010",name:"ropsten"};var networks={unspecified:{chainId:0},homestead:homestead,mainnet:homestead,morden:{chainId:2},ropsten:ropsten,testnet:ropsten,rinkeby:{chainId:4,ensAddress:"0xe7410170f87102DF0055eB195163A03B7F2Bff4A"},kovan:{chainId:42},classic:{chainId:61}};function getNetwork(e){if(!e){return null}if(typeof e==="number"){for(var r in networks){var n=networks[r];if(n.chainId===e){return{name:r,chainId:n.chainId,ensAddress:n.ensAddress}}}return{chainId:e,name:"unknown"}}if(typeof e==="string"){var t=networks[e];if(t==null){return null}return{name:e,chainId:t.chainId,ensAddress:t.ensAddress}}var s=networks[e.name];if(!s){if(typeof s.chainId!=="number"){errors.throwError("invalid network chainId",errors.INVALID_ARGUMENT,{arg:"network",value:e})}return e}if(e.chainId!==0&&e.chainId!==s.chainId){errors.throwError("network chainId mismatch",errors.INVALID_ARGUMENT,{arg:"network",value:e})}return{name:e.name,chainId:s.chainId,ensAddress:s.ensAddress}}exports.getNetwork=getNetwork;
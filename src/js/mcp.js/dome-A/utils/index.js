const BigNumber=require("bignumber.js").default;const bs58check=require("bs58check");const Hash=require("./lib/hash");const decode=require("./helper/decode");const encode=require("./helper/encode");const sodium=require("chloride");const unitMap={none:"0",None:"0",can:"1",Can:"1",mcp:"1000000000000000000",MCP:"1000000000000000000"};const encodeAccount=function(e){if(e==="0000000000000000000000000000000000000000000000000000000000000000"){return"mcp_zero_address"}e=Buffer.from(e,"hex");const n=Buffer.from([1]);const t=Buffer.concat([n,e]);return"mcp"+bs58check.encode(t)};const decodeAccount=function(e){if(e==="mcp_zero_address"){return"0000000000000000000000000000000000000000000000000000000000000000"}if(e.toString().indexOf("mcp")!==0){throw Error(`MCP account (${e}) format error.`)}const n=bs58check.decode(e.substr(3));return n.toString("hex").substring(2).toUpperCase()};const isString=function(e){return typeof e==="string"&&e.constructor===String};const isBigNumber=function(e){return e&&e.constructor&&e.constructor.name==="BigNumber"};const toBigNumber=function(e){e=e||0;if(isBigNumber(e)){return e}if(isString(e)&&(e.indexOf("0x")===0||e.indexOf("-0x")===0)){return new BigNumber(e.replace("0x",""),16)}return new BigNumber(e.toString(10),10)};const getValueOfUnit=function(e){e=e?e.toLowerCase():"mcp";const n=unitMap[e];if(n===undefined){throw new Error("This unit doesn't exists, please use the one of the following units"+JSON.stringify(unitMap,null,2))}return new BigNumber(n,10)};const fromCan=function(e,n){const t=toBigNumber(e).dividedBy(getValueOfUnit(n));return isBigNumber(e)?t:t.toString(10)};const fromCanToken=function(e,n){const t=toBigNumber(e).dividedBy(n);return isBigNumber(e)?t:t.toString(10)};const toCan=function(e,n){const t=toBigNumber(e).times(getValueOfUnit(n));return isBigNumber(e)?t:t.toString(10)};const toCanToken=function(e,n){const t=toBigNumber(e).times(n);return isBigNumber(e)?t:t.toString(10)};const isAccount=function(e){if(!e){return false}return true};const judge=function(e){const n=/\[object (\w+)\]/.exec(Object.prototype.toString.call(e));return n?n[1].toLowerCase():""};const _fireError=function(e,n,t,o){if(judge(e)==="object"&&!(e instanceof Error)&&e.data){if(judge(e.data)==="object"||judge(e.data)==="array"){e.data=JSON.stringify(e.data,null,2)}e=e.message+"\n"+e.data}if(judge(e)==="string"){e=new Error(e)}if(judge(o)==="function"){o(e)}if(judge(t)==="function"){if(n&&judge(n.listeners)==="function"&&n.listeners("error").length||judge(o)==="function"){n.catch(function(){})}setTimeout(function(){t(e)},1)}if(n&&judge(n.emit)==="function"){setTimeout(function(){n.emit("error",e);n.removeAllListeners()},1)}return n};const _jsonInterfaceMethodToString=function(e){if(judge(e)==="object"&&e.name&&e.name.indexOf("(")!==-1){return e.name}return e.name+"("+_flattenTypes(false,e.inputs).join(",")+")"};const _flattenTypes=function(r,e){const i=[];e.forEach(function(n){if(judge(n.components)==="object"){if(n.type.substring(0,5)!=="tuple"){throw new Error("components found but type is not tuple; report on GitHub")}let e="";const t=n.type.indexOf("[");if(t>=0){e=n.type.substring(t)}const o=_flattenTypes(r,n.components);if(judge(n.data)==="array"&&r){i.push("tuple("+o.join(",")+")"+e)}else if(!r){i.push("("+o.join(",")+")"+e)}else{i.push("("+o+")")}}else{i.push(n.type)}});return i};const SHA3_NULL_S="0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470";const sha3=function(e){if(isBigNumber(e)){e=e.toString()}if(isHexStrict(e)&&/^0x/i.test(e.toString())){e=hexToBytes(e)}const n=Hash.keccak256(e);if(n===SHA3_NULL_S){return null}else{return n}};sha3._Hash=Hash;const isHexStrict=function(e){return(judge(e)==="string"||judge(e)==="number")&&/^(-)?0x[0-9a-f]*$/i.test(e)};const hexToBytes=function(n){n=n.toString(16);if(!isHexStrict(n)){throw new Error('Given value "'+n+'" is not a valid hex string.')}n=n.replace(/^0x/i,"");const t=[];for(let e=0;e<n.length;e+=2)t.push(parseInt(n.substr(e,2),16));return t};const sign=function(r,i){return new Promise(function(e,n){i=Buffer.from(i,"hex");const t=sodium.crypto_sign_seed_keypair(i);r=(new TextEncoder).encode(r);const o=sodium.crypto_sign_detached(r,t.secretKey);e(o.toString("hex").toUpperCase())})};module.exports={isAccount:isAccount,_fireError:_fireError,_jsonInterfaceMethodToString:_jsonInterfaceMethodToString,toBigNumber:toBigNumber,isBigNumber:isBigNumber,encode:encode,decode:decode,encodeAccount:encodeAccount,decodeAccount:decodeAccount,fromCan:fromCan,fromCanToken:fromCanToken,toCan:toCan,toCanToken:toCanToken,judge:judge,sha3:sha3,sign:sign};
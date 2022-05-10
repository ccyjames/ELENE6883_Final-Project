var BN=require("bn.js");var defineProperty=require("./properties").defineProperty;var convert=require("./convert");var throwError=require("./throw-error");function BigNumber(e){if(!(this instanceof BigNumber)){throw new Error("missing new")}if(convert.isHexString(e)){if(e=="0x"){e="0x0"}e=new BN(e.substring(2),16)}else if(typeof e==="string"&&e[0]==="-"&&convert.isHexString(e.substring(1))){e=new BN(e.substring(3),16).mul(BigNumber.constantNegativeOne._bn)}else if(typeof e==="string"&&e.match(/^-?[0-9]*$/)){if(e==""){e="0"}e=new BN(e)}else if(typeof e==="number"&&parseInt(e)==e){e=new BN(e)}else if(BN.isBN(e)){}else if(isBigNumber(e)){e=e._bn}else if(convert.isArrayish(e)){e=new BN(convert.hexlify(e).substring(2),16)}else{throwError("Invalid BigNumber value",{input:e})}defineProperty(this,"_bn",e)}defineProperty(BigNumber,"constantNegativeOne",bigNumberify(-1));defineProperty(BigNumber,"constantZero",bigNumberify(0));defineProperty(BigNumber,"constantOne",bigNumberify(1));defineProperty(BigNumber,"constantTwo",bigNumberify(2));defineProperty(BigNumber,"constantWeiPerEther",bigNumberify(new BN("1000000000000000000")));defineProperty(BigNumber.prototype,"fromTwos",function(e){return new BigNumber(this._bn.fromTwos(e))});defineProperty(BigNumber.prototype,"toTwos",function(e){return new BigNumber(this._bn.toTwos(e))});defineProperty(BigNumber.prototype,"add",function(e){return new BigNumber(this._bn.add(bigNumberify(e)._bn))});defineProperty(BigNumber.prototype,"sub",function(e){return new BigNumber(this._bn.sub(bigNumberify(e)._bn))});defineProperty(BigNumber.prototype,"div",function(e){return new BigNumber(this._bn.div(bigNumberify(e)._bn))});defineProperty(BigNumber.prototype,"mul",function(e){return new BigNumber(this._bn.mul(bigNumberify(e)._bn))});defineProperty(BigNumber.prototype,"mod",function(e){return new BigNumber(this._bn.mod(bigNumberify(e)._bn))});defineProperty(BigNumber.prototype,"pow",function(e){return new BigNumber(this._bn.pow(bigNumberify(e)._bn))});defineProperty(BigNumber.prototype,"maskn",function(e){return new BigNumber(this._bn.maskn(e))});defineProperty(BigNumber.prototype,"eq",function(e){return this._bn.eq(bigNumberify(e)._bn)});defineProperty(BigNumber.prototype,"lt",function(e){return this._bn.lt(bigNumberify(e)._bn)});defineProperty(BigNumber.prototype,"lte",function(e){return this._bn.lte(bigNumberify(e)._bn)});defineProperty(BigNumber.prototype,"gt",function(e){return this._bn.gt(bigNumberify(e)._bn)});defineProperty(BigNumber.prototype,"gte",function(e){return this._bn.gte(bigNumberify(e)._bn)});defineProperty(BigNumber.prototype,"isZero",function(){return this._bn.isZero()});defineProperty(BigNumber.prototype,"toNumber",function(e){return this._bn.toNumber()});defineProperty(BigNumber.prototype,"toString",function(){return this._bn.toString(10)});defineProperty(BigNumber.prototype,"toHexString",function(){var e=this._bn.toString(16);if(e.length%2){e="0"+e}return"0x"+e});function isBigNumber(e){return e._bn&&e._bn.mod}function bigNumberify(e){if(isBigNumber(e)){return e}return new BigNumber(e)}module.exports={isBigNumber:isBigNumber,bigNumberify:bigNumberify,BigNumber:BigNumber};
"use strict";var __importStar=this&&this.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var t in r)if(Object.hasOwnProperty.call(r,t))e[t]=r[t];e["default"]=r;return e};Object.defineProperty(exports,"__esModule",{value:true});var bignumber_1=require("./bignumber");var errors=__importStar(require("./errors"));var names=["wei","kwei","Mwei","Gwei","szabo","finny","ether"];var unitInfos={};function _getUnitInfo(r){return{decimals:r.length-1,tenPower:bignumber_1.bigNumberify(r)}}(function(){var t="1";names.forEach(function(r){var e=_getUnitInfo(t);unitInfos[r.toLowerCase()]=e;unitInfos[String(e.decimals)]=e;t+="000"})})();function getUnitInfo(r){var e=unitInfos[String(r).toLowerCase()];if(!e&&typeof r==="number"&&parseInt(String(r))==r&&r>=0&&r<=256){var t="1";for(var i=0;i<r;i++){t+="0"}e=_getUnitInfo(t)}if(!e){errors.throwError("invalid unitType",errors.INVALID_ARGUMENT,{arg:"name",value:r})}return e}function formatUnits(r,e,t){if(!t){t={}}var i=getUnitInfo(e);r=bignumber_1.bigNumberify(r);var n=r.lt(bignumber_1.ConstantZero);if(n){r=r.mul(bignumber_1.ConstantNegativeOne)}var o=r.mod(i.tenPower).toString();while(o.length<i.decimals){o="0"+o}if(!t.pad){o=o.match(/^([0-9]*[1-9]|0)(0*)/)[1]}var a=r.div(i.tenPower).toString();if(t.commify){a=a.replace(/\B(?=(\d{3})+(?!\d))/g,",")}r=a+"."+o;if(n){r="-"+r}return r}exports.formatUnits=formatUnits;function parseUnits(r,e){if(e==null){e=18}var t=getUnitInfo(e);if(typeof r!=="string"||!r.match(/^-?[0-9.,]+$/)){errors.throwError("invalid decimal value",errors.INVALID_ARGUMENT,{arg:"value",value:r})}r=r.replace(/,/g,"");if(t.decimals===0){return bignumber_1.bigNumberify(r)}var i=r.substring(0,1)==="-";if(i){r=r.substring(1)}if(r==="."){errors.throwError("missing value",errors.INVALID_ARGUMENT,{arg:"value",value:r})}var n=r.split(".");if(n.length>2){errors.throwError("too many decimal points",errors.INVALID_ARGUMENT,{arg:"value",value:r})}var o=n[0],a=n[1];if(!o){o="0"}if(!a){a="0"}if(a.length>t.decimals){errors.throwError("underflow occurred",errors.NUMERIC_FAULT,{operation:"division",fault:"underflow"})}while(a.length<t.decimals){a+="0"}var s=bignumber_1.bigNumberify(o);var u=bignumber_1.bigNumberify(a);var f=s.mul(t.tenPower).add(u);if(i){f=f.mul(bignumber_1.ConstantNegativeOne)}return f}exports.parseUnits=parseUnits;function formatEther(r,e){return formatUnits(r,18,e)}exports.formatEther=formatEther;function parseEther(r){return parseUnits(r,18)}exports.parseEther=parseEther;
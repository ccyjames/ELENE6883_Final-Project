"use strict";Object.defineProperty(exports,"__esModule",{value:true});var bytes_1=require("./bytes");function decode(e){return bytes_1.arrayify(new Uint8Array(new Buffer(e,"base64")))}exports.decode=decode;function encode(e){return new Buffer(bytes_1.arrayify(e)).toString("base64")}exports.encode=encode;
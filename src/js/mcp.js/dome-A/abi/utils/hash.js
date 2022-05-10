"use strict";Object.defineProperty(exports,"__esModule",{value:true});var bytes_1=require("./bytes");var utf8_1=require("./utf8");var keccak256_1=require("./keccak256");var Zeros=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);var Partition=new RegExp("^((.*)\\.)?([^.]+)$");var UseSTD3ASCIIRules=new RegExp("^[a-z0-9.-]*$");function namehash(e){e=e.toLowerCase();if(!e.match(UseSTD3ASCIIRules)){throw new Error("contains invalid UseSTD3ASCIIRules characters")}var t=Zeros;while(e.length){var a=e.match(Partition);var r=utf8_1.toUtf8Bytes(a[3]);t=keccak256_1.keccak256(bytes_1.concat([t,keccak256_1.keccak256(r)]));e=a[2]||""}return bytes_1.hexlify(t)}exports.namehash=namehash;function id(e){return keccak256_1.keccak256(utf8_1.toUtf8Bytes(e))}exports.id=id;function hashMessage(e){var t=bytes_1.concat([utf8_1.toUtf8Bytes("Ethereum Signed Message:\n"),utf8_1.toUtf8Bytes(String(e.length)),typeof e==="string"?utf8_1.toUtf8Bytes(e):e]);return keccak256_1.keccak256(t)}exports.hashMessage=hashMessage;
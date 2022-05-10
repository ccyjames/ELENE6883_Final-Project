var http=require("http");var https=require("https");var Client=function(s){var n,e;var t=this;s=s||{};var h={host:s.host||"127.0.0.1",path:s.path||"/",hash:s.hash||null,login:s.login||null};if(s.ssl){h.ssl={sniName:s.ssl.sniName||"RPC-Server",protocol:s.ssl.protocol||"SSLv3_client_method"};if(s.ssl.pfx){h.ssl.pfx=s.ssl.pfx;h.ssl.strict=s.ssl.strict||true}else{if(s.ssl.ca){h.ssl.ca=s.ssl.ca;h.ssl.strict=s.ssl.strict||true}if(s.ssl.key&&s.ssl.cert){h.ssl.key=s.ssl.key;h.ssl.cert=s.ssl.certs}}if(s.ssl.passphrase){h.ssl.passphrase=s.ssl.passphrase}}if(h.ssl){n=https;e=new https.Agent;h.port=s.port||5433}else{n=http;e=new http.Agent;h.port=s.port||8765}var i=function(s){var t={agent:e,method:s.method,host:h.host,port:h.port,path:s.path,headers:{host:h.host+":"+h.port,"content-type":"application/json","content-length":s.length}};if(s.login&&s.hash)t.auth=s.login+":"+s.hash;if(h.ssl){t.servername=h.ssl.sniName||"RPC-Server";t.secureProtocol=h.ssl.protocol||"SSLv3_client_method";if(h.ssl.pfx){t.pfx=h.ssl.pfx;t.rejectUnauthorized=h.ssl.strict||true}else{if(h.ssl.key&&h.ssl.cert){t.key=h.ssl.key;t.cert=h.ssl.cert}if(h.ssl.ca){t.ca=h.ssl.ca;t.rejectUnauthorized=h.ssl.strict||true}}if(h.ssl.passphrase)t.passphrase=h.ssl.passphrase}return t};this.call=function(s,l,t){t=t||{};var e=JSON.stringify(s);const r=Buffer.from(e,"utf8");var o=i({length:r.length,method:t.method||"POST",path:t.path||h.path,login:t.login||h.login,hash:t.hash||h.hash});var a=n.request(o);a.on("error",function(s){l(s);return});a.on("response",function(e){var r="";e.on("data",function(s){r+=s});e.on("end",function(){var t,s;if(e.statusCode===200||e.statusCode===304){if(r.length>0){try{s=JSON.parse(r)}catch(s){t=s;console.error("Client error: failed to parse response from server.")}}}else console.log("Client: TODO Status Code: "+e.statusCode);l(t,s)})});a.end(e)};s=null};module.exports=Client;
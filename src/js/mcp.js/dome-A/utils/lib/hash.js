const HEX_CHARS="0123456789abcdef".split("");const KECCAK_PADDING=[1,256,65536,16777216];const SHIFT=[0,8,16,24];const RC=[1,0,32898,0,32906,2147483648,2147516416,2147483648,32907,0,2147483649,0,2147516545,2147483648,32777,2147483648,138,0,136,0,2147516425,0,2147483658,0,2147516555,0,139,2147483648,32905,2147483648,32771,2147483648,32770,2147483648,128,2147483648,32778,0,2147483658,2147483648,2147516545,2147483648,32896,2147483648,2147483649,0,2147516424,2147483648];function Keccak(e){return{blocks:[],reset:true,block:0,start:0,blockCount:1600-(e<<1)>>5,outputBlocks:e>>5,s:function(e){return[].concat(e,e,e,e,e)}([0,0,0,0,0,0,0,0,0,0])}}function update(e,t){const a=t.length,c=e.blocks,o=e.blockCount<<2,s=e.blockCount,u=e.outputBlocks,r=e.s;let l=0,n,k;while(l<a){if(e.reset){e.reset=false;c[0]=e.block;for(n=1;n<s+1;++n){c[n]=0}}if(typeof t!=="string"){for(n=e.start;l<a&&n<o;++l){c[n>>2]|=t[l]<<SHIFT[n++&3]}}else{for(n=e.start;l<a&&n<o;++l){k=t.charCodeAt(l);if(k<128){c[n>>2]|=k<<SHIFT[n++&3]}else if(k<2048){c[n>>2]|=(192|k>>6)<<SHIFT[n++&3];c[n>>2]|=(128|k&63)<<SHIFT[n++&3]}else if(k<55296||k>=57344){c[n>>2]|=(224|k>>12)<<SHIFT[n++&3];c[n>>2]|=(128|k>>6&63)<<SHIFT[n++&3];c[n>>2]|=(128|k&63)<<SHIFT[n++&3]}else{k=65536+((k&1023)<<10|t.charCodeAt(++l)&1023);c[n>>2]|=(240|k>>18)<<SHIFT[n++&3];c[n>>2]|=(128|k>>12&63)<<SHIFT[n++&3];c[n>>2]|=(128|k>>6&63)<<SHIFT[n++&3];c[n>>2]|=(128|k&63)<<SHIFT[n++&3]}}}e.lastByteIndex=n;if(n>=o){e.start=n-o;e.block=c[s];for(n=0;n<s;++n){r[n]^=c[n]}f(r);e.reset=true}else{e.start=n}}n=e.lastByteIndex;c[n>>2]|=KECCAK_PADDING[n&3];if(e.lastByteIndex===o){c[0]=c[s];for(n=1;n<s+1;++n){c[n]=0}}c[s-1]|=2147483648;for(n=0;n<s;++n){r[n]^=c[n]}f(r);n=0;let i="",C=0,H;while(C<u){for(n=0;n<s&&C<u;++n,++C){H=r[n];i+=HEX_CHARS[H>>4&15]+HEX_CHARS[H&15]+HEX_CHARS[H>>12&15]+HEX_CHARS[H>>8&15]+HEX_CHARS[H>>20&15]+HEX_CHARS[H>>16&15]+HEX_CHARS[H>>28&15]+HEX_CHARS[H>>24&15]}if(C%s===0){f(r);n=0}}return"0x"+i}function f(e){let t,c,o,s,r,l,n,f,k,H,a,u,i,C,S,I,A,F,R,T,E,_,b,d,p,X,h,x,K,B,y,D,g,w,G,N,P,m,j,q,v,z,J,L,M,O,Q,U,V,W,Y,Z,$,e1,t1,c1,o1,s1,r1,l1,n1,f1,k1;for(o=0;o<48;o+=2){s=e[0]^e[10]^e[20]^e[30]^e[40];r=e[1]^e[11]^e[21]^e[31]^e[41];l=e[2]^e[12]^e[22]^e[32]^e[42];n=e[3]^e[13]^e[23]^e[33]^e[43];f=e[4]^e[14]^e[24]^e[34]^e[44];k=e[5]^e[15]^e[25]^e[35]^e[45];H=e[6]^e[16]^e[26]^e[36]^e[46];a=e[7]^e[17]^e[27]^e[37]^e[47];u=e[8]^e[18]^e[28]^e[38]^e[48];i=e[9]^e[19]^e[29]^e[39]^e[49];t=u^(l<<1|n>>>31);c=i^(n<<1|l>>>31);e[0]^=t;e[1]^=c;e[10]^=t;e[11]^=c;e[20]^=t;e[21]^=c;e[30]^=t;e[31]^=c;e[40]^=t;e[41]^=c;t=s^(f<<1|k>>>31);c=r^(k<<1|f>>>31);e[2]^=t;e[3]^=c;e[12]^=t;e[13]^=c;e[22]^=t;e[23]^=c;e[32]^=t;e[33]^=c;e[42]^=t;e[43]^=c;t=l^(H<<1|a>>>31);c=n^(a<<1|H>>>31);e[4]^=t;e[5]^=c;e[14]^=t;e[15]^=c;e[24]^=t;e[25]^=c;e[34]^=t;e[35]^=c;e[44]^=t;e[45]^=c;t=f^(u<<1|i>>>31);c=k^(i<<1|u>>>31);e[6]^=t;e[7]^=c;e[16]^=t;e[17]^=c;e[26]^=t;e[27]^=c;e[36]^=t;e[37]^=c;e[46]^=t;e[47]^=c;t=H^(s<<1|r>>>31);c=a^(r<<1|s>>>31);e[8]^=t;e[9]^=c;e[18]^=t;e[19]^=c;e[28]^=t;e[29]^=c;e[38]^=t;e[39]^=c;e[48]^=t;e[49]^=c;C=e[0];S=e[1];O=e[11]<<4|e[10]>>>28;Q=e[10]<<4|e[11]>>>28;x=e[20]<<3|e[21]>>>29;K=e[21]<<3|e[20]>>>29;l1=e[31]<<9|e[30]>>>23;n1=e[30]<<9|e[31]>>>23;z=e[40]<<18|e[41]>>>14;J=e[41]<<18|e[40]>>>14;w=e[2]<<1|e[3]>>>31;G=e[3]<<1|e[2]>>>31;I=e[13]<<12|e[12]>>>20;A=e[12]<<12|e[13]>>>20;U=e[22]<<10|e[23]>>>22;V=e[23]<<10|e[22]>>>22;B=e[33]<<13|e[32]>>>19;y=e[32]<<13|e[33]>>>19;f1=e[42]<<2|e[43]>>>30;k1=e[43]<<2|e[42]>>>30;e1=e[5]<<30|e[4]>>>2;t1=e[4]<<30|e[5]>>>2;N=e[14]<<6|e[15]>>>26;P=e[15]<<6|e[14]>>>26;F=e[25]<<11|e[24]>>>21;R=e[24]<<11|e[25]>>>21;W=e[34]<<15|e[35]>>>17;Y=e[35]<<15|e[34]>>>17;D=e[45]<<29|e[44]>>>3;g=e[44]<<29|e[45]>>>3;d=e[6]<<28|e[7]>>>4;p=e[7]<<28|e[6]>>>4;c1=e[17]<<23|e[16]>>>9;o1=e[16]<<23|e[17]>>>9;m=e[26]<<25|e[27]>>>7;j=e[27]<<25|e[26]>>>7;T=e[36]<<21|e[37]>>>11;E=e[37]<<21|e[36]>>>11;Z=e[47]<<24|e[46]>>>8;$=e[46]<<24|e[47]>>>8;L=e[8]<<27|e[9]>>>5;M=e[9]<<27|e[8]>>>5;X=e[18]<<20|e[19]>>>12;h=e[19]<<20|e[18]>>>12;s1=e[29]<<7|e[28]>>>25;r1=e[28]<<7|e[29]>>>25;q=e[38]<<8|e[39]>>>24;v=e[39]<<8|e[38]>>>24;_=e[48]<<14|e[49]>>>18;b=e[49]<<14|e[48]>>>18;e[0]=C^~I&F;e[1]=S^~A&R;e[10]=d^~X&x;e[11]=p^~h&K;e[20]=w^~N&m;e[21]=G^~P&j;e[30]=L^~O&U;e[31]=M^~Q&V;e[40]=e1^~c1&s1;e[41]=t1^~o1&r1;e[2]=I^~F&T;e[3]=A^~R&E;e[12]=X^~x&B;e[13]=h^~K&y;e[22]=N^~m&q;e[23]=P^~j&v;e[32]=O^~U&W;e[33]=Q^~V&Y;e[42]=c1^~s1&l1;e[43]=o1^~r1&n1;e[4]=F^~T&_;e[5]=R^~E&b;e[14]=x^~B&D;e[15]=K^~y&g;e[24]=m^~q&z;e[25]=j^~v&J;e[34]=U^~W&Z;e[35]=V^~Y&$;e[44]=s1^~l1&f1;e[45]=r1^~n1&k1;e[6]=T^~_&C;e[7]=E^~b&S;e[16]=B^~D&d;e[17]=y^~g&p;e[26]=q^~z&w;e[27]=v^~J&G;e[36]=W^~Z&L;e[37]=Y^~$&M;e[46]=l1^~f1&e1;e[47]=n1^~k1&t1;e[8]=_^~C&I;e[9]=b^~S&A;e[18]=D^~d&X;e[19]=g^~p&h;e[28]=z^~w&N;e[29]=J^~G&P;e[38]=Z^~L&O;e[39]=$^~M&Q;e[48]=f1^~e1&c1;e[49]=k1^~t1&o1;e[0]^=RC[o];e[1]^=RC[o+1]}}function keccak(e){return function(c){let o;if(c.slice(0,2)==="0x"){o=[];for(let e=2,t=c.length;e<t;e+=2){o.push(parseInt(c.slice(e,e+2),16))}}else{o=c}return update(Keccak(e,e),o)}}module.exports={keccak256:keccak(256),keccak512:keccak(512),keccak256s:keccak(256),keccak512s:keccak(512)};
var e={},t=!1,n="undefined"!=typeof self?self:global;const r=function(){if(t)return e;t=!0;var r,o,i=e={};function u(){throw new Error("setTimeout has not been defined")}function c(){throw new Error("clearTimeout has not been defined")}function s(e){if(r===setTimeout)return setTimeout(e,0);if((r===u||!r)&&setTimeout)return r=setTimeout,setTimeout(e,0);try{return r(e,0)}catch(t){try{return r.call(null,e,0)}catch(t){return r.call(this||n,e,0)}}}!function(){try{r="function"==typeof setTimeout?setTimeout:u}catch(e){r=u}try{o="function"==typeof clearTimeout?clearTimeout:c}catch(e){o=c}}();var a,f=[],l=!1,p=-1;function y(){l&&a&&(l=!1,a.length?f=a.concat(f):p=-1,f.length&&g())}function g(){if(!l){var e=s(y);l=!0;for(var t=f.length;t;){for(a=f,f=[];++p<t;)a&&a[p].run();p=-1,t=f.length}a=null,l=!1,function(e){if(o===clearTimeout)return clearTimeout(e);if((o===c||!o)&&clearTimeout)return o=clearTimeout,clearTimeout(e);try{o(e)}catch(t){try{return o.call(null,e)}catch(t){return o.call(this||n,e)}}}(e)}}function d(e,t){(this||n).fun=e,(this||n).array=t}function h(){}return i.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];f.push(new d(e,t)),1!==f.length||l||s(g)},d.prototype.run=function(){(this||n).fun.apply(null,(this||n).array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=h,i.addListener=h,i.once=h,i.off=h,i.removeListener=h,i.removeAllListeners=h,i.emit=h,i.prependListener=h,i.prependOnceListener=h,i.listeners=function(e){return[]},i.binding=function(e){throw new Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(e){throw new Error("process.chdir is not supported")},i.umask=function(){return 0},e}();r.addListener,r.argv,r.binding,r.browser,r.chdir,r.cwd,r.emit,r.env,r.listeners,r.nextTick,r.off,r.on,r.once,r.prependListener,r.prependOnceListener,r.removeAllListeners,r.removeListener,r.title,r.umask,r.version,r.versions;var o={},i=!1;var u={},c=!1;function s(){return c?u:(c=!0,u="function"==typeof Object.create?function(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}:function(e,t){e.super_=t;var n=function(){};n.prototype=t.prototype,e.prototype=new n,e.prototype.constructor=e})}var a={},f=!1,l="undefined"!=typeof self?self:global;const p=function(){if(f)return a;f=!0;var e=r,t=Object.getOwnPropertyDescriptors||function(e){for(var t=Object.keys(e),n={},r=0;r<t.length;r++)n[t[r]]=Object.getOwnPropertyDescriptor(e,t[r]);return n},n=/%[sdj%]/g;a.format=function(e){if(!j(e)){for(var t=[],r=0;r<arguments.length;r++)t.push(p(arguments[r]));return t.join(" ")}r=1;for(var o=arguments,i=o.length,u=String(e).replace(n,function(e){if("%%"===e)return"%";if(r>=i)return e;switch(e){case"%s":return String(o[r++]);case"%d":return Number(o[r++]);case"%j":try{return JSON.stringify(o[r++])}catch(e){return"[Circular]"}default:return e}}),c=o[r];r<i;c=o[++r])w(c)||!S(c)?u+=" "+c:u+=" "+p(c);return u},a.deprecate=function(t,n){if(void 0!==e&&!0===e.noDeprecation)return t;if(void 0===e)return function(){return a.deprecate(t,n).apply(this||l,arguments)};var r=!1;return function(){if(!r){if(e.throwDeprecation)throw new Error(n);e.traceDeprecation?console.trace(n):console.error(n),r=!0}return t.apply(this||l,arguments)}};var u,c={};function p(e,t){var n={seen:[],stylize:g};return arguments.length>=3&&(n.depth=arguments[2]),arguments.length>=4&&(n.colors=arguments[3]),v(t)?n.showHidden=t:t&&a._extend(n,t),T(n.showHidden)&&(n.showHidden=!1),T(n.depth)&&(n.depth=2),T(n.colors)&&(n.colors=!1),T(n.customInspect)&&(n.customInspect=!0),n.colors&&(n.stylize=y),d(n,e,n.depth)}function y(e,t){var n=p.styles[t];return n?"["+p.colors[n][0]+"m"+e+"["+p.colors[n][1]+"m":e}function g(e,t){return e}function d(e,t,n){if(e.customInspect&&t&&P(t.inspect)&&t.inspect!==a.inspect&&(!t.constructor||t.constructor.prototype!==t)){var r=t.inspect(n,e);return j(r)||(r=d(e,r,n)),r}var o=function(e,t){if(T(t))return e.stylize("undefined","undefined");if(j(t)){var n="'"+JSON.stringify(t).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return e.stylize(n,"string")}return O(t)?e.stylize(""+t,"number"):v(t)?e.stylize(""+t,"boolean"):w(t)?e.stylize("null","null"):void 0}(e,t);if(o)return o;var i=Object.keys(t),u=function(e){var t={};return e.forEach(function(e,n){t[e]=!0}),t}(i);if(e.showHidden&&(i=Object.getOwnPropertyNames(t)),z(t)&&(i.indexOf("message")>=0||i.indexOf("description")>=0))return h(t);if(0===i.length){if(P(t)){var c=t.name?": "+t.name:"";return e.stylize("[Function"+c+"]","special")}if(E(t))return e.stylize(RegExp.prototype.toString.call(t),"regexp");if(x(t))return e.stylize(Date.prototype.toString.call(t),"date");if(z(t))return h(t)}var s,f="",l=!1,p=["{","}"];return b(t)&&(l=!0,p=["[","]"]),P(t)&&(f=" [Function"+(t.name?": "+t.name:"")+"]"),E(t)&&(f=" "+RegExp.prototype.toString.call(t)),x(t)&&(f=" "+Date.prototype.toUTCString.call(t)),z(t)&&(f=" "+h(t)),0!==i.length||l&&0!=t.length?n<0?E(t)?e.stylize(RegExp.prototype.toString.call(t),"regexp"):e.stylize("[Object]","special"):(e.seen.push(t),s=l?function(e,t,n,r,o){for(var i=[],u=0,c=t.length;u<c;++u)A(t,String(u))?i.push(m(e,t,n,r,String(u),!0)):i.push("");return o.forEach(function(o){o.match(/^\d+$/)||i.push(m(e,t,n,r,o,!0))}),i}(e,t,n,u,i):i.map(function(r){return m(e,t,n,u,r,l)}),e.seen.pop(),function(e,t,n){return e.reduce(function(e,t){return t.indexOf("\n"),e+t.replace(/\u001b\[\d\d?m/g,"").length+1},0)>60?n[0]+(""===t?"":t+"\n ")+" "+e.join(",\n  ")+" "+n[1]:n[0]+t+" "+e.join(", ")+" "+n[1]}(s,f,p)):p[0]+f+p[1]}function h(e){return"["+Error.prototype.toString.call(e)+"]"}function m(e,t,n,r,o,i){var u,c,s;if((s=Object.getOwnPropertyDescriptor(t,o)||{value:t[o]}).get?c=s.set?e.stylize("[Getter/Setter]","special"):e.stylize("[Getter]","special"):s.set&&(c=e.stylize("[Setter]","special")),A(r,o)||(u="["+o+"]"),c||(e.seen.indexOf(s.value)<0?(c=w(n)?d(e,s.value,null):d(e,s.value,n-1)).indexOf("\n")>-1&&(c=i?c.split("\n").map(function(e){return"  "+e}).join("\n").substr(2):"\n"+c.split("\n").map(function(e){return"   "+e}).join("\n")):c=e.stylize("[Circular]","special")),T(u)){if(i&&o.match(/^\d+$/))return c;(u=JSON.stringify(""+o)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(u=u.substr(1,u.length-2),u=e.stylize(u,"name")):(u=u.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),u=e.stylize(u,"string"))}return u+": "+c}function b(e){return Array.isArray(e)}function v(e){return"boolean"==typeof e}function w(e){return null===e}function O(e){return"number"==typeof e}function j(e){return"string"==typeof e}function T(e){return void 0===e}function E(e){return S(e)&&"[object RegExp]"===D(e)}function S(e){return"object"==typeof e&&null!==e}function x(e){return S(e)&&"[object Date]"===D(e)}function z(e){return S(e)&&("[object Error]"===D(e)||e instanceof Error)}function P(e){return"function"==typeof e}function D(e){return Object.prototype.toString.call(e)}function k(e){return e<10?"0"+e.toString(10):e.toString(10)}a.debuglog=function(t){if(T(u)&&(u=e.env.NODE_DEBUG||""),t=t.toUpperCase(),!c[t])if(new RegExp("\\b"+t+"\\b","i").test(u)){var n=e.pid;c[t]=function(){var e=a.format.apply(a,arguments);console.error("%s %d: %s",t,n,e)}}else c[t]=function(){};return c[t]},a.inspect=p,p.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},p.styles={special:"cyan",number:"yellow",boolean:"yellow",undefined:"grey",null:"bold",string:"green",date:"magenta",regexp:"red"},a.isArray=b,a.isBoolean=v,a.isNull=w,a.isNullOrUndefined=function(e){return null==e},a.isNumber=O,a.isString=j,a.isSymbol=function(e){return"symbol"==typeof e},a.isUndefined=T,a.isRegExp=E,a.isObject=S,a.isDate=x,a.isError=z,a.isFunction=P,a.isPrimitive=function(e){return null===e||"boolean"==typeof e||"number"==typeof e||"string"==typeof e||"symbol"==typeof e||void 0===e},a.isBuffer=i?o:(i=!0,o=function(e){return e&&"object"==typeof e&&"function"==typeof e.copy&&"function"==typeof e.fill&&"function"==typeof e.readUInt8});var N=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function A(e,t){return Object.prototype.hasOwnProperty.call(e,t)}a.log=function(){var e,t;console.log("%s - %s",(e=new Date,t=[k(e.getHours()),k(e.getMinutes()),k(e.getSeconds())].join(":"),[e.getDate(),N[e.getMonth()],t].join(" ")),a.format.apply(a,arguments))},a.inherits=s(),a._extend=function(e,t){if(!t||!S(t))return e;for(var n=Object.keys(t),r=n.length;r--;)e[n[r]]=t[n[r]];return e};var L="undefined"!=typeof Symbol?Symbol("util.promisify.custom"):void 0;function F(e,t){if(!e){var n=new Error("Promise was rejected with a falsy value");n.reason=e,e=n}return t(e)}return a.promisify=function(e){if("function"!=typeof e)throw new TypeError('The "original" argument must be of type Function');if(L&&e[L]){var n;if("function"!=typeof(n=e[L]))throw new TypeError('The "util.promisify.custom" argument must be of type Function');return Object.defineProperty(n,L,{value:n,enumerable:!1,writable:!1,configurable:!0}),n}function n(){for(var t,n,r=new Promise(function(e,r){t=e,n=r}),o=[],i=0;i<arguments.length;i++)o.push(arguments[i]);o.push(function(e,r){e?n(e):t(r)});try{e.apply(this||l,o)}catch(e){n(e)}return r}return Object.setPrototypeOf(n,Object.getPrototypeOf(e)),L&&Object.defineProperty(n,L,{value:n,enumerable:!1,writable:!1,configurable:!0}),Object.defineProperties(n,t(e))},a.promisify.custom=L,a.callbackify=function(n){if("function"!=typeof n)throw new TypeError('The "original" argument must be of type Function');function r(){for(var t=[],r=0;r<arguments.length;r++)t.push(arguments[r]);var o=t.pop();if("function"!=typeof o)throw new TypeError("The last argument must be of type Function");var i=this||l,u=function(){return o.apply(i,arguments)};n.apply(this||l,t).then(function(t){e.nextTick(u,null,t)},function(t){e.nextTick(F,t,u)})}return Object.setPrototypeOf(r,Object.getPrototypeOf(n)),Object.defineProperties(r,t(n)),r},a}(),y=p._extend,g=p.callbackify,d=p.debuglog,h=p.deprecate,m=p.format,b=p.inherits,v=p.inspect,w=p.isArray,O=p.isBoolean,j=p.isBuffer,T=p.isDate,E=p.isError,S=p.isFunction,x=p.isNull,z=p.isNullOrUndefined,P=p.isNumber,D=p.isObject,k=p.isPrimitive,N=p.isRegExp,A=p.isString,L=p.isSymbol,F=p.isUndefined,U=p.log,_=p.promisify;export{_ as A,p as a,s as b,r as c,y as d,g as e,d as f,h as g,m as h,b as i,v as j,w as k,O as l,j as m,T as n,E as o,S as p,x as q,z as r,P as s,D as t,k as u,N as v,A as w,L as x,F as y,U as z};

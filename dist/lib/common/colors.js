Object.defineProperty(exports,"__esModule",{value:true});exports.colors=void 0;var colors={red:'#d40134',midnightBlue:'#2d3142',lightPrimary:'#fdf8f9',white:'#ffffff',gray:'#abadb4',customBlackTransparent:function customBlackTransparent(opacity){return"rgba(0,0,0,"+opacity+")";},hexToRGBA:function hexToRGBA(hex,opacity){return hex.replace('#','').split(/(?=(?:..)*$)/).map(function(x){return parseInt(x,16);}).filter(function(num){return!isNaN(num);}).reduce(function(acc,color){return""+acc+color+",";},'rgba(').concat(opacity+")");}};exports.colors=colors;
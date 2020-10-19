;(function(){var undefined;var VERSION='4.17.20';var LARGE_ARRAY_SIZE=200;var CORE_ERROR_TEXT='Unsupported core-js use. Try https://npms.io/search?q=ponyfill.',FUNC_ERROR_TEXT='Expected a function';var HASH_UNDEFINED='__lodash_hash_undefined__';var MAX_MEMOIZE_SIZE=500;var PLACEHOLDER='__lodash_placeholder__';var CLONE_DEEP_FLAG=1,CLONE_FLAT_FLAG=2,CLONE_SYMBOLS_FLAG=4;var COMPARE_PARTIAL_FLAG=1,COMPARE_UNORDERED_FLAG=2;var WRAP_BIND_FLAG=1,WRAP_BIND_KEY_FLAG=2,WRAP_CURRY_BOUND_FLAG=4,WRAP_CURRY_FLAG=8,WRAP_CURRY_RIGHT_FLAG=16,WRAP_PARTIAL_FLAG=32,WRAP_PARTIAL_RIGHT_FLAG=64,WRAP_ARY_FLAG=128,WRAP_REARG_FLAG=256,WRAP_FLIP_FLAG=512;var DEFAULT_TRUNC_LENGTH=30,DEFAULT_TRUNC_OMISSION='...';var HOT_COUNT=800,HOT_SPAN=16;var LAZY_FILTER_FLAG=1,LAZY_MAP_FLAG=2,LAZY_WHILE_FLAG=3;var INFINITY=1/0,MAX_SAFE_INTEGER=9007199254740991,MAX_INTEGER=1.7976931348623157e+308,NAN=0/0;var MAX_ARRAY_LENGTH=4294967295,MAX_ARRAY_INDEX=MAX_ARRAY_LENGTH-1,HALF_MAX_ARRAY_LENGTH=MAX_ARRAY_LENGTH>>>1;var wrapFlags=[['ary',WRAP_ARY_FLAG],['bind',WRAP_BIND_FLAG],['bindKey',WRAP_BIND_KEY_FLAG],['curry',WRAP_CURRY_FLAG],['curryRight',WRAP_CURRY_RIGHT_FLAG],['flip',WRAP_FLIP_FLAG],['partial',WRAP_PARTIAL_FLAG],['partialRight',WRAP_PARTIAL_RIGHT_FLAG],['rearg',WRAP_REARG_FLAG]];var argsTag='[object Arguments]',arrayTag='[object Array]',asyncTag='[object AsyncFunction]',boolTag='[object Boolean]',dateTag='[object Date]',domExcTag='[object DOMException]',errorTag='[object Error]',funcTag='[object Function]',genTag='[object GeneratorFunction]',mapTag='[object Map]',numberTag='[object Number]',nullTag='[object Null]',objectTag='[object Object]',promiseTag='[object Promise]',proxyTag='[object Proxy]',regexpTag='[object RegExp]',setTag='[object Set]',stringTag='[object String]',symbolTag='[object Symbol]',undefinedTag='[object Undefined]',weakMapTag='[object WeakMap]',weakSetTag='[object WeakSet]';var arrayBufferTag='[object ArrayBuffer]',dataViewTag='[object DataView]',float32Tag='[object Float32Array]',float64Tag='[object Float64Array]',int8Tag='[object Int8Array]',int16Tag='[object Int16Array]',int32Tag='[object Int32Array]',uint8Tag='[object Uint8Array]',uint8ClampedTag='[object Uint8ClampedArray]',uint16Tag='[object Uint16Array]',uint32Tag='[object Uint32Array]';var reEmptyStringLeading=/\b__p \+= '';/g,reEmptyStringMiddle=/\b(__p \+=) '' \+/g,reEmptyStringTrailing=/(__e\(.*?\)|\b__t\)) \+\n'';/g;var reEscapedHtml=/&(?:amp|lt|gt|quot|#39);/g,reUnescapedHtml=/[&<>"']/g,reHasEscapedHtml=RegExp(reEscapedHtml.source),reHasUnescapedHtml=RegExp(reUnescapedHtml.source);var reEscape=/<%-([\s\S]+?)%>/g,reEvaluate=/<%([\s\S]+?)%>/g,reInterpolate=/<%=([\s\S]+?)%>/g;var reIsDeepProp=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,reIsPlainProp=/^\w*$/,rePropName=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;var reRegExpChar=/[\\^$.*+?()[\]{}|]/g,reHasRegExpChar=RegExp(reRegExpChar.source);var reTrim=/^\s+|\s+$/g,reTrimStart=/^\s+/,reTrimEnd=/\s+$/;var reWrapComment=/\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,reWrapDetails=/\{\n\/\* \[wrapped with (.+)\] \*/,reSplitDetails=/,? & /;var reAsciiWord=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;var reEscapeChar=/\\(\\)?/g;var reEsTemplate=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;var reFlags=/\w*$/;var reIsBadHex=/^[-+]0x[0-9a-f]+$/i;var reIsBinary=/^0b[01]+$/i;var reIsHostCtor=/^\[object .+?Constructor\]$/;var reIsOctal=/^0o[0-7]+$/i;var reIsUint=/^(?:0|[1-9]\d*)$/;var reLatin=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;var reNoMatch=/($^)/;var reUnescapedString=/['\n\r\u2028\u2029\\]/g;var rsAstralRange='\\ud800-\\udfff',rsComboMarksRange='\\u0300-\\u036f',reComboHalfMarksRange='\\ufe20-\\ufe2f',rsComboSymbolsRange='\\u20d0-\\u20ff',rsComboRange=rsComboMarksRange+reComboHalfMarksRange+rsComboSymbolsRange,rsDingbatRange='\\u2700-\\u27bf',rsLowerRange='a-z\\xdf-\\xf6\\xf8-\\xff',rsMathOpRange='\\xac\\xb1\\xd7\\xf7',rsNonCharRange='\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',rsPunctuationRange='\\u2000-\\u206f',rsSpaceRange=' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',rsUpperRange='A-Z\\xc0-\\xd6\\xd8-\\xde',rsVarRange='\\ufe0e\\ufe0f',rsBreakRange=rsMathOpRange+rsNonCharRange+rsPunctuationRange+rsSpaceRange;var rsApos="['\u2019]",rsAstral='['+rsAstralRange+']',rsBreak='['+rsBreakRange+']',rsCombo='['+rsComboRange+']',rsDigits='\\d+',rsDingbat='['+rsDingbatRange+']',rsLower='['+rsLowerRange+']',rsMisc='[^'+rsAstralRange+rsBreakRange+rsDigits+rsDingbatRange+rsLowerRange+rsUpperRange+']',rsFitz='\\ud83c[\\udffb-\\udfff]',rsModifier='(?:'+rsCombo+'|'+rsFitz+')',rsNonAstral='[^'+rsAstralRange+']',rsRegional='(?:\\ud83c[\\udde6-\\uddff]){2}',rsSurrPair='[\\ud800-\\udbff][\\udc00-\\udfff]',rsUpper='['+rsUpperRange+']',rsZWJ='\\u200d';var rsMiscLower='(?:'+rsLower+'|'+rsMisc+')',rsMiscUpper='(?:'+rsUpper+'|'+rsMisc+')',rsOptContrLower='(?:'+rsApos+'(?:d|ll|m|re|s|t|ve))?',rsOptContrUpper='(?:'+rsApos+'(?:D|LL|M|RE|S|T|VE))?',reOptMod=rsModifier+'?',rsOptVar='['+rsVarRange+']?',rsOptJoin='(?:'+rsZWJ+'(?:'+[rsNonAstral,rsRegional,rsSurrPair].join('|')+')'+rsOptVar+reOptMod+')*',rsOrdLower='\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',rsOrdUpper='\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',rsSeq=rsOptVar+reOptMod+rsOptJoin,rsEmoji='(?:'+[rsDingbat,rsRegional,rsSurrPair].join('|')+')'+rsSeq,rsSymbol='(?:'+[rsNonAstral+rsCombo+'?',rsCombo,rsRegional,rsSurrPair,rsAstral].join('|')+')';var reApos=RegExp(rsApos,'g');var reComboMark=RegExp(rsCombo,'g');var reUnicode=RegExp(rsFitz+'(?='+rsFitz+')|'+rsSymbol+rsSeq,'g');var reUnicodeWord=RegExp([rsUpper+'?'+rsLower+'+'+rsOptContrLower+'(?='+[rsBreak,rsUpper,'$'].join('|')+')',rsMiscUpper+'+'+rsOptContrUpper+'(?='+[rsBreak,rsUpper+rsMiscLower,'$'].join('|')+')',rsUpper+'?'+rsMiscLower+'+'+rsOptContrLower,rsUpper+'+'+rsOptContrUpper,rsOrdUpper,rsOrdLower,rsDigits,rsEmoji].join('|'),'g');var reHasUnicode=RegExp('['+rsZWJ+rsAstralRange+rsComboRange+rsVarRange+']');var reHasUnicodeWord=/[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;var contextProps=['Array','Buffer','DataView','Date','Error','Float32Array','Float64Array','Function','Int8Array','Int16Array','Int32Array','Map','Math','Object','Promise','RegExp','Set','String','Symbol','TypeError','Uint8Array','Uint8ClampedArray','Uint16Array','Uint32Array','WeakMap','_','clearTimeout','isFinite','parseInt','setTimeout'];var templateCounter=-1;var typedArrayTags={};typedArrayTags[float32Tag]=typedArrayTags[float64Tag]=typedArrayTags[int8Tag]=typedArrayTags[int16Tag]=typedArrayTags[int32Tag]=typedArrayTags[uint8Tag]=typedArrayTags[uint8ClampedTag]=typedArrayTags[uint16Tag]=typedArrayTags[uint32Tag]=true;typedArrayTags[argsTag]=typedArrayTags[arrayTag]=typedArrayTags[arrayBufferTag]=typedArrayTags[boolTag]=typedArrayTags[dataViewTag]=typedArrayTags[dateTag]=typedArrayTags[errorTag]=typedArrayTags[funcTag]=typedArrayTags[mapTag]=typedArrayTags[numberTag]=typedArrayTags[objectTag]=typedArrayTags[regexpTag]=typedArrayTags[setTag]=typedArrayTags[stringTag]=typedArrayTags[weakMapTag]=false;var cloneableTags={};cloneableTags[argsTag]=cloneableTags[arrayTag]=cloneableTags[arrayBufferTag]=cloneableTags[dataViewTag]=cloneableTags[boolTag]=cloneableTags[dateTag]=cloneableTags[float32Tag]=cloneableTags[float64Tag]=cloneableTags[int8Tag]=cloneableTags[int16Tag]=cloneableTags[int32Tag]=cloneableTags[mapTag]=cloneableTags[numberTag]=cloneableTags[objectTag]=cloneableTags[regexpTag]=cloneableTags[setTag]=cloneableTags[stringTag]=cloneableTags[symbolTag]=cloneableTags[uint8Tag]=cloneableTags[uint8ClampedTag]=cloneableTags[uint16Tag]=cloneableTags[uint32Tag]=true;cloneableTags[errorTag]=cloneableTags[funcTag]=cloneableTags[weakMapTag]=false;var deburredLetters={'\xc0':'A','\xc1':'A','\xc2':'A','\xc3':'A','\xc4':'A','\xc5':'A','\xe0':'a','\xe1':'a','\xe2':'a','\xe3':'a','\xe4':'a','\xe5':'a','\xc7':'C','\xe7':'c','\xd0':'D','\xf0':'d','\xc8':'E','\xc9':'E','\xca':'E','\xcb':'E','\xe8':'e','\xe9':'e','\xea':'e','\xeb':'e','\xcc':'I','\xcd':'I','\xce':'I','\xcf':'I','\xec':'i','\xed':'i','\xee':'i','\xef':'i','\xd1':'N','\xf1':'n','\xd2':'O','\xd3':'O','\xd4':'O','\xd5':'O','\xd6':'O','\xd8':'O','\xf2':'o','\xf3':'o','\xf4':'o','\xf5':'o','\xf6':'o','\xf8':'o','\xd9':'U','\xda':'U','\xdb':'U','\xdc':'U','\xf9':'u','\xfa':'u','\xfb':'u','\xfc':'u','\xdd':'Y','\xfd':'y','\xff':'y','\xc6':'Ae','\xe6':'ae','\xde':'Th','\xfe':'th','\xdf':'ss','\u0100':'A','\u0102':'A','\u0104':'A','\u0101':'a','\u0103':'a','\u0105':'a','\u0106':'C','\u0108':'C','\u010a':'C','\u010c':'C','\u0107':'c','\u0109':'c','\u010b':'c','\u010d':'c','\u010e':'D','\u0110':'D','\u010f':'d','\u0111':'d','\u0112':'E','\u0114':'E','\u0116':'E','\u0118':'E','\u011a':'E','\u0113':'e','\u0115':'e','\u0117':'e','\u0119':'e','\u011b':'e','\u011c':'G','\u011e':'G','\u0120':'G','\u0122':'G','\u011d':'g','\u011f':'g','\u0121':'g','\u0123':'g','\u0124':'H','\u0126':'H','\u0125':'h','\u0127':'h','\u0128':'I','\u012a':'I','\u012c':'I','\u012e':'I','\u0130':'I','\u0129':'i','\u012b':'i','\u012d':'i','\u012f':'i','\u0131':'i','\u0134':'J','\u0135':'j','\u0136':'K','\u0137':'k','\u0138':'k','\u0139':'L','\u013b':'L','\u013d':'L','\u013f':'L','\u0141':'L','\u013a':'l','\u013c':'l','\u013e':'l','\u0140':'l','\u0142':'l','\u0143':'N','\u0145':'N','\u0147':'N','\u014a':'N','\u0144':'n','\u0146':'n','\u0148':'n','\u014b':'n','\u014c':'O','\u014e':'O','\u0150':'O','\u014d':'o','\u014f':'o','\u0151':'o','\u0154':'R','\u0156':'R','\u0158':'R','\u0155':'r','\u0157':'r','\u0159':'r','\u015a':'S','\u015c':'S','\u015e':'S','\u0160':'S','\u015b':'s','\u015d':'s','\u015f':'s','\u0161':'s','\u0162':'T','\u0164':'T','\u0166':'T','\u0163':'t','\u0165':'t','\u0167':'t','\u0168':'U','\u016a':'U','\u016c':'U','\u016e':'U','\u0170':'U','\u0172':'U','\u0169':'u','\u016b':'u','\u016d':'u','\u016f':'u','\u0171':'u','\u0173':'u','\u0174':'W','\u0175':'w','\u0176':'Y','\u0177':'y','\u0178':'Y','\u0179':'Z','\u017b':'Z','\u017d':'Z','\u017a':'z','\u017c':'z','\u017e':'z','\u0132':'IJ','\u0133':'ij','\u0152':'Oe','\u0153':'oe','\u0149':"'n",'\u017f':'s'};var htmlEscapes={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'};var htmlUnescapes={'&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"','&#39;':"'"};var stringEscapes={'\\':'\\',"'":"'",'\n':'n','\r':'r','\u2028':'u2028','\u2029':'u2029'};var freeParseFloat=parseFloat,freeParseInt=parseInt;var freeGlobal=typeof global=='object'&&global&&global.Object===Object&&global;var freeSelf=typeof self=='object'&&self&&self.Object===Object&&self;var root=freeGlobal||freeSelf||Function('return this')();var freeExports=typeof exports=='object'&&exports&&!exports.nodeType&&exports;var freeModule=freeExports&&typeof module=='object'&&module&&!module.nodeType&&module;var moduleExports=freeModule&&freeModule.exports===freeExports;var freeProcess=moduleExports&&freeGlobal.process;var nodeUtil=(function(){try{var types=freeModule&&freeModule.require&&freeModule.require('util').types;if(types){return types;}
return freeProcess&&freeProcess.binding&&freeProcess.binding('util');}catch(e){}}());var nodeIsArrayBuffer=nodeUtil&&nodeUtil.isArrayBuffer,nodeIsDate=nodeUtil&&nodeUtil.isDate,nodeIsMap=nodeUtil&&nodeUtil.isMap,nodeIsRegExp=nodeUtil&&nodeUtil.isRegExp,nodeIsSet=nodeUtil&&nodeUtil.isSet,nodeIsTypedArray=nodeUtil&&nodeUtil.isTypedArray;function apply(func,thisArg,args){switch(args.length){case 0:return func.call(thisArg);case 1:return func.call(thisArg,args[0]);case 2:return func.call(thisArg,args[0],args[1]);case 3:return func.call(thisArg,args[0],args[1],args[2]);}
return func.apply(thisArg,args);}
function arrayAggregator(array,setter,iteratee,accumulator){var index=-1,length=array==null?0:array.length;while(++index<length){var value=array[index];setter(accumulator,value,iteratee(value),array);}
return accumulator;}
function arrayEach(array,iteratee){var index=-1,length=array==null?0:array.length;while(++index<length){if(iteratee(array[index],index,array)===false){break;}}
return array;}
function arrayEachRight(array,iteratee){var length=array==null?0:array.length;while(length--){if(iteratee(array[length],length,array)===false){break;}}
return array;}
function arrayEvery(array,predicate){var index=-1,length=array==null?0:array.length;while(++index<length){if(!predicate(array[index],index,array)){return false;}}
return true;}
function arrayFilter(array,predicate){var index=-1,length=array==null?0:array.length,resIndex=0,result=[];while(++index<length){var value=array[index];if(predicate(value,index,array)){result[resIndex++]=value;}}
return result;}
function arrayIncludes(array,value){var length=array==null?0:array.length;return!!length&&baseIndexOf(array,value,0)>-1;}
function arrayIncludesWith(array,value,comparator){var index=-1,length=array==null?0:array.length;while(++index<length){if(comparator(value,array[index])){return true;}}
return false;}
function arrayMap(array,iteratee){var index=-1,length=array==null?0:array.length,result=Array(length);while(++index<length){result[index]=iteratee(array[index],index,array);}
return result;}
function arrayPush(array,values){var index=-1,length=values.length,offset=array.length;while(++index<length){array[offset+index]=values[index];}
return array;}
function arrayReduce(array,iteratee,accumulator,initAccum){var index=-1,length=array==null?0:array.length;if(initAccum&&length){accumulator=array[++index];}
while(++index<length){accumulator=iteratee(accumulator,array[index],index,array);}
return accumulator;}
function arrayReduceRight(array,iteratee,accumulator,initAccum){var length=array==null?0:array.length;if(initAccum&&length){accumulator=array[--length];}
while(length--){accumulator=iteratee(accumulator,array[length],length,array);}
return accumulator;}
function arraySome(array,predicate){var index=-1,length=array==null?0:array.length;while(++index<length){if(predicate(array[index],index,array)){return true;}}
return false;}
var asciiSize=baseProperty('length');function asciiToArray(string){return string.split('');}
function asciiWords(string){return string.match(reAsciiWord)||[];}
function baseFindKey(collection,predicate,eachFunc){var result;eachFunc(collection,function(value,key,collection){if(predicate(value,key,collection)){result=key;return false;}});return result;}
function baseFindIndex(array,predicate,fromIndex,fromRight){var length=array.length,index=fromIndex+(fromRight?1:-1);while((fromRight?index--:++index<length)){if(predicate(array[index],index,array)){return index;}}
return-1;}
function baseIndexOf(array,value,fromIndex){return value===value?strictIndexOf(array,value,fromIndex):baseFindIndex(array,baseIsNaN,fromIndex);}
function baseIndexOfWith(array,value,fromIndex,comparator){var index=fromIndex-1,length=array.length;while(++index<length){if(comparator(array[index],value)){return index;}}
return-1;}
function baseIsNaN(value){return value!==value;}
function baseMean(array,iteratee){var length=array==null?0:array.length;return length?(baseSum(array,iteratee)/length):NAN;}
function baseProperty(key){return function(object){return object==null?undefined:object[key];};}
function basePropertyOf(object){return function(key){return object==null?undefined:object[key];};}
function baseReduce(collection,iteratee,accumulator,initAccum,eachFunc){eachFunc(collection,function(value,index,collection){accumulator=initAccum?(initAccum=false,value):iteratee(accumulator,value,index,collection);});return accumulator;}
function baseSortBy(array,comparer){var length=array.length;array.sort(comparer);while(length--){array[length]=array[length].value;}
return array;}
function baseSum(array,iteratee){var result,index=-1,length=array.length;while(++index<length){var current=iteratee(array[index]);if(current!==undefined){result=result===undefined?current:(result+current);}}
return result;}
function baseTimes(n,iteratee){var index=-1,result=Array(n);while(++index<n){result[index]=iteratee(index);}
return result;}
function baseToPairs(object,props){return arrayMap(props,function(key){return[key,object[key]];});}
function baseUnary(func){return function(value){return func(value);};}
function baseValues(object,props){return arrayMap(props,function(key){return object[key];});}
function cacheHas(cache,key){return cache.has(key);}
function charsStartIndex(strSymbols,chrSymbols){var index=-1,length=strSymbols.length;while(++index<length&&baseIndexOf(chrSymbols,strSymbols[index],0)>-1){}
return index;}
function charsEndIndex(strSymbols,chrSymbols){var index=strSymbols.length;while(index--&&baseIndexOf(chrSymbols,strSymbols[index],0)>-1){}
return index;}
function countHolders(array,placeholder){var length=array.length,result=0;while(length--){if(array[length]===placeholder){++result;}}
return result;}
var deburrLetter=basePropertyOf(deburredLetters);var escapeHtmlChar=basePropertyOf(htmlEscapes);function escapeStringChar(chr){return'\\'+stringEscapes[chr];}
function getValue(object,key){return object==null?undefined:object[key];}
function hasUnicode(string){return reHasUnicode.test(string);}
function hasUnicodeWord(string){return reHasUnicodeWord.test(string);}
function iteratorToArray(iterator){var data,result=[];while(!(data=iterator.next()).done){result.push(data.value);}
return result;}
function mapToArray(map){var index=-1,result=Array(map.size);map.forEach(function(value,key){result[++index]=[key,value];});return result;}
function overArg(func,transform){return function(arg){return func(transform(arg));};}
function replaceHolders(array,placeholder){var index=-1,length=array.length,resIndex=0,result=[];while(++index<length){var value=array[index];if(value===placeholder||value===PLACEHOLDER){array[index]=PLACEHOLDER;result[resIndex++]=index;}}
return result;}
function setToArray(set){var index=-1,result=Array(set.size);set.forEach(function(value){result[++index]=value;});return result;}
function setToPairs(set){var index=-1,result=Array(set.size);set.forEach(function(value){result[++index]=[value,value];});return result;}
function strictIndexOf(array,value,fromIndex){var index=fromIndex-1,length=array.length;while(++index<length){if(array[index]===value){return index;}}
return-1;}
function strictLastIndexOf(array,value,fromIndex){var index=fromIndex+1;while(index--){if(array[index]===value){return index;}}
return index;}
function stringSize(string){return hasUnicode(string)?unicodeSize(string):asciiSize(string);}
function stringToArray(string){return hasUnicode(string)?unicodeToArray(string):asciiToArray(string);}
var unescapeHtmlChar=basePropertyOf(htmlUnescapes);function unicodeSize(string){var result=reUnicode.lastIndex=0;while(reUnicode.test(string)){++result;}
return result;}
function unicodeToArray(string){return string.match(reUnicode)||[];}
function unicodeWords(string){return string.match(reUnicodeWord)||[];}
var runInContext=(function runInContext(context){context=context==null?root:_.defaults(root.Object(),context,_.pick(root,contextProps));var Array=context.Array,Date=context.Date,Error=context.Error,Function=context.Function,Math=context.Math,Object=context.Object,RegExp=context.RegExp,String=context.String,TypeError=context.TypeError;var arrayProto=Array.prototype,funcProto=Function.prototype,objectProto=Object.prototype;var coreJsData=context['__core-js_shared__'];var funcToString=funcProto.toString;var hasOwnProperty=objectProto.hasOwnProperty;var idCounter=0;var maskSrcKey=(function(){var uid=/[^.]+$/.exec(coreJsData&&coreJsData.keys&&coreJsData.keys.IE_PROTO||'');return uid?('Symbol(src)_1.'+uid):'';}());var nativeObjectToString=objectProto.toString;var objectCtorString=funcToString.call(Object);var oldDash=root._;var reIsNative=RegExp('^'+
funcToString.call(hasOwnProperty).replace(reRegExpChar,'\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,'$1.*?')+'$');var Buffer=moduleExports?context.Buffer:undefined,Symbol=context.Symbol,Uint8Array=context.Uint8Array,allocUnsafe=Buffer?Buffer.allocUnsafe:undefined,getPrototype=overArg(Object.getPrototypeOf,Object),objectCreate=Object.create,propertyIsEnumerable=objectProto.propertyIsEnumerable,splice=arrayProto.splice,spreadableSymbol=Symbol?Symbol.isConcatSpreadable:undefined,symIterator=Symbol?Symbol.iterator:undefined,symToStringTag=Symbol?Symbol.toStringTag:undefined;var defineProperty=(function(){try{var func=getNative(Object,'defineProperty');func({},'',{});return func;}catch(e){}}());var ctxClearTimeout=context.clearTimeout!==root.clearTimeout&&context.clearTimeout,ctxNow=Date&&Date.now!==root.Date.now&&Date.now,ctxSetTimeout=context.setTimeout!==root.setTimeout&&context.setTimeout;var nativeCeil=Math.ceil,nativeFloor=Math.floor,nativeGetSymbols=Object.getOwnPropertySymbols,nativeIsBuffer=Buffer?Buffer.isBuffer:undefined,nativeIsFinite=context.isFinite,nativeJoin=arrayProto.join,nativeKeys=overArg(Object.keys,Object),nativeMax=Math.max,nativeMin=Math.min,nativeNow=Date.now,nativeParseInt=context.parseInt,nativeRandom=Math.random,nativeReverse=arrayProto.reverse;var DataView=getNative(context,'DataView'),Map=getNative(context,'Map'),Promise=getNative(context,'Promise'),Set=getNative(context,'Set'),WeakMap=getNative(context,'WeakMap'),nativeCreate=getNative(Object,'create');var metaMap=WeakMap&&new WeakMap;var realNames={};var dataViewCtorString=toSource(DataView),mapCtorString=toSource(Map),promiseCtorString=toSource(Promise),setCtorString=toSource(Set),weakMapCtorString=toSource(WeakMap);var symbolProto=Symbol?Symbol.prototype:undefined,symbolValueOf=symbolProto?symbolProto.valueOf:undefined,symbolToString=symbolProto?symbolProto.toString:undefined;function lodash(value){if(isObjectLike(value)&&!isArray(value)&&!(value instanceof LazyWrapper)){if(value instanceof LodashWrapper){return value;}
if(hasOwnProperty.call(value,'__wrapped__')){return wrapperClone(value);}}
return new LodashWrapper(value);}
var baseCreate=(function(){function object(){}
return function(proto){if(!isObject(proto)){return{};}
if(objectCreate){return objectCreate(proto);}
object.prototype=proto;var result=new object;object.prototype=undefined;return result;};}());function baseLodash(){}
function LodashWrapper(value,chainAll){this.__wrapped__=value;this.__actions__=[];this.__chain__=!!chainAll;this.__index__=0;this.__values__=undefined;}
lodash.templateSettings={'escape':reEscape,'evaluate':reEvaluate,'interpolate':reInterpolate,'variable':'','imports':{'_':lodash}};lodash.prototype=baseLodash.prototype;lodash.prototype.constructor=lodash;LodashWrapper.prototype=baseCreate(baseLodash.prototype);LodashWrapper.prototype.constructor=LodashWrapper;function LazyWrapper(value){this.__wrapped__=value;this.__actions__=[];this.__dir__=1;this.__filtered__=false;this.__iteratees__=[];this.__takeCount__=MAX_ARRAY_LENGTH;this.__views__=[];}
function lazyClone(){var result=new LazyWrapper(this.__wrapped__);result.__actions__=copyArray(this.__actions__);result.__dir__=this.__dir__;result.__filtered__=this.__filtered__;result.__iteratees__=copyArray(this.__iteratees__);result.__takeCount__=this.__takeCount__;result.__views__=copyArray(this.__views__);return result;}
function lazyReverse(){if(this.__filtered__){var result=new LazyWrapper(this);result.__dir__=-1;result.__filtered__=true;}else{result=this.clone();result.__dir__*=-1;}
return result;}
function lazyValue(){var array=this.__wrapped__.value(),dir=this.__dir__,isArr=isArray(array),isRight=dir<0,arrLength=isArr?array.length:0,view=getView(0,arrLength,this.__views__),start=view.start,end=view.end,length=end-start,index=isRight?end:(start-1),iteratees=this.__iteratees__,iterLength=iteratees.length,resIndex=0,takeCount=nativeMin(length,this.__takeCount__);if(!isArr||(!isRight&&arrLength==length&&takeCount==length)){return baseWrapperValue(array,this.__actions__);}
var result=[];outer:while(length--&&resIndex<takeCount){index+=dir;var iterIndex=-1,value=array[index];while(++iterIndex<iterLength){var data=iteratees[iterIndex],iteratee=data.iteratee,type=data.type,computed=iteratee(value);if(type==LAZY_MAP_FLAG){value=computed;}else if(!computed){if(type==LAZY_FILTER_FLAG){continue outer;}else{break outer;}}}
result[resIndex++]=value;}
return result;}
LazyWrapper.prototype=baseCreate(baseLodash.prototype);LazyWrapper.prototype.constructor=LazyWrapper;function Hash(entries){var index=-1,length=entries==null?0:entries.length;this.clear();while(++index<length){var entry=entries[index];this.set(entry[0],entry[1]);}}
function hashClear(){this.__data__=nativeCreate?nativeCreate(null):{};this.size=0;}
function hashDelete(key){var result=this.has(key)&&delete this.__data__[key];this.size-=result?1:0;return result;}
function hashGet(key){var data=this.__data__;if(nativeCreate){var result=data[key];return result===HASH_UNDEFINED?undefined:result;}
return hasOwnProperty.call(data,key)?data[key]:undefined;}
function hashHas(key){var data=this.__data__;return nativeCreate?(data[key]!==undefined):hasOwnProperty.call(data,key);}
function hashSet(key,value){var data=this.__data__;this.size+=this.has(key)?0:1;data[key]=(nativeCreate&&value===undefined)?HASH_UNDEFINED:value;return this;}
Hash.prototype.clear=hashClear;Hash.prototype['delete']=hashDelete;Hash.prototype.get=hashGet;Hash.prototype.has=hashHas;Hash.prototype.set=hashSet;function ListCache(entries){var index=-1,length=entries==null?0:entries.length;this.clear();while(++index<length){var entry=entries[index];this.set(entry[0],entry[1]);}}
function listCacheClear(){this.__data__=[];this.size=0;}
function listCacheDelete(key){var data=this.__data__,index=assocIndexOf(data,key);if(index<0){return false;}
var lastIndex=data.length-1;if(index==lastIndex){data.pop();}else{splice.call(data,index,1);}
--this.size;return true;}
function listCacheGet(key){var data=this.__data__,index=assocIndexOf(data,key);return index<0?undefined:data[index][1];}
function listCacheHas(key){return assocIndexOf(this.__data__,key)>-1;}
function listCacheSet(key,value){var data=this.__data__,index=assocIndexOf(data,key);if(index<0){++this.size;data.push([key,value]);}else{data[index][1]=value;}
return this;}
ListCache.prototype.clear=listCacheClear;ListCache.prototype['delete']=listCacheDelete;ListCache.prototype.get=listCacheGet;ListCache.prototype.has=listCacheHas;ListCache.prototype.set=listCacheSet;function MapCache(entries){var index=-1,length=entries==null?0:entries.length;this.clear();while(++index<length){var entry=entries[index];this.set(entry[0],entry[1]);}}
function mapCacheClear(){this.size=0;this.__data__={'hash':new Hash,'map':new(Map||ListCache),'string':new Hash};}
function mapCacheDelete(key){var result=getMapData(this,key)['delete'](key);this.size-=result?1:0;return result;}
function mapCacheGet(key){return getMapData(this,key).get(key);}
function mapCacheHas(key){return getMapData(this,key).has(key);}
function mapCacheSet(key,value){var data=getMapData(this,key),size=data.size;data.set(key,value);this.size+=data.size==size?0:1;return this;}
MapCache.prototype.clear=mapCacheClear;MapCache.prototype['delete']=mapCacheDelete;MapCache.prototype.get=mapCacheGet;MapCache.prototype.has=mapCacheHas;MapCache.prototype.set=mapCacheSet;function SetCache(values){var index=-1,length=values==null?0:values.length;this.__data__=new MapCache;while(++index<length){this.add(values[index]);}}
function setCacheAdd(value){this.__data__.set(value,HASH_UNDEFINED);return this;}
function setCacheHas(value){return this.__data__.has(value);}
SetCache.prototype.add=SetCache.prototype.push=setCacheAdd;SetCache.prototype.has=setCacheHas;function Stack(entries){var data=this.__data__=new ListCache(entries);this.size=data.size;}
function stackClear(){this.__data__=new ListCache;this.size=0;}
function stackDelete(key){var data=this.__data__,result=data['delete'](key);this.size=data.size;return result;}
function stackGet(key){return this.__data__.get(key);}
function stackHas(key){return this.__data__.has(key);}
function stackSet(key,value){var data=this.__data__;if(data instanceof ListCache){var pairs=data.__data__;if(!Map||(pairs.length<LARGE_ARRAY_SIZE-1)){pairs.push([key,value]);this.size=++data.size;return this;}
data=this.__data__=new MapCache(pairs);}
data.set(key,value);this.size=data.size;return this;}
Stack.prototype.clear=stackClear;Stack.prototype['delete']=stackDelete;Stack.prototype.get=stackGet;Stack.prototype.has=stackHas;Stack.prototype.set=stackSet;function arrayLikeKeys(value,inherited){var isArr=isArray(value),isArg=!isArr&&isArguments(value),isBuff=!isArr&&!isArg&&isBuffer(value),isType=!isArr&&!isArg&&!isBuff&&isTypedArray(value),skipIndexes=isArr||isArg||isBuff||isType,result=skipIndexes?baseTimes(value.length,String):[],length=result.length;for(var key in value){if((inherited||hasOwnProperty.call(value,key))&&!(skipIndexes&&(key=='length'||(isBuff&&(key=='offset'||key=='parent'))||(isType&&(key=='buffer'||key=='byteLength'||key=='byteOffset'))||isIndex(key,length)))){result.push(key);}}
return result;}
function arraySample(array){var length=array.length;return length?array[baseRandom(0,length-1)]:undefined;}
function arraySampleSize(array,n){return shuffleSelf(copyArray(array),baseClamp(n,0,array.length));}
function arrayShuffle(array){return shuffleSelf(copyArray(array));}
function assignMergeValue(object,key,value){if((value!==undefined&&!eq(object[key],value))||(value===undefined&&!(key in object))){baseAssignValue(object,key,value);}}
function assignValue(object,key,value){var objValue=object[key];if(!(hasOwnProperty.call(object,key)&&eq(objValue,value))||(value===undefined&&!(key in object))){baseAssignValue(object,key,value);}}
function assocIndexOf(array,key){var length=array.length;while(length--){if(eq(array[length][0],key)){return length;}}
return-1;}
function baseAggregator(collection,setter,iteratee,accumulator){baseEach(collection,function(value,key,collection){setter(accumulator,value,iteratee(value),collection);});return accumulator;}
function baseAssign(object,source){return object&&copyObject(source,keys(source),object);}
function baseAssignIn(object,source){return object&&copyObject(source,keysIn(source),object);}
function baseAssignValue(object,key,value){if(key=='__proto__'&&defineProperty){defineProperty(object,key,{'configurable':true,'enumerable':true,'value':value,'writable':true});}else{object[key]=value;}}
function baseAt(object,paths){var index=-1,length=paths.length,result=Array(length),skip=object==null;while(++index<length){result[index]=skip?undefined:get(object,paths[index]);}
return result;}
function baseClamp(number,lower,upper){if(number===number){if(upper!==undefined){number=number<=upper?number:upper;}
if(lower!==undefined){number=number>=lower?number:lower;}}
return number;}
function baseClone(value,bitmask,customizer,key,object,stack){var result,isDeep=bitmask&CLONE_DEEP_FLAG,isFlat=bitmask&CLONE_FLAT_FLAG,isFull=bitmask&CLONE_SYMBOLS_FLAG;if(customizer){result=object?customizer(value,key,object,stack):customizer(value);}
if(result!==undefined){return result;}
if(!isObject(value)){return value;}
var isArr=isArray(value);if(isArr){result=initCloneArray(value);if(!isDeep){return copyArray(value,result);}}else{var tag=getTag(value),isFunc=tag==funcTag||tag==genTag;if(isBuffer(value)){return cloneBuffer(value,isDeep);}
if(tag==objectTag||tag==argsTag||(isFunc&&!object)){result=(isFlat||isFunc)?{}:initCloneObject(value);if(!isDeep){return isFlat?copySymbolsIn(value,baseAssignIn(result,value)):copySymbols(value,baseAssign(result,value));}}else{if(!cloneableTags[tag]){return object?value:{};}
result=initCloneByTag(value,tag,isDeep);}}
stack||(stack=new Stack);var stacked=stack.get(value);if(stacked){return stacked;}
stack.set(value,result);if(isSet(value)){value.forEach(function(subValue){result.add(baseClone(subValue,bitmask,customizer,subValue,value,stack));});}else if(isMap(value)){value.forEach(function(subValue,key){result.set(key,baseClone(subValue,bitmask,customizer,key,value,stack));});}
var keysFunc=isFull?(isFlat?getAllKeysIn:getAllKeys):(isFlat?keysIn:keys);var props=isArr?undefined:keysFunc(value);arrayEach(props||value,function(subValue,key){if(props){key=subValue;subValue=value[key];}
assignValue(result,key,baseClone(subValue,bitmask,customizer,key,value,stack));});return result;}
function baseConforms(source){var props=keys(source);return function(object){return baseConformsTo(object,source,props);};}
function baseConformsTo(object,source,props){var length=props.length;if(object==null){return!length;}
object=Object(object);while(length--){var key=props[length],predicate=source[key],value=object[key];if((value===undefined&&!(key in object))||!predicate(value)){return false;}}
return true;}
function baseDelay(func,wait,args){if(typeof func!='function'){throw new TypeError(FUNC_ERROR_TEXT);}
return setTimeout(function(){func.apply(undefined,args);},wait);}
function baseDifference(array,values,iteratee,comparator){var index=-1,includes=arrayIncludes,isCommon=true,length=array.length,result=[],valuesLength=values.length;if(!length){return result;}
if(iteratee){values=arrayMap(values,baseUnary(iteratee));}
if(comparator){includes=arrayIncludesWith;isCommon=false;}
else if(values.length>=LARGE_ARRAY_SIZE){includes=cacheHas;isCommon=false;values=new SetCache(values);}
outer:while(++index<length){var value=array[index],computed=iteratee==null?value:iteratee(value);value=(comparator||value!==0)?value:0;if(isCommon&&computed===computed){var valuesIndex=valuesLength;while(valuesIndex--){if(values[valuesIndex]===computed){continue outer;}}
result.push(value);}
else if(!includes(values,computed,comparator)){result.push(value);}}
return result;}
var baseEach=createBaseEach(baseForOwn);var baseEachRight=createBaseEach(baseForOwnRight,true);function baseEvery(collection,predicate){var result=true;baseEach(collection,function(value,index,collection){result=!!predicate(value,index,collection);return result;});return result;}
function baseExtremum(array,iteratee,comparator){var index=-1,length=array.length;while(++index<length){var value=array[index],current=iteratee(value);if(current!=null&&(computed===undefined?(current===current&&!isSymbol(current)):comparator(current,computed))){var computed=current,result=value;}}
return result;}
function baseFill(array,value,start,end){var length=array.length;start=toInteger(start);if(start<0){start=-start>length?0:(length+start);}
end=(end===undefined||end>length)?length:toInteger(end);if(end<0){end+=length;}
end=start>end?0:toLength(end);while(start<end){array[start++]=value;}
return array;}
function baseFilter(collection,predicate){var result=[];baseEach(collection,function(value,index,collection){if(predicate(value,index,collection)){result.push(value);}});return result;}
function baseFlatten(array,depth,predicate,isStrict,result){var index=-1,length=array.length;predicate||(predicate=isFlattenable);result||(result=[]);while(++index<length){var value=array[index];if(depth>0&&predicate(value)){if(depth>1){baseFlatten(value,depth-1,predicate,isStrict,result);}else{arrayPush(result,value);}}else if(!isStrict){result[result.length]=value;}}
return result;}
var baseFor=createBaseFor();var baseForRight=createBaseFor(true);function baseForOwn(object,iteratee){return object&&baseFor(object,iteratee,keys);}
function baseForOwnRight(object,iteratee){return object&&baseForRight(object,iteratee,keys);}
function baseFunctions(object,props){return arrayFilter(props,function(key){return isFunction(object[key]);});}
function baseGet(object,path){path=castPath(path,object);var index=0,length=path.length;while(object!=null&&index<length){object=object[toKey(path[index++])];}
return(index&&index==length)?object:undefined;}
function baseGetAllKeys(object,keysFunc,symbolsFunc){var result=keysFunc(object);return isArray(object)?result:arrayPush(result,symbolsFunc(object));}
function baseGetTag(value){if(value==null){return value===undefined?undefinedTag:nullTag;}
return(symToStringTag&&symToStringTag in Object(value))?getRawTag(value):objectToString(value);}
function baseGt(value,other){return value>other;}
function baseHas(object,key){return object!=null&&hasOwnProperty.call(object,key);}
function baseHasIn(object,key){return object!=null&&key in Object(object);}
function baseInRange(number,start,end){return number>=nativeMin(start,end)&&number<nativeMax(start,end);}
function baseIntersection(arrays,iteratee,comparator){var includes=comparator?arrayIncludesWith:arrayIncludes,length=arrays[0].length,othLength=arrays.length,othIndex=othLength,caches=Array(othLength),maxLength=Infinity,result=[];while(othIndex--){var array=arrays[othIndex];if(othIndex&&iteratee){array=arrayMap(array,baseUnary(iteratee));}
maxLength=nativeMin(array.length,maxLength);caches[othIndex]=!comparator&&(iteratee||(length>=120&&array.length>=120))?new SetCache(othIndex&&array):undefined;}
array=arrays[0];var index=-1,seen=caches[0];outer:while(++index<length&&result.length<maxLength){var value=array[index],computed=iteratee?iteratee(value):value;value=(comparator||value!==0)?value:0;if(!(seen?cacheHas(seen,computed):includes(result,computed,comparator))){othIndex=othLength;while(--othIndex){var cache=caches[othIndex];if(!(cache?cacheHas(cache,computed):includes(arrays[othIndex],computed,comparator))){continue outer;}}
if(seen){seen.push(computed);}
result.push(value);}}
return result;}
function baseInverter(object,setter,iteratee,accumulator){baseForOwn(object,function(value,key,object){setter(accumulator,iteratee(value),key,object);});return accumulator;}
function baseInvoke(object,path,args){path=castPath(path,object);object=parent(object,path);var func=object==null?object:object[toKey(last(path))];return func==null?undefined:apply(func,object,args);}
function baseIsArguments(value){return isObjectLike(value)&&baseGetTag(value)==argsTag;}
function baseIsArrayBuffer(value){return isObjectLike(value)&&baseGetTag(value)==arrayBufferTag;}
function baseIsDate(value){return isObjectLike(value)&&baseGetTag(value)==dateTag;}
function baseIsEqual(value,other,bitmask,customizer,stack){if(value===other){return true;}
if(value==null||other==null||(!isObjectLike(value)&&!isObjectLike(other))){return value!==value&&other!==other;}
return baseIsEqualDeep(value,other,bitmask,customizer,baseIsEqual,stack);}
function baseIsEqualDeep(object,other,bitmask,customizer,equalFunc,stack){var objIsArr=isArray(object),othIsArr=isArray(other),objTag=objIsArr?arrayTag:getTag(object),othTag=othIsArr?arrayTag:getTag(other);objTag=objTag==argsTag?objectTag:objTag;othTag=othTag==argsTag?objectTag:othTag;var objIsObj=objTag==objectTag,othIsObj=othTag==objectTag,isSameTag=objTag==othTag;if(isSameTag&&isBuffer(object)){if(!isBuffer(other)){return false;}
objIsArr=true;objIsObj=false;}
if(isSameTag&&!objIsObj){stack||(stack=new Stack);return(objIsArr||isTypedArray(object))?equalArrays(object,other,bitmask,customizer,equalFunc,stack):equalByTag(object,other,objTag,bitmask,customizer,equalFunc,stack);}
if(!(bitmask&COMPARE_PARTIAL_FLAG)){var objIsWrapped=objIsObj&&hasOwnProperty.call(object,'__wrapped__'),othIsWrapped=othIsObj&&hasOwnProperty.call(other,'__wrapped__');if(objIsWrapped||othIsWrapped){var objUnwrapped=objIsWrapped?object.value():object,othUnwrapped=othIsWrapped?other.value():other;stack||(stack=new Stack);return equalFunc(objUnwrapped,othUnwrapped,bitmask,customizer,stack);}}
if(!isSameTag){return false;}
stack||(stack=new Stack);return equalObjects(object,other,bitmask,customizer,equalFunc,stack);}
function baseIsMap(value){return isObjectLike(value)&&getTag(value)==mapTag;}
function baseIsMatch(object,source,matchData,customizer){var index=matchData.length,length=index,noCustomizer=!customizer;if(object==null){return!length;}
object=Object(object);while(index--){var data=matchData[index];if((noCustomizer&&data[2])?data[1]!==object[data[0]]:!(data[0]in object)){return false;}}
while(++index<length){data=matchData[index];var key=data[0],objValue=object[key],srcValue=data[1];if(noCustomizer&&data[2]){if(objValue===undefined&&!(key in object)){return false;}}else{var stack=new Stack;if(customizer){var result=customizer(objValue,srcValue,key,object,source,stack);}
if(!(result===undefined?baseIsEqual(srcValue,objValue,COMPARE_PARTIAL_FLAG|COMPARE_UNORDERED_FLAG,customizer,stack):result)){return false;}}}
return true;}
function baseIsNative(value){if(!isObject(value)||isMasked(value)){return false;}
var pattern=isFunction(value)?reIsNative:reIsHostCtor;return pattern.test(toSource(value));}
function baseIsRegExp(value){return isObjectLike(value)&&baseGetTag(value)==regexpTag;}
function baseIsSet(value){return isObjectLike(value)&&getTag(value)==setTag;}
function baseIsTypedArray(value){return isObjectLike(value)&&isLength(value.length)&&!!typedArrayTags[baseGetTag(value)];}
function baseIteratee(value){if(typeof value=='function'){return value;}
if(value==null){return identity;}
if(typeof value=='object'){return isArray(value)?baseMatchesProperty(value[0],value[1]):baseMatches(value);}
return property(value);}
function baseKeys(object){if(!isPrototype(object)){return nativeKeys(object);}
var result=[];for(var key in Object(object)){if(hasOwnProperty.call(object,key)&&key!='constructor'){result.push(key);}}
return result;}
function baseKeysIn(object){if(!isObject(object)){return nativeKeysIn(object);}
var isProto=isPrototype(object),result=[];for(var key in object){if(!(key=='constructor'&&(isProto||!hasOwnProperty.call(object,key)))){result.push(key);}}
return result;}
function baseLt(value,other){return value<other;}
function baseMap(collection,iteratee){var index=-1,result=isArrayLike(collection)?Array(collection.length):[];baseEach(collection,function(value,key,collection){result[++index]=iteratee(value,key,collection);});return result;}
function baseMatches(source){var matchData=getMatchData(source);if(matchData.length==1&&matchData[0][2]){return matchesStrictComparable(matchData[0][0],matchData[0][1]);}
return function(object){return object===source||baseIsMatch(object,source,matchData);};}
function baseMatchesProperty(path,srcValue){if(isKey(path)&&isStrictComparable(srcValue)){return matchesStrictComparable(toKey(path),srcValue);}
return function(object){var objValue=get(object,path);return(objValue===undefined&&objValue===srcValue)?hasIn(object,path):baseIsEqual(srcValue,objValue,COMPARE_PARTIAL_FLAG|COMPARE_UNORDERED_FLAG);};}
function baseMerge(object,source,srcIndex,customizer,stack){if(object===source){return;}
baseFor(source,function(srcValue,key){stack||(stack=new Stack);if(isObject(srcValue)){baseMergeDeep(object,source,key,srcIndex,baseMerge,customizer,stack);}
else{var newValue=customizer?customizer(safeGet(object,key),srcValue,(key+''),object,source,stack):undefined;if(newValue===undefined){newValue=srcValue;}
assignMergeValue(object,key,newValue);}},keysIn);}
function baseMergeDeep(object,source,key,srcIndex,mergeFunc,customizer,stack){var objValue=safeGet(object,key),srcValue=safeGet(source,key),stacked=stack.get(srcValue);if(stacked){assignMergeValue(object,key,stacked);return;}
var newValue=customizer?customizer(objValue,srcValue,(key+''),object,source,stack):undefined;var isCommon=newValue===undefined;if(isCommon){var isArr=isArray(srcValue),isBuff=!isArr&&isBuffer(srcValue),isTyped=!isArr&&!isBuff&&isTypedArray(srcValue);newValue=srcValue;if(isArr||isBuff||isTyped){if(isArray(objValue)){newValue=objValue;}
else if(isArrayLikeObject(objValue)){newValue=copyArray(objValue);}
else if(isBuff){isCommon=false;newValue=cloneBuffer(srcValue,true);}
else if(isTyped){isCommon=false;newValue=cloneTypedArray(srcValue,true);}
else{newValue=[];}}
else if(isPlainObject(srcValue)||isArguments(srcValue)){newValue=objValue;if(isArguments(objValue)){newValue=toPlainObject(objValue);}
else if(!isObject(objValue)||isFunction(objValue)){newValue=initCloneObject(srcValue);}}
else{isCommon=false;}}
if(isCommon){stack.set(srcValue,newValue);mergeFunc(newValue,srcValue,srcIndex,customizer,stack);stack['delete'](srcValue);}
assignMergeValue(object,key,newValue);}
function baseNth(array,n){var length=array.length;if(!length){return;}
n+=n<0?length:0;return isIndex(n,length)?array[n]:undefined;}
function baseOrderBy(collection,iteratees,orders){if(iteratees.length){iteratees=arrayMap(iteratees,function(iteratee){if(isArray(iteratee)){return function(value){return baseGet(value,iteratee.length===1?iteratee[0]:iteratee);}}
return iteratee;});}else{iteratees=[identity];}
var index=-1;iteratees=arrayMap(iteratees,baseUnary(getIteratee()));var result=baseMap(collection,function(value,key,collection){var criteria=arrayMap(iteratees,function(iteratee){return iteratee(value);});return{'criteria':criteria,'index':++index,'value':value};});return baseSortBy(result,function(object,other){return compareMultiple(object,other,orders);});}
function basePick(object,paths){return basePickBy(object,paths,function(value,path){return hasIn(object,path);});}
function basePickBy(object,paths,predicate){var index=-1,length=paths.length,result={};while(++index<length){var path=paths[index],value=baseGet(object,path);if(predicate(value,path)){baseSet(result,castPath(path,object),value);}}
return result;}
function basePropertyDeep(path){return function(object){return baseGet(object,path);};}
function basePullAll(array,values,iteratee,comparator){var indexOf=comparator?baseIndexOfWith:baseIndexOf,index=-1,length=values.length,seen=array;if(array===values){values=copyArray(values);}
if(iteratee){seen=arrayMap(array,baseUnary(iteratee));}
while(++index<length){var fromIndex=0,value=values[index],computed=iteratee?iteratee(value):value;while((fromIndex=indexOf(seen,computed,fromIndex,comparator))>-1){if(seen!==array){splice.call(seen,fromIndex,1);}
splice.call(array,fromIndex,1);}}
return array;}
function basePullAt(array,indexes){var length=array?indexes.length:0,lastIndex=length-1;while(length--){var index=indexes[length];if(length==lastIndex||index!==previous){var previous=index;if(isIndex(index)){splice.call(array,index,1);}else{baseUnset(array,index);}}}
return array;}
function baseRandom(lower,upper){return lower+nativeFloor(nativeRandom()*(upper-lower+1));}
function baseRange(start,end,step,fromRight){var index=-1,length=nativeMax(nativeCeil((end-start)/(step||1)),0),result=Array(length);while(length--){result[fromRight?length:++index]=start;start+=step;}
return result;}
function baseRepeat(string,n){var result='';if(!string||n<1||n>MAX_SAFE_INTEGER){return result;}
do{if(n%2){result+=string;}
n=nativeFloor(n/2);if(n){string+=string;}}while(n);return result;}
function baseRest(func,start){return setToString(overRest(func,start,identity),func+'');}
function baseSample(collection){return arraySample(values(collection));}
function baseSampleSize(collection,n){var array=values(collection);return shuffleSelf(array,baseClamp(n,0,array.length));}
function baseSet(object,path,value,customizer){if(!isObject(object)){return object;}
path=castPath(path,object);var index=-1,length=path.length,lastIndex=length-1,nested=object;while(nested!=null&&++index<length){var key=toKey(path[index]),newValue=value;if(key==='__proto__'||key==='constructor'||key==='prototype'){return object;}
if(index!=lastIndex){var objValue=nested[key];newValue=customizer?customizer(objValue,key,nested):undefined;if(newValue===undefined){newValue=isObject(objValue)?objValue:(isIndex(path[index+1])?[]:{});}}
assignValue(nested,key,newValue);nested=nested[key];}
return object;}
var baseSetData=!metaMap?identity:function(func,data){metaMap.set(func,data);return func;};var baseSetToString=!defineProperty?identity:function(func,string){return defineProperty(func,'toString',{'configurable':true,'enumerable':false,'value':constant(string),'writable':true});};function baseShuffle(collection){return shuffleSelf(values(collection));}
function baseSlice(array,start,end){var index=-1,length=array.length;if(start<0){start=-start>length?0:(length+start);}
end=end>length?length:end;if(end<0){end+=length;}
length=start>end?0:((end-start)>>>0);start>>>=0;var result=Array(length);while(++index<length){result[index]=array[index+start];}
return result;}
function baseSome(collection,predicate){var result;baseEach(collection,function(value,index,collection){result=predicate(value,index,collection);return!result;});return!!result;}
function baseSortedIndex(array,value,retHighest){var low=0,high=array==null?low:array.length;if(typeof value=='number'&&value===value&&high<=HALF_MAX_ARRAY_LENGTH){while(low<high){var mid=(low+high)>>>1,computed=array[mid];if(computed!==null&&!isSymbol(computed)&&(retHighest?(computed<=value):(computed<value))){low=mid+1;}else{high=mid;}}
return high;}
return baseSortedIndexBy(array,value,identity,retHighest);}
function baseSortedIndexBy(array,value,iteratee,retHighest){var low=0,high=array==null?0:array.length;if(high===0){return 0;}
value=iteratee(value);var valIsNaN=value!==value,valIsNull=value===null,valIsSymbol=isSymbol(value),valIsUndefined=value===undefined;while(low<high){var mid=nativeFloor((low+high)/2),computed=iteratee(array[mid]),othIsDefined=computed!==undefined,othIsNull=computed===null,othIsReflexive=computed===computed,othIsSymbol=isSymbol(computed);if(valIsNaN){var setLow=retHighest||othIsReflexive;}else if(valIsUndefined){setLow=othIsReflexive&&(retHighest||othIsDefined);}else if(valIsNull){setLow=othIsReflexive&&othIsDefined&&(retHighest||!othIsNull);}else if(valIsSymbol){setLow=othIsReflexive&&othIsDefined&&!othIsNull&&(retHighest||!othIsSymbol);}else if(othIsNull||othIsSymbol){setLow=false;}else{setLow=retHighest?(computed<=value):(computed<value);}
if(setLow){low=mid+1;}else{high=mid;}}
return nativeMin(high,MAX_ARRAY_INDEX);}
function baseSortedUniq(array,iteratee){var index=-1,length=array.length,resIndex=0,result=[];while(++index<length){var value=array[index],computed=iteratee?iteratee(value):value;if(!index||!eq(computed,seen)){var seen=computed;result[resIndex++]=value===0?0:value;}}
return result;}
function baseToNumber(value){if(typeof value=='number'){return value;}
if(isSymbol(value)){return NAN;}
return+value;}
function baseToString(value){if(typeof value=='string'){return value;}
if(isArray(value)){return arrayMap(value,baseToString)+'';}
if(isSymbol(value)){return symbolToString?symbolToString.call(value):'';}
var result=(value+'');return(result=='0'&&(1/value)==-INFINITY)?'-0':result;}
function baseUniq(array,iteratee,comparator){var index=-1,includes=arrayIncludes,length=array.length,isCommon=true,result=[],seen=result;if(comparator){isCommon=false;includes=arrayIncludesWith;}
else if(length>=LARGE_ARRAY_SIZE){var set=iteratee?null:createSet(array);if(set){return setToArray(set);}
isCommon=false;includes=cacheHas;seen=new SetCache;}
else{seen=iteratee?[]:result;}
outer:while(++index<length){var value=array[index],computed=iteratee?iteratee(value):value;value=(comparator||value!==0)?value:0;if(isCommon&&computed===computed){var seenIndex=seen.length;while(seenIndex--){if(seen[seenIndex]===computed){continue outer;}}
if(iteratee){seen.push(computed);}
result.push(value);}
else if(!includes(seen,computed,comparator)){if(seen!==result){seen.push(computed);}
result.push(value);}}
return result;}
function baseUnset(object,path){path=castPath(path,object);object=parent(object,path);return object==null||delete object[toKey(last(path))];}
function baseUpdate(object,path,updater,customizer){return baseSet(object,path,updater(baseGet(object,path)),customizer);}
function baseWhile(array,predicate,isDrop,fromRight){var length=array.length,index=fromRight?length:-1;while((fromRight?index--:++index<length)&&predicate(array[index],index,array)){}
return isDrop?baseSlice(array,(fromRight?0:index),(fromRight?index+1:length)):baseSlice(array,(fromRight?index+1:0),(fromRight?length:index));}
function baseWrapperValue(value,actions){var result=value;if(result instanceof LazyWrapper){result=result.value();}
return arrayReduce(actions,function(result,action){return action.func.apply(action.thisArg,arrayPush([result],action.args));},result);}
function baseXor(arrays,iteratee,comparator){var length=arrays.length;if(length<2){return length?baseUniq(arrays[0]):[];}
var index=-1,result=Array(length);while(++index<length){var array=arrays[index],othIndex=-1;while(++othIndex<length){if(othIndex!=index){result[index]=baseDifference(result[index]||array,arrays[othIndex],iteratee,comparator);}}}
return baseUniq(baseFlatten(result,1),iteratee,comparator);}
function baseZipObject(props,values,assignFunc){var index=-1,length=props.length,valsLength=values.length,result={};while(++index<length){var value=index<valsLength?values[index]:undefined;assignFunc(result,props[index],value);}
return result;}
function castArrayLikeObject(value){return isArrayLikeObject(value)?value:[];}
function castFunction(value){return typeof value=='function'?value:identity;}
function castPath(value,object){if(isArray(value)){return value;}
return isKey(value,object)?[value]:stringToPath(toString(value));}
var castRest=baseRest;function castSlice(array,start,end){var length=array.length;end=end===undefined?length:end;return(!start&&end>=length)?array:baseSlice(array,start,end);}
var clearTimeout=ctxClearTimeout||function(id){return root.clearTimeout(id);};function cloneBuffer(buffer,isDeep){if(isDeep){return buffer.slice();}
var length=buffer.length,result=allocUnsafe?allocUnsafe(length):new buffer.constructor(length);buffer.copy(result);return result;}
function cloneArrayBuffer(arrayBuffer){var result=new arrayBuffer.constructor(arrayBuffer.byteLength);new Uint8Array(result).set(new Uint8Array(arrayBuffer));return result;}
function cloneDataView(dataView,isDeep){var buffer=isDeep?cloneArrayBuffer(dataView.buffer):dataView.buffer;return new dataView.constructor(buffer,dataView.byteOffset,dataView.byteLength);}
function cloneRegExp(regexp){var result=new regexp.constructor(regexp.source,reFlags.exec(regexp));result.lastIndex=regexp.lastIndex;return result;}
function cloneSymbol(symbol){return symbolValueOf?Object(symbolValueOf.call(symbol)):{};}
function cloneTypedArray(typedArray,isDeep){var buffer=isDeep?cloneArrayBuffer(typedArray.buffer):typedArray.buffer;return new typedArray.constructor(buffer,typedArray.byteOffset,typedArray.length);}
function compareAscending(value,other){if(value!==other){var valIsDefined=value!==undefined,valIsNull=value===null,valIsReflexive=value===value,valIsSymbol=isSymbol(value);var othIsDefined=other!==undefined,othIsNull=other===null,othIsReflexive=other===other,othIsSymbol=isSymbol(other);if((!othIsNull&&!othIsSymbol&&!valIsSymbol&&value>other)||(valIsSymbol&&othIsDefined&&othIsReflexive&&!othIsNull&&!othIsSymbol)||(valIsNull&&othIsDefined&&othIsReflexive)||(!valIsDefined&&othIsReflexive)||!valIsReflexive){return 1;}
if((!valIsNull&&!valIsSymbol&&!othIsSymbol&&value<other)||(othIsSymbol&&valIsDefined&&valIsReflexive&&!valIsNull&&!valIsSymbol)||(othIsNull&&valIsDefined&&valIsReflexive)||(!othIsDefined&&valIsReflexive)||!othIsReflexive){return-1;}}
return 0;}
function compareMultiple(object,other,orders){var index=-1,objCriteria=object.criteria,othCriteria=other.criteria,length=objCriteria.length,ordersLength=orders.length;while(++index<length){var result=compareAscending(objCriteria[index],othCriteria[index]);if(result){if(index>=ordersLength){return result;}
var order=orders[index];return result*(order=='desc'?-1:1);}}
return object.index-other.index;}
function composeArgs(args,partials,holders,isCurried){var argsIndex=-1,argsLength=args.length,holdersLength=holders.length,leftIndex=-1,leftLength=partials.length,rangeLength=nativeMax(argsLength-holdersLength,0),result=Array(leftLength+rangeLength),isUncurried=!isCurried;while(++leftIndex<leftLength){result[leftIndex]=partials[leftIndex];}
while(++argsIndex<holdersLength){if(isUncurried||argsIndex<argsLength){result[holders[argsIndex]]=args[argsIndex];}}
while(rangeLength--){result[leftIndex++]=args[argsIndex++];}
return result;}
function composeArgsRight(args,partials,holders,isCurried){var argsIndex=-1,argsLength=args.length,holdersIndex=-1,holdersLength=holders.length,rightIndex=-1,rightLength=partials.length,rangeLength=nativeMax(argsLength-holdersLength,0),result=Array(rangeLength+rightLength),isUncurried=!isCurried;while(++argsIndex<rangeLength){result[argsIndex]=args[argsIndex];}
var offset=argsIndex;while(++rightIndex<rightLength){result[offset+rightIndex]=partials[rightIndex];}
while(++holdersIndex<holdersLength){if(isUncurried||argsIndex<argsLength){result[offset+holders[holdersIndex]]=args[argsIndex++];}}
return result;}
function copyArray(source,array){var index=-1,length=source.length;array||(array=Array(length));while(++index<length){array[index]=source[index];}
return array;}
function copyObject(source,props,object,customizer){var isNew=!object;object||(object={});var index=-1,length=props.length;while(++index<length){var key=props[index];var newValue=customizer?customizer(object[key],source[key],key,object,source):undefined;if(newValue===undefined){newValue=source[key];}
if(isNew){baseAssignValue(object,key,newValue);}else{assignValue(object,key,newValue);}}
return object;}
function copySymbols(source,object){return copyObject(source,getSymbols(source),object);}
function copySymbolsIn(source,object){return copyObject(source,getSymbolsIn(source),object);}
function createAggregator(setter,initializer){return function(collection,iteratee){var func=isArray(collection)?arrayAggregator:baseAggregator,accumulator=initializer?initializer():{};return func(collection,setter,getIteratee(iteratee,2),accumulator);};}
function createAssigner(assigner){return baseRest(function(object,sources){var index=-1,length=sources.length,customizer=length>1?sources[length-1]:undefined,guard=length>2?sources[2]:undefined;customizer=(assigner.length>3&&typeof customizer=='function')?(length--,customizer):undefined;if(guard&&isIterateeCall(sources[0],sources[1],guard)){customizer=length<3?undefined:customizer;length=1;}
object=Object(object);while(++index<length){var source=sources[index];if(source){assigner(object,source,index,customizer);}}
return object;});}
function createBaseEach(eachFunc,fromRight){return function(collection,iteratee){if(collection==null){return collection;}
if(!isArrayLike(collection)){return eachFunc(collection,iteratee);}
var length=collection.length,index=fromRight?length:-1,iterable=Object(collection);while((fromRight?index--:++index<length)){if(iteratee(iterable[index],index,iterable)===false){break;}}
return collection;};}
function createBaseFor(fromRight){return function(object,iteratee,keysFunc){var index=-1,iterable=Object(object),props=keysFunc(object),length=props.length;while(length--){var key=props[fromRight?length:++index];if(iteratee(iterable[key],key,iterable)===false){break;}}
return object;};}
function createBind(func,bitmask,thisArg){var isBind=bitmask&WRAP_BIND_FLAG,Ctor=createCtor(func);function wrapper(){var fn=(this&&this!==root&&this instanceof wrapper)?Ctor:func;return fn.apply(isBind?thisArg:this,arguments);}
return wrapper;}
function createCaseFirst(methodName){return function(string){string=toString(string);var strSymbols=hasUnicode(string)?stringToArray(string):undefined;var chr=strSymbols?strSymbols[0]:string.charAt(0);var trailing=strSymbols?castSlice(strSymbols,1).join(''):string.slice(1);return chr[methodName]()+trailing;};}
function createCompounder(callback){return function(string){return arrayReduce(words(deburr(string).replace(reApos,'')),callback,'');};}
function createCtor(Ctor){return function(){var args=arguments;switch(args.length){case 0:return new Ctor;case 1:return new Ctor(args[0]);case 2:return new Ctor(args[0],args[1]);case 3:return new Ctor(args[0],args[1],args[2]);case 4:return new Ctor(args[0],args[1],args[2],args[3]);case 5:return new Ctor(args[0],args[1],args[2],args[3],args[4]);case 6:return new Ctor(args[0],args[1],args[2],args[3],args[4],args[5]);case 7:return new Ctor(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);}
var thisBinding=baseCreate(Ctor.prototype),result=Ctor.apply(thisBinding,args);return isObject(result)?result:thisBinding;};}
function createCurry(func,bitmask,arity){var Ctor=createCtor(func);function wrapper(){var length=arguments.length,args=Array(length),index=length,placeholder=getHolder(wrapper);while(index--){args[index]=arguments[index];}
var holders=(length<3&&args[0]!==placeholder&&args[length-1]!==placeholder)?[]:replaceHolders(args,placeholder);length-=holders.length;if(length<arity){return createRecurry(func,bitmask,createHybrid,wrapper.placeholder,undefined,args,holders,undefined,undefined,arity-length);}
var fn=(this&&this!==root&&this instanceof wrapper)?Ctor:func;return apply(fn,this,args);}
return wrapper;}
function createFind(findIndexFunc){return function(collection,predicate,fromIndex){var iterable=Object(collection);if(!isArrayLike(collection)){var iteratee=getIteratee(predicate,3);collection=keys(collection);predicate=function(key){return iteratee(iterable[key],key,iterable);};}
var index=findIndexFunc(collection,predicate,fromIndex);return index>-1?iterable[iteratee?collection[index]:index]:undefined;};}
function createFlow(fromRight){return flatRest(function(funcs){var length=funcs.length,index=length,prereq=LodashWrapper.prototype.thru;if(fromRight){funcs.reverse();}
while(index--){var func=funcs[index];if(typeof func!='function'){throw new TypeError(FUNC_ERROR_TEXT);}
if(prereq&&!wrapper&&getFuncName(func)=='wrapper'){var wrapper=new LodashWrapper([],true);}}
index=wrapper?index:length;while(++index<length){func=funcs[index];var funcName=getFuncName(func),data=funcName=='wrapper'?getData(func):undefined;if(data&&isLaziable(data[0])&&data[1]==(WRAP_ARY_FLAG|WRAP_CURRY_FLAG|WRAP_PARTIAL_FLAG|WRAP_REARG_FLAG)&&!data[4].length&&data[9]==1){wrapper=wrapper[getFuncName(data[0])].apply(wrapper,data[3]);}else{wrapper=(func.length==1&&isLaziable(func))?wrapper[funcName]():wrapper.thru(func);}}
return function(){var args=arguments,value=args[0];if(wrapper&&args.length==1&&isArray(value)){return wrapper.plant(value).value();}
var index=0,result=length?funcs[index].apply(this,args):value;while(++index<length){result=funcs[index].call(this,result);}
return result;};});}
function createHybrid(func,bitmask,thisArg,partials,holders,partialsRight,holdersRight,argPos,ary,arity){var isAry=bitmask&WRAP_ARY_FLAG,isBind=bitmask&WRAP_BIND_FLAG,isBindKey=bitmask&WRAP_BIND_KEY_FLAG,isCurried=bitmask&(WRAP_CURRY_FLAG|WRAP_CURRY_RIGHT_FLAG),isFlip=bitmask&WRAP_FLIP_FLAG,Ctor=isBindKey?undefined:createCtor(func);function wrapper(){var length=arguments.length,args=Array(length),index=length;while(index--){args[index]=arguments[index];}
if(isCurried){var placeholder=getHolder(wrapper),holdersCount=countHolders(args,placeholder);}
if(partials){args=composeArgs(args,partials,holders,isCurried);}
if(partialsRight){args=composeArgsRight(args,partialsRight,holdersRight,isCurried);}
length-=holdersCount;if(isCurried&&length<arity){var newHolders=replaceHolders(args,placeholder);return createRecurry(func,bitmask,createHybrid,wrapper.placeholder,thisArg,args,newHolders,argPos,ary,arity-length);}
var thisBinding=isBind?thisArg:this,fn=isBindKey?thisBinding[func]:func;length=args.length;if(argPos){args=reorder(args,argPos);}else if(isFlip&&length>1){args.reverse();}
if(isAry&&ary<length){args.length=ary;}
if(this&&this!==root&&this instanceof wrapper){fn=Ctor||createCtor(fn);}
return fn.apply(thisBinding,args);}
return wrapper;}
function createInverter(setter,toIteratee){return function(object,iteratee){return baseInverter(object,setter,toIteratee(iteratee),{});};}
function createMathOperation(operator,defaultValue){return function(value,other){var result;if(value===undefined&&other===undefined){return defaultValue;}
if(value!==undefined){result=value;}
if(other!==undefined){if(result===undefined){return other;}
if(typeof value=='string'||typeof other=='string'){value=baseToString(value);other=baseToString(other);}else{value=baseToNumber(value);other=baseToNumber(other);}
result=operator(value,other);}
return result;};}
function createOver(arrayFunc){return flatRest(function(iteratees){iteratees=arrayMap(iteratees,baseUnary(getIteratee()));return baseRest(function(args){var thisArg=this;return arrayFunc(iteratees,function(iteratee){return apply(iteratee,thisArg,args);});});});}
function createPadding(length,chars){chars=chars===undefined?' ':baseToString(chars);var charsLength=chars.length;if(charsLength<2){return charsLength?baseRepeat(chars,length):chars;}
var result=baseRepeat(chars,nativeCeil(length/stringSize(chars)));return hasUnicode(chars)?castSlice(stringToArray(result),0,length).join(''):result.slice(0,length);}
function createPartial(func,bitmask,thisArg,partials){var isBind=bitmask&WRAP_BIND_FLAG,Ctor=createCtor(func);function wrapper(){var argsIndex=-1,argsLength=arguments.length,leftIndex=-1,leftLength=partials.length,args=Array(leftLength+argsLength),fn=(this&&this!==root&&this instanceof wrapper)?Ctor:func;while(++leftIndex<leftLength){args[leftIndex]=partials[leftIndex];}
while(argsLength--){args[leftIndex++]=arguments[++argsIndex];}
return apply(fn,isBind?thisArg:this,args);}
return wrapper;}
function createRange(fromRight){return function(start,end,step){if(step&&typeof step!='number'&&isIterateeCall(start,end,step)){end=step=undefined;}
start=toFinite(start);if(end===undefined){end=start;start=0;}else{end=toFinite(end);}
step=step===undefined?(start<end?1:-1):toFinite(step);return baseRange(start,end,step,fromRight);};}
function createRelationalOperation(operator){return function(value,other){if(!(typeof value=='string'&&typeof other=='string')){value=toNumber(value);other=toNumber(other);}
return operator(value,other);};}
function createRecurry(func,bitmask,wrapFunc,placeholder,thisArg,partials,holders,argPos,ary,arity){var isCurry=bitmask&WRAP_CURRY_FLAG,newHolders=isCurry?holders:undefined,newHoldersRight=isCurry?undefined:holders,newPartials=isCurry?partials:undefined,newPartialsRight=isCurry?undefined:partials;bitmask|=(isCurry?WRAP_PARTIAL_FLAG:WRAP_PARTIAL_RIGHT_FLAG);bitmask&=~(isCurry?WRAP_PARTIAL_RIGHT_FLAG:WRAP_PARTIAL_FLAG);if(!(bitmask&WRAP_CURRY_BOUND_FLAG)){bitmask&=~(WRAP_BIND_FLAG|WRAP_BIND_KEY_FLAG);}
var newData=[func,bitmask,thisArg,newPartials,newHolders,newPartialsRight,newHoldersRight,argPos,ary,arity];var result=wrapFunc.apply(undefined,newData);if(isLaziable(func)){setData(result,newData);}
result.placeholder=placeholder;return setWrapToString(result,func,bitmask);}
function createRound(methodName){var func=Math[methodName];return function(number,precision){number=toNumber(number);precision=precision==null?0:nativeMin(toInteger(precision),292);if(precision&&nativeIsFinite(number)){var pair=(toString(number)+'e').split('e'),value=func(pair[0]+'e'+(+pair[1]+precision));pair=(toString(value)+'e').split('e');return+(pair[0]+'e'+(+pair[1]-precision));}
return func(number);};}
var createSet=!(Set&&(1/setToArray(new Set([,-0]))[1])==INFINITY)?noop:function(values){return new Set(values);};function createToPairs(keysFunc){return function(object){var tag=getTag(object);if(tag==mapTag){return mapToArray(object);}
if(tag==setTag){return setToPairs(object);}
return baseToPairs(object,keysFunc(object));};}
function createWrap(func,bitmask,thisArg,partials,holders,argPos,ary,arity){var isBindKey=bitmask&WRAP_BIND_KEY_FLAG;if(!isBindKey&&typeof func!='function'){throw new TypeError(FUNC_ERROR_TEXT);}
var length=partials?partials.length:0;if(!length){bitmask&=~(WRAP_PARTIAL_FLAG|WRAP_PARTIAL_RIGHT_FLAG);partials=holders=undefined;}
ary=ary===undefined?ary:nativeMax(toInteger(ary),0);arity=arity===undefined?arity:toInteger(arity);length-=holders?holders.length:0;if(bitmask&WRAP_PARTIAL_RIGHT_FLAG){var partialsRight=partials,holdersRight=holders;partials=holders=undefined;}
var data=isBindKey?undefined:getData(func);var newData=[func,bitmask,thisArg,partials,holders,partialsRight,holdersRight,argPos,ary,arity];if(data){mergeData(newData,data);}
func=newData[0];bitmask=newData[1];thisArg=newData[2];partials=newData[3];holders=newData[4];arity=newData[9]=newData[9]===undefined?(isBindKey?0:func.length):nativeMax(newData[9]-length,0);if(!arity&&bitmask&(WRAP_CURRY_FLAG|WRAP_CURRY_RIGHT_FLAG)){bitmask&=~(WRAP_CURRY_FLAG|WRAP_CURRY_RIGHT_FLAG);}
if(!bitmask||bitmask==WRAP_BIND_FLAG){var result=createBind(func,bitmask,thisArg);}else if(bitmask==WRAP_CURRY_FLAG||bitmask==WRAP_CURRY_RIGHT_FLAG){result=createCurry(func,bitmask,arity);}else if((bitmask==WRAP_PARTIAL_FLAG||bitmask==(WRAP_BIND_FLAG|WRAP_PARTIAL_FLAG))&&!holders.length){result=createPartial(func,bitmask,thisArg,partials);}else{result=createHybrid.apply(undefined,newData);}
var setter=data?baseSetData:setData;return setWrapToString(setter(result,newData),func,bitmask);}
function customDefaultsAssignIn(objValue,srcValue,key,object){if(objValue===undefined||(eq(objValue,objectProto[key])&&!hasOwnProperty.call(object,key))){return srcValue;}
return objValue;}
function customDefaultsMerge(objValue,srcValue,key,object,source,stack){if(isObject(objValue)&&isObject(srcValue)){stack.set(srcValue,objValue);baseMerge(objValue,srcValue,undefined,customDefaultsMerge,stack);stack['delete'](srcValue);}
return objValue;}
function customOmitClone(value){return isPlainObject(value)?undefined:value;}
function equalArrays(array,other,bitmask,customizer,equalFunc,stack){var isPartial=bitmask&COMPARE_PARTIAL_FLAG,arrLength=array.length,othLength=other.length;if(arrLength!=othLength&&!(isPartial&&othLength>arrLength)){return false;}
var arrStacked=stack.get(array);var othStacked=stack.get(other);if(arrStacked&&othStacked){return arrStacked==other&&othStacked==array;}
var index=-1,result=true,seen=(bitmask&COMPARE_UNORDERED_FLAG)?new SetCache:undefined;stack.set(array,other);stack.set(other,array);while(++index<arrLength){var arrValue=array[index],othValue=other[index];if(customizer){var compared=isPartial?customizer(othValue,arrValue,index,other,array,stack):customizer(arrValue,othValue,index,array,other,stack);}
if(compared!==undefined){if(compared){continue;}
result=false;break;}
if(seen){if(!arraySome(other,function(othValue,othIndex){if(!cacheHas(seen,othIndex)&&(arrValue===othValue||equalFunc(arrValue,othValue,bitmask,customizer,stack))){return seen.push(othIndex);}})){result=false;break;}}else if(!(arrValue===othValue||equalFunc(arrValue,othValue,bitmask,customizer,stack))){result=false;break;}}
stack['delete'](array);stack['delete'](other);return result;}
function equalByTag(object,other,tag,bitmask,customizer,equalFunc,stack){switch(tag){case dataViewTag:if((object.byteLength!=other.byteLength)||(object.byteOffset!=other.byteOffset)){return false;}
object=object.buffer;other=other.buffer;case arrayBufferTag:if((object.byteLength!=other.byteLength)||!equalFunc(new Uint8Array(object),new Uint8Array(other))){return false;}
return true;case boolTag:case dateTag:case numberTag:return eq(+object,+other);case errorTag:return object.name==other.name&&object.message==other.message;case regexpTag:case stringTag:return object==(other+'');case mapTag:var convert=mapToArray;case setTag:var isPartial=bitmask&COMPARE_PARTIAL_FLAG;convert||(convert=setToArray);if(object.size!=other.size&&!isPartial){return false;}
var stacked=stack.get(object);if(stacked){return stacked==other;}
bitmask|=COMPARE_UNORDERED_FLAG;stack.set(object,other);var result=equalArrays(convert(object),convert(other),bitmask,customizer,equalFunc,stack);stack['delete'](object);return result;case symbolTag:if(symbolValueOf){return symbolValueOf.call(object)==symbolValueOf.call(other);}}
return false;}
function equalObjects(object,other,bitmask,customizer,equalFunc,stack){var isPartial=bitmask&COMPARE_PARTIAL_FLAG,objProps=getAllKeys(object),objLength=objProps.length,othProps=getAllKeys(other),othLength=othProps.length;if(objLength!=othLength&&!isPartial){return false;}
var index=objLength;while(index--){var key=objProps[index];if(!(isPartial?key in other:hasOwnProperty.call(other,key))){return false;}}
var objStacked=stack.get(object);var othStacked=stack.get(other);if(objStacked&&othStacked){return objStacked==other&&othStacked==object;}
var result=true;stack.set(object,other);stack.set(other,object);var skipCtor=isPartial;while(++index<objLength){key=objProps[index];var objValue=object[key],othValue=other[key];if(customizer){var compared=isPartial?customizer(othValue,objValue,key,other,object,stack):customizer(objValue,othValue,key,object,other,stack);}
if(!(compared===undefined?(objValue===othValue||equalFunc(objValue,othValue,bitmask,customizer,stack)):compared)){result=false;break;}
skipCtor||(skipCtor=key=='constructor');}
if(result&&!skipCtor){var objCtor=object.constructor,othCtor=other.constructor;if(objCtor!=othCtor&&('constructor'in object&&'constructor'in other)&&!(typeof objCtor=='function'&&objCtor instanceof objCtor&&typeof othCtor=='function'&&othCtor instanceof othCtor)){result=false;}}
stack['delete'](object);stack['delete'](other);return result;}
function flatRest(func){return setToString(overRest(func,undefined,flatten),func+'');}
function getAllKeys(object){return baseGetAllKeys(object,keys,getSymbols);}
function getAllKeysIn(object){return baseGetAllKeys(object,keysIn,getSymbolsIn);}
var getData=!metaMap?noop:function(func){return metaMap.get(func);};function getFuncName(func){var result=(func.name+''),array=realNames[result],length=hasOwnProperty.call(realNames,result)?array.length:0;while(length--){var data=array[length],otherFunc=data.func;if(otherFunc==null||otherFunc==func){return data.name;}}
return result;}
function getHolder(func){var object=hasOwnProperty.call(lodash,'placeholder')?lodash:func;return object.placeholder;}
function getIteratee(){var result=lodash.iteratee||iteratee;result=result===iteratee?baseIteratee:result;return arguments.length?result(arguments[0],arguments[1]):result;}
function getMapData(map,key){var data=map.__data__;return isKeyable(key)?data[typeof key=='string'?'string':'hash']:data.map;}
function getMatchData(object){var result=keys(object),length=result.length;while(length--){var key=result[length],value=object[key];result[length]=[key,value,isStrictComparable(value)];}
return result;}
function getNative(object,key){var value=getValue(object,key);return baseIsNative(value)?value:undefined;}
function getRawTag(value){var isOwn=hasOwnProperty.call(value,symToStringTag),tag=value[symToStringTag];try{value[symToStringTag]=undefined;var unmasked=true;}catch(e){}
var result=nativeObjectToString.call(value);if(unmasked){if(isOwn){value[symToStringTag]=tag;}else{delete value[symToStringTag];}}
return result;}
var getSymbols=!nativeGetSymbols?stubArray:function(object){if(object==null){return[];}
object=Object(object);return arrayFilter(nativeGetSymbols(object),function(symbol){return propertyIsEnumerable.call(object,symbol);});};var getSymbolsIn=!nativeGetSymbols?stubArray:function(object){var result=[];while(object){arrayPush(result,getSymbols(object));object=getPrototype(object);}
return result;};var getTag=baseGetTag;if((DataView&&getTag(new DataView(new ArrayBuffer(1)))!=dataViewTag)||(Map&&getTag(new Map)!=mapTag)||(Promise&&getTag(Promise.resolve())!=promiseTag)||(Set&&getTag(new Set)!=setTag)||(WeakMap&&getTag(new WeakMap)!=weakMapTag)){getTag=function(value){var result=baseGetTag(value),Ctor=result==objectTag?value.constructor:undefined,ctorString=Ctor?toSource(Ctor):'';if(ctorString){switch(ctorString){case dataViewCtorString:return dataViewTag;case mapCtorString:return mapTag;case promiseCtorString:return promiseTag;case setCtorString:return setTag;case weakMapCtorString:return weakMapTag;}}
return result;};}
function getView(start,end,transforms){var index=-1,length=transforms.length;while(++index<length){var data=transforms[index],size=data.size;switch(data.type){case'drop':start+=size;break;case'dropRight':end-=size;break;case'take':end=nativeMin(end,start+size);break;case'takeRight':start=nativeMax(start,end-size);break;}}
return{'start':start,'end':end};}
function getWrapDetails(source){var match=source.match(reWrapDetails);return match?match[1].split(reSplitDetails):[];}
function hasPath(object,path,hasFunc){path=castPath(path,object);var index=-1,length=path.length,result=false;while(++index<length){var key=toKey(path[index]);if(!(result=object!=null&&hasFunc(object,key))){break;}
object=object[key];}
if(result||++index!=length){return result;}
length=object==null?0:object.length;return!!length&&isLength(length)&&isIndex(key,length)&&(isArray(object)||isArguments(object));}
function initCloneArray(array){var length=array.length,result=new array.constructor(length);if(length&&typeof array[0]=='string'&&hasOwnProperty.call(array,'index')){result.index=array.index;result.input=array.input;}
return result;}
function initCloneObject(object){return(typeof object.constructor=='function'&&!isPrototype(object))?baseCreate(getPrototype(object)):{};}
function initCloneByTag(object,tag,isDeep){var Ctor=object.constructor;switch(tag){case arrayBufferTag:return cloneArrayBuffer(object);case boolTag:case dateTag:return new Ctor(+object);case dataViewTag:return cloneDataView(object,isDeep);case float32Tag:case float64Tag:case int8Tag:case int16Tag:case int32Tag:case uint8Tag:case uint8ClampedTag:case uint16Tag:case uint32Tag:return cloneTypedArray(object,isDeep);case mapTag:return new Ctor;case numberTag:case stringTag:return new Ctor(object);case regexpTag:return cloneRegExp(object);case setTag:return new Ctor;case symbolTag:return cloneSymbol(object);}}
function insertWrapDetails(source,details){var length=details.length;if(!length){return source;}
var lastIndex=length-1;details[lastIndex]=(length>1?'& ':'')+details[lastIndex];details=details.join(length>2?', ':' ');return source.replace(reWrapComment,'{\n/* [wrapped with '+details+'] */\n');}
function isFlattenable(value){return isArray(value)||isArguments(value)||!!(spreadableSymbol&&value&&value[spreadableSymbol]);}
function isIndex(value,length){var type=typeof value;length=length==null?MAX_SAFE_INTEGER:length;return!!length&&(type=='number'||(type!='symbol'&&reIsUint.test(value)))&&(value>-1&&value%1==0&&value<length);}
function isIterateeCall(value,index,object){if(!isObject(object)){return false;}
var type=typeof index;if(type=='number'?(isArrayLike(object)&&isIndex(index,object.length)):(type=='string'&&index in object)){return eq(object[index],value);}
return false;}
function isKey(value,object){if(isArray(value)){return false;}
var type=typeof value;if(type=='number'||type=='symbol'||type=='boolean'||value==null||isSymbol(value)){return true;}
return reIsPlainProp.test(value)||!reIsDeepProp.test(value)||(object!=null&&value in Object(object));}
function isKeyable(value){var type=typeof value;return(type=='string'||type=='number'||type=='symbol'||type=='boolean')?(value!=='__proto__'):(value===null);}
function isLaziable(func){var funcName=getFuncName(func),other=lodash[funcName];if(typeof other!='function'||!(funcName in LazyWrapper.prototype)){return false;}
if(func===other){return true;}
var data=getData(other);return!!data&&func===data[0];}
function isMasked(func){return!!maskSrcKey&&(maskSrcKey in func);}
var isMaskable=coreJsData?isFunction:stubFalse;function isPrototype(value){var Ctor=value&&value.constructor,proto=(typeof Ctor=='function'&&Ctor.prototype)||objectProto;return value===proto;}
function isStrictComparable(value){return value===value&&!isObject(value);}
function matchesStrictComparable(key,srcValue){return function(object){if(object==null){return false;}
return object[key]===srcValue&&(srcValue!==undefined||(key in Object(object)));};}
function memoizeCapped(func){var result=memoize(func,function(key){if(cache.size===MAX_MEMOIZE_SIZE){cache.clear();}
return key;});var cache=result.cache;return result;}
function mergeData(data,source){var bitmask=data[1],srcBitmask=source[1],newBitmask=bitmask|srcBitmask,isCommon=newBitmask<(WRAP_BIND_FLAG|WRAP_BIND_KEY_FLAG|WRAP_ARY_FLAG);var isCombo=((srcBitmask==WRAP_ARY_FLAG)&&(bitmask==WRAP_CURRY_FLAG))||((srcBitmask==WRAP_ARY_FLAG)&&(bitmask==WRAP_REARG_FLAG)&&(data[7].length<=source[8]))||((srcBitmask==(WRAP_ARY_FLAG|WRAP_REARG_FLAG))&&(source[7].length<=source[8])&&(bitmask==WRAP_CURRY_FLAG));if(!(isCommon||isCombo)){return data;}
if(srcBitmask&WRAP_BIND_FLAG){data[2]=source[2];newBitmask|=bitmask&WRAP_BIND_FLAG?0:WRAP_CURRY_BOUND_FLAG;}
var value=source[3];if(value){var partials=data[3];data[3]=partials?composeArgs(partials,value,source[4]):value;data[4]=partials?replaceHolders(data[3],PLACEHOLDER):source[4];}
value=source[5];if(value){partials=data[5];data[5]=partials?composeArgsRight(partials,value,source[6]):value;data[6]=partials?replaceHolders(data[5],PLACEHOLDER):source[6];}
value=source[7];if(value){data[7]=value;}
if(srcBitmask&WRAP_ARY_FLAG){data[8]=data[8]==null?source[8]:nativeMin(data[8],source[8]);}
if(data[9]==null){data[9]=source[9];}
data[0]=source[0];data[1]=newBitmask;return data;}
function nativeKeysIn(object){var result=[];if(object!=null){for(var key in Object(object)){result.push(key);}}
return result;}
function objectToString(value){return nativeObjectToString.call(value);}
function overRest(func,start,transform){start=nativeMax(start===undefined?(func.length-1):start,0);return function(){var args=arguments,index=-1,length=nativeMax(args.length-start,0),array=Array(length);while(++index<length){array[index]=args[start+index];}
index=-1;var otherArgs=Array(start+1);while(++index<start){otherArgs[index]=args[index];}
otherArgs[start]=transform(array);return apply(func,this,otherArgs);};}
function parent(object,path){return path.length<2?object:baseGet(object,baseSlice(path,0,-1));}
function reorder(array,indexes){var arrLength=array.length,length=nativeMin(indexes.length,arrLength),oldArray=copyArray(array);while(length--){var index=indexes[length];array[length]=isIndex(index,arrLength)?oldArray[index]:undefined;}
return array;}
function safeGet(object,key){if(key==='constructor'&&typeof object[key]==='function'){return;}
if(key=='__proto__'){return;}
return object[key];}
var setData=shortOut(baseSetData);var setTimeout=ctxSetTimeout||function(func,wait){return root.setTimeout(func,wait);};var setToString=shortOut(baseSetToString);function setWrapToString(wrapper,reference,bitmask){var source=(reference+'');return setToString(wrapper,insertWrapDetails(source,updateWrapDetails(getWrapDetails(source),bitmask)));}
function shortOut(func){var count=0,lastCalled=0;return function(){var stamp=nativeNow(),remaining=HOT_SPAN-(stamp-lastCalled);lastCalled=stamp;if(remaining>0){if(++count>=HOT_COUNT){return arguments[0];}}else{count=0;}
return func.apply(undefined,arguments);};}
function shuffleSelf(array,size){var index=-1,length=array.length,lastIndex=length-1;size=size===undefined?length:size;while(++index<size){var rand=baseRandom(index,lastIndex),value=array[rand];array[rand]=array[index];array[index]=value;}
array.length=size;return array;}
var stringToPath=memoizeCapped(function(string){var result=[];if(string.charCodeAt(0)===46){result.push('');}
string.replace(rePropName,function(match,number,quote,subString){result.push(quote?subString.replace(reEscapeChar,'$1'):(number||match));});return result;});function toKey(value){if(typeof value=='string'||isSymbol(value)){return value;}
var result=(value+'');return(result=='0'&&(1/value)==-INFINITY)?'-0':result;}
function toSource(func){if(func!=null){try{return funcToString.call(func);}catch(e){}
try{return(func+'');}catch(e){}}
return'';}
function updateWrapDetails(details,bitmask){arrayEach(wrapFlags,function(pair){var value='_.'+pair[0];if((bitmask&pair[1])&&!arrayIncludes(details,value)){details.push(value);}});return details.sort();}
function wrapperClone(wrapper){if(wrapper instanceof LazyWrapper){return wrapper.clone();}
var result=new LodashWrapper(wrapper.__wrapped__,wrapper.__chain__);result.__actions__=copyArray(wrapper.__actions__);result.__index__=wrapper.__index__;result.__values__=wrapper.__values__;return result;}
function chunk(array,size,guard){if((guard?isIterateeCall(array,size,guard):size===undefined)){size=1;}else{size=nativeMax(toInteger(size),0);}
var length=array==null?0:array.length;if(!length||size<1){return[];}
var index=0,resIndex=0,result=Array(nativeCeil(length/size));while(index<length){result[resIndex++]=baseSlice(array,index,(index+=size));}
return result;}
function compact(array){var index=-1,length=array==null?0:array.length,resIndex=0,result=[];while(++index<length){var value=array[index];if(value){result[resIndex++]=value;}}
return result;}
function concat(){var length=arguments.length;if(!length){return[];}
var args=Array(length-1),array=arguments[0],index=length;while(index--){args[index-1]=arguments[index];}
return arrayPush(isArray(array)?copyArray(array):[array],baseFlatten(args,1));}
var difference=baseRest(function(array,values){return isArrayLikeObject(array)?baseDifference(array,baseFlatten(values,1,isArrayLikeObject,true)):[];});var differenceBy=baseRest(function(array,values){var iteratee=last(values);if(isArrayLikeObject(iteratee)){iteratee=undefined;}
return isArrayLikeObject(array)?baseDifference(array,baseFlatten(values,1,isArrayLikeObject,true),getIteratee(iteratee,2)):[];});var differenceWith=baseRest(function(array,values){var comparator=last(values);if(isArrayLikeObject(comparator)){comparator=undefined;}
return isArrayLikeObject(array)?baseDifference(array,baseFlatten(values,1,isArrayLikeObject,true),undefined,comparator):[];});function drop(array,n,guard){var length=array==null?0:array.length;if(!length){return[];}
n=(guard||n===undefined)?1:toInteger(n);return baseSlice(array,n<0?0:n,length);}
function dropRight(array,n,guard){var length=array==null?0:array.length;if(!length){return[];}
n=(guard||n===undefined)?1:toInteger(n);n=length-n;return baseSlice(array,0,n<0?0:n);}
function dropRightWhile(array,predicate){return(array&&array.length)?baseWhile(array,getIteratee(predicate,3),true,true):[];}
function dropWhile(array,predicate){return(array&&array.length)?baseWhile(array,getIteratee(predicate,3),true):[];}
function fill(array,value,start,end){var length=array==null?0:array.length;if(!length){return[];}
if(start&&typeof start!='number'&&isIterateeCall(array,value,start)){start=0;end=length;}
return baseFill(array,value,start,end);}
function findIndex(array,predicate,fromIndex){var length=array==null?0:array.length;if(!length){return-1;}
var index=fromIndex==null?0:toInteger(fromIndex);if(index<0){index=nativeMax(length+index,0);}
return baseFindIndex(array,getIteratee(predicate,3),index);}
function findLastIndex(array,predicate,fromIndex){var length=array==null?0:array.length;if(!length){return-1;}
var index=length-1;if(fromIndex!==undefined){index=toInteger(fromIndex);index=fromIndex<0?nativeMax(length+index,0):nativeMin(index,length-1);}
return baseFindIndex(array,getIteratee(predicate,3),index,true);}
function flatten(array){var length=array==null?0:array.length;return length?baseFlatten(array,1):[];}
function flattenDeep(array){var length=array==null?0:array.length;return length?baseFlatten(array,INFINITY):[];}
function flattenDepth(array,depth){var length=array==null?0:array.length;if(!length){return[];}
depth=depth===undefined?1:toInteger(depth);return baseFlatten(array,depth);}
function fromPairs(pairs){var index=-1,length=pairs==null?0:pairs.length,result={};while(++index<length){var pair=pairs[index];result[pair[0]]=pair[1];}
return result;}
function head(array){return(array&&array.length)?array[0]:undefined;}
function indexOf(array,value,fromIndex){var length=array==null?0:array.length;if(!length){return-1;}
var index=fromIndex==null?0:toInteger(fromIndex);if(index<0){index=nativeMax(length+index,0);}
return baseIndexOf(array,value,index);}
function initial(array){var length=array==null?0:array.length;return length?baseSlice(array,0,-1):[];}
var intersection=baseRest(function(arrays){var mapped=arrayMap(arrays,castArrayLikeObject);return(mapped.length&&mapped[0]===arrays[0])?baseIntersection(mapped):[];});var intersectionBy=baseRest(function(arrays){var iteratee=last(arrays),mapped=arrayMap(arrays,castArrayLikeObject);if(iteratee===last(mapped)){iteratee=undefined;}else{mapped.pop();}
return(mapped.length&&mapped[0]===arrays[0])?baseIntersection(mapped,getIteratee(iteratee,2)):[];});var intersectionWith=baseRest(function(arrays){var comparator=last(arrays),mapped=arrayMap(arrays,castArrayLikeObject);comparator=typeof comparator=='function'?comparator:undefined;if(comparator){mapped.pop();}
return(mapped.length&&mapped[0]===arrays[0])?baseIntersection(mapped,undefined,comparator):[];});function join(array,separator){return array==null?'':nativeJoin.call(array,separator);}
function last(array){var length=array==null?0:array.length;return length?array[length-1]:undefined;}
function lastIndexOf(array,value,fromIndex){var length=array==null?0:array.length;if(!length){return-1;}
var index=length;if(fromIndex!==undefined){index=toInteger(fromIndex);index=index<0?nativeMax(length+index,0):nativeMin(index,length-1);}
return value===value?strictLastIndexOf(array,value,index):baseFindIndex(array,baseIsNaN,index,true);}
function nth(array,n){return(array&&array.length)?baseNth(array,toInteger(n)):undefined;}
var pull=baseRest(pullAll);function pullAll(array,values){return(array&&array.length&&values&&values.length)?basePullAll(array,values):array;}
function pullAllBy(array,values,iteratee){return(array&&array.length&&values&&values.length)?basePullAll(array,values,getIteratee(iteratee,2)):array;}
function pullAllWith(array,values,comparator){return(array&&array.length&&values&&values.length)?basePullAll(array,values,undefined,comparator):array;}
var pullAt=flatRest(function(array,indexes){var length=array==null?0:array.length,result=baseAt(array,indexes);basePullAt(array,arrayMap(indexes,function(index){return isIndex(index,length)?+index:index;}).sort(compareAscending));return result;});function remove(array,predicate){var result=[];if(!(array&&array.length)){return result;}
var index=-1,indexes=[],length=array.length;predicate=getIteratee(predicate,3);while(++index<length){var value=array[index];if(predicate(value,index,array)){result.push(value);indexes.push(index);}}
basePullAt(array,indexes);return result;}
function reverse(array){return array==null?array:nativeReverse.call(array);}
function slice(array,start,end){var length=array==null?0:array.length;if(!length){return[];}
if(end&&typeof end!='number'&&isIterateeCall(array,start,end)){start=0;end=length;}
else{start=start==null?0:toInteger(start);end=end===undefined?length:toInteger(end);}
return baseSlice(array,start,end);}
function sortedIndex(array,value){return baseSortedIndex(array,value);}
function sortedIndexBy(array,value,iteratee){return baseSortedIndexBy(array,value,getIteratee(iteratee,2));}
function sortedIndexOf(array,value){var length=array==null?0:array.length;if(length){var index=baseSortedIndex(array,value);if(index<length&&eq(array[index],value)){return index;}}
return-1;}
function sortedLastIndex(array,value){return baseSortedIndex(array,value,true);}
function sortedLastIndexBy(array,value,iteratee){return baseSortedIndexBy(array,value,getIteratee(iteratee,2),true);}
function sortedLastIndexOf(array,value){var length=array==null?0:array.length;if(length){var index=baseSortedIndex(array,value,true)-1;if(eq(array[index],value)){return index;}}
return-1;}
function sortedUniq(array){return(array&&array.length)?baseSortedUniq(array):[];}
function sortedUniqBy(array,iteratee){return(array&&array.length)?baseSortedUniq(array,getIteratee(iteratee,2)):[];}
function tail(array){var length=array==null?0:array.length;return length?baseSlice(array,1,length):[];}
function take(array,n,guard){if(!(array&&array.length)){return[];}
n=(guard||n===undefined)?1:toInteger(n);return baseSlice(array,0,n<0?0:n);}
function takeRight(array,n,guard){var length=array==null?0:array.length;if(!length){return[];}
n=(guard||n===undefined)?1:toInteger(n);n=length-n;return baseSlice(array,n<0?0:n,length);}
function takeRightWhile(array,predicate){return(array&&array.length)?baseWhile(array,getIteratee(predicate,3),false,true):[];}
function takeWhile(array,predicate){return(array&&array.length)?baseWhile(array,getIteratee(predicate,3)):[];}
var union=baseRest(function(arrays){return baseUniq(baseFlatten(arrays,1,isArrayLikeObject,true));});var unionBy=baseRest(function(arrays){var iteratee=last(arrays);if(isArrayLikeObject(iteratee)){iteratee=undefined;}
return baseUniq(baseFlatten(arrays,1,isArrayLikeObject,true),getIteratee(iteratee,2));});var unionWith=baseRest(function(arrays){var comparator=last(arrays);comparator=typeof comparator=='function'?comparator:undefined;return baseUniq(baseFlatten(arrays,1,isArrayLikeObject,true),undefined,comparator);});function uniq(array){return(array&&array.length)?baseUniq(array):[];}
function uniqBy(array,iteratee){return(array&&array.length)?baseUniq(array,getIteratee(iteratee,2)):[];}
function uniqWith(array,comparator){comparator=typeof comparator=='function'?comparator:undefined;return(array&&array.length)?baseUniq(array,undefined,comparator):[];}
function unzip(array){if(!(array&&array.length)){return[];}
var length=0;array=arrayFilter(array,function(group){if(isArrayLikeObject(group)){length=nativeMax(group.length,length);return true;}});return baseTimes(length,function(index){return arrayMap(array,baseProperty(index));});}
function unzipWith(array,iteratee){if(!(array&&array.length)){return[];}
var result=unzip(array);if(iteratee==null){return result;}
return arrayMap(result,function(group){return apply(iteratee,undefined,group);});}
var without=baseRest(function(array,values){return isArrayLikeObject(array)?baseDifference(array,values):[];});var xor=baseRest(function(arrays){return baseXor(arrayFilter(arrays,isArrayLikeObject));});var xorBy=baseRest(function(arrays){var iteratee=last(arrays);if(isArrayLikeObject(iteratee)){iteratee=undefined;}
return baseXor(arrayFilter(arrays,isArrayLikeObject),getIteratee(iteratee,2));});var xorWith=baseRest(function(arrays){var comparator=last(arrays);comparator=typeof comparator=='function'?comparator:undefined;return baseXor(arrayFilter(arrays,isArrayLikeObject),undefined,comparator);});var zip=baseRest(unzip);function zipObject(props,values){return baseZipObject(props||[],values||[],assignValue);}
function zipObjectDeep(props,values){return baseZipObject(props||[],values||[],baseSet);}
var zipWith=baseRest(function(arrays){var length=arrays.length,iteratee=length>1?arrays[length-1]:undefined;iteratee=typeof iteratee=='function'?(arrays.pop(),iteratee):undefined;return unzipWith(arrays,iteratee);});function chain(value){var result=lodash(value);result.__chain__=true;return result;}
function tap(value,interceptor){interceptor(value);return value;}
function thru(value,interceptor){return interceptor(value);}
var wrapperAt=flatRest(function(paths){var length=paths.length,start=length?paths[0]:0,value=this.__wrapped__,interceptor=function(object){return baseAt(object,paths);};if(length>1||this.__actions__.length||!(value instanceof LazyWrapper)||!isIndex(start)){return this.thru(interceptor);}
value=value.slice(start,+start+(length?1:0));value.__actions__.push({'func':thru,'args':[interceptor],'thisArg':undefined});return new LodashWrapper(value,this.__chain__).thru(function(array){if(length&&!array.length){array.push(undefined);}
return array;});});function wrapperChain(){return chain(this);}
function wrapperCommit(){return new LodashWrapper(this.value(),this.__chain__);}
function wrapperNext(){if(this.__values__===undefined){this.__values__=toArray(this.value());}
var done=this.__index__>=this.__values__.length,value=done?undefined:this.__values__[this.__index__++];return{'done':done,'value':value};}
function wrapperToIterator(){return this;}
function wrapperPlant(value){var result,parent=this;while(parent instanceof baseLodash){var clone=wrapperClone(parent);clone.__index__=0;clone.__values__=undefined;if(result){previous.__wrapped__=clone;}else{result=clone;}
var previous=clone;parent=parent.__wrapped__;}
previous.__wrapped__=value;return result;}
function wrapperReverse(){var value=this.__wrapped__;if(value instanceof LazyWrapper){var wrapped=value;if(this.__actions__.length){wrapped=new LazyWrapper(this);}
wrapped=wrapped.reverse();wrapped.__actions__.push({'func':thru,'args':[reverse],'thisArg':undefined});return new LodashWrapper(wrapped,this.__chain__);}
return this.thru(reverse);}
function wrapperValue(){return baseWrapperValue(this.__wrapped__,this.__actions__);}
var countBy=createAggregator(function(result,value,key){if(hasOwnProperty.call(result,key)){++result[key];}else{baseAssignValue(result,key,1);}});function every(collection,predicate,guard){var func=isArray(collection)?arrayEvery:baseEvery;if(guard&&isIterateeCall(collection,predicate,guard)){predicate=undefined;}
return func(collection,getIteratee(predicate,3));}
function filter(collection,predicate){var func=isArray(collection)?arrayFilter:baseFilter;return func(collection,getIteratee(predicate,3));}
var find=createFind(findIndex);var findLast=createFind(findLastIndex);function flatMap(collection,iteratee){return baseFlatten(map(collection,iteratee),1);}
function flatMapDeep(collection,iteratee){return baseFlatten(map(collection,iteratee),INFINITY);}
function flatMapDepth(collection,iteratee,depth){depth=depth===undefined?1:toInteger(depth);return baseFlatten(map(collection,iteratee),depth);}
function forEach(collection,iteratee){var func=isArray(collection)?arrayEach:baseEach;return func(collection,getIteratee(iteratee,3));}
function forEachRight(collection,iteratee){var func=isArray(collection)?arrayEachRight:baseEachRight;return func(collection,getIteratee(iteratee,3));}
var groupBy=createAggregator(function(result,value,key){if(hasOwnProperty.call(result,key)){result[key].push(value);}else{baseAssignValue(result,key,[value]);}});function includes(collection,value,fromIndex,guard){collection=isArrayLike(collection)?collection:values(collection);fromIndex=(fromIndex&&!guard)?toInteger(fromIndex):0;var length=collection.length;if(fromIndex<0){fromIndex=nativeMax(length+fromIndex,0);}
return isString(collection)?(fromIndex<=length&&collection.indexOf(value,fromIndex)>-1):(!!length&&baseIndexOf(collection,value,fromIndex)>-1);}
var invokeMap=baseRest(function(collection,path,args){var index=-1,isFunc=typeof path=='function',result=isArrayLike(collection)?Array(collection.length):[];baseEach(collection,function(value){result[++index]=isFunc?apply(path,value,args):baseInvoke(value,path,args);});return result;});var keyBy=createAggregator(function(result,value,key){baseAssignValue(result,key,value);});function map(collection,iteratee){var func=isArray(collection)?arrayMap:baseMap;return func(collection,getIteratee(iteratee,3));}
function orderBy(collection,iteratees,orders,guard){if(collection==null){return[];}
if(!isArray(iteratees)){iteratees=iteratees==null?[]:[iteratees];}
orders=guard?undefined:orders;if(!isArray(orders)){orders=orders==null?[]:[orders];}
return baseOrderBy(collection,iteratees,orders);}
var partition=createAggregator(function(result,value,key){result[key?0:1].push(value);},function(){return[[],[]];});function reduce(collection,iteratee,accumulator){var func=isArray(collection)?arrayReduce:baseReduce,initAccum=arguments.length<3;return func(collection,getIteratee(iteratee,4),accumulator,initAccum,baseEach);}
function reduceRight(collection,iteratee,accumulator){var func=isArray(collection)?arrayReduceRight:baseReduce,initAccum=arguments.length<3;return func(collection,getIteratee(iteratee,4),accumulator,initAccum,baseEachRight);}
function reject(collection,predicate){var func=isArray(collection)?arrayFilter:baseFilter;return func(collection,negate(getIteratee(predicate,3)));}
function sample(collection){var func=isArray(collection)?arraySample:baseSample;return func(collection);}
function sampleSize(collection,n,guard){if((guard?isIterateeCall(collection,n,guard):n===undefined)){n=1;}else{n=toInteger(n);}
var func=isArray(collection)?arraySampleSize:baseSampleSize;return func(collection,n);}
function shuffle(collection){var func=isArray(collection)?arrayShuffle:baseShuffle;return func(collection);}
function size(collection){if(collection==null){return 0;}
if(isArrayLike(collection)){return isString(collection)?stringSize(collection):collection.length;}
var tag=getTag(collection);if(tag==mapTag||tag==setTag){return collection.size;}
return baseKeys(collection).length;}
function some(collection,predicate,guard){var func=isArray(collection)?arraySome:baseSome;if(guard&&isIterateeCall(collection,predicate,guard)){predicate=undefined;}
return func(collection,getIteratee(predicate,3));}
var sortBy=baseRest(function(collection,iteratees){if(collection==null){return[];}
var length=iteratees.length;if(length>1&&isIterateeCall(collection,iteratees[0],iteratees[1])){iteratees=[];}else if(length>2&&isIterateeCall(iteratees[0],iteratees[1],iteratees[2])){iteratees=[iteratees[0]];}
return baseOrderBy(collection,baseFlatten(iteratees,1),[]);});var now=ctxNow||function(){return root.Date.now();};function after(n,func){if(typeof func!='function'){throw new TypeError(FUNC_ERROR_TEXT);}
n=toInteger(n);return function(){if(--n<1){return func.apply(this,arguments);}};}
function ary(func,n,guard){n=guard?undefined:n;n=(func&&n==null)?func.length:n;return createWrap(func,WRAP_ARY_FLAG,undefined,undefined,undefined,undefined,n);}
function before(n,func){var result;if(typeof func!='function'){throw new TypeError(FUNC_ERROR_TEXT);}
n=toInteger(n);return function(){if(--n>0){result=func.apply(this,arguments);}
if(n<=1){func=undefined;}
return result;};}
var bind=baseRest(function(func,thisArg,partials){var bitmask=WRAP_BIND_FLAG;if(partials.length){var holders=replaceHolders(partials,getHolder(bind));bitmask|=WRAP_PARTIAL_FLAG;}
return createWrap(func,bitmask,thisArg,partials,holders);});var bindKey=baseRest(function(object,key,partials){var bitmask=WRAP_BIND_FLAG|WRAP_BIND_KEY_FLAG;if(partials.length){var holders=replaceHolders(partials,getHolder(bindKey));bitmask|=WRAP_PARTIAL_FLAG;}
return createWrap(key,bitmask,object,partials,holders);});function curry(func,arity,guard){arity=guard?undefined:arity;var result=createWrap(func,WRAP_CURRY_FLAG,undefined,undefined,undefined,undefined,undefined,arity);result.placeholder=curry.placeholder;return result;}
function curryRight(func,arity,guard){arity=guard?undefined:arity;var result=createWrap(func,WRAP_CURRY_RIGHT_FLAG,undefined,undefined,undefined,undefined,undefined,arity);result.placeholder=curryRight.placeholder;return result;}
function debounce(func,wait,options){var lastArgs,lastThis,maxWait,result,timerId,lastCallTime,lastInvokeTime=0,leading=false,maxing=false,trailing=true;if(typeof func!='function'){throw new TypeError(FUNC_ERROR_TEXT);}
wait=toNumber(wait)||0;if(isObject(options)){leading=!!options.leading;maxing='maxWait'in options;maxWait=maxing?nativeMax(toNumber(options.maxWait)||0,wait):maxWait;trailing='trailing'in options?!!options.trailing:trailing;}
function invokeFunc(time){var args=lastArgs,thisArg=lastThis;lastArgs=lastThis=undefined;lastInvokeTime=time;result=func.apply(thisArg,args);return result;}
function leadingEdge(time){lastInvokeTime=time;timerId=setTimeout(timerExpired,wait);return leading?invokeFunc(time):result;}
function remainingWait(time){var timeSinceLastCall=time-lastCallTime,timeSinceLastInvoke=time-lastInvokeTime,timeWaiting=wait-timeSinceLastCall;return maxing?nativeMin(timeWaiting,maxWait-timeSinceLastInvoke):timeWaiting;}
function shouldInvoke(time){var timeSinceLastCall=time-lastCallTime,timeSinceLastInvoke=time-lastInvokeTime;return(lastCallTime===undefined||(timeSinceLastCall>=wait)||(timeSinceLastCall<0)||(maxing&&timeSinceLastInvoke>=maxWait));}
function timerExpired(){var time=now();if(shouldInvoke(time)){return trailingEdge(time);}
timerId=setTimeout(timerExpired,remainingWait(time));}
function trailingEdge(time){timerId=undefined;if(trailing&&lastArgs){return invokeFunc(time);}
lastArgs=lastThis=undefined;return result;}
function cancel(){if(timerId!==undefined){clearTimeout(timerId);}
lastInvokeTime=0;lastArgs=lastCallTime=lastThis=timerId=undefined;}
function flush(){return timerId===undefined?result:trailingEdge(now());}
function debounced(){var time=now(),isInvoking=shouldInvoke(time);lastArgs=arguments;lastThis=this;lastCallTime=time;if(isInvoking){if(timerId===undefined){return leadingEdge(lastCallTime);}
if(maxing){clearTimeout(timerId);timerId=setTimeout(timerExpired,wait);return invokeFunc(lastCallTime);}}
if(timerId===undefined){timerId=setTimeout(timerExpired,wait);}
return result;}
debounced.cancel=cancel;debounced.flush=flush;return debounced;}
var defer=baseRest(function(func,args){return baseDelay(func,1,args);});var delay=baseRest(function(func,wait,args){return baseDelay(func,toNumber(wait)||0,args);});function flip(func){return createWrap(func,WRAP_FLIP_FLAG);}
function memoize(func,resolver){if(typeof func!='function'||(resolver!=null&&typeof resolver!='function')){throw new TypeError(FUNC_ERROR_TEXT);}
var memoized=function(){var args=arguments,key=resolver?resolver.apply(this,args):args[0],cache=memoized.cache;if(cache.has(key)){return cache.get(key);}
var result=func.apply(this,args);memoized.cache=cache.set(key,result)||cache;return result;};memoized.cache=new(memoize.Cache||MapCache);return memoized;}
memoize.Cache=MapCache;function negate(predicate){if(typeof predicate!='function'){throw new TypeError(FUNC_ERROR_TEXT);}
return function(){var args=arguments;switch(args.length){case 0:return!predicate.call(this);case 1:return!predicate.call(this,args[0]);case 2:return!predicate.call(this,args[0],args[1]);case 3:return!predicate.call(this,args[0],args[1],args[2]);}
return!predicate.apply(this,args);};}
function once(func){return before(2,func);}
var overArgs=castRest(function(func,transforms){transforms=(transforms.length==1&&isArray(transforms[0]))?arrayMap(transforms[0],baseUnary(getIteratee())):arrayMap(baseFlatten(transforms,1),baseUnary(getIteratee()));var funcsLength=transforms.length;return baseRest(function(args){var index=-1,length=nativeMin(args.length,funcsLength);while(++index<length){args[index]=transforms[index].call(this,args[index]);}
return apply(func,this,args);});});var partial=baseRest(function(func,partials){var holders=replaceHolders(partials,getHolder(partial));return createWrap(func,WRAP_PARTIAL_FLAG,undefined,partials,holders);});var partialRight=baseRest(function(func,partials){var holders=replaceHolders(partials,getHolder(partialRight));return createWrap(func,WRAP_PARTIAL_RIGHT_FLAG,undefined,partials,holders);});var rearg=flatRest(function(func,indexes){return createWrap(func,WRAP_REARG_FLAG,undefined,undefined,undefined,indexes);});function rest(func,start){if(typeof func!='function'){throw new TypeError(FUNC_ERROR_TEXT);}
start=start===undefined?start:toInteger(start);return baseRest(func,start);}
function spread(func,start){if(typeof func!='function'){throw new TypeError(FUNC_ERROR_TEXT);}
start=start==null?0:nativeMax(toInteger(start),0);return baseRest(function(args){var array=args[start],otherArgs=castSlice(args,0,start);if(array){arrayPush(otherArgs,array);}
return apply(func,this,otherArgs);});}
function throttle(func,wait,options){var leading=true,trailing=true;if(typeof func!='function'){throw new TypeError(FUNC_ERROR_TEXT);}
if(isObject(options)){leading='leading'in options?!!options.leading:leading;trailing='trailing'in options?!!options.trailing:trailing;}
return debounce(func,wait,{'leading':leading,'maxWait':wait,'trailing':trailing});}
function unary(func){return ary(func,1);}
function wrap(value,wrapper){return partial(castFunction(wrapper),value);}
function castArray(){if(!arguments.length){return[];}
var value=arguments[0];return isArray(value)?value:[value];}
function clone(value){return baseClone(value,CLONE_SYMBOLS_FLAG);}
function cloneWith(value,customizer){customizer=typeof customizer=='function'?customizer:undefined;return baseClone(value,CLONE_SYMBOLS_FLAG,customizer);}
function cloneDeep(value){return baseClone(value,CLONE_DEEP_FLAG|CLONE_SYMBOLS_FLAG);}
function cloneDeepWith(value,customizer){customizer=typeof customizer=='function'?customizer:undefined;return baseClone(value,CLONE_DEEP_FLAG|CLONE_SYMBOLS_FLAG,customizer);}
function conformsTo(object,source){return source==null||baseConformsTo(object,source,keys(source));}
function eq(value,other){return value===other||(value!==value&&other!==other);}
var gt=createRelationalOperation(baseGt);var gte=createRelationalOperation(function(value,other){return value>=other;});var isArguments=baseIsArguments(function(){return arguments;}())?baseIsArguments:function(value){return isObjectLike(value)&&hasOwnProperty.call(value,'callee')&&!propertyIsEnumerable.call(value,'callee');};var isArray=Array.isArray;var isArrayBuffer=nodeIsArrayBuffer?baseUnary(nodeIsArrayBuffer):baseIsArrayBuffer;function isArrayLike(value){return value!=null&&isLength(value.length)&&!isFunction(value);}
function isArrayLikeObject(value){return isObjectLike(value)&&isArrayLike(value);}
function isBoolean(value){return value===true||value===false||(isObjectLike(value)&&baseGetTag(value)==boolTag);}
var isBuffer=nativeIsBuffer||stubFalse;var isDate=nodeIsDate?baseUnary(nodeIsDate):baseIsDate;function isElement(value){return isObjectLike(value)&&value.nodeType===1&&!isPlainObject(value);}
function isEmpty(value){if(value==null){return true;}
if(isArrayLike(value)&&(isArray(value)||typeof value=='string'||typeof value.splice=='function'||isBuffer(value)||isTypedArray(value)||isArguments(value))){return!value.length;}
var tag=getTag(value);if(tag==mapTag||tag==setTag){return!value.size;}
if(isPrototype(value)){return!baseKeys(value).length;}
for(var key in value){if(hasOwnProperty.call(value,key)){return false;}}
return true;}
function isEqual(value,other){return baseIsEqual(value,other);}
function isEqualWith(value,other,customizer){customizer=typeof customizer=='function'?customizer:undefined;var result=customizer?customizer(value,other):undefined;return result===undefined?baseIsEqual(value,other,undefined,customizer):!!result;}
function isError(value){if(!isObjectLike(value)){return false;}
var tag=baseGetTag(value);return tag==errorTag||tag==domExcTag||(typeof value.message=='string'&&typeof value.name=='string'&&!isPlainObject(value));}
function isFinite(value){return typeof value=='number'&&nativeIsFinite(value);}
function isFunction(value){if(!isObject(value)){return false;}
var tag=baseGetTag(value);return tag==funcTag||tag==genTag||tag==asyncTag||tag==proxyTag;}
function isInteger(value){return typeof value=='number'&&value==toInteger(value);}
function isLength(value){return typeof value=='number'&&value>-1&&value%1==0&&value<=MAX_SAFE_INTEGER;}
function isObject(value){var type=typeof value;return value!=null&&(type=='object'||type=='function');}
function isObjectLike(value){return value!=null&&typeof value=='object';}
var isMap=nodeIsMap?baseUnary(nodeIsMap):baseIsMap;function isMatch(object,source){return object===source||baseIsMatch(object,source,getMatchData(source));}
function isMatchWith(object,source,customizer){customizer=typeof customizer=='function'?customizer:undefined;return baseIsMatch(object,source,getMatchData(source),customizer);}
function isNaN(value){return isNumber(value)&&value!=+value;}
function isNative(value){if(isMaskable(value)){throw new Error(CORE_ERROR_TEXT);}
return baseIsNative(value);}
function isNull(value){return value===null;}
function isNil(value){return value==null;}
function isNumber(value){return typeof value=='number'||(isObjectLike(value)&&baseGetTag(value)==numberTag);}
function isPlainObject(value){if(!isObjectLike(value)||baseGetTag(value)!=objectTag){return false;}
var proto=getPrototype(value);if(proto===null){return true;}
var Ctor=hasOwnProperty.call(proto,'constructor')&&proto.constructor;return typeof Ctor=='function'&&Ctor instanceof Ctor&&funcToString.call(Ctor)==objectCtorString;}
var isRegExp=nodeIsRegExp?baseUnary(nodeIsRegExp):baseIsRegExp;function isSafeInteger(value){return isInteger(value)&&value>=-MAX_SAFE_INTEGER&&value<=MAX_SAFE_INTEGER;}
var isSet=nodeIsSet?baseUnary(nodeIsSet):baseIsSet;function isString(value){return typeof value=='string'||(!isArray(value)&&isObjectLike(value)&&baseGetTag(value)==stringTag);}
function isSymbol(value){return typeof value=='symbol'||(isObjectLike(value)&&baseGetTag(value)==symbolTag);}
var isTypedArray=nodeIsTypedArray?baseUnary(nodeIsTypedArray):baseIsTypedArray;function isUndefined(value){return value===undefined;}
function isWeakMap(value){return isObjectLike(value)&&getTag(value)==weakMapTag;}
function isWeakSet(value){return isObjectLike(value)&&baseGetTag(value)==weakSetTag;}
var lt=createRelationalOperation(baseLt);var lte=createRelationalOperation(function(value,other){return value<=other;});function toArray(value){if(!value){return[];}
if(isArrayLike(value)){return isString(value)?stringToArray(value):copyArray(value);}
if(symIterator&&value[symIterator]){return iteratorToArray(value[symIterator]());}
var tag=getTag(value),func=tag==mapTag?mapToArray:(tag==setTag?setToArray:values);return func(value);}
function toFinite(value){if(!value){return value===0?value:0;}
value=toNumber(value);if(value===INFINITY||value===-INFINITY){var sign=(value<0?-1:1);return sign*MAX_INTEGER;}
return value===value?value:0;}
function toInteger(value){var result=toFinite(value),remainder=result%1;return result===result?(remainder?result-remainder:result):0;}
function toLength(value){return value?baseClamp(toInteger(value),0,MAX_ARRAY_LENGTH):0;}
function toNumber(value){if(typeof value=='number'){return value;}
if(isSymbol(value)){return NAN;}
if(isObject(value)){var other=typeof value.valueOf=='function'?value.valueOf():value;value=isObject(other)?(other+''):other;}
if(typeof value!='string'){return value===0?value:+value;}
value=value.replace(reTrim,'');var isBinary=reIsBinary.test(value);return(isBinary||reIsOctal.test(value))?freeParseInt(value.slice(2),isBinary?2:8):(reIsBadHex.test(value)?NAN:+value);}
function toPlainObject(value){return copyObject(value,keysIn(value));}
function toSafeInteger(value){return value?baseClamp(toInteger(value),-MAX_SAFE_INTEGER,MAX_SAFE_INTEGER):(value===0?value:0);}
function toString(value){return value==null?'':baseToString(value);}
var assign=createAssigner(function(object,source){if(isPrototype(source)||isArrayLike(source)){copyObject(source,keys(source),object);return;}
for(var key in source){if(hasOwnProperty.call(source,key)){assignValue(object,key,source[key]);}}});var assignIn=createAssigner(function(object,source){copyObject(source,keysIn(source),object);});var assignInWith=createAssigner(function(object,source,srcIndex,customizer){copyObject(source,keysIn(source),object,customizer);});var assignWith=createAssigner(function(object,source,srcIndex,customizer){copyObject(source,keys(source),object,customizer);});var at=flatRest(baseAt);function create(prototype,properties){var result=baseCreate(prototype);return properties==null?result:baseAssign(result,properties);}
var defaults=baseRest(function(object,sources){object=Object(object);var index=-1;var length=sources.length;var guard=length>2?sources[2]:undefined;if(guard&&isIterateeCall(sources[0],sources[1],guard)){length=1;}
while(++index<length){var source=sources[index];var props=keysIn(source);var propsIndex=-1;var propsLength=props.length;while(++propsIndex<propsLength){var key=props[propsIndex];var value=object[key];if(value===undefined||(eq(value,objectProto[key])&&!hasOwnProperty.call(object,key))){object[key]=source[key];}}}
return object;});var defaultsDeep=baseRest(function(args){args.push(undefined,customDefaultsMerge);return apply(mergeWith,undefined,args);});function findKey(object,predicate){return baseFindKey(object,getIteratee(predicate,3),baseForOwn);}
function findLastKey(object,predicate){return baseFindKey(object,getIteratee(predicate,3),baseForOwnRight);}
function forIn(object,iteratee){return object==null?object:baseFor(object,getIteratee(iteratee,3),keysIn);}
function forInRight(object,iteratee){return object==null?object:baseForRight(object,getIteratee(iteratee,3),keysIn);}
function forOwn(object,iteratee){return object&&baseForOwn(object,getIteratee(iteratee,3));}
function forOwnRight(object,iteratee){return object&&baseForOwnRight(object,getIteratee(iteratee,3));}
function functions(object){return object==null?[]:baseFunctions(object,keys(object));}
function functionsIn(object){return object==null?[]:baseFunctions(object,keysIn(object));}
function get(object,path,defaultValue){var result=object==null?undefined:baseGet(object,path);return result===undefined?defaultValue:result;}
function has(object,path){return object!=null&&hasPath(object,path,baseHas);}
function hasIn(object,path){return object!=null&&hasPath(object,path,baseHasIn);}
var invert=createInverter(function(result,value,key){if(value!=null&&typeof value.toString!='function'){value=nativeObjectToString.call(value);}
result[value]=key;},constant(identity));var invertBy=createInverter(function(result,value,key){if(value!=null&&typeof value.toString!='function'){value=nativeObjectToString.call(value);}
if(hasOwnProperty.call(result,value)){result[value].push(key);}else{result[value]=[key];}},getIteratee);var invoke=baseRest(baseInvoke);function keys(object){return isArrayLike(object)?arrayLikeKeys(object):baseKeys(object);}
function keysIn(object){return isArrayLike(object)?arrayLikeKeys(object,true):baseKeysIn(object);}
function mapKeys(object,iteratee){var result={};iteratee=getIteratee(iteratee,3);baseForOwn(object,function(value,key,object){baseAssignValue(result,iteratee(value,key,object),value);});return result;}
function mapValues(object,iteratee){var result={};iteratee=getIteratee(iteratee,3);baseForOwn(object,function(value,key,object){baseAssignValue(result,key,iteratee(value,key,object));});return result;}
var merge=createAssigner(function(object,source,srcIndex){baseMerge(object,source,srcIndex);});var mergeWith=createAssigner(function(object,source,srcIndex,customizer){baseMerge(object,source,srcIndex,customizer);});var omit=flatRest(function(object,paths){var result={};if(object==null){return result;}
var isDeep=false;paths=arrayMap(paths,function(path){path=castPath(path,object);isDeep||(isDeep=path.length>1);return path;});copyObject(object,getAllKeysIn(object),result);if(isDeep){result=baseClone(result,CLONE_DEEP_FLAG|CLONE_FLAT_FLAG|CLONE_SYMBOLS_FLAG,customOmitClone);}
var length=paths.length;while(length--){baseUnset(result,paths[length]);}
return result;});function omitBy(object,predicate){return pickBy(object,negate(getIteratee(predicate)));}
var pick=flatRest(function(object,paths){return object==null?{}:basePick(object,paths);});function pickBy(object,predicate){if(object==null){return{};}
var props=arrayMap(getAllKeysIn(object),function(prop){return[prop];});predicate=getIteratee(predicate);return basePickBy(object,props,function(value,path){return predicate(value,path[0]);});}
function result(object,path,defaultValue){path=castPath(path,object);var index=-1,length=path.length;if(!length){length=1;object=undefined;}
while(++index<length){var value=object==null?undefined:object[toKey(path[index])];if(value===undefined){index=length;value=defaultValue;}
object=isFunction(value)?value.call(object):value;}
return object;}
function set(object,path,value){return object==null?object:baseSet(object,path,value);}
function setWith(object,path,value,customizer){customizer=typeof customizer=='function'?customizer:undefined;return object==null?object:baseSet(object,path,value,customizer);}
var toPairs=createToPairs(keys);var toPairsIn=createToPairs(keysIn);function transform(object,iteratee,accumulator){var isArr=isArray(object),isArrLike=isArr||isBuffer(object)||isTypedArray(object);iteratee=getIteratee(iteratee,4);if(accumulator==null){var Ctor=object&&object.constructor;if(isArrLike){accumulator=isArr?new Ctor:[];}
else if(isObject(object)){accumulator=isFunction(Ctor)?baseCreate(getPrototype(object)):{};}
else{accumulator={};}}
(isArrLike?arrayEach:baseForOwn)(object,function(value,index,object){return iteratee(accumulator,value,index,object);});return accumulator;}
function unset(object,path){return object==null?true:baseUnset(object,path);}
function update(object,path,updater){return object==null?object:baseUpdate(object,path,castFunction(updater));}
function updateWith(object,path,updater,customizer){customizer=typeof customizer=='function'?customizer:undefined;return object==null?object:baseUpdate(object,path,castFunction(updater),customizer);}
function values(object){return object==null?[]:baseValues(object,keys(object));}
function valuesIn(object){return object==null?[]:baseValues(object,keysIn(object));}
function clamp(number,lower,upper){if(upper===undefined){upper=lower;lower=undefined;}
if(upper!==undefined){upper=toNumber(upper);upper=upper===upper?upper:0;}
if(lower!==undefined){lower=toNumber(lower);lower=lower===lower?lower:0;}
return baseClamp(toNumber(number),lower,upper);}
function inRange(number,start,end){start=toFinite(start);if(end===undefined){end=start;start=0;}else{end=toFinite(end);}
number=toNumber(number);return baseInRange(number,start,end);}
function random(lower,upper,floating){if(floating&&typeof floating!='boolean'&&isIterateeCall(lower,upper,floating)){upper=floating=undefined;}
if(floating===undefined){if(typeof upper=='boolean'){floating=upper;upper=undefined;}
else if(typeof lower=='boolean'){floating=lower;lower=undefined;}}
if(lower===undefined&&upper===undefined){lower=0;upper=1;}
else{lower=toFinite(lower);if(upper===undefined){upper=lower;lower=0;}else{upper=toFinite(upper);}}
if(lower>upper){var temp=lower;lower=upper;upper=temp;}
if(floating||lower%1||upper%1){var rand=nativeRandom();return nativeMin(lower+(rand*(upper-lower+freeParseFloat('1e-'+((rand+'').length-1)))),upper);}
return baseRandom(lower,upper);}
var camelCase=createCompounder(function(result,word,index){word=word.toLowerCase();return result+(index?capitalize(word):word);});function capitalize(string){return upperFirst(toString(string).toLowerCase());}
function deburr(string){string=toString(string);return string&&string.replace(reLatin,deburrLetter).replace(reComboMark,'');}
function endsWith(string,target,position){string=toString(string);target=baseToString(target);var length=string.length;position=position===undefined?length:baseClamp(toInteger(position),0,length);var end=position;position-=target.length;return position>=0&&string.slice(position,end)==target;}
function escape(string){string=toString(string);return(string&&reHasUnescapedHtml.test(string))?string.replace(reUnescapedHtml,escapeHtmlChar):string;}
function escapeRegExp(string){string=toString(string);return(string&&reHasRegExpChar.test(string))?string.replace(reRegExpChar,'\\$&'):string;}
var kebabCase=createCompounder(function(result,word,index){return result+(index?'-':'')+word.toLowerCase();});var lowerCase=createCompounder(function(result,word,index){return result+(index?' ':'')+word.toLowerCase();});var lowerFirst=createCaseFirst('toLowerCase');function pad(string,length,chars){string=toString(string);length=toInteger(length);var strLength=length?stringSize(string):0;if(!length||strLength>=length){return string;}
var mid=(length-strLength)/2;return(createPadding(nativeFloor(mid),chars)+
string+
createPadding(nativeCeil(mid),chars));}
function padEnd(string,length,chars){string=toString(string);length=toInteger(length);var strLength=length?stringSize(string):0;return(length&&strLength<length)?(string+createPadding(length-strLength,chars)):string;}
function padStart(string,length,chars){string=toString(string);length=toInteger(length);var strLength=length?stringSize(string):0;return(length&&strLength<length)?(createPadding(length-strLength,chars)+string):string;}
function parseInt(string,radix,guard){if(guard||radix==null){radix=0;}else if(radix){radix=+radix;}
return nativeParseInt(toString(string).replace(reTrimStart,''),radix||0);}
function repeat(string,n,guard){if((guard?isIterateeCall(string,n,guard):n===undefined)){n=1;}else{n=toInteger(n);}
return baseRepeat(toString(string),n);}
function replace(){var args=arguments,string=toString(args[0]);return args.length<3?string:string.replace(args[1],args[2]);}
var snakeCase=createCompounder(function(result,word,index){return result+(index?'_':'')+word.toLowerCase();});function split(string,separator,limit){if(limit&&typeof limit!='number'&&isIterateeCall(string,separator,limit)){separator=limit=undefined;}
limit=limit===undefined?MAX_ARRAY_LENGTH:limit>>>0;if(!limit){return[];}
string=toString(string);if(string&&(typeof separator=='string'||(separator!=null&&!isRegExp(separator)))){separator=baseToString(separator);if(!separator&&hasUnicode(string)){return castSlice(stringToArray(string),0,limit);}}
return string.split(separator,limit);}
var startCase=createCompounder(function(result,word,index){return result+(index?' ':'')+upperFirst(word);});function startsWith(string,target,position){string=toString(string);position=position==null?0:baseClamp(toInteger(position),0,string.length);target=baseToString(target);return string.slice(position,position+target.length)==target;}
function template(string,options,guard){var settings=lodash.templateSettings;if(guard&&isIterateeCall(string,options,guard)){options=undefined;}
string=toString(string);options=assignInWith({},options,settings,customDefaultsAssignIn);var imports=assignInWith({},options.imports,settings.imports,customDefaultsAssignIn),importsKeys=keys(imports),importsValues=baseValues(imports,importsKeys);var isEscaping,isEvaluating,index=0,interpolate=options.interpolate||reNoMatch,source="__p += '";var reDelimiters=RegExp((options.escape||reNoMatch).source+'|'+
interpolate.source+'|'+
(interpolate===reInterpolate?reEsTemplate:reNoMatch).source+'|'+
(options.evaluate||reNoMatch).source+'|$','g');var sourceURL='//# sourceURL='+
(hasOwnProperty.call(options,'sourceURL')?(options.sourceURL+'').replace(/\s/g,' '):('lodash.templateSources['+(++templateCounter)+']'))+'\n';string.replace(reDelimiters,function(match,escapeValue,interpolateValue,esTemplateValue,evaluateValue,offset){interpolateValue||(interpolateValue=esTemplateValue);source+=string.slice(index,offset).replace(reUnescapedString,escapeStringChar);if(escapeValue){isEscaping=true;source+="' +\n__e("+escapeValue+") +\n'";}
if(evaluateValue){isEvaluating=true;source+="';\n"+evaluateValue+";\n__p += '";}
if(interpolateValue){source+="' +\n((__t = ("+interpolateValue+")) == null ? '' : __t) +\n'";}
index=offset+match.length;return match;});source+="';\n";var variable=hasOwnProperty.call(options,'variable')&&options.variable;if(!variable){source='with (obj) {\n'+source+'\n}\n';}
source=(isEvaluating?source.replace(reEmptyStringLeading,''):source).replace(reEmptyStringMiddle,'$1').replace(reEmptyStringTrailing,'$1;');source='function('+(variable||'obj')+') {\n'+
(variable?'':'obj || (obj = {});\n')+"var __t, __p = ''"+
(isEscaping?', __e = _.escape':'')+
(isEvaluating?', __j = Array.prototype.join;\n'+"function print() { __p += __j.call(arguments, '') }\n":';\n')+
source+'return __p\n}';var result=attempt(function(){return Function(importsKeys,sourceURL+'return '+source).apply(undefined,importsValues);});result.source=source;if(isError(result)){throw result;}
return result;}
function toLower(value){return toString(value).toLowerCase();}
function toUpper(value){return toString(value).toUpperCase();}
function trim(string,chars,guard){string=toString(string);if(string&&(guard||chars===undefined)){return string.replace(reTrim,'');}
if(!string||!(chars=baseToString(chars))){return string;}
var strSymbols=stringToArray(string),chrSymbols=stringToArray(chars),start=charsStartIndex(strSymbols,chrSymbols),end=charsEndIndex(strSymbols,chrSymbols)+1;return castSlice(strSymbols,start,end).join('');}
function trimEnd(string,chars,guard){string=toString(string);if(string&&(guard||chars===undefined)){return string.replace(reTrimEnd,'');}
if(!string||!(chars=baseToString(chars))){return string;}
var strSymbols=stringToArray(string),end=charsEndIndex(strSymbols,stringToArray(chars))+1;return castSlice(strSymbols,0,end).join('');}
function trimStart(string,chars,guard){string=toString(string);if(string&&(guard||chars===undefined)){return string.replace(reTrimStart,'');}
if(!string||!(chars=baseToString(chars))){return string;}
var strSymbols=stringToArray(string),start=charsStartIndex(strSymbols,stringToArray(chars));return castSlice(strSymbols,start).join('');}
function truncate(string,options){var length=DEFAULT_TRUNC_LENGTH,omission=DEFAULT_TRUNC_OMISSION;if(isObject(options)){var separator='separator'in options?options.separator:separator;length='length'in options?toInteger(options.length):length;omission='omission'in options?baseToString(options.omission):omission;}
string=toString(string);var strLength=string.length;if(hasUnicode(string)){var strSymbols=stringToArray(string);strLength=strSymbols.length;}
if(length>=strLength){return string;}
var end=length-stringSize(omission);if(end<1){return omission;}
var result=strSymbols?castSlice(strSymbols,0,end).join(''):string.slice(0,end);if(separator===undefined){return result+omission;}
if(strSymbols){end+=(result.length-end);}
if(isRegExp(separator)){if(string.slice(end).search(separator)){var match,substring=result;if(!separator.global){separator=RegExp(separator.source,toString(reFlags.exec(separator))+'g');}
separator.lastIndex=0;while((match=separator.exec(substring))){var newEnd=match.index;}
result=result.slice(0,newEnd===undefined?end:newEnd);}}else if(string.indexOf(baseToString(separator),end)!=end){var index=result.lastIndexOf(separator);if(index>-1){result=result.slice(0,index);}}
return result+omission;}
function unescape(string){string=toString(string);return(string&&reHasEscapedHtml.test(string))?string.replace(reEscapedHtml,unescapeHtmlChar):string;}
var upperCase=createCompounder(function(result,word,index){return result+(index?' ':'')+word.toUpperCase();});var upperFirst=createCaseFirst('toUpperCase');function words(string,pattern,guard){string=toString(string);pattern=guard?undefined:pattern;if(pattern===undefined){return hasUnicodeWord(string)?unicodeWords(string):asciiWords(string);}
return string.match(pattern)||[];}
var attempt=baseRest(function(func,args){try{return apply(func,undefined,args);}catch(e){return isError(e)?e:new Error(e);}});var bindAll=flatRest(function(object,methodNames){arrayEach(methodNames,function(key){key=toKey(key);baseAssignValue(object,key,bind(object[key],object));});return object;});function cond(pairs){var length=pairs==null?0:pairs.length,toIteratee=getIteratee();pairs=!length?[]:arrayMap(pairs,function(pair){if(typeof pair[1]!='function'){throw new TypeError(FUNC_ERROR_TEXT);}
return[toIteratee(pair[0]),pair[1]];});return baseRest(function(args){var index=-1;while(++index<length){var pair=pairs[index];if(apply(pair[0],this,args)){return apply(pair[1],this,args);}}});}
function conforms(source){return baseConforms(baseClone(source,CLONE_DEEP_FLAG));}
function constant(value){return function(){return value;};}
function defaultTo(value,defaultValue){return(value==null||value!==value)?defaultValue:value;}
var flow=createFlow();var flowRight=createFlow(true);function identity(value){return value;}
function iteratee(func){return baseIteratee(typeof func=='function'?func:baseClone(func,CLONE_DEEP_FLAG));}
function matches(source){return baseMatches(baseClone(source,CLONE_DEEP_FLAG));}
function matchesProperty(path,srcValue){return baseMatchesProperty(path,baseClone(srcValue,CLONE_DEEP_FLAG));}
var method=baseRest(function(path,args){return function(object){return baseInvoke(object,path,args);};});var methodOf=baseRest(function(object,args){return function(path){return baseInvoke(object,path,args);};});function mixin(object,source,options){var props=keys(source),methodNames=baseFunctions(source,props);if(options==null&&!(isObject(source)&&(methodNames.length||!props.length))){options=source;source=object;object=this;methodNames=baseFunctions(source,keys(source));}
var chain=!(isObject(options)&&'chain'in options)||!!options.chain,isFunc=isFunction(object);arrayEach(methodNames,function(methodName){var func=source[methodName];object[methodName]=func;if(isFunc){object.prototype[methodName]=function(){var chainAll=this.__chain__;if(chain||chainAll){var result=object(this.__wrapped__),actions=result.__actions__=copyArray(this.__actions__);actions.push({'func':func,'args':arguments,'thisArg':object});result.__chain__=chainAll;return result;}
return func.apply(object,arrayPush([this.value()],arguments));};}});return object;}
function noConflict(){if(root._===this){root._=oldDash;}
return this;}
function noop(){}
function nthArg(n){n=toInteger(n);return baseRest(function(args){return baseNth(args,n);});}
var over=createOver(arrayMap);var overEvery=createOver(arrayEvery);var overSome=createOver(arraySome);function property(path){return isKey(path)?baseProperty(toKey(path)):basePropertyDeep(path);}
function propertyOf(object){return function(path){return object==null?undefined:baseGet(object,path);};}
var range=createRange();var rangeRight=createRange(true);function stubArray(){return[];}
function stubFalse(){return false;}
function stubObject(){return{};}
function stubString(){return'';}
function stubTrue(){return true;}
function times(n,iteratee){n=toInteger(n);if(n<1||n>MAX_SAFE_INTEGER){return[];}
var index=MAX_ARRAY_LENGTH,length=nativeMin(n,MAX_ARRAY_LENGTH);iteratee=getIteratee(iteratee);n-=MAX_ARRAY_LENGTH;var result=baseTimes(length,iteratee);while(++index<n){iteratee(index);}
return result;}
function toPath(value){if(isArray(value)){return arrayMap(value,toKey);}
return isSymbol(value)?[value]:copyArray(stringToPath(toString(value)));}
function uniqueId(prefix){var id=++idCounter;return toString(prefix)+id;}
var add=createMathOperation(function(augend,addend){return augend+addend;},0);var ceil=createRound('ceil');var divide=createMathOperation(function(dividend,divisor){return dividend/divisor;},1);var floor=createRound('floor');function max(array){return(array&&array.length)?baseExtremum(array,identity,baseGt):undefined;}
function maxBy(array,iteratee){return(array&&array.length)?baseExtremum(array,getIteratee(iteratee,2),baseGt):undefined;}
function mean(array){return baseMean(array,identity);}
function meanBy(array,iteratee){return baseMean(array,getIteratee(iteratee,2));}
function min(array){return(array&&array.length)?baseExtremum(array,identity,baseLt):undefined;}
function minBy(array,iteratee){return(array&&array.length)?baseExtremum(array,getIteratee(iteratee,2),baseLt):undefined;}
var multiply=createMathOperation(function(multiplier,multiplicand){return multiplier*multiplicand;},1);var round=createRound('round');var subtract=createMathOperation(function(minuend,subtrahend){return minuend-subtrahend;},0);function sum(array){return(array&&array.length)?baseSum(array,identity):0;}
function sumBy(array,iteratee){return(array&&array.length)?baseSum(array,getIteratee(iteratee,2)):0;}
lodash.after=after;lodash.ary=ary;lodash.assign=assign;lodash.assignIn=assignIn;lodash.assignInWith=assignInWith;lodash.assignWith=assignWith;lodash.at=at;lodash.before=before;lodash.bind=bind;lodash.bindAll=bindAll;lodash.bindKey=bindKey;lodash.castArray=castArray;lodash.chain=chain;lodash.chunk=chunk;lodash.compact=compact;lodash.concat=concat;lodash.cond=cond;lodash.conforms=conforms;lodash.constant=constant;lodash.countBy=countBy;lodash.create=create;lodash.curry=curry;lodash.curryRight=curryRight;lodash.debounce=debounce;lodash.defaults=defaults;lodash.defaultsDeep=defaultsDeep;lodash.defer=defer;lodash.delay=delay;lodash.difference=difference;lodash.differenceBy=differenceBy;lodash.differenceWith=differenceWith;lodash.drop=drop;lodash.dropRight=dropRight;lodash.dropRightWhile=dropRightWhile;lodash.dropWhile=dropWhile;lodash.fill=fill;lodash.filter=filter;lodash.flatMap=flatMap;lodash.flatMapDeep=flatMapDeep;lodash.flatMapDepth=flatMapDepth;lodash.flatten=flatten;lodash.flattenDeep=flattenDeep;lodash.flattenDepth=flattenDepth;lodash.flip=flip;lodash.flow=flow;lodash.flowRight=flowRight;lodash.fromPairs=fromPairs;lodash.functions=functions;lodash.functionsIn=functionsIn;lodash.groupBy=groupBy;lodash.initial=initial;lodash.intersection=intersection;lodash.intersectionBy=intersectionBy;lodash.intersectionWith=intersectionWith;lodash.invert=invert;lodash.invertBy=invertBy;lodash.invokeMap=invokeMap;lodash.iteratee=iteratee;lodash.keyBy=keyBy;lodash.keys=keys;lodash.keysIn=keysIn;lodash.map=map;lodash.mapKeys=mapKeys;lodash.mapValues=mapValues;lodash.matches=matches;lodash.matchesProperty=matchesProperty;lodash.memoize=memoize;lodash.merge=merge;lodash.mergeWith=mergeWith;lodash.method=method;lodash.methodOf=methodOf;lodash.mixin=mixin;lodash.negate=negate;lodash.nthArg=nthArg;lodash.omit=omit;lodash.omitBy=omitBy;lodash.once=once;lodash.orderBy=orderBy;lodash.over=over;lodash.overArgs=overArgs;lodash.overEvery=overEvery;lodash.overSome=overSome;lodash.partial=partial;lodash.partialRight=partialRight;lodash.partition=partition;lodash.pick=pick;lodash.pickBy=pickBy;lodash.property=property;lodash.propertyOf=propertyOf;lodash.pull=pull;lodash.pullAll=pullAll;lodash.pullAllBy=pullAllBy;lodash.pullAllWith=pullAllWith;lodash.pullAt=pullAt;lodash.range=range;lodash.rangeRight=rangeRight;lodash.rearg=rearg;lodash.reject=reject;lodash.remove=remove;lodash.rest=rest;lodash.reverse=reverse;lodash.sampleSize=sampleSize;lodash.set=set;lodash.setWith=setWith;lodash.shuffle=shuffle;lodash.slice=slice;lodash.sortBy=sortBy;lodash.sortedUniq=sortedUniq;lodash.sortedUniqBy=sortedUniqBy;lodash.split=split;lodash.spread=spread;lodash.tail=tail;lodash.take=take;lodash.takeRight=takeRight;lodash.takeRightWhile=takeRightWhile;lodash.takeWhile=takeWhile;lodash.tap=tap;lodash.throttle=throttle;lodash.thru=thru;lodash.toArray=toArray;lodash.toPairs=toPairs;lodash.toPairsIn=toPairsIn;lodash.toPath=toPath;lodash.toPlainObject=toPlainObject;lodash.transform=transform;lodash.unary=unary;lodash.union=union;lodash.unionBy=unionBy;lodash.unionWith=unionWith;lodash.uniq=uniq;lodash.uniqBy=uniqBy;lodash.uniqWith=uniqWith;lodash.unset=unset;lodash.unzip=unzip;lodash.unzipWith=unzipWith;lodash.update=update;lodash.updateWith=updateWith;lodash.values=values;lodash.valuesIn=valuesIn;lodash.without=without;lodash.words=words;lodash.wrap=wrap;lodash.xor=xor;lodash.xorBy=xorBy;lodash.xorWith=xorWith;lodash.zip=zip;lodash.zipObject=zipObject;lodash.zipObjectDeep=zipObjectDeep;lodash.zipWith=zipWith;lodash.entries=toPairs;lodash.entriesIn=toPairsIn;lodash.extend=assignIn;lodash.extendWith=assignInWith;mixin(lodash,lodash);lodash.add=add;lodash.attempt=attempt;lodash.camelCase=camelCase;lodash.capitalize=capitalize;lodash.ceil=ceil;lodash.clamp=clamp;lodash.clone=clone;lodash.cloneDeep=cloneDeep;lodash.cloneDeepWith=cloneDeepWith;lodash.cloneWith=cloneWith;lodash.conformsTo=conformsTo;lodash.deburr=deburr;lodash.defaultTo=defaultTo;lodash.divide=divide;lodash.endsWith=endsWith;lodash.eq=eq;lodash.escape=escape;lodash.escapeRegExp=escapeRegExp;lodash.every=every;lodash.find=find;lodash.findIndex=findIndex;lodash.findKey=findKey;lodash.findLast=findLast;lodash.findLastIndex=findLastIndex;lodash.findLastKey=findLastKey;lodash.floor=floor;lodash.forEach=forEach;lodash.forEachRight=forEachRight;lodash.forIn=forIn;lodash.forInRight=forInRight;lodash.forOwn=forOwn;lodash.forOwnRight=forOwnRight;lodash.get=get;lodash.gt=gt;lodash.gte=gte;lodash.has=has;lodash.hasIn=hasIn;lodash.head=head;lodash.identity=identity;lodash.includes=includes;lodash.indexOf=indexOf;lodash.inRange=inRange;lodash.invoke=invoke;lodash.isArguments=isArguments;lodash.isArray=isArray;lodash.isArrayBuffer=isArrayBuffer;lodash.isArrayLike=isArrayLike;lodash.isArrayLikeObject=isArrayLikeObject;lodash.isBoolean=isBoolean;lodash.isBuffer=isBuffer;lodash.isDate=isDate;lodash.isElement=isElement;lodash.isEmpty=isEmpty;lodash.isEqual=isEqual;lodash.isEqualWith=isEqualWith;lodash.isError=isError;lodash.isFinite=isFinite;lodash.isFunction=isFunction;lodash.isInteger=isInteger;lodash.isLength=isLength;lodash.isMap=isMap;lodash.isMatch=isMatch;lodash.isMatchWith=isMatchWith;lodash.isNaN=isNaN;lodash.isNative=isNative;lodash.isNil=isNil;lodash.isNull=isNull;lodash.isNumber=isNumber;lodash.isObject=isObject;lodash.isObjectLike=isObjectLike;lodash.isPlainObject=isPlainObject;lodash.isRegExp=isRegExp;lodash.isSafeInteger=isSafeInteger;lodash.isSet=isSet;lodash.isString=isString;lodash.isSymbol=isSymbol;lodash.isTypedArray=isTypedArray;lodash.isUndefined=isUndefined;lodash.isWeakMap=isWeakMap;lodash.isWeakSet=isWeakSet;lodash.join=join;lodash.kebabCase=kebabCase;lodash.last=last;lodash.lastIndexOf=lastIndexOf;lodash.lowerCase=lowerCase;lodash.lowerFirst=lowerFirst;lodash.lt=lt;lodash.lte=lte;lodash.max=max;lodash.maxBy=maxBy;lodash.mean=mean;lodash.meanBy=meanBy;lodash.min=min;lodash.minBy=minBy;lodash.stubArray=stubArray;lodash.stubFalse=stubFalse;lodash.stubObject=stubObject;lodash.stubString=stubString;lodash.stubTrue=stubTrue;lodash.multiply=multiply;lodash.nth=nth;lodash.noConflict=noConflict;lodash.noop=noop;lodash.now=now;lodash.pad=pad;lodash.padEnd=padEnd;lodash.padStart=padStart;lodash.parseInt=parseInt;lodash.random=random;lodash.reduce=reduce;lodash.reduceRight=reduceRight;lodash.repeat=repeat;lodash.replace=replace;lodash.result=result;lodash.round=round;lodash.runInContext=runInContext;lodash.sample=sample;lodash.size=size;lodash.snakeCase=snakeCase;lodash.some=some;lodash.sortedIndex=sortedIndex;lodash.sortedIndexBy=sortedIndexBy;lodash.sortedIndexOf=sortedIndexOf;lodash.sortedLastIndex=sortedLastIndex;lodash.sortedLastIndexBy=sortedLastIndexBy;lodash.sortedLastIndexOf=sortedLastIndexOf;lodash.startCase=startCase;lodash.startsWith=startsWith;lodash.subtract=subtract;lodash.sum=sum;lodash.sumBy=sumBy;lodash.template=template;lodash.times=times;lodash.toFinite=toFinite;lodash.toInteger=toInteger;lodash.toLength=toLength;lodash.toLower=toLower;lodash.toNumber=toNumber;lodash.toSafeInteger=toSafeInteger;lodash.toString=toString;lodash.toUpper=toUpper;lodash.trim=trim;lodash.trimEnd=trimEnd;lodash.trimStart=trimStart;lodash.truncate=truncate;lodash.unescape=unescape;lodash.uniqueId=uniqueId;lodash.upperCase=upperCase;lodash.upperFirst=upperFirst;lodash.each=forEach;lodash.eachRight=forEachRight;lodash.first=head;mixin(lodash,(function(){var source={};baseForOwn(lodash,function(func,methodName){if(!hasOwnProperty.call(lodash.prototype,methodName)){source[methodName]=func;}});return source;}()),{'chain':false});lodash.VERSION=VERSION;arrayEach(['bind','bindKey','curry','curryRight','partial','partialRight'],function(methodName){lodash[methodName].placeholder=lodash;});arrayEach(['drop','take'],function(methodName,index){LazyWrapper.prototype[methodName]=function(n){n=n===undefined?1:nativeMax(toInteger(n),0);var result=(this.__filtered__&&!index)?new LazyWrapper(this):this.clone();if(result.__filtered__){result.__takeCount__=nativeMin(n,result.__takeCount__);}else{result.__views__.push({'size':nativeMin(n,MAX_ARRAY_LENGTH),'type':methodName+(result.__dir__<0?'Right':'')});}
return result;};LazyWrapper.prototype[methodName+'Right']=function(n){return this.reverse()[methodName](n).reverse();};});arrayEach(['filter','map','takeWhile'],function(methodName,index){var type=index+1,isFilter=type==LAZY_FILTER_FLAG||type==LAZY_WHILE_FLAG;LazyWrapper.prototype[methodName]=function(iteratee){var result=this.clone();result.__iteratees__.push({'iteratee':getIteratee(iteratee,3),'type':type});result.__filtered__=result.__filtered__||isFilter;return result;};});arrayEach(['head','last'],function(methodName,index){var takeName='take'+(index?'Right':'');LazyWrapper.prototype[methodName]=function(){return this[takeName](1).value()[0];};});arrayEach(['initial','tail'],function(methodName,index){var dropName='drop'+(index?'':'Right');LazyWrapper.prototype[methodName]=function(){return this.__filtered__?new LazyWrapper(this):this[dropName](1);};});LazyWrapper.prototype.compact=function(){return this.filter(identity);};LazyWrapper.prototype.find=function(predicate){return this.filter(predicate).head();};LazyWrapper.prototype.findLast=function(predicate){return this.reverse().find(predicate);};LazyWrapper.prototype.invokeMap=baseRest(function(path,args){if(typeof path=='function'){return new LazyWrapper(this);}
return this.map(function(value){return baseInvoke(value,path,args);});});LazyWrapper.prototype.reject=function(predicate){return this.filter(negate(getIteratee(predicate)));};LazyWrapper.prototype.slice=function(start,end){start=toInteger(start);var result=this;if(result.__filtered__&&(start>0||end<0)){return new LazyWrapper(result);}
if(start<0){result=result.takeRight(-start);}else if(start){result=result.drop(start);}
if(end!==undefined){end=toInteger(end);result=end<0?result.dropRight(-end):result.take(end-start);}
return result;};LazyWrapper.prototype.takeRightWhile=function(predicate){return this.reverse().takeWhile(predicate).reverse();};LazyWrapper.prototype.toArray=function(){return this.take(MAX_ARRAY_LENGTH);};baseForOwn(LazyWrapper.prototype,function(func,methodName){var checkIteratee=/^(?:filter|find|map|reject)|While$/.test(methodName),isTaker=/^(?:head|last)$/.test(methodName),lodashFunc=lodash[isTaker?('take'+(methodName=='last'?'Right':'')):methodName],retUnwrapped=isTaker||/^find/.test(methodName);if(!lodashFunc){return;}
lodash.prototype[methodName]=function(){var value=this.__wrapped__,args=isTaker?[1]:arguments,isLazy=value instanceof LazyWrapper,iteratee=args[0],useLazy=isLazy||isArray(value);var interceptor=function(value){var result=lodashFunc.apply(lodash,arrayPush([value],args));return(isTaker&&chainAll)?result[0]:result;};if(useLazy&&checkIteratee&&typeof iteratee=='function'&&iteratee.length!=1){isLazy=useLazy=false;}
var chainAll=this.__chain__,isHybrid=!!this.__actions__.length,isUnwrapped=retUnwrapped&&!chainAll,onlyLazy=isLazy&&!isHybrid;if(!retUnwrapped&&useLazy){value=onlyLazy?value:new LazyWrapper(this);var result=func.apply(value,args);result.__actions__.push({'func':thru,'args':[interceptor],'thisArg':undefined});return new LodashWrapper(result,chainAll);}
if(isUnwrapped&&onlyLazy){return func.apply(this,args);}
result=this.thru(interceptor);return isUnwrapped?(isTaker?result.value()[0]:result.value()):result;};});arrayEach(['pop','push','shift','sort','splice','unshift'],function(methodName){var func=arrayProto[methodName],chainName=/^(?:push|sort|unshift)$/.test(methodName)?'tap':'thru',retUnwrapped=/^(?:pop|shift)$/.test(methodName);lodash.prototype[methodName]=function(){var args=arguments;if(retUnwrapped&&!this.__chain__){var value=this.value();return func.apply(isArray(value)?value:[],args);}
return this[chainName](function(value){return func.apply(isArray(value)?value:[],args);});};});baseForOwn(LazyWrapper.prototype,function(func,methodName){var lodashFunc=lodash[methodName];if(lodashFunc){var key=lodashFunc.name+'';if(!hasOwnProperty.call(realNames,key)){realNames[key]=[];}
realNames[key].push({'name':methodName,'func':lodashFunc});}});realNames[createHybrid(undefined,WRAP_BIND_KEY_FLAG).name]=[{'name':'wrapper','func':undefined}];LazyWrapper.prototype.clone=lazyClone;LazyWrapper.prototype.reverse=lazyReverse;LazyWrapper.prototype.value=lazyValue;lodash.prototype.at=wrapperAt;lodash.prototype.chain=wrapperChain;lodash.prototype.commit=wrapperCommit;lodash.prototype.next=wrapperNext;lodash.prototype.plant=wrapperPlant;lodash.prototype.reverse=wrapperReverse;lodash.prototype.toJSON=lodash.prototype.valueOf=lodash.prototype.value=wrapperValue;lodash.prototype.first=lodash.prototype.head;if(symIterator){lodash.prototype[symIterator]=wrapperToIterator;}
return lodash;});var _=runInContext();if(typeof define=='function'&&typeof define.amd=='object'&&define.amd){root._=_;define(function(){return _;});}
else if(freeModule){(freeModule.exports=_)._=_;freeExports._=_;}
else{root._=_;}}.call(this));(function(factory){var root=typeof self=='object'&&self.self===self&&self||typeof global=='object'&&global.global===global&&global;if(typeof define==='function'&&define.amd){define(['underscore','jquery','exports'],function(_,$,exports){root.Backbone=factory(root,exports,_,$);});}else if(typeof exports!=='undefined'){var _=require('underscore'),$;try{$=require('jquery');}catch(e){}
factory(root,exports,_,$);}else{root.Backbone=factory(root,{},root._,root.jQuery||root.Zepto||root.ender||root.$);}})(function(root,Backbone,_,$){var previousBackbone=root.Backbone;var slice=Array.prototype.slice;Backbone.VERSION='1.4.0';Backbone.$=$;Backbone.noConflict=function(){root.Backbone=previousBackbone;return this;};Backbone.emulateHTTP=false;Backbone.emulateJSON=false;var Events=Backbone.Events={};var eventSplitter=/\s+/;var _listening;var eventsApi=function(iteratee,events,name,callback,opts){var i=0,names;if(name&&typeof name==='object'){if(callback!==void 0&&'context'in opts&&opts.context===void 0)opts.context=callback;for(names=_.keys(name);i<names.length;i++){events=eventsApi(iteratee,events,names[i],name[names[i]],opts);}}else if(name&&eventSplitter.test(name)){for(names=name.split(eventSplitter);i<names.length;i++){events=iteratee(events,names[i],callback,opts);}}else{events=iteratee(events,name,callback,opts);}
return events;};Events.on=function(name,callback,context){this._events=eventsApi(onApi,this._events||{},name,callback,{context:context,ctx:this,listening:_listening});if(_listening){var listeners=this._listeners||(this._listeners={});listeners[_listening.id]=_listening;_listening.interop=false;}
return this;};Events.listenTo=function(obj,name,callback){if(!obj)return this;var id=obj._listenId||(obj._listenId=_.uniqueId('l'));var listeningTo=this._listeningTo||(this._listeningTo={});var listening=_listening=listeningTo[id];if(!listening){this._listenId||(this._listenId=_.uniqueId('l'));listening=_listening=listeningTo[id]=new Listening(this,obj);}
var error=tryCatchOn(obj,name,callback,this);_listening=void 0;if(error)throw error;if(listening.interop)listening.on(name,callback);return this;};var onApi=function(events,name,callback,options){if(callback){var handlers=events[name]||(events[name]=[]);var context=options.context,ctx=options.ctx,listening=options.listening;if(listening)listening.count++;handlers.push({callback:callback,context:context,ctx:context||ctx,listening:listening});}
return events;};var tryCatchOn=function(obj,name,callback,context){try{obj.on(name,callback,context);}catch(e){return e;}};Events.off=function(name,callback,context){if(!this._events)return this;this._events=eventsApi(offApi,this._events,name,callback,{context:context,listeners:this._listeners});return this;};Events.stopListening=function(obj,name,callback){var listeningTo=this._listeningTo;if(!listeningTo)return this;var ids=obj?[obj._listenId]:_.keys(listeningTo);for(var i=0;i<ids.length;i++){var listening=listeningTo[ids[i]];if(!listening)break;listening.obj.off(name,callback,this);if(listening.interop)listening.off(name,callback);}
if(_.isEmpty(listeningTo))this._listeningTo=void 0;return this;};var offApi=function(events,name,callback,options){if(!events)return;var context=options.context,listeners=options.listeners;var i=0,names;if(!name&&!context&&!callback){for(names=_.keys(listeners);i<names.length;i++){listeners[names[i]].cleanup();}
return;}
names=name?[name]:_.keys(events);for(;i<names.length;i++){name=names[i];var handlers=events[name];if(!handlers)break;var remaining=[];for(var j=0;j<handlers.length;j++){var handler=handlers[j];if(callback&&callback!==handler.callback&&callback!==handler.callback._callback||context&&context!==handler.context){remaining.push(handler);}else{var listening=handler.listening;if(listening)listening.off(name,callback);}}
if(remaining.length){events[name]=remaining;}else{delete events[name];}}
return events;};Events.once=function(name,callback,context){var events=eventsApi(onceMap,{},name,callback,this.off.bind(this));if(typeof name==='string'&&context==null)callback=void 0;return this.on(events,callback,context);};Events.listenToOnce=function(obj,name,callback){var events=eventsApi(onceMap,{},name,callback,this.stopListening.bind(this,obj));return this.listenTo(obj,events);};var onceMap=function(map,name,callback,offer){if(callback){var once=map[name]=_.once(function(){offer(name,once);callback.apply(this,arguments);});once._callback=callback;}
return map;};Events.trigger=function(name){if(!this._events)return this;var length=Math.max(0,arguments.length-1);var args=Array(length);for(var i=0;i<length;i++)args[i]=arguments[i+1];eventsApi(triggerApi,this._events,name,void 0,args);return this;};var triggerApi=function(objEvents,name,callback,args){if(objEvents){var events=objEvents[name];var allEvents=objEvents.all;if(events&&allEvents)allEvents=allEvents.slice();if(events)triggerEvents(events,args);if(allEvents)triggerEvents(allEvents,[name].concat(args));}
return objEvents;};var triggerEvents=function(events,args){var ev,i=-1,l=events.length,a1=args[0],a2=args[1],a3=args[2];switch(args.length){case 0:while(++i<l)(ev=events[i]).callback.call(ev.ctx);return;case 1:while(++i<l)(ev=events[i]).callback.call(ev.ctx,a1);return;case 2:while(++i<l)(ev=events[i]).callback.call(ev.ctx,a1,a2);return;case 3:while(++i<l)(ev=events[i]).callback.call(ev.ctx,a1,a2,a3);return;default:while(++i<l)(ev=events[i]).callback.apply(ev.ctx,args);return;}};var Listening=function(listener,obj){this.id=listener._listenId;this.listener=listener;this.obj=obj;this.interop=true;this.count=0;this._events=void 0;};Listening.prototype.on=Events.on;Listening.prototype.off=function(name,callback){var cleanup;if(this.interop){this._events=eventsApi(offApi,this._events,name,callback,{context:void 0,listeners:void 0});cleanup=!this._events;}else{this.count--;cleanup=this.count===0;}
if(cleanup)this.cleanup();};Listening.prototype.cleanup=function(){delete this.listener._listeningTo[this.obj._listenId];if(!this.interop)delete this.obj._listeners[this.id];};Events.bind=Events.on;Events.unbind=Events.off;_.extend(Backbone,Events);var Model=Backbone.Model=function(attributes,options){var attrs=attributes||{};options||(options={});this.preinitialize.apply(this,arguments);this.cid=_.uniqueId(this.cidPrefix);this.attributes={};if(options.collection)this.collection=options.collection;if(options.parse)attrs=this.parse(attrs,options)||{};var defaults=_.result(this,'defaults');attrs=_.defaults(_.extend({},defaults,attrs),defaults);this.set(attrs,options);this.changed={};this.initialize.apply(this,arguments);};_.extend(Model.prototype,Events,{changed:null,validationError:null,idAttribute:'id',cidPrefix:'c',preinitialize:function(){},initialize:function(){},toJSON:function(options){return _.clone(this.attributes);},sync:function(){return Backbone.sync.apply(this,arguments);},get:function(attr){return this.attributes[attr];},escape:function(attr){return _.escape(this.get(attr));},has:function(attr){return this.get(attr)!=null;},matches:function(attrs){return!!_.iteratee(attrs,this)(this.attributes);},set:function(key,val,options){if(key==null)return this;var attrs;if(typeof key==='object'){attrs=key;options=val;}else{(attrs={})[key]=val;}
options||(options={});if(!this._validate(attrs,options))return false;var unset=options.unset;var silent=options.silent;var changes=[];var changing=this._changing;this._changing=true;if(!changing){this._previousAttributes=_.clone(this.attributes);this.changed={};}
var current=this.attributes;var changed=this.changed;var prev=this._previousAttributes;for(var attr in attrs){val=attrs[attr];if(!_.isEqual(current[attr],val))changes.push(attr);if(!_.isEqual(prev[attr],val)){changed[attr]=val;}else{delete changed[attr];}
unset?delete current[attr]:current[attr]=val;}
if(this.idAttribute in attrs)this.id=this.get(this.idAttribute);if(!silent){if(changes.length)this._pending=options;for(var i=0;i<changes.length;i++){this.trigger('change:'+changes[i],this,current[changes[i]],options);}}
if(changing)return this;if(!silent){while(this._pending){options=this._pending;this._pending=false;this.trigger('change',this,options);}}
this._pending=false;this._changing=false;return this;},unset:function(attr,options){return this.set(attr,void 0,_.extend({},options,{unset:true}));},clear:function(options){var attrs={};for(var key in this.attributes)attrs[key]=void 0;return this.set(attrs,_.extend({},options,{unset:true}));},hasChanged:function(attr){if(attr==null)return!_.isEmpty(this.changed);return _.has(this.changed,attr);},changedAttributes:function(diff){if(!diff)return this.hasChanged()?_.clone(this.changed):false;var old=this._changing?this._previousAttributes:this.attributes;var changed={};var hasChanged;for(var attr in diff){var val=diff[attr];if(_.isEqual(old[attr],val))continue;changed[attr]=val;hasChanged=true;}
return hasChanged?changed:false;},previous:function(attr){if(attr==null||!this._previousAttributes)return null;return this._previousAttributes[attr];},previousAttributes:function(){return _.clone(this._previousAttributes);},fetch:function(options){options=_.extend({parse:true},options);var model=this;var success=options.success;options.success=function(resp){var serverAttrs=options.parse?model.parse(resp,options):resp;if(!model.set(serverAttrs,options))return false;if(success)success.call(options.context,model,resp,options);model.trigger('sync',model,resp,options);};wrapError(this,options);return this.sync('read',this,options);},save:function(key,val,options){var attrs;if(key==null||typeof key==='object'){attrs=key;options=val;}else{(attrs={})[key]=val;}
options=_.extend({validate:true,parse:true},options);var wait=options.wait;if(attrs&&!wait){if(!this.set(attrs,options))return false;}else if(!this._validate(attrs,options)){return false;}
var model=this;var success=options.success;var attributes=this.attributes;options.success=function(resp){model.attributes=attributes;var serverAttrs=options.parse?model.parse(resp,options):resp;if(wait)serverAttrs=_.extend({},attrs,serverAttrs);if(serverAttrs&&!model.set(serverAttrs,options))return false;if(success)success.call(options.context,model,resp,options);model.trigger('sync',model,resp,options);};wrapError(this,options);if(attrs&&wait)this.attributes=_.extend({},attributes,attrs);var method=this.isNew()?'create':options.patch?'patch':'update';if(method==='patch'&&!options.attrs)options.attrs=attrs;var xhr=this.sync(method,this,options);this.attributes=attributes;return xhr;},destroy:function(options){options=options?_.clone(options):{};var model=this;var success=options.success;var wait=options.wait;var destroy=function(){model.stopListening();model.trigger('destroy',model,model.collection,options);};options.success=function(resp){if(wait)destroy();if(success)success.call(options.context,model,resp,options);if(!model.isNew())model.trigger('sync',model,resp,options);};var xhr=false;if(this.isNew()){_.defer(options.success);}else{wrapError(this,options);xhr=this.sync('delete',this,options);}
if(!wait)destroy();return xhr;},url:function(){var base=_.result(this,'urlRoot')||_.result(this.collection,'url')||urlError();if(this.isNew())return base;var id=this.get(this.idAttribute);return base.replace(/[^\/]$/,'$&/')+encodeURIComponent(id);},parse:function(resp,options){return resp;},clone:function(){return new this.constructor(this.attributes);},isNew:function(){return!this.has(this.idAttribute);},isValid:function(options){return this._validate({},_.extend({},options,{validate:true}));},_validate:function(attrs,options){if(!options.validate||!this.validate)return true;attrs=_.extend({},this.attributes,attrs);var error=this.validationError=this.validate(attrs,options)||null;if(!error)return true;this.trigger('invalid',this,error,_.extend(options,{validationError:error}));return false;}});var Collection=Backbone.Collection=function(models,options){options||(options={});this.preinitialize.apply(this,arguments);if(options.model)this.model=options.model;if(options.comparator!==void 0)this.comparator=options.comparator;this._reset();this.initialize.apply(this,arguments);if(models)this.reset(models,_.extend({silent:true},options));};var setOptions={add:true,remove:true,merge:true};var addOptions={add:true,remove:false};var splice=function(array,insert,at){at=Math.min(Math.max(at,0),array.length);var tail=Array(array.length-at);var length=insert.length;var i;for(i=0;i<tail.length;i++)tail[i]=array[i+at];for(i=0;i<length;i++)array[i+at]=insert[i];for(i=0;i<tail.length;i++)array[i+length+at]=tail[i];};_.extend(Collection.prototype,Events,{model:Model,preinitialize:function(){},initialize:function(){},toJSON:function(options){return this.map(function(model){return model.toJSON(options);});},sync:function(){return Backbone.sync.apply(this,arguments);},add:function(models,options){return this.set(models,_.extend({merge:false},options,addOptions));},remove:function(models,options){options=_.extend({},options);var singular=!_.isArray(models);models=singular?[models]:models.slice();var removed=this._removeModels(models,options);if(!options.silent&&removed.length){options.changes={added:[],merged:[],removed:removed};this.trigger('update',this,options);}
return singular?removed[0]:removed;},set:function(models,options){if(models==null)return;options=_.extend({},setOptions,options);if(options.parse&&!this._isModel(models)){models=this.parse(models,options)||[];}
var singular=!_.isArray(models);models=singular?[models]:models.slice();var at=options.at;if(at!=null)at=+at;if(at>this.length)at=this.length;if(at<0)at+=this.length+1;var set=[];var toAdd=[];var toMerge=[];var toRemove=[];var modelMap={};var add=options.add;var merge=options.merge;var remove=options.remove;var sort=false;var sortable=this.comparator&&at==null&&options.sort!==false;var sortAttr=_.isString(this.comparator)?this.comparator:null;var model,i;for(i=0;i<models.length;i++){model=models[i];var existing=this.get(model);if(existing){if(merge&&model!==existing){var attrs=this._isModel(model)?model.attributes:model;if(options.parse)attrs=existing.parse(attrs,options);existing.set(attrs,options);toMerge.push(existing);if(sortable&&!sort)sort=existing.hasChanged(sortAttr);}
if(!modelMap[existing.cid]){modelMap[existing.cid]=true;set.push(existing);}
models[i]=existing;}else if(add){model=models[i]=this._prepareModel(model,options);if(model){toAdd.push(model);this._addReference(model,options);modelMap[model.cid]=true;set.push(model);}}}
if(remove){for(i=0;i<this.length;i++){model=this.models[i];if(!modelMap[model.cid])toRemove.push(model);}
if(toRemove.length)this._removeModels(toRemove,options);}
var orderChanged=false;var replace=!sortable&&add&&remove;if(set.length&&replace){orderChanged=this.length!==set.length||_.some(this.models,function(m,index){return m!==set[index];});this.models.length=0;splice(this.models,set,0);this.length=this.models.length;}else if(toAdd.length){if(sortable)sort=true;splice(this.models,toAdd,at==null?this.length:at);this.length=this.models.length;}
if(sort)this.sort({silent:true});if(!options.silent){for(i=0;i<toAdd.length;i++){if(at!=null)options.index=at+i;model=toAdd[i];model.trigger('add',model,this,options);}
if(sort||orderChanged)this.trigger('sort',this,options);if(toAdd.length||toRemove.length||toMerge.length){options.changes={added:toAdd,removed:toRemove,merged:toMerge};this.trigger('update',this,options);}}
return singular?models[0]:models;},reset:function(models,options){options=options?_.clone(options):{};for(var i=0;i<this.models.length;i++){this._removeReference(this.models[i],options);}
options.previousModels=this.models;this._reset();models=this.add(models,_.extend({silent:true},options));if(!options.silent)this.trigger('reset',this,options);return models;},push:function(model,options){return this.add(model,_.extend({at:this.length},options));},pop:function(options){var model=this.at(this.length-1);return this.remove(model,options);},unshift:function(model,options){return this.add(model,_.extend({at:0},options));},shift:function(options){var model=this.at(0);return this.remove(model,options);},slice:function(){return slice.apply(this.models,arguments);},get:function(obj){if(obj==null)return void 0;return this._byId[obj]||this._byId[this.modelId(this._isModel(obj)?obj.attributes:obj)]||obj.cid&&this._byId[obj.cid];},has:function(obj){return this.get(obj)!=null;},at:function(index){if(index<0)index+=this.length;return this.models[index];},where:function(attrs,first){return this[first?'find':'filter'](attrs);},findWhere:function(attrs){return this.where(attrs,true);},sort:function(options){var comparator=this.comparator;if(!comparator)throw new Error('Cannot sort a set without a comparator');options||(options={});var length=comparator.length;if(_.isFunction(comparator))comparator=comparator.bind(this);if(length===1||_.isString(comparator)){this.models=this.sortBy(comparator);}else{this.models.sort(comparator);}
if(!options.silent)this.trigger('sort',this,options);return this;},pluck:function(attr){return this.map(attr+'');},fetch:function(options){options=_.extend({parse:true},options);var success=options.success;var collection=this;options.success=function(resp){var method=options.reset?'reset':'set';collection[method](resp,options);if(success)success.call(options.context,collection,resp,options);collection.trigger('sync',collection,resp,options);};wrapError(this,options);return this.sync('read',this,options);},create:function(model,options){options=options?_.clone(options):{};var wait=options.wait;model=this._prepareModel(model,options);if(!model)return false;if(!wait)this.add(model,options);var collection=this;var success=options.success;options.success=function(m,resp,callbackOpts){if(wait)collection.add(m,callbackOpts);if(success)success.call(callbackOpts.context,m,resp,callbackOpts);};model.save(null,options);return model;},parse:function(resp,options){return resp;},clone:function(){return new this.constructor(this.models,{model:this.model,comparator:this.comparator});},modelId:function(attrs){return attrs[this.model.prototype.idAttribute||'id'];},values:function(){return new CollectionIterator(this,ITERATOR_VALUES);},keys:function(){return new CollectionIterator(this,ITERATOR_KEYS);},entries:function(){return new CollectionIterator(this,ITERATOR_KEYSVALUES);},_reset:function(){this.length=0;this.models=[];this._byId={};},_prepareModel:function(attrs,options){if(this._isModel(attrs)){if(!attrs.collection)attrs.collection=this;return attrs;}
options=options?_.clone(options):{};options.collection=this;var model=new this.model(attrs,options);if(!model.validationError)return model;this.trigger('invalid',this,model.validationError,options);return false;},_removeModels:function(models,options){var removed=[];for(var i=0;i<models.length;i++){var model=this.get(models[i]);if(!model)continue;var index=this.indexOf(model);this.models.splice(index,1);this.length--;delete this._byId[model.cid];var id=this.modelId(model.attributes);if(id!=null)delete this._byId[id];if(!options.silent){options.index=index;model.trigger('remove',model,this,options);}
removed.push(model);this._removeReference(model,options);}
return removed;},_isModel:function(model){return model instanceof Model;},_addReference:function(model,options){this._byId[model.cid]=model;var id=this.modelId(model.attributes);if(id!=null)this._byId[id]=model;model.on('all',this._onModelEvent,this);},_removeReference:function(model,options){delete this._byId[model.cid];var id=this.modelId(model.attributes);if(id!=null)delete this._byId[id];if(this===model.collection)delete model.collection;model.off('all',this._onModelEvent,this);},_onModelEvent:function(event,model,collection,options){if(model){if((event==='add'||event==='remove')&&collection!==this)return;if(event==='destroy')this.remove(model,options);if(event==='change'){var prevId=this.modelId(model.previousAttributes());var id=this.modelId(model.attributes);if(prevId!==id){if(prevId!=null)delete this._byId[prevId];if(id!=null)this._byId[id]=model;}}}
this.trigger.apply(this,arguments);}});var $$iterator=typeof Symbol==='function'&&Symbol.iterator;if($$iterator){Collection.prototype[$$iterator]=Collection.prototype.values;}
var CollectionIterator=function(collection,kind){this._collection=collection;this._kind=kind;this._index=0;};var ITERATOR_VALUES=1;var ITERATOR_KEYS=2;var ITERATOR_KEYSVALUES=3;if($$iterator){CollectionIterator.prototype[$$iterator]=function(){return this;};}
CollectionIterator.prototype.next=function(){if(this._collection){if(this._index<this._collection.length){var model=this._collection.at(this._index);this._index++;var value;if(this._kind===ITERATOR_VALUES){value=model;}else{var id=this._collection.modelId(model.attributes);if(this._kind===ITERATOR_KEYS){value=id;}else{value=[id,model];}}
return{value:value,done:false};}
this._collection=void 0;}
return{value:void 0,done:true};};var View=Backbone.View=function(options){this.cid=_.uniqueId('view');this.preinitialize.apply(this,arguments);_.extend(this,_.pick(options,viewOptions));this._ensureElement();this.initialize.apply(this,arguments);};var delegateEventSplitter=/^(\S+)\s*(.*)$/;var viewOptions=['model','collection','el','id','attributes','className','tagName','events'];_.extend(View.prototype,Events,{tagName:'div',$:function(selector){return this.$el.find(selector);},preinitialize:function(){},initialize:function(){},render:function(){return this;},remove:function(){this._removeElement();this.stopListening();return this;},_removeElement:function(){this.$el.remove();},setElement:function(element){this.undelegateEvents();this._setElement(element);this.delegateEvents();return this;},_setElement:function(el){this.$el=el instanceof Backbone.$?el:Backbone.$(el);this.el=this.$el[0];},delegateEvents:function(events){events||(events=_.result(this,'events'));if(!events)return this;this.undelegateEvents();for(var key in events){var method=events[key];if(!_.isFunction(method))method=this[method];if(!method)continue;var match=key.match(delegateEventSplitter);this.delegate(match[1],match[2],method.bind(this));}
return this;},delegate:function(eventName,selector,listener){this.$el.on(eventName+'.delegateEvents'+this.cid,selector,listener);return this;},undelegateEvents:function(){if(this.$el)this.$el.off('.delegateEvents'+this.cid);return this;},undelegate:function(eventName,selector,listener){this.$el.off(eventName+'.delegateEvents'+this.cid,selector,listener);return this;},_createElement:function(tagName){return document.createElement(tagName);},_ensureElement:function(){if(!this.el){var attrs=_.extend({},_.result(this,'attributes'));if(this.id)attrs.id=_.result(this,'id');if(this.className)attrs['class']=_.result(this,'className');this.setElement(this._createElement(_.result(this,'tagName')));this._setAttributes(attrs);}else{this.setElement(_.result(this,'el'));}},_setAttributes:function(attributes){this.$el.attr(attributes);}});var addMethod=function(base,length,method,attribute){switch(length){case 1:return function(){return base[method](this[attribute]);};case 2:return function(value){return base[method](this[attribute],value);};case 3:return function(iteratee,context){return base[method](this[attribute],cb(iteratee,this),context);};case 4:return function(iteratee,defaultVal,context){return base[method](this[attribute],cb(iteratee,this),defaultVal,context);};default:return function(){var args=slice.call(arguments);args.unshift(this[attribute]);return base[method].apply(base,args);};}};var addUnderscoreMethods=function(Class,base,methods,attribute){_.each(methods,function(length,method){if(base[method])Class.prototype[method]=addMethod(base,length,method,attribute);});};var cb=function(iteratee,instance){if(_.isFunction(iteratee))return iteratee;if(_.isObject(iteratee)&&!instance._isModel(iteratee))return modelMatcher(iteratee);if(_.isString(iteratee))return function(model){return model.get(iteratee);};return iteratee;};var modelMatcher=function(attrs){var matcher=_.matches(attrs);return function(model){return matcher(model.attributes);};};var collectionMethods={forEach:3,each:3,map:3,collect:3,reduce:0,foldl:0,inject:0,reduceRight:0,foldr:0,find:3,detect:3,filter:3,select:3,reject:3,every:3,all:3,some:3,any:3,include:3,includes:3,contains:3,invoke:0,max:3,min:3,toArray:1,size:1,first:3,head:3,take:3,initial:3,rest:3,tail:3,drop:3,last:3,without:0,difference:0,indexOf:3,shuffle:1,lastIndexOf:3,isEmpty:1,chain:1,sample:3,partition:3,groupBy:3,countBy:3,sortBy:3,indexBy:3,findIndex:3,findLastIndex:3};var modelMethods={keys:1,values:1,pairs:1,invert:1,pick:0,omit:0,chain:1,isEmpty:1};_.each([[Collection,collectionMethods,'models'],[Model,modelMethods,'attributes']],function(config){var Base=config[0],methods=config[1],attribute=config[2];Base.mixin=function(obj){var mappings=_.reduce(_.functions(obj),function(memo,name){memo[name]=0;return memo;},{});addUnderscoreMethods(Base,obj,mappings,attribute);};addUnderscoreMethods(Base,_,methods,attribute);});Backbone.sync=function(method,model,options){var type=methodMap[method];_.defaults(options||(options={}),{emulateHTTP:Backbone.emulateHTTP,emulateJSON:Backbone.emulateJSON});var params={type:type,dataType:'json'};if(!options.url){params.url=_.result(model,'url')||urlError();}
if(options.data==null&&model&&(method==='create'||method==='update'||method==='patch')){params.contentType='application/json';params.data=JSON.stringify(options.attrs||model.toJSON(options));}
if(options.emulateJSON){params.contentType='application/x-www-form-urlencoded';params.data=params.data?{model:params.data}:{};}
if(options.emulateHTTP&&(type==='PUT'||type==='DELETE'||type==='PATCH')){params.type='POST';if(options.emulateJSON)params.data._method=type;var beforeSend=options.beforeSend;options.beforeSend=function(xhr){xhr.setRequestHeader('X-HTTP-Method-Override',type);if(beforeSend)return beforeSend.apply(this,arguments);};}
if(params.type!=='GET'&&!options.emulateJSON){params.processData=false;}
var error=options.error;options.error=function(xhr,textStatus,errorThrown){options.textStatus=textStatus;options.errorThrown=errorThrown;if(error)error.call(options.context,xhr,textStatus,errorThrown);};var xhr=options.xhr=Backbone.ajax(_.extend(params,options));model.trigger('request',model,xhr,options);return xhr;};var methodMap={create:'POST',update:'PUT',patch:'PATCH',delete:'DELETE',read:'GET'};Backbone.ajax=function(){return Backbone.$.ajax.apply(Backbone.$,arguments);};var Router=Backbone.Router=function(options){options||(options={});this.preinitialize.apply(this,arguments);if(options.routes)this.routes=options.routes;this._bindRoutes();this.initialize.apply(this,arguments);};var optionalParam=/\((.*?)\)/g;var namedParam=/(\(\?)?:\w+/g;var splatParam=/\*\w+/g;var escapeRegExp=/[\-{}\[\]+?.,\\\^$|#\s]/g;_.extend(Router.prototype,Events,{preinitialize:function(){},initialize:function(){},route:function(route,name,callback){if(!_.isRegExp(route))route=this._routeToRegExp(route);if(_.isFunction(name)){callback=name;name='';}
if(!callback)callback=this[name];var router=this;Backbone.history.route(route,function(fragment){var args=router._extractParameters(route,fragment);if(router.execute(callback,args,name)!==false){router.trigger.apply(router,['route:'+name].concat(args));router.trigger('route',name,args);Backbone.history.trigger('route',router,name,args);}});return this;},execute:function(callback,args,name){if(callback)callback.apply(this,args);},navigate:function(fragment,options){Backbone.history.navigate(fragment,options);return this;},_bindRoutes:function(){if(!this.routes)return;this.routes=_.result(this,'routes');var route,routes=_.keys(this.routes);while((route=routes.pop())!=null){this.route(route,this.routes[route]);}},_routeToRegExp:function(route){route=route.replace(escapeRegExp,'\\$&').replace(optionalParam,'(?:$1)?').replace(namedParam,function(match,optional){return optional?match:'([^/?]+)';}).replace(splatParam,'([^?]*?)');return new RegExp('^'+route+'(?:\\?([\\s\\S]*))?$');},_extractParameters:function(route,fragment){var params=route.exec(fragment).slice(1);return _.map(params,function(param,i){if(i===params.length-1)return param||null;return param?decodeURIComponent(param):null;});}});var History=Backbone.History=function(){this.handlers=[];this.checkUrl=this.checkUrl.bind(this);if(typeof window!=='undefined'){this.location=window.location;this.history=window.history;}};var routeStripper=/^[#\/]|\s+$/g;var rootStripper=/^\/+|\/+$/g;var pathStripper=/#.*$/;History.started=false;_.extend(History.prototype,Events,{interval:50,atRoot:function(){var path=this.location.pathname.replace(/[^\/]$/,'$&/');return path===this.root&&!this.getSearch();},matchRoot:function(){var path=this.decodeFragment(this.location.pathname);var rootPath=path.slice(0,this.root.length-1)+'/';return rootPath===this.root;},decodeFragment:function(fragment){return decodeURI(fragment.replace(/%25/g,'%2525'));},getSearch:function(){var match=this.location.href.replace(/#.*/,'').match(/\?.+/);return match?match[0]:'';},getHash:function(window){var match=(window||this).location.href.match(/#(.*)$/);return match?match[1]:'';},getPath:function(){var path=this.decodeFragment(this.location.pathname+this.getSearch()).slice(this.root.length-1);return path.charAt(0)==='/'?path.slice(1):path;},getFragment:function(fragment){if(fragment==null){if(this._usePushState||!this._wantsHashChange){fragment=this.getPath();}else{fragment=this.getHash();}}
return fragment.replace(routeStripper,'');},start:function(options){if(History.started)throw new Error('Backbone.history has already been started');History.started=true;this.options=_.extend({root:'/'},this.options,options);this.root=this.options.root;this._wantsHashChange=this.options.hashChange!==false;this._hasHashChange='onhashchange'in window&&(document.documentMode===void 0||document.documentMode>7);this._useHashChange=this._wantsHashChange&&this._hasHashChange;this._wantsPushState=!!this.options.pushState;this._hasPushState=!!(this.history&&this.history.pushState);this._usePushState=this._wantsPushState&&this._hasPushState;this.fragment=this.getFragment();this.root=('/'+this.root+'/').replace(rootStripper,'/');if(this._wantsHashChange&&this._wantsPushState){if(!this._hasPushState&&!this.atRoot()){var rootPath=this.root.slice(0,-1)||'/';this.location.replace(rootPath+'#'+this.getPath());return true;}else if(this._hasPushState&&this.atRoot()){this.navigate(this.getHash(),{replace:true});}}
if(!this._hasHashChange&&this._wantsHashChange&&!this._usePushState){this.iframe=document.createElement('iframe');this.iframe.src='javascript:0';this.iframe.style.display='none';this.iframe.tabIndex=-1;var body=document.body;var iWindow=body.insertBefore(this.iframe,body.firstChild).contentWindow;iWindow.document.open();iWindow.document.close();iWindow.location.hash='#'+this.fragment;}
var addEventListener=window.addEventListener||function(eventName,listener){return attachEvent('on'+eventName,listener);};if(this._usePushState){addEventListener('popstate',this.checkUrl,false);}else if(this._useHashChange&&!this.iframe){addEventListener('hashchange',this.checkUrl,false);}else if(this._wantsHashChange){this._checkUrlInterval=setInterval(this.checkUrl,this.interval);}
if(!this.options.silent)return this.loadUrl();},stop:function(){var removeEventListener=window.removeEventListener||function(eventName,listener){return detachEvent('on'+eventName,listener);};if(this._usePushState){removeEventListener('popstate',this.checkUrl,false);}else if(this._useHashChange&&!this.iframe){removeEventListener('hashchange',this.checkUrl,false);}
if(this.iframe){document.body.removeChild(this.iframe);this.iframe=null;}
if(this._checkUrlInterval)clearInterval(this._checkUrlInterval);History.started=false;},route:function(route,callback){this.handlers.unshift({route:route,callback:callback});},checkUrl:function(e){var current=this.getFragment();if(current===this.fragment&&this.iframe){current=this.getHash(this.iframe.contentWindow);}
if(current===this.fragment)return false;if(this.iframe)this.navigate(current);this.loadUrl();},loadUrl:function(fragment){if(!this.matchRoot())return false;fragment=this.fragment=this.getFragment(fragment);return _.some(this.handlers,function(handler){if(handler.route.test(fragment)){handler.callback(fragment);return true;}});},navigate:function(fragment,options){if(!History.started)return false;if(!options||options===true)options={trigger:!!options};fragment=this.getFragment(fragment||'');var rootPath=this.root;if(fragment===''||fragment.charAt(0)==='?'){rootPath=rootPath.slice(0,-1)||'/';}
var url=rootPath+fragment;fragment=fragment.replace(pathStripper,'');var decodedFragment=this.decodeFragment(fragment);if(this.fragment===decodedFragment)return;this.fragment=decodedFragment;if(this._usePushState){this.history[options.replace?'replaceState':'pushState']({},document.title,url);}else if(this._wantsHashChange){this._updateHash(this.location,fragment,options.replace);if(this.iframe&&fragment!==this.getHash(this.iframe.contentWindow)){var iWindow=this.iframe.contentWindow;if(!options.replace){iWindow.document.open();iWindow.document.close();}
this._updateHash(iWindow.location,fragment,options.replace);}}else{return this.location.assign(url);}
if(options.trigger)return this.loadUrl(fragment);},_updateHash:function(location,fragment,replace){if(replace){var href=location.href.replace(/(javascript:|#).*$/,'');location.replace(href+'#'+fragment);}else{location.hash='#'+fragment;}}});Backbone.history=new History;var extend=function(protoProps,staticProps){var parent=this;var child;if(protoProps&&_.has(protoProps,'constructor')){child=protoProps.constructor;}else{child=function(){return parent.apply(this,arguments);};}
_.extend(child,parent,staticProps);child.prototype=_.create(parent.prototype,protoProps);child.prototype.constructor=child;child.__super__=parent.prototype;return child;};Model.extend=Collection.extend=Router.extend=View.extend=History.extend=extend;var urlError=function(){throw new Error('A "url" property or function must be specified');};var wrapError=function(model,options){var error=options.error;options.error=function(resp){if(error)error.call(options.context,model,resp,options);model.trigger('error',model,resp,options);};};return Backbone;});(function(window){var i,support,Expr,getText,isXML,tokenize,compile,select,outermostContext,sortInput,hasDuplicate,setDocument,document,docElem,documentIsHTML,rbuggyQSA,rbuggyMatches,matches,contains,expando="sizzle"+1*new Date(),preferredDoc=window.document,dirruns=0,done=0,classCache=createCache(),tokenCache=createCache(),compilerCache=createCache(),nonnativeSelectorCache=createCache(),sortOrder=function(a,b){if(a===b){hasDuplicate=true;}
return 0;},hasOwn=({}).hasOwnProperty,arr=[],pop=arr.pop,pushNative=arr.push,push=arr.push,slice=arr.slice,indexOf=function(list,elem){var i=0,len=list.length;for(;i<len;i++){if(list[i]===elem){return i;}}
return-1;},booleans="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|"+"ismap|loop|multiple|open|readonly|required|scoped",whitespace="[\\x20\\t\\r\\n\\f]",identifier="(?:\\\\[\\da-fA-F]{1,6}"+whitespace+"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",attributes="\\["+whitespace+"*("+identifier+")(?:"+whitespace+"*([*^$|!~]?=)"+whitespace+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+identifier+"))|)"+
whitespace+"*\\]",pseudos=":("+identifier+")(?:\\(("+"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|"+"((?:\\\\.|[^\\\\()[\\]]|"+attributes+")*)|"+".*"+")\\)|)",rwhitespace=new RegExp(whitespace+"+","g"),rtrim=new RegExp("^"+whitespace+"+|((?:^|[^\\\\])(?:\\\\.)*)"+
whitespace+"+$","g"),rcomma=new RegExp("^"+whitespace+"*,"+whitespace+"*"),rcombinators=new RegExp("^"+whitespace+"*([>+~]|"+whitespace+")"+whitespace+"*"),rdescend=new RegExp(whitespace+"|>"),rpseudo=new RegExp(pseudos),ridentifier=new RegExp("^"+identifier+"$"),matchExpr={"ID":new RegExp("^#("+identifier+")"),"CLASS":new RegExp("^\\.("+identifier+")"),"TAG":new RegExp("^("+identifier+"|[*])"),"ATTR":new RegExp("^"+attributes),"PSEUDO":new RegExp("^"+pseudos),"CHILD":new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+
whitespace+"*(even|odd|(([+-]|)(\\d*)n|)"+whitespace+"*(?:([+-]|)"+
whitespace+"*(\\d+)|))"+whitespace+"*\\)|)","i"),"bool":new RegExp("^(?:"+booleans+")$","i"),"needsContext":new RegExp("^"+whitespace+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+whitespace+"*((?:-\\d)?\\d*)"+whitespace+"*\\)|)(?=[^-]|$)","i")},rhtml=/HTML$/i,rinputs=/^(?:input|select|textarea|button)$/i,rheader=/^h\d$/i,rnative=/^[^{]+\{\s*\[native \w/,rquickExpr=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,rsibling=/[+~]/,runescape=new RegExp("\\\\[\\da-fA-F]{1,6}"+whitespace+"?|\\\\([^\\r\\n\\f])","g"),funescape=function(escape,nonHex){var high="0x"+escape.slice(1)-0x10000;return nonHex?nonHex:high<0?String.fromCharCode(high+0x10000):String.fromCharCode(high>>10|0xD800,high&0x3FF|0xDC00);},rcssescape=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,fcssescape=function(ch,asCodePoint){if(asCodePoint){if(ch==="\0"){return"\uFFFD";}
return ch.slice(0,-1)+"\\"+
ch.charCodeAt(ch.length-1).toString(16)+" ";}
return"\\"+ch;},unloadHandler=function(){setDocument();},inDisabledFieldset=addCombinator(function(elem){return elem.disabled===true&&elem.nodeName.toLowerCase()==="fieldset";},{dir:"parentNode",next:"legend"});try{push.apply((arr=slice.call(preferredDoc.childNodes)),preferredDoc.childNodes);arr[preferredDoc.childNodes.length].nodeType;}catch(e){push={apply:arr.length?function(target,els){pushNative.apply(target,slice.call(els));}:function(target,els){var j=target.length,i=0;while((target[j++]=els[i++])){}
target.length=j-1;}};}
function Sizzle(selector,context,results,seed){var m,i,elem,nid,match,groups,newSelector,newContext=context&&context.ownerDocument,nodeType=context?context.nodeType:9;results=results||[];if(typeof selector!=="string"||!selector||nodeType!==1&&nodeType!==9&&nodeType!==11){return results;}
if(!seed){setDocument(context);context=context||document;if(documentIsHTML){if(nodeType!==11&&(match=rquickExpr.exec(selector))){if((m=match[1])){if(nodeType===9){if((elem=context.getElementById(m))){if(elem.id===m){results.push(elem);return results;}}else{return results;}}else{if(newContext&&(elem=newContext.getElementById(m))&&contains(context,elem)&&elem.id===m){results.push(elem);return results;}}}else if(match[2]){push.apply(results,context.getElementsByTagName(selector));return results;}else if((m=match[3])&&support.getElementsByClassName&&context.getElementsByClassName){push.apply(results,context.getElementsByClassName(m));return results;}}
if(support.qsa&&!nonnativeSelectorCache[selector+" "]&&(!rbuggyQSA||!rbuggyQSA.test(selector))&&(nodeType!==1||context.nodeName.toLowerCase()!=="object")){newSelector=selector;newContext=context;if(nodeType===1&&(rdescend.test(selector)||rcombinators.test(selector))){newContext=rsibling.test(selector)&&testContext(context.parentNode)||context;if(newContext!==context||!support.scope){if((nid=context.getAttribute("id"))){nid=nid.replace(rcssescape,fcssescape);}else{context.setAttribute("id",(nid=expando));}}
groups=tokenize(selector);i=groups.length;while(i--){groups[i]=(nid?"#"+nid:":scope")+" "+
toSelector(groups[i]);}
newSelector=groups.join(",");}
try{push.apply(results,newContext.querySelectorAll(newSelector));return results;}catch(qsaError){nonnativeSelectorCache(selector,true);}finally{if(nid===expando){context.removeAttribute("id");}}}}}
return select(selector.replace(rtrim,"$1"),context,results,seed);}
function createCache(){var keys=[];function cache(key,value){if(keys.push(key+" ")>Expr.cacheLength){delete cache[keys.shift()];}
return(cache[key+" "]=value);}
return cache;}
function markFunction(fn){fn[expando]=true;return fn;}
function assert(fn){var el=document.createElement("fieldset");try{return!!fn(el);}catch(e){return false;}finally{if(el.parentNode){el.parentNode.removeChild(el);}
el=null;}}
function addHandle(attrs,handler){var arr=attrs.split("|"),i=arr.length;while(i--){Expr.attrHandle[arr[i]]=handler;}}
function siblingCheck(a,b){var cur=b&&a,diff=cur&&a.nodeType===1&&b.nodeType===1&&a.sourceIndex-b.sourceIndex;if(diff){return diff;}
if(cur){while((cur=cur.nextSibling)){if(cur===b){return-1;}}}
return a?1:-1;}
function createInputPseudo(type){return function(elem){var name=elem.nodeName.toLowerCase();return name==="input"&&elem.type===type;};}
function createButtonPseudo(type){return function(elem){var name=elem.nodeName.toLowerCase();return(name==="input"||name==="button")&&elem.type===type;};}
function createDisabledPseudo(disabled){return function(elem){if("form"in elem){if(elem.parentNode&&elem.disabled===false){if("label"in elem){if("label"in elem.parentNode){return elem.parentNode.disabled===disabled;}else{return elem.disabled===disabled;}}
return elem.isDisabled===disabled||elem.isDisabled!==!disabled&&inDisabledFieldset(elem)===disabled;}
return elem.disabled===disabled;}else if("label"in elem){return elem.disabled===disabled;}
return false;};}
function createPositionalPseudo(fn){return markFunction(function(argument){argument=+argument;return markFunction(function(seed,matches){var j,matchIndexes=fn([],seed.length,argument),i=matchIndexes.length;while(i--){if(seed[(j=matchIndexes[i])]){seed[j]=!(matches[j]=seed[j]);}}});});}
function testContext(context){return context&&typeof context.getElementsByTagName!=="undefined"&&context;}
support=Sizzle.support={};isXML=Sizzle.isXML=function(elem){var namespace=elem.namespaceURI,docElem=(elem.ownerDocument||elem).documentElement;return!rhtml.test(namespace||docElem&&docElem.nodeName||"HTML");};setDocument=Sizzle.setDocument=function(node){var hasCompare,subWindow,doc=node?node.ownerDocument||node:preferredDoc;if(doc==document||doc.nodeType!==9||!doc.documentElement){return document;}
document=doc;docElem=document.documentElement;documentIsHTML=!isXML(document);if(preferredDoc!=document&&(subWindow=document.defaultView)&&subWindow.top!==subWindow){if(subWindow.addEventListener){subWindow.addEventListener("unload",unloadHandler,false);}else if(subWindow.attachEvent){subWindow.attachEvent("onunload",unloadHandler);}}
support.scope=assert(function(el){docElem.appendChild(el).appendChild(document.createElement("div"));return typeof el.querySelectorAll!=="undefined"&&!el.querySelectorAll(":scope fieldset div").length;});support.attributes=assert(function(el){el.className="i";return!el.getAttribute("className");});support.getElementsByTagName=assert(function(el){el.appendChild(document.createComment(""));return!el.getElementsByTagName("*").length;});support.getElementsByClassName=rnative.test(document.getElementsByClassName);support.getById=assert(function(el){docElem.appendChild(el).id=expando;return!document.getElementsByName||!document.getElementsByName(expando).length;});if(support.getById){Expr.filter["ID"]=function(id){var attrId=id.replace(runescape,funescape);return function(elem){return elem.getAttribute("id")===attrId;};};Expr.find["ID"]=function(id,context){if(typeof context.getElementById!=="undefined"&&documentIsHTML){var elem=context.getElementById(id);return elem?[elem]:[];}};}else{Expr.filter["ID"]=function(id){var attrId=id.replace(runescape,funescape);return function(elem){var node=typeof elem.getAttributeNode!=="undefined"&&elem.getAttributeNode("id");return node&&node.value===attrId;};};Expr.find["ID"]=function(id,context){if(typeof context.getElementById!=="undefined"&&documentIsHTML){var node,i,elems,elem=context.getElementById(id);if(elem){node=elem.getAttributeNode("id");if(node&&node.value===id){return[elem];}
elems=context.getElementsByName(id);i=0;while((elem=elems[i++])){node=elem.getAttributeNode("id");if(node&&node.value===id){return[elem];}}}
return[];}};}
Expr.find["TAG"]=support.getElementsByTagName?function(tag,context){if(typeof context.getElementsByTagName!=="undefined"){return context.getElementsByTagName(tag);}else if(support.qsa){return context.querySelectorAll(tag);}}:function(tag,context){var elem,tmp=[],i=0,results=context.getElementsByTagName(tag);if(tag==="*"){while((elem=results[i++])){if(elem.nodeType===1){tmp.push(elem);}}
return tmp;}
return results;};Expr.find["CLASS"]=support.getElementsByClassName&&function(className,context){if(typeof context.getElementsByClassName!=="undefined"&&documentIsHTML){return context.getElementsByClassName(className);}};rbuggyMatches=[];rbuggyQSA=[];if((support.qsa=rnative.test(document.querySelectorAll))){assert(function(el){var input;docElem.appendChild(el).innerHTML="<a id='"+expando+"'></a>"+"<select id='"+expando+"-\r\\' msallowcapture=''>"+"<option selected=''></option></select>";if(el.querySelectorAll("[msallowcapture^='']").length){rbuggyQSA.push("[*^$]="+whitespace+"*(?:''|\"\")");}
if(!el.querySelectorAll("[selected]").length){rbuggyQSA.push("\\["+whitespace+"*(?:value|"+booleans+")");}
if(!el.querySelectorAll("[id~="+expando+"-]").length){rbuggyQSA.push("~=");}
input=document.createElement("input");input.setAttribute("name","");el.appendChild(input);if(!el.querySelectorAll("[name='']").length){rbuggyQSA.push("\\["+whitespace+"*name"+whitespace+"*="+
whitespace+"*(?:''|\"\")");}
if(!el.querySelectorAll(":checked").length){rbuggyQSA.push(":checked");}
if(!el.querySelectorAll("a#"+expando+"+*").length){rbuggyQSA.push(".#.+[+~]");}
el.querySelectorAll("\\\f");rbuggyQSA.push("[\\r\\n\\f]");});assert(function(el){el.innerHTML="<a href='' disabled='disabled'></a>"+"<select disabled='disabled'><option/></select>";var input=document.createElement("input");input.setAttribute("type","hidden");el.appendChild(input).setAttribute("name","D");if(el.querySelectorAll("[name=d]").length){rbuggyQSA.push("name"+whitespace+"*[*^$|!~]?=");}
if(el.querySelectorAll(":enabled").length!==2){rbuggyQSA.push(":enabled",":disabled");}
docElem.appendChild(el).disabled=true;if(el.querySelectorAll(":disabled").length!==2){rbuggyQSA.push(":enabled",":disabled");}
el.querySelectorAll("*,:x");rbuggyQSA.push(",.*:");});}
if((support.matchesSelector=rnative.test((matches=docElem.matches||docElem.webkitMatchesSelector||docElem.mozMatchesSelector||docElem.oMatchesSelector||docElem.msMatchesSelector)))){assert(function(el){support.disconnectedMatch=matches.call(el,"*");matches.call(el,"[s!='']:x");rbuggyMatches.push("!=",pseudos);});}
rbuggyQSA=rbuggyQSA.length&&new RegExp(rbuggyQSA.join("|"));rbuggyMatches=rbuggyMatches.length&&new RegExp(rbuggyMatches.join("|"));hasCompare=rnative.test(docElem.compareDocumentPosition);contains=hasCompare||rnative.test(docElem.contains)?function(a,b){var adown=a.nodeType===9?a.documentElement:a,bup=b&&b.parentNode;return a===bup||!!(bup&&bup.nodeType===1&&(adown.contains?adown.contains(bup):a.compareDocumentPosition&&a.compareDocumentPosition(bup)&16));}:function(a,b){if(b){while((b=b.parentNode)){if(b===a){return true;}}}
return false;};sortOrder=hasCompare?function(a,b){if(a===b){hasDuplicate=true;return 0;}
var compare=!a.compareDocumentPosition-!b.compareDocumentPosition;if(compare){return compare;}
compare=(a.ownerDocument||a)==(b.ownerDocument||b)?a.compareDocumentPosition(b):1;if(compare&1||(!support.sortDetached&&b.compareDocumentPosition(a)===compare)){if(a==document||a.ownerDocument==preferredDoc&&contains(preferredDoc,a)){return-1;}
if(b==document||b.ownerDocument==preferredDoc&&contains(preferredDoc,b)){return 1;}
return sortInput?(indexOf(sortInput,a)-indexOf(sortInput,b)):0;}
return compare&4?-1:1;}:function(a,b){if(a===b){hasDuplicate=true;return 0;}
var cur,i=0,aup=a.parentNode,bup=b.parentNode,ap=[a],bp=[b];if(!aup||!bup){return a==document?-1:b==document?1:aup?-1:bup?1:sortInput?(indexOf(sortInput,a)-indexOf(sortInput,b)):0;}else if(aup===bup){return siblingCheck(a,b);}
cur=a;while((cur=cur.parentNode)){ap.unshift(cur);}
cur=b;while((cur=cur.parentNode)){bp.unshift(cur);}
while(ap[i]===bp[i]){i++;}
return i?siblingCheck(ap[i],bp[i]):ap[i]==preferredDoc?-1:bp[i]==preferredDoc?1:0;};return document;};Sizzle.matches=function(expr,elements){return Sizzle(expr,null,null,elements);};Sizzle.matchesSelector=function(elem,expr){setDocument(elem);if(support.matchesSelector&&documentIsHTML&&!nonnativeSelectorCache[expr+" "]&&(!rbuggyMatches||!rbuggyMatches.test(expr))&&(!rbuggyQSA||!rbuggyQSA.test(expr))){try{var ret=matches.call(elem,expr);if(ret||support.disconnectedMatch||elem.document&&elem.document.nodeType!==11){return ret;}}catch(e){nonnativeSelectorCache(expr,true);}}
return Sizzle(expr,document,null,[elem]).length>0;};Sizzle.contains=function(context,elem){if((context.ownerDocument||context)!=document){setDocument(context);}
return contains(context,elem);};Sizzle.attr=function(elem,name){if((elem.ownerDocument||elem)!=document){setDocument(elem);}
var fn=Expr.attrHandle[name.toLowerCase()],val=fn&&hasOwn.call(Expr.attrHandle,name.toLowerCase())?fn(elem,name,!documentIsHTML):undefined;return val!==undefined?val:support.attributes||!documentIsHTML?elem.getAttribute(name):(val=elem.getAttributeNode(name))&&val.specified?val.value:null;};Sizzle.escape=function(sel){return(sel+"").replace(rcssescape,fcssescape);};Sizzle.error=function(msg){throw new Error("Syntax error, unrecognized expression: "+msg);};Sizzle.uniqueSort=function(results){var elem,duplicates=[],j=0,i=0;hasDuplicate=!support.detectDuplicates;sortInput=!support.sortStable&&results.slice(0);results.sort(sortOrder);if(hasDuplicate){while((elem=results[i++])){if(elem===results[i]){j=duplicates.push(i);}}
while(j--){results.splice(duplicates[j],1);}}
sortInput=null;return results;};getText=Sizzle.getText=function(elem){var node,ret="",i=0,nodeType=elem.nodeType;if(!nodeType){while((node=elem[i++])){ret+=getText(node);}}else if(nodeType===1||nodeType===9||nodeType===11){if(typeof elem.textContent==="string"){return elem.textContent;}else{for(elem=elem.firstChild;elem;elem=elem.nextSibling){ret+=getText(elem);}}}else if(nodeType===3||nodeType===4){return elem.nodeValue;}
return ret;};Expr=Sizzle.selectors={cacheLength:50,createPseudo:markFunction,match:matchExpr,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:true}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:true},"~":{dir:"previousSibling"}},preFilter:{"ATTR":function(match){match[1]=match[1].replace(runescape,funescape);match[3]=(match[3]||match[4]||match[5]||"").replace(runescape,funescape);if(match[2]==="~="){match[3]=" "+match[3]+" ";}
return match.slice(0,4);},"CHILD":function(match){match[1]=match[1].toLowerCase();if(match[1].slice(0,3)==="nth"){if(!match[3]){Sizzle.error(match[0]);}
match[4]=+(match[4]?match[5]+(match[6]||1):2*(match[3]==="even"||match[3]==="odd"));match[5]=+((match[7]+match[8])||match[3]==="odd");}else if(match[3]){Sizzle.error(match[0]);}
return match;},"PSEUDO":function(match){var excess,unquoted=!match[6]&&match[2];if(matchExpr["CHILD"].test(match[0])){return null;}
if(match[3]){match[2]=match[4]||match[5]||"";}else if(unquoted&&rpseudo.test(unquoted)&&(excess=tokenize(unquoted,true))&&(excess=unquoted.indexOf(")",unquoted.length-excess)-unquoted.length)){match[0]=match[0].slice(0,excess);match[2]=unquoted.slice(0,excess);}
return match.slice(0,3);}},filter:{"TAG":function(nodeNameSelector){var nodeName=nodeNameSelector.replace(runescape,funescape).toLowerCase();return nodeNameSelector==="*"?function(){return true;}:function(elem){return elem.nodeName&&elem.nodeName.toLowerCase()===nodeName;};},"CLASS":function(className){var pattern=classCache[className+" "];return pattern||(pattern=new RegExp("(^|"+whitespace+")"+className+"("+whitespace+"|$)"))&&classCache(className,function(elem){return pattern.test(typeof elem.className==="string"&&elem.className||typeof elem.getAttribute!=="undefined"&&elem.getAttribute("class")||"");});},"ATTR":function(name,operator,check){return function(elem){var result=Sizzle.attr(elem,name);if(result==null){return operator==="!=";}
if(!operator){return true;}
result+="";return operator==="="?result===check:operator==="!="?result!==check:operator==="^="?check&&result.indexOf(check)===0:operator==="*="?check&&result.indexOf(check)>-1:operator==="$="?check&&result.slice(-check.length)===check:operator==="~="?(" "+result.replace(rwhitespace," ")+" ").indexOf(check)>-1:operator==="|="?result===check||result.slice(0,check.length+1)===check+"-":false;};},"CHILD":function(type,what,_argument,first,last){var simple=type.slice(0,3)!=="nth",forward=type.slice(-4)!=="last",ofType=what==="of-type";return first===1&&last===0?function(elem){return!!elem.parentNode;}:function(elem,_context,xml){var cache,uniqueCache,outerCache,node,nodeIndex,start,dir=simple!==forward?"nextSibling":"previousSibling",parent=elem.parentNode,name=ofType&&elem.nodeName.toLowerCase(),useCache=!xml&&!ofType,diff=false;if(parent){if(simple){while(dir){node=elem;while((node=node[dir])){if(ofType?node.nodeName.toLowerCase()===name:node.nodeType===1){return false;}}
start=dir=type==="only"&&!start&&"nextSibling";}
return true;}
start=[forward?parent.firstChild:parent.lastChild];if(forward&&useCache){node=parent;outerCache=node[expando]||(node[expando]={});uniqueCache=outerCache[node.uniqueID]||(outerCache[node.uniqueID]={});cache=uniqueCache[type]||[];nodeIndex=cache[0]===dirruns&&cache[1];diff=nodeIndex&&cache[2];node=nodeIndex&&parent.childNodes[nodeIndex];while((node=++nodeIndex&&node&&node[dir]||(diff=nodeIndex=0)||start.pop())){if(node.nodeType===1&&++diff&&node===elem){uniqueCache[type]=[dirruns,nodeIndex,diff];break;}}}else{if(useCache){node=elem;outerCache=node[expando]||(node[expando]={});uniqueCache=outerCache[node.uniqueID]||(outerCache[node.uniqueID]={});cache=uniqueCache[type]||[];nodeIndex=cache[0]===dirruns&&cache[1];diff=nodeIndex;}
if(diff===false){while((node=++nodeIndex&&node&&node[dir]||(diff=nodeIndex=0)||start.pop())){if((ofType?node.nodeName.toLowerCase()===name:node.nodeType===1)&&++diff){if(useCache){outerCache=node[expando]||(node[expando]={});uniqueCache=outerCache[node.uniqueID]||(outerCache[node.uniqueID]={});uniqueCache[type]=[dirruns,diff];}
if(node===elem){break;}}}}}
diff-=last;return diff===first||(diff%first===0&&diff/first>=0);}};},"PSEUDO":function(pseudo,argument){var args,fn=Expr.pseudos[pseudo]||Expr.setFilters[pseudo.toLowerCase()]||Sizzle.error("unsupported pseudo: "+pseudo);if(fn[expando]){return fn(argument);}
if(fn.length>1){args=[pseudo,pseudo,"",argument];return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase())?markFunction(function(seed,matches){var idx,matched=fn(seed,argument),i=matched.length;while(i--){idx=indexOf(seed,matched[i]);seed[idx]=!(matches[idx]=matched[i]);}}):function(elem){return fn(elem,0,args);};}
return fn;}},pseudos:{"not":markFunction(function(selector){var input=[],results=[],matcher=compile(selector.replace(rtrim,"$1"));return matcher[expando]?markFunction(function(seed,matches,_context,xml){var elem,unmatched=matcher(seed,null,xml,[]),i=seed.length;while(i--){if((elem=unmatched[i])){seed[i]=!(matches[i]=elem);}}}):function(elem,_context,xml){input[0]=elem;matcher(input,null,xml,results);input[0]=null;return!results.pop();};}),"has":markFunction(function(selector){return function(elem){return Sizzle(selector,elem).length>0;};}),"contains":markFunction(function(text){text=text.replace(runescape,funescape);return function(elem){return(elem.textContent||getText(elem)).indexOf(text)>-1;};}),"lang":markFunction(function(lang){if(!ridentifier.test(lang||"")){Sizzle.error("unsupported lang: "+lang);}
lang=lang.replace(runescape,funescape).toLowerCase();return function(elem){var elemLang;do{if((elemLang=documentIsHTML?elem.lang:elem.getAttribute("xml:lang")||elem.getAttribute("lang"))){elemLang=elemLang.toLowerCase();return elemLang===lang||elemLang.indexOf(lang+"-")===0;}}while((elem=elem.parentNode)&&elem.nodeType===1);return false;};}),"target":function(elem){var hash=window.location&&window.location.hash;return hash&&hash.slice(1)===elem.id;},"root":function(elem){return elem===docElem;},"focus":function(elem){return elem===document.activeElement&&(!document.hasFocus||document.hasFocus())&&!!(elem.type||elem.href||~elem.tabIndex);},"enabled":createDisabledPseudo(false),"disabled":createDisabledPseudo(true),"checked":function(elem){var nodeName=elem.nodeName.toLowerCase();return(nodeName==="input"&&!!elem.checked)||(nodeName==="option"&&!!elem.selected);},"selected":function(elem){if(elem.parentNode){elem.parentNode.selectedIndex;}
return elem.selected===true;},"empty":function(elem){for(elem=elem.firstChild;elem;elem=elem.nextSibling){if(elem.nodeType<6){return false;}}
return true;},"parent":function(elem){return!Expr.pseudos["empty"](elem);},"header":function(elem){return rheader.test(elem.nodeName);},"input":function(elem){return rinputs.test(elem.nodeName);},"button":function(elem){var name=elem.nodeName.toLowerCase();return name==="input"&&elem.type==="button"||name==="button";},"text":function(elem){var attr;return elem.nodeName.toLowerCase()==="input"&&elem.type==="text"&&((attr=elem.getAttribute("type"))==null||attr.toLowerCase()==="text");},"first":createPositionalPseudo(function(){return[0];}),"last":createPositionalPseudo(function(_matchIndexes,length){return[length-1];}),"eq":createPositionalPseudo(function(_matchIndexes,length,argument){return[argument<0?argument+length:argument];}),"even":createPositionalPseudo(function(matchIndexes,length){var i=0;for(;i<length;i+=2){matchIndexes.push(i);}
return matchIndexes;}),"odd":createPositionalPseudo(function(matchIndexes,length){var i=1;for(;i<length;i+=2){matchIndexes.push(i);}
return matchIndexes;}),"lt":createPositionalPseudo(function(matchIndexes,length,argument){var i=argument<0?argument+length:argument>length?length:argument;for(;--i>=0;){matchIndexes.push(i);}
return matchIndexes;}),"gt":createPositionalPseudo(function(matchIndexes,length,argument){var i=argument<0?argument+length:argument;for(;++i<length;){matchIndexes.push(i);}
return matchIndexes;})}};Expr.pseudos["nth"]=Expr.pseudos["eq"];for(i in{radio:true,checkbox:true,file:true,password:true,image:true}){Expr.pseudos[i]=createInputPseudo(i);}
for(i in{submit:true,reset:true}){Expr.pseudos[i]=createButtonPseudo(i);}
function setFilters(){}
setFilters.prototype=Expr.filters=Expr.pseudos;Expr.setFilters=new setFilters();tokenize=Sizzle.tokenize=function(selector,parseOnly){var matched,match,tokens,type,soFar,groups,preFilters,cached=tokenCache[selector+" "];if(cached){return parseOnly?0:cached.slice(0);}
soFar=selector;groups=[];preFilters=Expr.preFilter;while(soFar){if(!matched||(match=rcomma.exec(soFar))){if(match){soFar=soFar.slice(match[0].length)||soFar;}
groups.push((tokens=[]));}
matched=false;if((match=rcombinators.exec(soFar))){matched=match.shift();tokens.push({value:matched,type:match[0].replace(rtrim," ")});soFar=soFar.slice(matched.length);}
for(type in Expr.filter){if((match=matchExpr[type].exec(soFar))&&(!preFilters[type]||(match=preFilters[type](match)))){matched=match.shift();tokens.push({value:matched,type:type,matches:match});soFar=soFar.slice(matched.length);}}
if(!matched){break;}}
return parseOnly?soFar.length:soFar?Sizzle.error(selector):tokenCache(selector,groups).slice(0);};function toSelector(tokens){var i=0,len=tokens.length,selector="";for(;i<len;i++){selector+=tokens[i].value;}
return selector;}
function addCombinator(matcher,combinator,base){var dir=combinator.dir,skip=combinator.next,key=skip||dir,checkNonElements=base&&key==="parentNode",doneName=done++;return combinator.first?function(elem,context,xml){while((elem=elem[dir])){if(elem.nodeType===1||checkNonElements){return matcher(elem,context,xml);}}
return false;}:function(elem,context,xml){var oldCache,uniqueCache,outerCache,newCache=[dirruns,doneName];if(xml){while((elem=elem[dir])){if(elem.nodeType===1||checkNonElements){if(matcher(elem,context,xml)){return true;}}}}else{while((elem=elem[dir])){if(elem.nodeType===1||checkNonElements){outerCache=elem[expando]||(elem[expando]={});uniqueCache=outerCache[elem.uniqueID]||(outerCache[elem.uniqueID]={});if(skip&&skip===elem.nodeName.toLowerCase()){elem=elem[dir]||elem;}else if((oldCache=uniqueCache[key])&&oldCache[0]===dirruns&&oldCache[1]===doneName){return(newCache[2]=oldCache[2]);}else{uniqueCache[key]=newCache;if((newCache[2]=matcher(elem,context,xml))){return true;}}}}}
return false;};}
function elementMatcher(matchers){return matchers.length>1?function(elem,context,xml){var i=matchers.length;while(i--){if(!matchers[i](elem,context,xml)){return false;}}
return true;}:matchers[0];}
function multipleContexts(selector,contexts,results){var i=0,len=contexts.length;for(;i<len;i++){Sizzle(selector,contexts[i],results);}
return results;}
function condense(unmatched,map,filter,context,xml){var elem,newUnmatched=[],i=0,len=unmatched.length,mapped=map!=null;for(;i<len;i++){if((elem=unmatched[i])){if(!filter||filter(elem,context,xml)){newUnmatched.push(elem);if(mapped){map.push(i);}}}}
return newUnmatched;}
function setMatcher(preFilter,selector,matcher,postFilter,postFinder,postSelector){if(postFilter&&!postFilter[expando]){postFilter=setMatcher(postFilter);}
if(postFinder&&!postFinder[expando]){postFinder=setMatcher(postFinder,postSelector);}
return markFunction(function(seed,results,context,xml){var temp,i,elem,preMap=[],postMap=[],preexisting=results.length,elems=seed||multipleContexts(selector||"*",context.nodeType?[context]:context,[]),matcherIn=preFilter&&(seed||!selector)?condense(elems,preMap,preFilter,context,xml):elems,matcherOut=matcher?postFinder||(seed?preFilter:preexisting||postFilter)?[]:results:matcherIn;if(matcher){matcher(matcherIn,matcherOut,context,xml);}
if(postFilter){temp=condense(matcherOut,postMap);postFilter(temp,[],context,xml);i=temp.length;while(i--){if((elem=temp[i])){matcherOut[postMap[i]]=!(matcherIn[postMap[i]]=elem);}}}
if(seed){if(postFinder||preFilter){if(postFinder){temp=[];i=matcherOut.length;while(i--){if((elem=matcherOut[i])){temp.push((matcherIn[i]=elem));}}
postFinder(null,(matcherOut=[]),temp,xml);}
i=matcherOut.length;while(i--){if((elem=matcherOut[i])&&(temp=postFinder?indexOf(seed,elem):preMap[i])>-1){seed[temp]=!(results[temp]=elem);}}}}else{matcherOut=condense(matcherOut===results?matcherOut.splice(preexisting,matcherOut.length):matcherOut);if(postFinder){postFinder(null,results,matcherOut,xml);}else{push.apply(results,matcherOut);}}});}
function matcherFromTokens(tokens){var checkContext,matcher,j,len=tokens.length,leadingRelative=Expr.relative[tokens[0].type],implicitRelative=leadingRelative||Expr.relative[" "],i=leadingRelative?1:0,matchContext=addCombinator(function(elem){return elem===checkContext;},implicitRelative,true),matchAnyContext=addCombinator(function(elem){return indexOf(checkContext,elem)>-1;},implicitRelative,true),matchers=[function(elem,context,xml){var ret=(!leadingRelative&&(xml||context!==outermostContext))||((checkContext=context).nodeType?matchContext(elem,context,xml):matchAnyContext(elem,context,xml));checkContext=null;return ret;}];for(;i<len;i++){if((matcher=Expr.relative[tokens[i].type])){matchers=[addCombinator(elementMatcher(matchers),matcher)];}else{matcher=Expr.filter[tokens[i].type].apply(null,tokens[i].matches);if(matcher[expando]){j=++i;for(;j<len;j++){if(Expr.relative[tokens[j].type]){break;}}
return setMatcher(i>1&&elementMatcher(matchers),i>1&&toSelector(tokens.slice(0,i-1).concat({value:tokens[i-2].type===" "?"*":""})).replace(rtrim,"$1"),matcher,i<j&&matcherFromTokens(tokens.slice(i,j)),j<len&&matcherFromTokens((tokens=tokens.slice(j))),j<len&&toSelector(tokens));}
matchers.push(matcher);}}
return elementMatcher(matchers);}
function matcherFromGroupMatchers(elementMatchers,setMatchers){var bySet=setMatchers.length>0,byElement=elementMatchers.length>0,superMatcher=function(seed,context,xml,results,outermost){var elem,j,matcher,matchedCount=0,i="0",unmatched=seed&&[],setMatched=[],contextBackup=outermostContext,elems=seed||byElement&&Expr.find["TAG"]("*",outermost),dirrunsUnique=(dirruns+=contextBackup==null?1:Math.random()||0.1),len=elems.length;if(outermost){outermostContext=context==document||context||outermost;}
for(;i!==len&&(elem=elems[i])!=null;i++){if(byElement&&elem){j=0;if(!context&&elem.ownerDocument!=document){setDocument(elem);xml=!documentIsHTML;}
while((matcher=elementMatchers[j++])){if(matcher(elem,context||document,xml)){results.push(elem);break;}}
if(outermost){dirruns=dirrunsUnique;}}
if(bySet){if((elem=!matcher&&elem)){matchedCount--;}
if(seed){unmatched.push(elem);}}}
matchedCount+=i;if(bySet&&i!==matchedCount){j=0;while((matcher=setMatchers[j++])){matcher(unmatched,setMatched,context,xml);}
if(seed){if(matchedCount>0){while(i--){if(!(unmatched[i]||setMatched[i])){setMatched[i]=pop.call(results);}}}
setMatched=condense(setMatched);}
push.apply(results,setMatched);if(outermost&&!seed&&setMatched.length>0&&(matchedCount+setMatchers.length)>1){Sizzle.uniqueSort(results);}}
if(outermost){dirruns=dirrunsUnique;outermostContext=contextBackup;}
return unmatched;};return bySet?markFunction(superMatcher):superMatcher;}
compile=Sizzle.compile=function(selector,match){var i,setMatchers=[],elementMatchers=[],cached=compilerCache[selector+" "];if(!cached){if(!match){match=tokenize(selector);}
i=match.length;while(i--){cached=matcherFromTokens(match[i]);if(cached[expando]){setMatchers.push(cached);}else{elementMatchers.push(cached);}}
cached=compilerCache(selector,matcherFromGroupMatchers(elementMatchers,setMatchers));cached.selector=selector;}
return cached;};select=Sizzle.select=function(selector,context,results,seed){var i,tokens,token,type,find,compiled=typeof selector==="function"&&selector,match=!seed&&tokenize((selector=compiled.selector||selector));results=results||[];if(match.length===1){tokens=match[0]=match[0].slice(0);if(tokens.length>2&&(token=tokens[0]).type==="ID"&&context.nodeType===9&&documentIsHTML&&Expr.relative[tokens[1].type]){context=(Expr.find["ID"](token.matches[0].replace(runescape,funescape),context)||[])[0];if(!context){return results;}else if(compiled){context=context.parentNode;}
selector=selector.slice(tokens.shift().value.length);}
i=matchExpr["needsContext"].test(selector)?0:tokens.length;while(i--){token=tokens[i];if(Expr.relative[(type=token.type)]){break;}
if((find=Expr.find[type])){if((seed=find(token.matches[0].replace(runescape,funescape),rsibling.test(tokens[0].type)&&testContext(context.parentNode)||context))){tokens.splice(i,1);selector=seed.length&&toSelector(tokens);if(!selector){push.apply(results,seed);return results;}
break;}}}}
(compiled||compile(selector,match))(seed,context,!documentIsHTML,results,!context||rsibling.test(selector)&&testContext(context.parentNode)||context);return results;};support.sortStable=expando.split("").sort(sortOrder).join("")===expando;support.detectDuplicates=!!hasDuplicate;setDocument();support.sortDetached=assert(function(el){return el.compareDocumentPosition(document.createElement("fieldset"))&1;});if(!assert(function(el){el.innerHTML="<a href='#'></a>";return el.firstChild.getAttribute("href")==="#";})){addHandle("type|href|height|width",function(elem,name,isXML){if(!isXML){return elem.getAttribute(name,name.toLowerCase()==="type"?1:2);}});}
if(!support.attributes||!assert(function(el){el.innerHTML="<input/>";el.firstChild.setAttribute("value","");return el.firstChild.getAttribute("value")==="";})){addHandle("value",function(elem,_name,isXML){if(!isXML&&elem.nodeName.toLowerCase()==="input"){return elem.defaultValue;}});}
if(!assert(function(el){return el.getAttribute("disabled")==null;})){addHandle(booleans,function(elem,name,isXML){var val;if(!isXML){return elem[name]===true?name.toLowerCase():(val=elem.getAttributeNode(name))&&val.specified?val.value:null;}});}
var _sizzle=window.Sizzle;Sizzle.noConflict=function(){if(window.Sizzle===Sizzle){window.Sizzle=_sizzle;}
return Sizzle;};if(typeof define==="function"&&define.amd){define(function(){return Sizzle;});}else if(typeof module!=="undefined"&&module.exports){module.exports=Sizzle;}else{window.Sizzle=Sizzle;}})(window);(function(root,undef){var ArrayProto=Array.prototype,ObjProto=Object.prototype,slice=ArrayProto.slice,hasOwnProp=ObjProto.hasOwnProperty,nativeForEach=ArrayProto.forEach,breaker={};var _={forEach:function(obj,iterator,context){var i,l,key;if(obj===null){return;}
if(nativeForEach&&obj.forEach===nativeForEach){obj.forEach(iterator,context);}
else if(obj.length===+obj.length){for(i=0,l=obj.length;i<l;i++){if(i in obj&&iterator.call(context,obj[i],i,obj)===breaker){return;}}}
else{for(key in obj){if(hasOwnProp.call(obj,key)){if(iterator.call(context,obj[key],key,obj)===breaker){return;}}}}},extend:function(obj){this.forEach(slice.call(arguments,1),function(source){for(var prop in source){obj[prop]=source[prop];}});return obj;}};var Jed=function(options){this.defaults={"locale_data":{"messages":{"":{"domain":"messages","lang":"en","plural_forms":"nplurals=2; plural=(n != 1);"}}},"domain":"messages","debug":false};this.options=_.extend({},this.defaults,options);this.textdomain(this.options.domain);if(options.domain&&!this.options.locale_data[this.options.domain]){throw new Error('Text domain set to non-existent domain: `'+options.domain+'`');}};Jed.context_delimiter=String.fromCharCode(4);function getPluralFormFunc(plural_form_string){return Jed.PF.compile(plural_form_string||"nplurals=2; plural=(n != 1);");}
function Chain(key,i18n){this._key=key;this._i18n=i18n;}
_.extend(Chain.prototype,{onDomain:function(domain){this._domain=domain;return this;},withContext:function(context){this._context=context;return this;},ifPlural:function(num,pkey){this._val=num;this._pkey=pkey;return this;},fetch:function(sArr){if({}.toString.call(sArr)!='[object Array]'){sArr=[].slice.call(arguments,0);}
return(sArr&&sArr.length?Jed.sprintf:function(x){return x;})(this._i18n.dcnpgettext(this._domain,this._context,this._key,this._pkey,this._val),sArr);}});_.extend(Jed.prototype,{translate:function(key){return new Chain(key,this);},textdomain:function(domain){if(!domain){return this._textdomain;}
this._textdomain=domain;},gettext:function(key){return this.dcnpgettext.call(this,undef,undef,key);},dgettext:function(domain,key){return this.dcnpgettext.call(this,domain,undef,key);},dcgettext:function(domain,key){return this.dcnpgettext.call(this,domain,undef,key);},ngettext:function(skey,pkey,val){return this.dcnpgettext.call(this,undef,undef,skey,pkey,val);},dngettext:function(domain,skey,pkey,val){return this.dcnpgettext.call(this,domain,undef,skey,pkey,val);},dcngettext:function(domain,skey,pkey,val){return this.dcnpgettext.call(this,domain,undef,skey,pkey,val);},pgettext:function(context,key){return this.dcnpgettext.call(this,undef,context,key);},dpgettext:function(domain,context,key){return this.dcnpgettext.call(this,domain,context,key);},dcpgettext:function(domain,context,key){return this.dcnpgettext.call(this,domain,context,key);},npgettext:function(context,skey,pkey,val){return this.dcnpgettext.call(this,undef,context,skey,pkey,val);},dnpgettext:function(domain,context,skey,pkey,val){return this.dcnpgettext.call(this,domain,context,skey,pkey,val);},dcnpgettext:function(domain,context,singular_key,plural_key,val){plural_key=plural_key||singular_key;domain=domain||this._textdomain;var fallback;if(!this.options){fallback=new Jed();return fallback.dcnpgettext.call(fallback,undefined,undefined,singular_key,plural_key,val);}
if(!this.options.locale_data){throw new Error('No locale data provided.');}
if(!this.options.locale_data[domain]){throw new Error('Domain `'+domain+'` was not found.');}
if(!this.options.locale_data[domain][""]){throw new Error('No locale meta information provided.');}
if(!singular_key){throw new Error('No translation key found.');}
var key=context?context+Jed.context_delimiter+singular_key:singular_key,locale_data=this.options.locale_data,dict=locale_data[domain],defaultConf=(locale_data.messages||this.defaults.locale_data.messages)[""],pluralForms=dict[""].plural_forms||dict[""]["Plural-Forms"]||dict[""]["plural-forms"]||defaultConf.plural_forms||defaultConf["Plural-Forms"]||defaultConf["plural-forms"],val_list,res;var val_idx;if(val===undefined){val_idx=0;}else{if(typeof val!='number'){val=parseInt(val,10);if(isNaN(val)){throw new Error('The number that was passed in is not a number.');}}
val_idx=getPluralFormFunc(pluralForms)(val);}
if(!dict){throw new Error('No domain named `'+domain+'` could be found.');}
val_list=dict[key];if(!val_list||val_idx>val_list.length){if(this.options.missing_key_callback){this.options.missing_key_callback(key,domain);}
res=[singular_key,plural_key];if(this.options.debug===true){console.log(res[getPluralFormFunc(pluralForms)(val)]);}
return res[getPluralFormFunc()(val)];}
res=val_list[val_idx];if(!res){res=[singular_key,plural_key];return res[getPluralFormFunc()(val)];}
return res;}});var sprintf=(function(){function get_type(variable){return Object.prototype.toString.call(variable).slice(8,-1).toLowerCase();}
function str_repeat(input,multiplier){for(var output=[];multiplier>0;output[--multiplier]=input){}
return output.join('');}
var str_format=function(){if(!str_format.cache.hasOwnProperty(arguments[0])){str_format.cache[arguments[0]]=str_format.parse(arguments[0]);}
return str_format.format.call(null,str_format.cache[arguments[0]],arguments);};str_format.format=function(parse_tree,argv){var cursor=1,tree_length=parse_tree.length,node_type='',arg,output=[],i,k,match,pad,pad_character,pad_length;for(i=0;i<tree_length;i++){node_type=get_type(parse_tree[i]);if(node_type==='string'){output.push(parse_tree[i]);}
else if(node_type==='array'){match=parse_tree[i];if(match[2]){arg=argv[cursor];for(k=0;k<match[2].length;k++){if(!arg.hasOwnProperty(match[2][k])){throw(sprintf('[sprintf] property "%s" does not exist',match[2][k]));}
arg=arg[match[2][k]];}}
else if(match[1]){arg=argv[match[1]];}
else{arg=argv[cursor++];}
if(/[^s]/.test(match[8])&&(get_type(arg)!='number')){throw(sprintf('[sprintf] expecting number but found %s',get_type(arg)));}
if(typeof arg=='undefined'||arg===null){arg='';}
switch(match[8]){case'b':arg=arg.toString(2);break;case'c':arg=String.fromCharCode(arg);break;case'd':arg=parseInt(arg,10);break;case'e':arg=match[7]?arg.toExponential(match[7]):arg.toExponential();break;case'f':arg=match[7]?parseFloat(arg).toFixed(match[7]):parseFloat(arg);break;case'o':arg=arg.toString(8);break;case's':arg=((arg=String(arg))&&match[7]?arg.substring(0,match[7]):arg);break;case'u':arg=Math.abs(arg);break;case'x':arg=arg.toString(16);break;case'X':arg=arg.toString(16).toUpperCase();break;}
arg=(/[def]/.test(match[8])&&match[3]&&arg>=0?'+'+arg:arg);pad_character=match[4]?match[4]=='0'?'0':match[4].charAt(1):' ';pad_length=match[6]-String(arg).length;pad=match[6]?str_repeat(pad_character,pad_length):'';output.push(match[5]?arg+pad:pad+arg);}}
return output.join('');};str_format.cache={};str_format.parse=function(fmt){var _fmt=fmt,match=[],parse_tree=[],arg_names=0;while(_fmt){if((match=/^[^\x25]+/.exec(_fmt))!==null){parse_tree.push(match[0]);}
else if((match=/^\x25{2}/.exec(_fmt))!==null){parse_tree.push('%');}
else if((match=/^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(_fmt))!==null){if(match[2]){arg_names|=1;var field_list=[],replacement_field=match[2],field_match=[];if((field_match=/^([a-z_][a-z_\d]*)/i.exec(replacement_field))!==null){field_list.push(field_match[1]);while((replacement_field=replacement_field.substring(field_match[0].length))!==''){if((field_match=/^\.([a-z_][a-z_\d]*)/i.exec(replacement_field))!==null){field_list.push(field_match[1]);}
else if((field_match=/^\[(\d+)\]/.exec(replacement_field))!==null){field_list.push(field_match[1]);}
else{throw('[sprintf] huh?');}}}
else{throw('[sprintf] huh?');}
match[2]=field_list;}
else{arg_names|=2;}
if(arg_names===3){throw('[sprintf] mixing positional and named placeholders is not (yet) supported');}
parse_tree.push(match);}
else{throw('[sprintf] huh?');}
_fmt=_fmt.substring(match[0].length);}
return parse_tree;};return str_format;})();var vsprintf=function(fmt,argv){argv.unshift(fmt);return sprintf.apply(null,argv);};Jed.parse_plural=function(plural_forms,n){plural_forms=plural_forms.replace(/n/g,n);return Jed.parse_expression(plural_forms);};Jed.sprintf=function(fmt,args){if({}.toString.call(args)=='[object Array]'){return vsprintf(fmt,[].slice.call(args));}
return sprintf.apply(this,[].slice.call(arguments));};Jed.prototype.sprintf=function(){return Jed.sprintf.apply(this,arguments);};Jed.PF={};Jed.PF.parse=function(p){var plural_str=Jed.PF.extractPluralExpr(p);return Jed.PF.parser.parse.call(Jed.PF.parser,plural_str);};Jed.PF.compile=function(p){function imply(val){return(val===true?1:val?val:0);}
var ast=Jed.PF.parse(p);return function(n){return imply(Jed.PF.interpreter(ast)(n));};};Jed.PF.interpreter=function(ast){return function(n){var res;switch(ast.type){case'GROUP':return Jed.PF.interpreter(ast.expr)(n);case'TERNARY':if(Jed.PF.interpreter(ast.expr)(n)){return Jed.PF.interpreter(ast.truthy)(n);}
return Jed.PF.interpreter(ast.falsey)(n);case'OR':return Jed.PF.interpreter(ast.left)(n)||Jed.PF.interpreter(ast.right)(n);case'AND':return Jed.PF.interpreter(ast.left)(n)&&Jed.PF.interpreter(ast.right)(n);case'LT':return Jed.PF.interpreter(ast.left)(n)<Jed.PF.interpreter(ast.right)(n);case'GT':return Jed.PF.interpreter(ast.left)(n)>Jed.PF.interpreter(ast.right)(n);case'LTE':return Jed.PF.interpreter(ast.left)(n)<=Jed.PF.interpreter(ast.right)(n);case'GTE':return Jed.PF.interpreter(ast.left)(n)>=Jed.PF.interpreter(ast.right)(n);case'EQ':return Jed.PF.interpreter(ast.left)(n)==Jed.PF.interpreter(ast.right)(n);case'NEQ':return Jed.PF.interpreter(ast.left)(n)!=Jed.PF.interpreter(ast.right)(n);case'MOD':return Jed.PF.interpreter(ast.left)(n)%Jed.PF.interpreter(ast.right)(n);case'VAR':return n;case'NUM':return ast.val;default:throw new Error("Invalid Token found.");}};};Jed.PF.extractPluralExpr=function(p){p=p.replace(/^\s\s*/,'').replace(/\s\s*$/,'');if(!/;\s*$/.test(p)){p=p.concat(';');}
var nplurals_re=/nplurals\=(\d+);/,plural_re=/plural\=(.*);/,nplurals_matches=p.match(nplurals_re),res={},plural_matches;if(nplurals_matches.length>1){res.nplurals=nplurals_matches[1];}
else{throw new Error('nplurals not found in plural_forms string: '+p);}
p=p.replace(nplurals_re,"");plural_matches=p.match(plural_re);if(!(plural_matches&&plural_matches.length>1)){throw new Error('`plural` expression not found: '+p);}
return plural_matches[1];};Jed.PF.parser=(function(){var parser={trace:function trace(){},yy:{},symbols_:{"error":2,"expressions":3,"e":4,"EOF":5,"?":6,":":7,"||":8,"&&":9,"<":10,"<=":11,">":12,">=":13,"!=":14,"==":15,"%":16,"(":17,")":18,"n":19,"NUMBER":20,"$accept":0,"$end":1},terminals_:{2:"error",5:"EOF",6:"?",7:":",8:"||",9:"&&",10:"<",11:"<=",12:">",13:">=",14:"!=",15:"==",16:"%",17:"(",18:")",19:"n",20:"NUMBER"},productions_:[0,[3,2],[4,5],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,1],[4,1]],performAction:function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$){var $0=$$.length-1;switch(yystate){case 1:return{type:'GROUP',expr:$$[$0-1]};break;case 2:this.$={type:'TERNARY',expr:$$[$0-4],truthy:$$[$0-2],falsey:$$[$0]};break;case 3:this.$={type:"OR",left:$$[$0-2],right:$$[$0]};break;case 4:this.$={type:"AND",left:$$[$0-2],right:$$[$0]};break;case 5:this.$={type:'LT',left:$$[$0-2],right:$$[$0]};break;case 6:this.$={type:'LTE',left:$$[$0-2],right:$$[$0]};break;case 7:this.$={type:'GT',left:$$[$0-2],right:$$[$0]};break;case 8:this.$={type:'GTE',left:$$[$0-2],right:$$[$0]};break;case 9:this.$={type:'NEQ',left:$$[$0-2],right:$$[$0]};break;case 10:this.$={type:'EQ',left:$$[$0-2],right:$$[$0]};break;case 11:this.$={type:'MOD',left:$$[$0-2],right:$$[$0]};break;case 12:this.$={type:'GROUP',expr:$$[$0-1]};break;case 13:this.$={type:'VAR'};break;case 14:this.$={type:'NUM',val:Number(yytext)};break;}},table:[{3:1,4:2,17:[1,3],19:[1,4],20:[1,5]},{1:[3]},{5:[1,6],6:[1,7],8:[1,8],9:[1,9],10:[1,10],11:[1,11],12:[1,12],13:[1,13],14:[1,14],15:[1,15],16:[1,16]},{4:17,17:[1,3],19:[1,4],20:[1,5]},{5:[2,13],6:[2,13],7:[2,13],8:[2,13],9:[2,13],10:[2,13],11:[2,13],12:[2,13],13:[2,13],14:[2,13],15:[2,13],16:[2,13],18:[2,13]},{5:[2,14],6:[2,14],7:[2,14],8:[2,14],9:[2,14],10:[2,14],11:[2,14],12:[2,14],13:[2,14],14:[2,14],15:[2,14],16:[2,14],18:[2,14]},{1:[2,1]},{4:18,17:[1,3],19:[1,4],20:[1,5]},{4:19,17:[1,3],19:[1,4],20:[1,5]},{4:20,17:[1,3],19:[1,4],20:[1,5]},{4:21,17:[1,3],19:[1,4],20:[1,5]},{4:22,17:[1,3],19:[1,4],20:[1,5]},{4:23,17:[1,3],19:[1,4],20:[1,5]},{4:24,17:[1,3],19:[1,4],20:[1,5]},{4:25,17:[1,3],19:[1,4],20:[1,5]},{4:26,17:[1,3],19:[1,4],20:[1,5]},{4:27,17:[1,3],19:[1,4],20:[1,5]},{6:[1,7],8:[1,8],9:[1,9],10:[1,10],11:[1,11],12:[1,12],13:[1,13],14:[1,14],15:[1,15],16:[1,16],18:[1,28]},{6:[1,7],7:[1,29],8:[1,8],9:[1,9],10:[1,10],11:[1,11],12:[1,12],13:[1,13],14:[1,14],15:[1,15],16:[1,16]},{5:[2,3],6:[2,3],7:[2,3],8:[2,3],9:[1,9],10:[1,10],11:[1,11],12:[1,12],13:[1,13],14:[1,14],15:[1,15],16:[1,16],18:[2,3]},{5:[2,4],6:[2,4],7:[2,4],8:[2,4],9:[2,4],10:[1,10],11:[1,11],12:[1,12],13:[1,13],14:[1,14],15:[1,15],16:[1,16],18:[2,4]},{5:[2,5],6:[2,5],7:[2,5],8:[2,5],9:[2,5],10:[2,5],11:[2,5],12:[2,5],13:[2,5],14:[2,5],15:[2,5],16:[1,16],18:[2,5]},{5:[2,6],6:[2,6],7:[2,6],8:[2,6],9:[2,6],10:[2,6],11:[2,6],12:[2,6],13:[2,6],14:[2,6],15:[2,6],16:[1,16],18:[2,6]},{5:[2,7],6:[2,7],7:[2,7],8:[2,7],9:[2,7],10:[2,7],11:[2,7],12:[2,7],13:[2,7],14:[2,7],15:[2,7],16:[1,16],18:[2,7]},{5:[2,8],6:[2,8],7:[2,8],8:[2,8],9:[2,8],10:[2,8],11:[2,8],12:[2,8],13:[2,8],14:[2,8],15:[2,8],16:[1,16],18:[2,8]},{5:[2,9],6:[2,9],7:[2,9],8:[2,9],9:[2,9],10:[2,9],11:[2,9],12:[2,9],13:[2,9],14:[2,9],15:[2,9],16:[1,16],18:[2,9]},{5:[2,10],6:[2,10],7:[2,10],8:[2,10],9:[2,10],10:[2,10],11:[2,10],12:[2,10],13:[2,10],14:[2,10],15:[2,10],16:[1,16],18:[2,10]},{5:[2,11],6:[2,11],7:[2,11],8:[2,11],9:[2,11],10:[2,11],11:[2,11],12:[2,11],13:[2,11],14:[2,11],15:[2,11],16:[2,11],18:[2,11]},{5:[2,12],6:[2,12],7:[2,12],8:[2,12],9:[2,12],10:[2,12],11:[2,12],12:[2,12],13:[2,12],14:[2,12],15:[2,12],16:[2,12],18:[2,12]},{4:30,17:[1,3],19:[1,4],20:[1,5]},{5:[2,2],6:[1,7],7:[2,2],8:[1,8],9:[1,9],10:[1,10],11:[1,11],12:[1,12],13:[1,13],14:[1,14],15:[1,15],16:[1,16],18:[2,2]}],defaultActions:{6:[2,1]},parseError:function parseError(str,hash){throw new Error(str);},parse:function parse(input){var self=this,stack=[0],vstack=[null],lstack=[],table=this.table,yytext='',yylineno=0,yyleng=0,recovering=0,TERROR=2,EOF=1;this.lexer.setInput(input);this.lexer.yy=this.yy;this.yy.lexer=this.lexer;if(typeof this.lexer.yylloc=='undefined')
this.lexer.yylloc={};var yyloc=this.lexer.yylloc;lstack.push(yyloc);if(typeof this.yy.parseError==='function')
this.parseError=this.yy.parseError;function popStack(n){stack.length=stack.length-2*n;vstack.length=vstack.length-n;lstack.length=lstack.length-n;}
function lex(){var token;token=self.lexer.lex()||1;if(typeof token!=='number'){token=self.symbols_[token]||token;}
return token;}
var symbol,preErrorSymbol,state,action,a,r,yyval={},p,len,newState,expected;while(true){state=stack[stack.length-1];if(this.defaultActions[state]){action=this.defaultActions[state];}else{if(symbol==null)
symbol=lex();action=table[state]&&table[state][symbol];}
_handle_error:if(typeof action==='undefined'||!action.length||!action[0]){if(!recovering){expected=[];for(p in table[state])if(this.terminals_[p]&&p>2){expected.push("'"+this.terminals_[p]+"'");}
var errStr='';if(this.lexer.showPosition){errStr='Parse error on line '+(yylineno+1)+":\n"+this.lexer.showPosition()+"\nExpecting "+expected.join(', ')+", got '"+this.terminals_[symbol]+"'";}else{errStr='Parse error on line '+(yylineno+1)+": Unexpected "+
(symbol==1?"end of input":("'"+(this.terminals_[symbol]||symbol)+"'"));}
this.parseError(errStr,{text:this.lexer.match,token:this.terminals_[symbol]||symbol,line:this.lexer.yylineno,loc:yyloc,expected:expected});}
if(recovering==3){if(symbol==EOF){throw new Error(errStr||'Parsing halted.');}
yyleng=this.lexer.yyleng;yytext=this.lexer.yytext;yylineno=this.lexer.yylineno;yyloc=this.lexer.yylloc;symbol=lex();}
while(1){if((TERROR.toString())in table[state]){break;}
if(state==0){throw new Error(errStr||'Parsing halted.');}
popStack(1);state=stack[stack.length-1];}
preErrorSymbol=symbol;symbol=TERROR;state=stack[stack.length-1];action=table[state]&&table[state][TERROR];recovering=3;}
if(action[0]instanceof Array&&action.length>1){throw new Error('Parse Error: multiple actions possible at state: '+state+', token: '+symbol);}
switch(action[0]){case 1:stack.push(symbol);vstack.push(this.lexer.yytext);lstack.push(this.lexer.yylloc);stack.push(action[1]);symbol=null;if(!preErrorSymbol){yyleng=this.lexer.yyleng;yytext=this.lexer.yytext;yylineno=this.lexer.yylineno;yyloc=this.lexer.yylloc;if(recovering>0)
recovering--;}else{symbol=preErrorSymbol;preErrorSymbol=null;}
break;case 2:len=this.productions_[action[1]][1];yyval.$=vstack[vstack.length-len];yyval._$={first_line:lstack[lstack.length-(len||1)].first_line,last_line:lstack[lstack.length-1].last_line,first_column:lstack[lstack.length-(len||1)].first_column,last_column:lstack[lstack.length-1].last_column};r=this.performAction.call(yyval,yytext,yyleng,yylineno,this.yy,action[1],vstack,lstack);if(typeof r!=='undefined'){return r;}
if(len){stack=stack.slice(0,-1*len*2);vstack=vstack.slice(0,-1*len);lstack=lstack.slice(0,-1*len);}
stack.push(this.productions_[action[1]][0]);vstack.push(yyval.$);lstack.push(yyval._$);newState=table[stack[stack.length-2]][stack[stack.length-1]];stack.push(newState);break;case 3:return true;}}
return true;}};var lexer=(function(){var lexer=({EOF:1,parseError:function parseError(str,hash){if(this.yy.parseError){this.yy.parseError(str,hash);}else{throw new Error(str);}},setInput:function(input){this._input=input;this._more=this._less=this.done=false;this.yylineno=this.yyleng=0;this.yytext=this.matched=this.match='';this.conditionStack=['INITIAL'];this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0};return this;},input:function(){var ch=this._input[0];this.yytext+=ch;this.yyleng++;this.match+=ch;this.matched+=ch;var lines=ch.match(/\n/);if(lines)this.yylineno++;this._input=this._input.slice(1);return ch;},unput:function(ch){this._input=ch+this._input;return this;},more:function(){this._more=true;return this;},pastInput:function(){var past=this.matched.substr(0,this.matched.length-this.match.length);return(past.length>20?'...':'')+past.substr(-20).replace(/\n/g,"");},upcomingInput:function(){var next=this.match;if(next.length<20){next+=this._input.substr(0,20-next.length);}
return(next.substr(0,20)+(next.length>20?'...':'')).replace(/\n/g,"");},showPosition:function(){var pre=this.pastInput();var c=new Array(pre.length+1).join("-");return pre+this.upcomingInput()+"\n"+c+"^";},next:function(){if(this.done){return this.EOF;}
if(!this._input)this.done=true;var token,match,col,lines;if(!this._more){this.yytext='';this.match='';}
var rules=this._currentRules();for(var i=0;i<rules.length;i++){match=this._input.match(this.rules[rules[i]]);if(match){lines=match[0].match(/\n.*/g);if(lines)this.yylineno+=lines.length;this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:lines?lines[lines.length-1].length-1:this.yylloc.last_column+match[0].length}
this.yytext+=match[0];this.match+=match[0];this.matches=match;this.yyleng=this.yytext.length;this._more=false;this._input=this._input.slice(match[0].length);this.matched+=match[0];token=this.performAction.call(this,this.yy,this,rules[i],this.conditionStack[this.conditionStack.length-1]);if(token)return token;else return;}}
if(this._input===""){return this.EOF;}else{this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(),{text:"",token:null,line:this.yylineno});}},lex:function lex(){var r=this.next();if(typeof r!=='undefined'){return r;}else{return this.lex();}},begin:function begin(condition){this.conditionStack.push(condition);},popState:function popState(){return this.conditionStack.pop();},_currentRules:function _currentRules(){return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;},topState:function(){return this.conditionStack[this.conditionStack.length-2];},pushState:function begin(condition){this.begin(condition);}});lexer.performAction=function anonymous(yy,yy_,$avoiding_name_collisions,YY_START){var YYSTATE=YY_START;switch($avoiding_name_collisions){case 0:break;case 1:return 20
break;case 2:return 19
break;case 3:return 8
break;case 4:return 9
break;case 5:return 6
break;case 6:return 7
break;case 7:return 11
break;case 8:return 13
break;case 9:return 10
break;case 10:return 12
break;case 11:return 14
break;case 12:return 15
break;case 13:return 16
break;case 14:return 17
break;case 15:return 18
break;case 16:return 5
break;case 17:return'INVALID'
break;}};lexer.rules=[/^\s+/,/^[0-9]+(\.[0-9]+)?\b/,/^n\b/,/^\|\|/,/^&&/,/^\?/,/^:/,/^<=/,/^>=/,/^</,/^>/,/^!=/,/^==/,/^%/,/^\(/,/^\)/,/^$/,/^./];lexer.conditions={"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],"inclusive":true}};return lexer;})()
parser.lexer=lexer;return parser;})();if(typeof exports!=='undefined'){if(typeof module!=='undefined'&&module.exports){exports=module.exports=Jed;}
exports.Jed=Jed;}
else{if(typeof define==='function'&&define.amd){define(function(){return Jed;});}
root['Jed']=Jed;}})(this);_.templateSettings.escape=/\{\{-(.+?)\}\}/g
_.templateSettings.evaluate=/\{\{!(.+?)\}\}/g
_.templateSettings.interpolate=/\{\{(.+?)\}\}/g
const component=(name)=>`/_/${name}`
const debug=(message)=>{if(_.isUndefined(message))console.log(message)
else console.log(JSON.parse(JSON.stringify(message)))}
const now=()=>window.performance.now().toString().replace('.','')
const render=(name,target,context)=>{let id=`${name}-${now()}`
let source=`<source id="${id}">`
if(_.isUndefined(context))context={}
let request=fetch(component(name)).then((response)=>response.text()).then((text)=>{let dom=$(_.template(text)(context))
dom.find('a, img').attr('draggable',false)
dom.find('a').click((event)=>{let href=$(event.target).parents('a').attr('href')
if(href)Page.navigate(href,{trigger:true})
return false})
$(`source#${id}`).replaceWith(dom)})
if(target){$(target).html(source)
return request}
return source}
const Data={start:(location)=>{return fetch(location).then((response)=>response.json().then((api)=>{_(api.endpoints).each((path,name)=>{let Collection=Backbone.Collection.extend({all:function(){return this.toJSON()},url:path})
Data[name]=new Collection
Data[name].fetch()})}))}}
Backbone.sync=(action,resource,params)=>{const actions={read:{},create:{method:'POST',body:JSON.stringify(resource)},update:{method:'PUT',body:JSON.stringify(resource)},delete:{method:'DELETE'}}
if(_.isUndefined(resource))return resource
let url=resource.url
if(_.isFunction(resource.url))url=resource.url()
actions[action].headers={'Content-Type':'application/json'}
if(Auth.token)actions[action].headers.Authorization=Auth.token
return fetch(url,actions[action]).then((response)=>response.json().then((body)=>resource.set(body)))}
const Auth={token:localStorage.getItem('Auth.token'),start:(credentials)=>{let token=Data.Token.add(credentials)
token.save().then(()=>{Auth.token=Data.Token.models.pop().id
localStorage.setItem('Auth.token',Auth.token)})}}
const Router=Backbone.Router.extend({routes:{'':'index'},reload:()=>{let path=location.pathname.substring(1)
if(!_.isUndefined(Page.routes[path]))Page[Page.routes[path]]()},})
const Page=new Router()
Backbone.history.start({pushState:true,silent:true})
Data.start('/api')
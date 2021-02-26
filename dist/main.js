(()=>{"use strict";function e(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}function t(t){e(1,arguments);var n=Object.prototype.toString.call(t);return t instanceof Date||"object"==typeof t&&"[object Date]"===n?new Date(t.getTime()):"number"==typeof t||"[object Number]"===n?new Date(t):("string"!=typeof t&&"[object String]"!==n||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function n(n){e(1,arguments);var r=t(n);return r.setHours(0,0,0,0),r}function r(t,r){e(2,arguments);var a=n(t),i=n(r);return a.getTime()===i.getTime()}function a(n){e(1,arguments);var r=t(n);return!isNaN(r)}var i={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function o(e){return function(t){var n=t||{},r=n.width?String(n.width):e.defaultWidth;return e.formats[r]||e.formats[e.defaultWidth]}}var u,d={date:o({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:o({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:o({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},s={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function c(e){return function(t,n){var r,a=n||{};if("formatting"===(a.context?String(a.context):"standalone")&&e.formattingValues){var i=e.defaultFormattingWidth||e.defaultWidth,o=a.width?String(a.width):i;r=e.formattingValues[o]||e.formattingValues[i]}else{var u=e.defaultWidth,d=a.width?String(a.width):e.defaultWidth;r=e.values[d]||e.values[u]}return r[e.argumentCallback?e.argumentCallback(t):t]}}function l(e){return function(t,n){var r=String(t),a=n||{},i=a.width,o=i&&e.matchPatterns[i]||e.matchPatterns[e.defaultMatchWidth],u=r.match(o);if(!u)return null;var d,s=u[0],c=i&&e.parsePatterns[i]||e.parsePatterns[e.defaultParseWidth];return d="[object Array]"===Object.prototype.toString.call(c)?function(e,t){for(var n=0;n<e.length;n++)if(e[n].test(s))return n}(c):function(e,t){for(var n in e)if(e.hasOwnProperty(n)&&e[n].test(s))return n}(c),d=e.valueCallback?e.valueCallback(d):d,{value:d=a.valueCallback?a.valueCallback(d):d,rest:r.slice(s.length)}}}const m={code:"en-US",formatDistance:function(e,t,n){var r;return n=n||{},r="string"==typeof i[e]?i[e]:1===t?i[e].one:i[e].other.replace("{{count}}",t),n.addSuffix?n.comparison>0?"in "+r:r+" ago":r},formatLong:d,formatRelative:function(e,t,n,r){return s[e]},localize:{ordinalNumber:function(e,t){var n=Number(e),r=n%100;if(r>20||r<10)switch(r%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:c({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:c({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:function(e){return Number(e)-1}}),month:c({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:c({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:c({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(u={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(e){return parseInt(e,10)}},function(e,t){var n=String(e),r=t||{},a=n.match(u.matchPattern);if(!a)return null;var i=a[0],o=n.match(u.parsePattern);if(!o)return null;var d=u.valueCallback?u.valueCallback(o[0]):o[0];return{value:d=r.valueCallback?r.valueCallback(d):d,rest:n.slice(i.length)}}),era:l({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:l({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:l({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:l({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:l({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};function f(e){if(null===e||!0===e||!1===e)return NaN;var t=Number(e);return isNaN(t)?t:t<0?Math.ceil(t):Math.floor(t)}function h(n,r){e(2,arguments);var a=t(n).getTime(),i=f(r);return new Date(a+i)}function g(t,n){e(2,arguments);var r=f(n);return h(t,-r)}function p(e,t){for(var n=e<0?"-":"",r=Math.abs(e).toString();r.length<t;)r="0"+r;return n+r}const w=function(e,t){var n=e.getUTCFullYear(),r=n>0?n:1-n;return p("yy"===t?r%100:r,t.length)},v=function(e,t){var n=e.getUTCMonth();return"M"===t?String(n+1):p(n+1,2)},b=function(e,t){return p(e.getUTCDate(),t.length)},y=function(e,t){return p(e.getUTCHours()%12||12,t.length)},T=function(e,t){return p(e.getUTCHours(),t.length)},x=function(e,t){return p(e.getUTCMinutes(),t.length)},C=function(e,t){return p(e.getUTCSeconds(),t.length)},k=function(e,t){var n=t.length,r=e.getUTCMilliseconds();return p(Math.floor(r*Math.pow(10,n-3)),t.length)};var S=864e5;function M(n){e(1,arguments);var r=1,a=t(n),i=a.getUTCDay(),o=(i<r?7:0)+i-r;return a.setUTCDate(a.getUTCDate()-o),a.setUTCHours(0,0,0,0),a}function N(n){e(1,arguments);var r=t(n),a=r.getUTCFullYear(),i=new Date(0);i.setUTCFullYear(a+1,0,4),i.setUTCHours(0,0,0,0);var o=M(i),u=new Date(0);u.setUTCFullYear(a,0,4),u.setUTCHours(0,0,0,0);var d=M(u);return r.getTime()>=o.getTime()?a+1:r.getTime()>=d.getTime()?a:a-1}function D(t){e(1,arguments);var n=N(t),r=new Date(0);r.setUTCFullYear(n,0,4),r.setUTCHours(0,0,0,0);var a=M(r);return a}var E=6048e5;function P(n,r){e(1,arguments);var a=r||{},i=a.locale,o=i&&i.options&&i.options.weekStartsOn,u=null==o?0:f(o),d=null==a.weekStartsOn?u:f(a.weekStartsOn);if(!(d>=0&&d<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var s=t(n),c=s.getUTCDay(),l=(c<d?7:0)+c-d;return s.setUTCDate(s.getUTCDate()-l),s.setUTCHours(0,0,0,0),s}function U(n,r){e(1,arguments);var a=t(n,r),i=a.getUTCFullYear(),o=r||{},u=o.locale,d=u&&u.options&&u.options.firstWeekContainsDate,s=null==d?1:f(d),c=null==o.firstWeekContainsDate?s:f(o.firstWeekContainsDate);if(!(c>=1&&c<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var l=new Date(0);l.setUTCFullYear(i+1,0,c),l.setUTCHours(0,0,0,0);var m=P(l,r),h=new Date(0);h.setUTCFullYear(i,0,c),h.setUTCHours(0,0,0,0);var g=P(h,r);return a.getTime()>=m.getTime()?i+1:a.getTime()>=g.getTime()?i:i-1}function q(t,n){e(1,arguments);var r=n||{},a=r.locale,i=a&&a.options&&a.options.firstWeekContainsDate,o=null==i?1:f(i),u=null==r.firstWeekContainsDate?o:f(r.firstWeekContainsDate),d=U(t,n),s=new Date(0);s.setUTCFullYear(d,0,u),s.setUTCHours(0,0,0,0);var c=P(s,n);return c}var L=6048e5;function W(e,t){var n=e>0?"-":"+",r=Math.abs(e),a=Math.floor(r/60),i=r%60;if(0===i)return n+String(a);var o=t||"";return n+String(a)+o+p(i,2)}function j(e,t){return e%60==0?(e>0?"-":"+")+p(Math.abs(e)/60,2):Y(e,t)}function Y(e,t){var n=t||"",r=e>0?"-":"+",a=Math.abs(e);return r+p(Math.floor(a/60),2)+n+p(a%60,2)}const O={G:function(e,t,n){var r=e.getUTCFullYear()>0?1:0;switch(t){case"G":case"GG":case"GGG":return n.era(r,{width:"abbreviated"});case"GGGGG":return n.era(r,{width:"narrow"});case"GGGG":default:return n.era(r,{width:"wide"})}},y:function(e,t,n){if("yo"===t){var r=e.getUTCFullYear(),a=r>0?r:1-r;return n.ordinalNumber(a,{unit:"year"})}return w(e,t)},Y:function(e,t,n,r){var a=U(e,r),i=a>0?a:1-a;return"YY"===t?p(i%100,2):"Yo"===t?n.ordinalNumber(i,{unit:"year"}):p(i,t.length)},R:function(e,t){return p(N(e),t.length)},u:function(e,t){return p(e.getUTCFullYear(),t.length)},Q:function(e,t,n){var r=Math.ceil((e.getUTCMonth()+1)/3);switch(t){case"Q":return String(r);case"QQ":return p(r,2);case"Qo":return n.ordinalNumber(r,{unit:"quarter"});case"QQQ":return n.quarter(r,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(r,{width:"narrow",context:"formatting"});case"QQQQ":default:return n.quarter(r,{width:"wide",context:"formatting"})}},q:function(e,t,n){var r=Math.ceil((e.getUTCMonth()+1)/3);switch(t){case"q":return String(r);case"qq":return p(r,2);case"qo":return n.ordinalNumber(r,{unit:"quarter"});case"qqq":return n.quarter(r,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(r,{width:"narrow",context:"standalone"});case"qqqq":default:return n.quarter(r,{width:"wide",context:"standalone"})}},M:function(e,t,n){var r=e.getUTCMonth();switch(t){case"M":case"MM":return v(e,t);case"Mo":return n.ordinalNumber(r+1,{unit:"month"});case"MMM":return n.month(r,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(r,{width:"narrow",context:"formatting"});case"MMMM":default:return n.month(r,{width:"wide",context:"formatting"})}},L:function(e,t,n){var r=e.getUTCMonth();switch(t){case"L":return String(r+1);case"LL":return p(r+1,2);case"Lo":return n.ordinalNumber(r+1,{unit:"month"});case"LLL":return n.month(r,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(r,{width:"narrow",context:"standalone"});case"LLLL":default:return n.month(r,{width:"wide",context:"standalone"})}},w:function(n,r,a,i){var o=function(n,r){e(1,arguments);var a=t(n),i=P(a,r).getTime()-q(a,r).getTime();return Math.round(i/L)+1}(n,i);return"wo"===r?a.ordinalNumber(o,{unit:"week"}):p(o,r.length)},I:function(n,r,a){var i=function(n){e(1,arguments);var r=t(n),a=M(r).getTime()-D(r).getTime();return Math.round(a/E)+1}(n);return"Io"===r?a.ordinalNumber(i,{unit:"week"}):p(i,r.length)},d:function(e,t,n){return"do"===t?n.ordinalNumber(e.getUTCDate(),{unit:"date"}):b(e,t)},D:function(n,r,a){var i=function(n){e(1,arguments);var r=t(n),a=r.getTime();r.setUTCMonth(0,1),r.setUTCHours(0,0,0,0);var i=r.getTime(),o=a-i;return Math.floor(o/S)+1}(n);return"Do"===r?a.ordinalNumber(i,{unit:"dayOfYear"}):p(i,r.length)},E:function(e,t,n){var r=e.getUTCDay();switch(t){case"E":case"EE":case"EEE":return n.day(r,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(r,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(r,{width:"short",context:"formatting"});case"EEEE":default:return n.day(r,{width:"wide",context:"formatting"})}},e:function(e,t,n,r){var a=e.getUTCDay(),i=(a-r.weekStartsOn+8)%7||7;switch(t){case"e":return String(i);case"ee":return p(i,2);case"eo":return n.ordinalNumber(i,{unit:"day"});case"eee":return n.day(a,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(a,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(a,{width:"short",context:"formatting"});case"eeee":default:return n.day(a,{width:"wide",context:"formatting"})}},c:function(e,t,n,r){var a=e.getUTCDay(),i=(a-r.weekStartsOn+8)%7||7;switch(t){case"c":return String(i);case"cc":return p(i,t.length);case"co":return n.ordinalNumber(i,{unit:"day"});case"ccc":return n.day(a,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(a,{width:"narrow",context:"standalone"});case"cccccc":return n.day(a,{width:"short",context:"standalone"});case"cccc":default:return n.day(a,{width:"wide",context:"standalone"})}},i:function(e,t,n){var r=e.getUTCDay(),a=0===r?7:r;switch(t){case"i":return String(a);case"ii":return p(a,t.length);case"io":return n.ordinalNumber(a,{unit:"day"});case"iii":return n.day(r,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(r,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(r,{width:"short",context:"formatting"});case"iiii":default:return n.day(r,{width:"wide",context:"formatting"})}},a:function(e,t,n){var r=e.getUTCHours()/12>=1?"pm":"am";switch(t){case"a":case"aa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(r,{width:"narrow",context:"formatting"});case"aaaa":default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},b:function(e,t,n){var r,a=e.getUTCHours();switch(r=12===a?"noon":0===a?"midnight":a/12>=1?"pm":"am",t){case"b":case"bb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(r,{width:"narrow",context:"formatting"});case"bbbb":default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},B:function(e,t,n){var r,a=e.getUTCHours();switch(r=a>=17?"evening":a>=12?"afternoon":a>=4?"morning":"night",t){case"B":case"BB":case"BBB":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(r,{width:"narrow",context:"formatting"});case"BBBB":default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},h:function(e,t,n){if("ho"===t){var r=e.getUTCHours()%12;return 0===r&&(r=12),n.ordinalNumber(r,{unit:"hour"})}return y(e,t)},H:function(e,t,n){return"Ho"===t?n.ordinalNumber(e.getUTCHours(),{unit:"hour"}):T(e,t)},K:function(e,t,n){var r=e.getUTCHours()%12;return"Ko"===t?n.ordinalNumber(r,{unit:"hour"}):p(r,t.length)},k:function(e,t,n){var r=e.getUTCHours();return 0===r&&(r=24),"ko"===t?n.ordinalNumber(r,{unit:"hour"}):p(r,t.length)},m:function(e,t,n){return"mo"===t?n.ordinalNumber(e.getUTCMinutes(),{unit:"minute"}):x(e,t)},s:function(e,t,n){return"so"===t?n.ordinalNumber(e.getUTCSeconds(),{unit:"second"}):C(e,t)},S:function(e,t){return k(e,t)},X:function(e,t,n,r){var a=(r._originalDate||e).getTimezoneOffset();if(0===a)return"Z";switch(t){case"X":return j(a);case"XXXX":case"XX":return Y(a);case"XXXXX":case"XXX":default:return Y(a,":")}},x:function(e,t,n,r){var a=(r._originalDate||e).getTimezoneOffset();switch(t){case"x":return j(a);case"xxxx":case"xx":return Y(a);case"xxxxx":case"xxx":default:return Y(a,":")}},O:function(e,t,n,r){var a=(r._originalDate||e).getTimezoneOffset();switch(t){case"O":case"OO":case"OOO":return"GMT"+W(a,":");case"OOOO":default:return"GMT"+Y(a,":")}},z:function(e,t,n,r){var a=(r._originalDate||e).getTimezoneOffset();switch(t){case"z":case"zz":case"zzz":return"GMT"+W(a,":");case"zzzz":default:return"GMT"+Y(a,":")}},t:function(e,t,n,r){var a=r._originalDate||e;return p(Math.floor(a.getTime()/1e3),t.length)},T:function(e,t,n,r){return p((r._originalDate||e).getTime(),t.length)}};function B(e,t){switch(e){case"P":return t.date({width:"short"});case"PP":return t.date({width:"medium"});case"PPP":return t.date({width:"long"});case"PPPP":default:return t.date({width:"full"})}}function z(e,t){switch(e){case"p":return t.time({width:"short"});case"pp":return t.time({width:"medium"});case"ppp":return t.time({width:"long"});case"pppp":default:return t.time({width:"full"})}}const F={p:z,P:function(e,t){var n,r=e.match(/(P+)(p+)?/),a=r[1],i=r[2];if(!i)return B(e,t);switch(a){case"P":n=t.dateTime({width:"short"});break;case"PP":n=t.dateTime({width:"medium"});break;case"PPP":n=t.dateTime({width:"long"});break;case"PPPP":default:n=t.dateTime({width:"full"})}return n.replace("{{date}}",B(a,t)).replace("{{time}}",z(i,t))}};var H=6e4;function I(e){return e.getTime()%H}function X(e){var t=new Date(e.getTime()),n=Math.ceil(t.getTimezoneOffset());t.setSeconds(0,0);var r=n>0?(H+I(t))%H:I(t);return n*H+r}var Q=["D","DD"],G=["YY","YYYY"];function A(e){return-1!==Q.indexOf(e)}function R(e){return-1!==G.indexOf(e)}function J(e,t,n){if("YYYY"===e)throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(t,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("YY"===e)throw new RangeError("Use `yy` instead of `YY` (in `".concat(t,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("D"===e)throw new RangeError("Use `d` instead of `D` (in `".concat(t,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("DD"===e)throw new RangeError("Use `dd` instead of `DD` (in `".concat(t,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"))}var _=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,$=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,V=/^'([^]*?)'?$/,K=/''/g,Z=/[a-zA-Z]/;function ee(e){return e.match(V)[1].replace(K,"'")}!function(){let e=document.getElementById("menu-burger"),t=document.querySelector(".sidebar"),n=document.getElementById("delete-all-projects-btn");e.addEventListener("click",(function(){t.classList.toggle("collapse")})),n.addEventListener("click",(function(){se=[],be()}))}();let te=document.getElementById("new-project-btn"),ne=document.getElementById("new-project-form"),re=document.getElementById("project-name"),ae=document.querySelector("[data-sidebar-project-container]"),ie=document.getElementById("project-display-container"),oe=document.getElementById("project-title-bar-template"),ue=document.getElementById("project-block-template");const de="taskify.project";let se=JSON.parse(localStorage.getItem(de))||[],ce=localStorage.getItem("taskify.selectedProjectId");function le(e){return se.find((t=>t.id===e))}function me(e,t){return le(t).tasks.find((t=>t.id===e))}function fe(){te.classList.remove("hidden"),ne.classList.remove("expanded")}function he(e,t){e.classList.add("hidden"),t.classList.add("expanded")}function ge(e){for(;e.firstChild;)e.removeChild(e.firstChild)}function pe(){ge(ae),se.forEach((e=>{let t=document.createElement("li");t.dataset.listId=e.id,t.classList.add("big-link","clickable"),t.innerText=e.name,e.selected&&t.classList.add("bold"),ae.appendChild(t)}))}function we(){ge(ie),se.filter((e=>!0===e.selected)).forEach((e=>{let t=document.importNode(oe.content,!0),n=t.querySelector(".project-title");t.querySelector(".title").innerText=e.name,n.id=e.id,ie.appendChild(t);let r=e.tasks.length,a=e.tasks.filter((e=>!0===e.completed)).length/r*100;n.style.background=`linear-gradient(120deg, rgba(97,192,191,1) ${a}%, rgba(187,222,214,1) ${a}%)`}))}function ve(){se.filter((e=>!0===e.expanded)).forEach((n=>{let i=document.getElementById(n.id).parentNode,o=document.importNode(ue.content,!0),u=o.querySelector("[data-project-description-text]"),d=o.getElementById("task-list");u.innerText=n.description||"Add a Description here!",n.tasks.sort(((e,t)=>e.duedate>t.duedate?1:-1)).forEach((n=>{let i=document.getElementById("task-template"),o=document.importNode(i.content,!0),u=o.querySelector('input[type="checkbox"]'),s=o.querySelector(".task-name"),c=o.querySelector(".due-date"),l=o.querySelector(".task-wrapper"),h=o.getElementById("task-description");u.checked=n.completed,l.id=n.id,c.innerText=function(n){return 1==n.completed?"Completed":function(t){return e(1,arguments),r(t,Date.now())}(n.duedate)?"Today":""==n.duedate||null==n.duedate?"":function(n,r,i){e(2,arguments);var o=String(r),u=i||{},d=u.locale||m,s=d.options&&d.options.firstWeekContainsDate,c=null==s?1:f(s),l=null==u.firstWeekContainsDate?c:f(u.firstWeekContainsDate);if(!(l>=1&&l<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var h=d.options&&d.options.weekStartsOn,p=null==h?0:f(h),w=null==u.weekStartsOn?p:f(u.weekStartsOn);if(!(w>=0&&w<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");if(!d.localize)throw new RangeError("locale must contain localize property");if(!d.formatLong)throw new RangeError("locale must contain formatLong property");var v=t(n);if(!a(v))throw new RangeError("Invalid time value");var b=X(v),y=g(v,b),T={firstWeekContainsDate:l,weekStartsOn:w,locale:d,_originalDate:v};return o.match($).map((function(e){var t=e[0];return"p"===t||"P"===t?(0,F[t])(e,d.formatLong,T):e})).join("").match(_).map((function(e){if("''"===e)return"'";var t=e[0];if("'"===t)return ee(e);var a=O[t];if(a)return!u.useAdditionalWeekYearTokens&&R(e)&&J(e,r,n),!u.useAdditionalDayOfYearTokens&&A(e)&&J(e,r,n),a(y,e,d.localize,T);if(t.match(Z))throw new RangeError("Format string contains an unescaped latin alphabet character `"+t+"`");return e})).join("")}(t(Date.parse(n.duedate)),"PPP")}(n),s.htmlFor=n.id,u.id=n.id,s.innerText=n.name,h.innerText=n.description,0==n.expanded&&h.classList.add("hidden"),1==n.completed&&s.classList.add("complete"),d.appendChild(o)})),i.appendChild(o)}))}function be(){localStorage.setItem(de,JSON.stringify(se)),pe(),we(),ve()}te.addEventListener("click",(function(){te.classList.add("hidden"),ne.classList.add("expanded")})),ne.addEventListener("submit",(e=>{e.preventDefault();let t=re.value;if(null==t||""===t)return void fe();let n=(r=t,{id:Date.now().toString(),name:r,description:"",selected:!1,expanded:!1,tasks:[]});var r;re.value=null,fe(),se.push(n),be()})),ae.addEventListener("click",(e=>{if("li"===e.target.tagName.toLowerCase()){ce=e.target.dataset.listId;let t=le(ce);t.selected=!t.selected,t.expanded=!1,be()}})),ie.addEventListener("submit",(e=>{e.preventDefault()})),ie.addEventListener("click",(e=>{if("delete-project-btn"==e.target.id){let t=e.target.parentNode.parentNode.parentNode.id;se=se.filter((e=>e.id!=t)),be()}else if(e.target.classList.contains("project-title")){let t=le(e.target.id);t.expanded=!t.expanded,be()}else if(e.target.classList.contains("fa-plus-circle")){let t=e.target.parentNode.querySelector("[data-new-task-form]");he(e.target,t)}else if("new-task-form-submit"==e.target.id){let i=e.target.parentNode,o=i.parentNode.parentNode.querySelector("#new-task-button"),u=e.target.parentNode.parentNode.parentNode.parentNode.previousElementSibling.id,d=i.querySelector("[data-task-name-input]").value,s=i.querySelector("[data-task-desc-input]").value,c=i.querySelector("[data-task-date-input]").value,l=""==c?"":new Date(c+"T00:00");if(null==d||""==d)return a=i,o.classList.remove("hidden"),void a.classList.remove("expanded");let m=le(u),f=(t=d,n=s,r=l,{id:Date.now().toString(),name:t,description:n,duedate:r,completed:!1,expanded:!1});m.tasks.push(f),be()}else if(e.target.classList.contains("check-small")){let t=e.target.previousElementSibling,n=me(t.id,e.target.parentNode.parentNode.parentNode.parentNode.previousElementSibling.id);n.completed=!n.completed,t.checked=!t.checked,be()}else if(e.target.classList.contains("task-name")){let t=me(e.target.htmlFor,e.target.parentNode.parentNode.parentNode.parentNode.previousElementSibling.id);t.expanded=!t.expanded,be()}else if(e.target.classList.contains("delete-btn")){let t=e.target.parentNode.parentNode.id,n=le(e.target.parentNode.parentNode.parentNode.parentNode.previousElementSibling.id);n.tasks=n.tasks.filter((e=>e.id!=t)),be()}else if("edit-btn"===e.target.id){let t=e.target.parentNode.parentNode.previousElementSibling.previousElementSibling,n=t.nextElementSibling,r=t.innerText,a=n.querySelector("#new-project-name-input");a.value=r,a.focus(),he(t,n)}else if("project-description-text"===e.target.id){let t=e.target,n=e.target.parentNode,r=e.target.innerText,a=n.querySelector("[data-project-description-form]"),i=a.querySelector("[data-project-description-input]");i.value=r,i.focus(),he(t,a)}else if("project-description-form-submit"===e.target.id){let t=e.target.parentNode,n=e.target.parentNode.parentNode.parentNode.previousElementSibling.id,r=t.querySelector("[data-project-description-input]").value;if(null==r||""==r)return;le(n).description=r,be()}else if("project-name-form-submit"===e.target.id){let t=e.target.parentNode.querySelector("#new-project-name-input").value;le(e.target.parentNode.parentNode.id).name=t,be()}var t,n,r,a})),pe(),we(),ve()})();
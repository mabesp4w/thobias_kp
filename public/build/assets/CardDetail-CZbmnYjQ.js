import{r as L,aM as gt,j as c,a as ht,i as qt,B as pe,P as Kt,aR as Zt,aN as Jt,aI as Qt}from"./app-DTygMt2q.js";import{u as _t}from"./keen-slider.min-DUmsAUT6.js";import{a as Tt}from"./addToCart-DE2p-oID.js";import{R as en}from"./RatingStars-8aV3-3TF.js";/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tn=o=>o.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Lt=(...o)=>o.filter((n,s,r)=>!!n&&n.trim()!==""&&r.indexOf(n)===s).join(" ").trim();/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var nn={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const on=L.forwardRef(({color:o="currentColor",size:n=24,strokeWidth:s=2,absoluteStrokeWidth:r,className:m="",children:u,iconNode:S,...F},B)=>L.createElement("svg",{ref:B,...nn,width:n,height:n,stroke:o,strokeWidth:r?Number(s)*24/Number(n):s,className:Lt("lucide",m),...F},[...S.map(([v,Z])=>L.createElement(v,Z)),...Array.isArray(u)?u:[u]]));/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const an=(o,n)=>{const s=L.forwardRef(({className:r,...m},u)=>L.createElement(on,{ref:u,iconNode:n,className:Lt(`lucide-${tn(o)}`,r),...m}));return s.displayName=`${o}`,s};/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rn=an("Heart",[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}]]);/*! @license DOMPurify 3.1.7 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.1.7/LICENSE */const{entries:Ot,setPrototypeOf:Et,isFrozen:sn,getPrototypeOf:ln,getOwnPropertyDescriptor:cn}=Object;let{freeze:y,seal:O,create:Ct}=Object,{apply:He,construct:je}=typeof Reflect<"u"&&Reflect;y||(y=function(n){return n});O||(O=function(n){return n});He||(He=function(n,s,r){return n.apply(s,r)});je||(je=function(n,s){return new n(...s)});const de=b(Array.prototype.forEach),At=b(Array.prototype.pop),oe=b(Array.prototype.push),he=b(String.prototype.toLowerCase),ve=b(String.prototype.toString),St=b(String.prototype.match),ie=b(String.prototype.replace),un=b(String.prototype.indexOf),fn=b(String.prototype.trim),C=b(Object.prototype.hasOwnProperty),R=b(RegExp.prototype.test),ae=mn(TypeError);function b(o){return function(n){for(var s=arguments.length,r=new Array(s>1?s-1:0),m=1;m<s;m++)r[m-1]=arguments[m];return He(o,n,r)}}function mn(o){return function(){for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return je(o,s)}}function l(o,n){let s=arguments.length>2&&arguments[2]!==void 0?arguments[2]:he;Et&&Et(o,null);let r=n.length;for(;r--;){let m=n[r];if(typeof m=="string"){const u=s(m);u!==m&&(sn(n)||(n[r]=u),m=u)}o[m]=!0}return o}function pn(o){for(let n=0;n<o.length;n++)C(o,n)||(o[n]=null);return o}function z(o){const n=Ct(null);for(const[s,r]of Ot(o))C(o,s)&&(Array.isArray(r)?n[s]=pn(r):r&&typeof r=="object"&&r.constructor===Object?n[s]=z(r):n[s]=r);return n}function re(o,n){for(;o!==null;){const r=cn(o,n);if(r){if(r.get)return b(r.get);if(typeof r.value=="function")return b(r.value)}o=ln(o)}function s(){return null}return s}const xt=y(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),ke=y(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Pe=y(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),dn=y(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Ue=y(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),gn=y(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Rt=y(["#text"]),yt=y(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Fe=y(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Nt=y(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ge=y(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),hn=O(/\{\{[\w\W]*|[\w\W]*\}\}/gm),_n=O(/<%[\w\W]*|[\w\W]*%>/gm),Tn=O(/\${[\w\W]*}/gm),En=O(/^data-[\-\w.\u00B7-\uFFFF]/),An=O(/^aria-[\-\w]+$/),wt=O(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Sn=O(/^(?:\w+script|data):/i),xn=O(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Dt=O(/^html$/i),Rn=O(/^[a-z][.\w]*(-[.\w]+)+$/i);var bt=Object.freeze({__proto__:null,MUSTACHE_EXPR:hn,ERB_EXPR:_n,TMPLIT_EXPR:Tn,DATA_ATTR:En,ARIA_ATTR:An,IS_ALLOWED_URI:wt,IS_SCRIPT_OR_DATA:Sn,ATTR_WHITESPACE:xn,DOCTYPE_NAME:Dt,CUSTOM_ELEMENT:Rn});const se={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},yn=function(){return typeof window>"u"?null:window},Nn=function(n,s){if(typeof n!="object"||typeof n.createPolicy!="function")return null;let r=null;const m="data-tt-policy-suffix";s&&s.hasAttribute(m)&&(r=s.getAttribute(m));const u="dompurify"+(r?"#"+r:"");try{return n.createPolicy(u,{createHTML(S){return S},createScriptURL(S){return S}})}catch{return console.warn("TrustedTypes policy "+u+" could not be created."),null}};function It(){let o=arguments.length>0&&arguments[0]!==void 0?arguments[0]:yn();const n=a=>It(a);if(n.version="3.1.7",n.removed=[],!o||!o.document||o.document.nodeType!==se.document)return n.isSupported=!1,n;let{document:s}=o;const r=s,m=r.currentScript,{DocumentFragment:u,HTMLTemplateElement:S,Node:F,Element:B,NodeFilter:v,NamedNodeMap:Z=o.NamedNodeMap||o.MozNamedAttrMap,HTMLFormElement:W,DOMParser:_e,trustedTypes:G}=o,H=B.prototype,Te=re(H,"cloneNode"),Ee=re(H,"remove"),p=re(H,"nextSibling"),w=re(H,"childNodes"),k=re(H,"parentNode");if(typeof S=="function"){const a=s.createElement("template");a.content&&a.content.ownerDocument&&(s=a.content.ownerDocument)}let g,J="";const{implementation:Ae,createNodeIterator:Mt,createDocumentFragment:vt,getElementsByTagName:kt}=s,{importNode:Pt}=r;let D={};n.isSupported=typeof Ot=="function"&&typeof k=="function"&&Ae&&Ae.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:Se,ERB_EXPR:xe,TMPLIT_EXPR:Re,DATA_ATTR:Ut,ARIA_ATTR:Ft,IS_SCRIPT_OR_DATA:Ht,ATTR_WHITESPACE:ze,CUSTOM_ELEMENT:jt}=bt;let{IS_ALLOWED_URI:Be}=bt,h=null;const We=l({},[...xt,...ke,...Pe,...Ue,...Rt]);let _=null;const Ge=l({},[...yt,...Fe,...Nt,...ge]);let d=Object.seal(Ct(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Q=null,ye=null,Ye=!0,Ne=!0,$e=!1,Xe=!0,Y=!1,be=!0,j=!1,Le=!1,Oe=!1,$=!1,le=!1,ce=!1,Ve=!0,qe=!1;const zt="user-content-";let Ce=!0,ee=!1,X={},V=null;const Ke=l({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Ze=null;const Je=l({},["audio","video","img","source","image","track"]);let we=null;const Qe=l({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ue="http://www.w3.org/1998/Math/MathML",fe="http://www.w3.org/2000/svg",P="http://www.w3.org/1999/xhtml";let q=P,De=!1,Ie=null;const Bt=l({},[ue,fe,P],ve);let te=null;const Wt=["application/xhtml+xml","text/html"],Gt="text/html";let T=null,K=null;const Yt=s.createElement("form"),et=function(e){return e instanceof RegExp||e instanceof Function},Me=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(K&&K===e)){if((!e||typeof e!="object")&&(e={}),e=z(e),te=Wt.indexOf(e.PARSER_MEDIA_TYPE)===-1?Gt:e.PARSER_MEDIA_TYPE,T=te==="application/xhtml+xml"?ve:he,h=C(e,"ALLOWED_TAGS")?l({},e.ALLOWED_TAGS,T):We,_=C(e,"ALLOWED_ATTR")?l({},e.ALLOWED_ATTR,T):Ge,Ie=C(e,"ALLOWED_NAMESPACES")?l({},e.ALLOWED_NAMESPACES,ve):Bt,we=C(e,"ADD_URI_SAFE_ATTR")?l(z(Qe),e.ADD_URI_SAFE_ATTR,T):Qe,Ze=C(e,"ADD_DATA_URI_TAGS")?l(z(Je),e.ADD_DATA_URI_TAGS,T):Je,V=C(e,"FORBID_CONTENTS")?l({},e.FORBID_CONTENTS,T):Ke,Q=C(e,"FORBID_TAGS")?l({},e.FORBID_TAGS,T):{},ye=C(e,"FORBID_ATTR")?l({},e.FORBID_ATTR,T):{},X=C(e,"USE_PROFILES")?e.USE_PROFILES:!1,Ye=e.ALLOW_ARIA_ATTR!==!1,Ne=e.ALLOW_DATA_ATTR!==!1,$e=e.ALLOW_UNKNOWN_PROTOCOLS||!1,Xe=e.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Y=e.SAFE_FOR_TEMPLATES||!1,be=e.SAFE_FOR_XML!==!1,j=e.WHOLE_DOCUMENT||!1,$=e.RETURN_DOM||!1,le=e.RETURN_DOM_FRAGMENT||!1,ce=e.RETURN_TRUSTED_TYPE||!1,Oe=e.FORCE_BODY||!1,Ve=e.SANITIZE_DOM!==!1,qe=e.SANITIZE_NAMED_PROPS||!1,Ce=e.KEEP_CONTENT!==!1,ee=e.IN_PLACE||!1,Be=e.ALLOWED_URI_REGEXP||wt,q=e.NAMESPACE||P,d=e.CUSTOM_ELEMENT_HANDLING||{},e.CUSTOM_ELEMENT_HANDLING&&et(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(d.tagNameCheck=e.CUSTOM_ELEMENT_HANDLING.tagNameCheck),e.CUSTOM_ELEMENT_HANDLING&&et(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(d.attributeNameCheck=e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),e.CUSTOM_ELEMENT_HANDLING&&typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(d.allowCustomizedBuiltInElements=e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Y&&(Ne=!1),le&&($=!0),X&&(h=l({},Rt),_=[],X.html===!0&&(l(h,xt),l(_,yt)),X.svg===!0&&(l(h,ke),l(_,Fe),l(_,ge)),X.svgFilters===!0&&(l(h,Pe),l(_,Fe),l(_,ge)),X.mathMl===!0&&(l(h,Ue),l(_,Nt),l(_,ge))),e.ADD_TAGS&&(h===We&&(h=z(h)),l(h,e.ADD_TAGS,T)),e.ADD_ATTR&&(_===Ge&&(_=z(_)),l(_,e.ADD_ATTR,T)),e.ADD_URI_SAFE_ATTR&&l(we,e.ADD_URI_SAFE_ATTR,T),e.FORBID_CONTENTS&&(V===Ke&&(V=z(V)),l(V,e.FORBID_CONTENTS,T)),Ce&&(h["#text"]=!0),j&&l(h,["html","head","body"]),h.table&&(l(h,["tbody"]),delete Q.tbody),e.TRUSTED_TYPES_POLICY){if(typeof e.TRUSTED_TYPES_POLICY.createHTML!="function")throw ae('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof e.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw ae('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');g=e.TRUSTED_TYPES_POLICY,J=g.createHTML("")}else g===void 0&&(g=Nn(G,m)),g!==null&&typeof J=="string"&&(J=g.createHTML(""));y&&y(e),K=e}},tt=l({},["mi","mo","mn","ms","mtext"]),nt=l({},["annotation-xml"]),$t=l({},["title","style","font","a","script"]),ot=l({},[...ke,...Pe,...dn]),it=l({},[...Ue,...gn]),Xt=function(e){let t=k(e);(!t||!t.tagName)&&(t={namespaceURI:q,tagName:"template"});const i=he(e.tagName),f=he(t.tagName);return Ie[e.namespaceURI]?e.namespaceURI===fe?t.namespaceURI===P?i==="svg":t.namespaceURI===ue?i==="svg"&&(f==="annotation-xml"||tt[f]):!!ot[i]:e.namespaceURI===ue?t.namespaceURI===P?i==="math":t.namespaceURI===fe?i==="math"&&nt[f]:!!it[i]:e.namespaceURI===P?t.namespaceURI===fe&&!nt[f]||t.namespaceURI===ue&&!tt[f]?!1:!it[i]&&($t[i]||!ot[i]):!!(te==="application/xhtml+xml"&&Ie[e.namespaceURI]):!1},I=function(e){oe(n.removed,{element:e});try{k(e).removeChild(e)}catch{Ee(e)}},me=function(e,t){try{oe(n.removed,{attribute:t.getAttributeNode(e),from:t})}catch{oe(n.removed,{attribute:null,from:t})}if(t.removeAttribute(e),e==="is"&&!_[e])if($||le)try{I(t)}catch{}else try{t.setAttribute(e,"")}catch{}},at=function(e){let t=null,i=null;if(Oe)e="<remove></remove>"+e;else{const E=St(e,/^[\r\n\t ]+/);i=E&&E[0]}te==="application/xhtml+xml"&&q===P&&(e='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+e+"</body></html>");const f=g?g.createHTML(e):e;if(q===P)try{t=new _e().parseFromString(f,te)}catch{}if(!t||!t.documentElement){t=Ae.createDocument(q,"template",null);try{t.documentElement.innerHTML=De?J:f}catch{}}const A=t.body||t.documentElement;return e&&i&&A.insertBefore(s.createTextNode(i),A.childNodes[0]||null),q===P?kt.call(t,j?"html":"body")[0]:j?t.documentElement:A},rt=function(e){return Mt.call(e.ownerDocument||e,e,v.SHOW_ELEMENT|v.SHOW_COMMENT|v.SHOW_TEXT|v.SHOW_PROCESSING_INSTRUCTION|v.SHOW_CDATA_SECTION,null)},st=function(e){return e instanceof W&&(typeof e.nodeName!="string"||typeof e.textContent!="string"||typeof e.removeChild!="function"||!(e.attributes instanceof Z)||typeof e.removeAttribute!="function"||typeof e.setAttribute!="function"||typeof e.namespaceURI!="string"||typeof e.insertBefore!="function"||typeof e.hasChildNodes!="function")},lt=function(e){return typeof F=="function"&&e instanceof F},U=function(e,t,i){D[e]&&de(D[e],f=>{f.call(n,t,i,K)})},ct=function(e){let t=null;if(U("beforeSanitizeElements",e,null),st(e))return I(e),!0;const i=T(e.nodeName);if(U("uponSanitizeElement",e,{tagName:i,allowedTags:h}),e.hasChildNodes()&&!lt(e.firstElementChild)&&R(/<[/\w]/g,e.innerHTML)&&R(/<[/\w]/g,e.textContent)||e.nodeType===se.progressingInstruction||be&&e.nodeType===se.comment&&R(/<[/\w]/g,e.data))return I(e),!0;if(!h[i]||Q[i]){if(!Q[i]&&ft(i)&&(d.tagNameCheck instanceof RegExp&&R(d.tagNameCheck,i)||d.tagNameCheck instanceof Function&&d.tagNameCheck(i)))return!1;if(Ce&&!V[i]){const f=k(e)||e.parentNode,A=w(e)||e.childNodes;if(A&&f){const E=A.length;for(let N=E-1;N>=0;--N){const M=Te(A[N],!0);M.__removalCount=(e.__removalCount||0)+1,f.insertBefore(M,p(e))}}}return I(e),!0}return e instanceof B&&!Xt(e)||(i==="noscript"||i==="noembed"||i==="noframes")&&R(/<\/no(script|embed|frames)/i,e.innerHTML)?(I(e),!0):(Y&&e.nodeType===se.text&&(t=e.textContent,de([Se,xe,Re],f=>{t=ie(t,f," ")}),e.textContent!==t&&(oe(n.removed,{element:e.cloneNode()}),e.textContent=t)),U("afterSanitizeElements",e,null),!1)},ut=function(e,t,i){if(Ve&&(t==="id"||t==="name")&&(i in s||i in Yt))return!1;if(!(Ne&&!ye[t]&&R(Ut,t))){if(!(Ye&&R(Ft,t))){if(!_[t]||ye[t]){if(!(ft(e)&&(d.tagNameCheck instanceof RegExp&&R(d.tagNameCheck,e)||d.tagNameCheck instanceof Function&&d.tagNameCheck(e))&&(d.attributeNameCheck instanceof RegExp&&R(d.attributeNameCheck,t)||d.attributeNameCheck instanceof Function&&d.attributeNameCheck(t))||t==="is"&&d.allowCustomizedBuiltInElements&&(d.tagNameCheck instanceof RegExp&&R(d.tagNameCheck,i)||d.tagNameCheck instanceof Function&&d.tagNameCheck(i))))return!1}else if(!we[t]){if(!R(Be,ie(i,ze,""))){if(!((t==="src"||t==="xlink:href"||t==="href")&&e!=="script"&&un(i,"data:")===0&&Ze[e])){if(!($e&&!R(Ht,ie(i,ze,"")))){if(i)return!1}}}}}}return!0},ft=function(e){return e!=="annotation-xml"&&St(e,jt)},mt=function(e){U("beforeSanitizeAttributes",e,null);const{attributes:t}=e;if(!t)return;const i={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:_};let f=t.length;for(;f--;){const A=t[f],{name:E,namespaceURI:N,value:M}=A,ne=T(E);let x=E==="value"?M:fn(M);if(i.attrName=ne,i.attrValue=x,i.keepAttr=!0,i.forceKeepAttr=void 0,U("uponSanitizeAttribute",e,i),x=i.attrValue,i.forceKeepAttr||(me(E,e),!i.keepAttr))continue;if(!Xe&&R(/\/>/i,x)){me(E,e);continue}Y&&de([Se,xe,Re],dt=>{x=ie(x,dt," ")});const pt=T(e.nodeName);if(ut(pt,ne,x)){if(qe&&(ne==="id"||ne==="name")&&(me(E,e),x=zt+x),be&&R(/((--!?|])>)|<\/(style|title)/i,x)){me(E,e);continue}if(g&&typeof G=="object"&&typeof G.getAttributeType=="function"&&!N)switch(G.getAttributeType(pt,ne)){case"TrustedHTML":{x=g.createHTML(x);break}case"TrustedScriptURL":{x=g.createScriptURL(x);break}}try{N?e.setAttributeNS(N,E,x):e.setAttribute(E,x),st(e)?I(e):At(n.removed)}catch{}}}U("afterSanitizeAttributes",e,null)},Vt=function a(e){let t=null;const i=rt(e);for(U("beforeSanitizeShadowDOM",e,null);t=i.nextNode();)U("uponSanitizeShadowNode",t,null),!ct(t)&&(t.content instanceof u&&a(t.content),mt(t));U("afterSanitizeShadowDOM",e,null)};return n.sanitize=function(a){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},t=null,i=null,f=null,A=null;if(De=!a,De&&(a="<!-->"),typeof a!="string"&&!lt(a))if(typeof a.toString=="function"){if(a=a.toString(),typeof a!="string")throw ae("dirty is not a string, aborting")}else throw ae("toString is not a function");if(!n.isSupported)return a;if(Le||Me(e),n.removed=[],typeof a=="string"&&(ee=!1),ee){if(a.nodeName){const M=T(a.nodeName);if(!h[M]||Q[M])throw ae("root node is forbidden and cannot be sanitized in-place")}}else if(a instanceof F)t=at("<!---->"),i=t.ownerDocument.importNode(a,!0),i.nodeType===se.element&&i.nodeName==="BODY"||i.nodeName==="HTML"?t=i:t.appendChild(i);else{if(!$&&!Y&&!j&&a.indexOf("<")===-1)return g&&ce?g.createHTML(a):a;if(t=at(a),!t)return $?null:ce?J:""}t&&Oe&&I(t.firstChild);const E=rt(ee?a:t);for(;f=E.nextNode();)ct(f)||(f.content instanceof u&&Vt(f.content),mt(f));if(ee)return a;if($){if(le)for(A=vt.call(t.ownerDocument);t.firstChild;)A.appendChild(t.firstChild);else A=t;return(_.shadowroot||_.shadowrootmode)&&(A=Pt.call(r,A,!0)),A}let N=j?t.outerHTML:t.innerHTML;return j&&h["!doctype"]&&t.ownerDocument&&t.ownerDocument.doctype&&t.ownerDocument.doctype.name&&R(Dt,t.ownerDocument.doctype.name)&&(N="<!DOCTYPE "+t.ownerDocument.doctype.name+`>
`+N),Y&&de([Se,xe,Re],M=>{N=ie(N,M," ")}),g&&ce?g.createHTML(N):N},n.setConfig=function(){let a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Me(a),Le=!0},n.clearConfig=function(){K=null,Le=!1},n.isValidAttribute=function(a,e,t){K||Me({});const i=T(a),f=T(e);return ut(i,f,t)},n.addHook=function(a,e){typeof e=="function"&&(D[a]=D[a]||[],oe(D[a],e))},n.removeHook=function(a){if(D[a])return At(D[a])},n.removeHooks=function(a){D[a]&&(D[a]=[])},n.removeAllHooks=function(){D={}},n}var bn=It();const Ln=async o=>{{const n=JSON.parse(gt.get("wish")||"[]");n.find(r=>r.product_id===o)||n.push({product_id:o}),gt.set("wish",JSON.stringify(n)),window.dispatchEvent(new Event("wishUpdated"))}};function On(o){return n=>{function s(){n.slides.forEach(u=>{u.classList.remove("active")})}function r(u){n.slides[u].classList.add("active")}function m(){n.slides.forEach((u,S)=>{u.addEventListener("click",()=>{o.current&&o.current.moveToIdx(S)})})}n.on("created",()=>{o.current&&(r(n.track.details.rel),m(),o.current.on("animationStarted",u=>{s();const S=u.animator.targetIdx||0;r(u.track.absToRel(S)),n.moveToIdx(Math.min(n.track.details.maxIdx,S))}))})}}const Cn=({product:o})=>{const[n,s]=L.useState(1),[r,m]=L.useState(0),u=()=>s(p=>p+1),S=()=>s(p=>Math.max(p-1,1)),[F,B]=_t({initial:0,slides:o!=null&&o.product_image?o.product_image.length:0}),[v]=_t({initial:0,slides:{perView:4,spacing:5},loop:!0},[On(B)]),Z=bn.sanitize(o.description),[W,_e]=L.useState(!1),G=async()=>{await Jt.get("/status").then(p=>{_e(p.data.user)})};L.useEffect(()=>{G()},[]);const H=()=>{W||window.dispatchEvent(new Event("checkoutUpdated")),W&&(Tt({productId:o.id,quantity:n,isLoggedIn:W}),Qt.visit("/checkout"))};L.useEffect(()=>{if(o.review.length>0){const w=o.review.reduce((k,g)=>k+g.rating,0)/o.review.length;m(w)}return()=>{}},[]),console.log({product:o});const[Te,Ee]=L.useState(0);return L.useEffect(()=>{(()=>{const w=o.order_item.reduce((k,g)=>g.order.status==="selesai"?k+1:k,0);Ee(w)})()},[o]),c.jsx("section",{className:"",children:c.jsxs("div",{className:"flex flex-col lg:flex-row gap-x-12",children:[c.jsxs("div",{className:"lg:min-w-[28rem] lg:max-w-[28rem] min-w-[100%]",children:[c.jsx("div",{ref:F,className:"keen-slider w-[30rem]",children:o.product_image.length>0?o.product_image.map(p=>{const w=p==null?void 0:p.product_img;return c.jsx("img",{src:`${ht}/${w}`,alt:"",className:"keen-slider__slide"},p.id)}):c.jsx("img",{src:"/images/no_image.png",alt:"",className:"keen-slider__slide"})}),c.jsx("div",{ref:v,className:"keen-slider thumbnail",children:o.product_image.length>0?o.product_image.map(p=>{const w=p==null?void 0:p.product_img;return c.jsx("img",{src:w?`${ht}/${w}`:"/images/no_image.png",alt:"",className:"keen-slider__slide"},p.id)}):c.jsx("img",{src:"/images/no_image.png",alt:"",className:"keen-slider__slide"})})]}),c.jsxs("div",{className:"w-full grow flex flex-col gap-y-6",children:[c.jsxs("div",{className:"flex flex-col gap-y-4",children:[c.jsx("h1",{className:"text-2xl font-bold",children:o.product_nm}),c.jsx("h4",{className:"text-xl font-bold text-primary",children:qt(o.price)})]}),c.jsxs("div",{className:"flex gap-x-2 items-center",children:[r>0?c.jsx(en,{rating:r}):c.jsx("p",{children:"Belum ada penilaian"}),c.jsxs("p",{children:["| ",c.jsx("span",{children:Te})," Terjual"]})]}),c.jsxs("div",{className:"flex items-center space-x-2 w-48 border rounded-md",children:[c.jsx(pe,{onClick:S,className:"text-4xl text-gray-600 bg-transparent",children:"-"}),c.jsx(Kt,{type:"number",value:n,onChange:p=>s(Number(p.target.value)),className:"text-center border-none focus:border-none"}),c.jsx(pe,{onClick:u,className:"text-4xl text-gray-600 bg-transparent",children:"+"})]}),c.jsxs("div",{className:"flex gap-x-4 items-center",children:[c.jsx(rn,{onClick:()=>{Ln(o.id)},className:"text-primary cursor-pointer"}),c.jsxs(pe,{onClick:()=>{Tt({productId:o.id,quantity:n,isLoggedIn:W})},className:"text-primary bg-transparent",type:"button",children:[c.jsx(Zt,{})," Tambah ke keranjang"]}),c.jsx(pe,{onClick:H,type:"button",children:"Beli sekarang"})]}),c.jsxs("div",{className:"mt-12",children:[c.jsx("h1",{className:"text-2xl font-bold",children:"Deskripsi Produk"}),c.jsx("div",{className:"prose",dangerouslySetInnerHTML:{__html:Z}})]})]})]})})},vn=Object.freeze(Object.defineProperty({__proto__:null,default:Cn},Symbol.toStringTag,{value:"Module"}));export{Cn as C,vn as a,an as c};

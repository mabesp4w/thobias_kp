const c=(o,l)=>o.map(e=>{const r={...e};return l.forEach(s=>{const n=s.split("."),a=`${n.join("_")}_filter`;let t=e;for(let f of n)t=t?t[f]:null;r[a]=t}),r});export{c as t};

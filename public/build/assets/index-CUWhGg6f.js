import{r as n,j as x,ag as H,ae as Y,at as V,af as z,ac as D,ak as R,au as q}from"./app-DTygMt2q.js";var J=n.createContext(void 0);function Q(e){const t=n.useContext(J);return e||t||"ltr"}function W(e,t=[]){let r=[];function s(p,u){const a=n.createContext(u),i=r.length;r=[...r,u];function c(I){const{scope:l,children:g,...o}=I,m=(l==null?void 0:l[e][i])||a,S=n.useMemo(()=>o,Object.values(o));return x.jsx(m.Provider,{value:S,children:g})}function F(I,l){const g=(l==null?void 0:l[e][i])||a,o=n.useContext(g);if(o)return o;if(u!==void 0)return u;throw new Error(`\`${I}\` must be used within \`${p}\``)}return c.displayName=p+"Provider",[c,F]}const d=()=>{const p=r.map(u=>n.createContext(u));return function(a){const i=(a==null?void 0:a[e])||p;return n.useMemo(()=>({[`__scope${e}`]:{...a,[e]:i}}),[a,i])}};return d.scopeName=e,[s,X(d,...t)]}function X(...e){const t=e[0];if(e.length===1)return t;const r=()=>{const s=e.map(d=>({useScope:d(),scopeName:d.scopeName}));return function(p){const u=s.reduce((a,{useScope:i,scopeName:c})=>{const I=i(p)[`__scope${c}`];return{...a,...I}},{});return n.useMemo(()=>({[`__scope${t.scopeName}`]:u}),[u])}};return r.scopeName=t.scopeName,r}var h="rovingFocusGroup.onEntryFocus",Z={bubbles:!1,cancelable:!0},E="RovingFocusGroup",[A,G,ee]=H(E),[te,fe]=W(E,[ee]),[oe,ne]=te(E),N=n.forwardRef((e,t)=>x.jsx(A.Provider,{scope:e.__scopeRovingFocusGroup,children:x.jsx(A.Slot,{scope:e.__scopeRovingFocusGroup,children:x.jsx(re,{...e,ref:t})})}));N.displayName=E;var re=n.forwardRef((e,t)=>{const{__scopeRovingFocusGroup:r,orientation:s,loop:d=!1,dir:p,currentTabStopId:u,defaultCurrentTabStopId:a,onCurrentTabStopIdChange:i,onEntryFocus:c,preventScrollOnEntryFocus:F=!1,...I}=e,l=n.useRef(null),g=Y(t,l),o=Q(p),[m=null,S]=V({prop:u,defaultProp:a,onChange:i}),[v,b]=n.useState(!1),w=z(c),k=G(r),T=n.useRef(!1),[K,P]=n.useState(0);return n.useEffect(()=>{const f=l.current;if(f)return f.addEventListener(h,w),()=>f.removeEventListener(h,w)},[w]),x.jsx(oe,{scope:r,orientation:s,dir:o,loop:d,currentTabStopId:m,onItemFocus:n.useCallback(f=>S(f),[S]),onItemShiftTab:n.useCallback(()=>b(!0),[]),onFocusableItemAdd:n.useCallback(()=>P(f=>f+1),[]),onFocusableItemRemove:n.useCallback(()=>P(f=>f-1),[]),children:x.jsx(D.div,{tabIndex:v||K===0?-1:0,"data-orientation":s,...I,ref:g,style:{outline:"none",...e.style},onMouseDown:R(e.onMouseDown,()=>{T.current=!0}),onFocus:R(e.onFocus,f=>{const L=!T.current;if(f.target===f.currentTarget&&L&&!v){const y=new CustomEvent(h,Z);if(f.currentTarget.dispatchEvent(y),!y.defaultPrevented){const _=k().filter(C=>C.focusable),U=_.find(C=>C.active),B=_.find(C=>C.id===m),$=[U,B,..._].filter(Boolean).map(C=>C.ref.current);j($,F)}}T.current=!1}),onBlur:R(e.onBlur,()=>b(!1))})})}),O="RovingFocusGroupItem",M=n.forwardRef((e,t)=>{const{__scopeRovingFocusGroup:r,focusable:s=!0,active:d=!1,tabStopId:p,...u}=e,a=q(),i=p||a,c=ne(O,r),F=c.currentTabStopId===i,I=G(r),{onFocusableItemAdd:l,onFocusableItemRemove:g}=c;return n.useEffect(()=>{if(s)return l(),()=>g()},[s,l,g]),x.jsx(A.ItemSlot,{scope:r,id:i,focusable:s,active:d,children:x.jsx(D.span,{tabIndex:F?0:-1,"data-orientation":c.orientation,...u,ref:t,onMouseDown:R(e.onMouseDown,o=>{s?c.onItemFocus(i):o.preventDefault()}),onFocus:R(e.onFocus,()=>c.onItemFocus(i)),onKeyDown:R(e.onKeyDown,o=>{if(o.key==="Tab"&&o.shiftKey){c.onItemShiftTab();return}if(o.target!==o.currentTarget)return;const m=ue(o,c.orientation,c.dir);if(m!==void 0){if(o.metaKey||o.ctrlKey||o.altKey||o.shiftKey)return;o.preventDefault();let v=I().filter(b=>b.focusable).map(b=>b.ref.current);if(m==="last")v.reverse();else if(m==="prev"||m==="next"){m==="prev"&&v.reverse();const b=v.indexOf(o.currentTarget);v=c.loop?ae(v,b+1):v.slice(b+1)}setTimeout(()=>j(v))}})})})});M.displayName=O;var se={ArrowLeft:"prev",ArrowUp:"prev",ArrowRight:"next",ArrowDown:"next",PageUp:"first",Home:"first",PageDown:"last",End:"last"};function ce(e,t){return t!=="rtl"?e:e==="ArrowLeft"?"ArrowRight":e==="ArrowRight"?"ArrowLeft":e}function ue(e,t,r){const s=ce(e.key,r);if(!(t==="vertical"&&["ArrowLeft","ArrowRight"].includes(s))&&!(t==="horizontal"&&["ArrowUp","ArrowDown"].includes(s)))return se[s]}function j(e,t=!1){const r=document.activeElement;for(const s of e)if(s===r||(s.focus({preventScroll:t}),document.activeElement!==r))return}function ae(e,t){return e.map((r,s)=>e[(t+s)%e.length])}var de=N,pe=M;export{pe as I,de as R,fe as c,Q as u};
import{r as e,j as t,L as C}from"./app-CnHTP8XK.js";import{_ as j,D as w,g as b}from"./generateColumns-CiPvbplT.js";import{u as L}from"./Categories-D2QbHbir.js";import S from"./columnsConfig-kc67Qj8I.js";import"./index-BAbSGt1_.js";const R=({setDelete:u,setEdit:f})=>{const{setCategories:l,dtCategories:d}=L(),[s,y]=e.useState(1),[a,g]=e.useState(10),[x,p]=e.useState(!0),o=new URLSearchParams(window.location.search),r=o.get("cari")||"",c=o.get("sortby")||"",n=o.get("order")||"",m=j.debounce(i=>{i()},500),h=e.useCallback(async()=>{g(10),await l({page:s,limit:a,search:r,sortby:c,order:n}),p(!1)},[l,s,a,r,c,n]);return e.useEffect(()=>(m(h),()=>{m.cancel()}),[r,c,n,s,a]),t.jsx("div",{className:"flex-1 flex-col max-w-full h-full overflow-auto",children:x?t.jsx("div",{className:"flex justify-center items-center h-full",children:t.jsx(C,{})}):t.jsx(w,{data:d.data,columns:b(S,f,i=>u({id:i,isDelete:!1})),filters:["category_nm"]})})};export{R as default};
import{r as t,j as e,L as b}from"./app-CSgTi1V-.js";import{_ as j,D as w,g as _}from"./generateColumns-C9DuuWZx.js";import{u as v}from"./ShippingCosts-bMj7lEsO.js";import{t as D}from"./transformDataWithFilters-CxGA706_.js";import{updateAccessorKeys as L,columnsConfig as y}from"./columnsConfig-BGhXsZk7.js";import"./index-BXBmzZS1.js";const I=({setDelete:u,setEdit:d})=>{const{setShippingCosts:l,dtShippingCosts:f}=v(),[a,p]=t.useState(10),[g,h]=t.useState(!0),o=new URLSearchParams(window.location.search),i=o.get("cari")||"",r=o.get("sortby")||"",n=o.get("order")||"",m=j.debounce(s=>{s()},500),x=t.useCallback(async()=>{p(10),await l({limit:a,search:i,sortby:r,order:n}),h(!1)},[l,a,i,r,n]);t.useEffect(()=>(m(x),()=>{m.cancel()}),[i,r,n,a]);const c=["village.sub_district.sub_district_nm","village.village_nm"],C=D(f.data,c),S=L(y,c);return e.jsx("div",{className:"flex-1 flex-col max-w-full h-full overflow-auto",children:g?e.jsx("div",{className:"flex justify-center items-center h-full",children:e.jsx(b,{})}):e.jsx(w,{data:C,columns:_(S,d,s=>u({id:s,isDelete:!1})),filters:c.map(s=>`${s.split(".").join("_")}_filter`)})})};export{I as default};

import{r as s,j as t,Y as j,B as S,T as g,s as w}from"./app-CSgTi1V-.js";import E from"./ShowData-B0F80BsT.js";import T from"./Form-DVQRPDgx.js";import{D as v}from"./DeleteDialog-CPKhJD68.js";import{u as y}from"./ShippingCosts-bMj7lEsO.js";import"./generateColumns-C9DuuWZx.js";import"./index-BXBmzZS1.js";import"./transformDataWithFilters-CxGA706_.js";import"./columnsConfig-BGhXsZk7.js";import"./BodyForm-COWPj6QQ.js";import"./InputRupiah-CILeMkJP.js";import"./Villages-BzPdTdNj.js";const A=()=>{const r="ShippingCosts",{removeData:m}=y(),[p,o]=s.useState(!1),[c,n]=s.useState(),[h,x]=s.useState(),[D,a]=s.useState(!1),u=()=>{o(!0),n(null)},d=i=>{o(!0),n(i)},l=async({id:i,isDelete:f})=>{if(x(i),f){const{data:e}=await m(h);w({type:e==null?void 0:e.type,description:e==null?void 0:e.message}),a(!1)}else a(!0)};return t.jsxs(t.Fragment,{children:[t.jsx(j,{title:r}),t.jsxs("div",{className:"grow flex flex-col",children:[t.jsxs("div",{className:"flex items-center justify-between",children:[t.jsx("h1",{children:"Data ShippingCosts"}),t.jsx(S,{variant:"outline",onClick:u,children:"Tambah Data"})]}),t.jsx(T,{openDialog:p,setOpenDialog:o,dtEdit:c,halaman:r}),t.jsx(v,{setShowDel:a,showDel:D,setDelete:l}),t.jsx(E,{setDelete:l,setEdit:d}),t.jsx(g,{})]})]})};export{A as default};

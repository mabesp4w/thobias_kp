import{r as o,j as e,Y as u,T as j,s as g}from"./app-DGFkG_vZ.js";import w from"./ShowData-CN-wObvh.js";import S from"./Form-Bc2lYJLB.js";import{u as E}from"./Orders-3cLjpXVh.js";import{D as y}from"./DeleteDialog-D1OY1qgn.js";import"./generateColumns-BG7gE8ta.js";import"./index-BTZ44qRw.js";import"./transformDataWithFilters-CxGA706_.js";import"./columnsConfig-0GFwk7HT.js";import"./Detail-KvGCCnez.js";import"./Penilaian-D9C4Ttm2.js";import"./RatingStars-BDnknz6-.js";import"./Reviews-Ksdi12vh.js";import"./BodyForm-CFwsFbuF.js";const B=()=>{const i="Orders",{removeData:m}=E(),[n,a]=o.useState(!1),[p,c]=o.useState(),[x,D]=o.useState(),[d,r]=o.useState(!1),f=s=>{console.log({row:s}),a(!0),c(s.shipping_status)},l=async({id:s,isDelete:h})=>{if(D(s),h){const{data:t}=await m(x);g({type:t==null?void 0:t.type,description:t==null?void 0:t.message}),r(!1)}else r(!0)};return e.jsxs(e.Fragment,{children:[e.jsx(u,{title:i}),e.jsxs("div",{className:"grow flex flex-col",children:[e.jsx("div",{className:"flex items-center justify-between",children:e.jsx("h1",{children:"Data Orders"})}),e.jsx(S,{openDialog:n,setOpenDialog:a,dtEdit:p,halaman:i}),e.jsx(y,{setShowDel:r,showDel:d,setDelete:l}),e.jsx(w,{setDelete:l,setEdit:f}),e.jsx(j,{})]})]})};export{B as default};
import{r as s,j as e,Y as j,B as g,T as w,s as S}from"./app-DTygMt2q.js";import E from"./ShowData-CTQE5BAC.js";import T from"./Form-O657WlrH.js";import{u as v}from"./Categories-CyMucOBK.js";import{D as y}from"./DeleteDialog-Bfxbqs-x.js";import"./generateColumns-BEYFbkEN.js";import"./index-CUWhGg6f.js";import"./columnsConfig-C26B3o_b.js";import"./BodyForm-CZDzPrPp.js";const Y=()=>{const i="Categories",{removeData:m}=v(),[c,o]=s.useState(!1),[x,l]=s.useState(),[p,D]=s.useState(),[h,a]=s.useState(!1),u=()=>{o(!0),l(null)},d=r=>{o(!0),l(r)},n=async({id:r,isDelete:f})=>{if(D(r),f){const{data:t}=await m(p);S({type:t==null?void 0:t.type,description:t==null?void 0:t.message}),a(!1)}else a(!0)};return e.jsxs(e.Fragment,{children:[e.jsx(j,{title:i}),e.jsxs("div",{className:"grow flex flex-col",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("h1",{children:"Data Categories"}),e.jsx(g,{variant:"outline",onClick:u,children:"Tambah Data"})]}),e.jsx(T,{openDialog:c,setOpenDialog:o,dtEdit:x,halaman:i}),e.jsx(y,{setShowDel:a,showDel:h,setDelete:n}),e.jsx(E,{setDelete:n,setEdit:d}),e.jsx(w,{})]})]})};export{Y as default};
import{r as t,j as e,S as d,I as g}from"./app-CSgTi1V-.js";import{u as m}from"./Categories-DMo5Yw_j.js";const x=({register:o,errors:a,showModal:i,control:l})=>{const{setCategories:r,dtCategories:n}=m(),[u,s]=t.useState(!0),c=t.useCallback(async()=>{s(!0),await r({page:1,limit:10}),s(!1)},[r]);return t.useEffect(()=>{c()},[i]),e.jsxs(e.Fragment,{children:[!u&&e.jsx(d,{label:"Kategori",placeholder:"Pilih Kategori",name:"category_id",dataDb:n.data,body:["id","category_nm"],control:l,required:!0,errors:a.category_id,addClass:"col-span-8 text-black relative",menuPortalTarget:!0}),e.jsx(g,{label:"Sub Kategori",name:"sub_category_nm",register:o,required:!0,minLength:2,errors:a.sub_category_nm,addClass:"col-span-8"})]})};export{x as default};

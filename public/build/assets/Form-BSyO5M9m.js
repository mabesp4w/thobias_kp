import{r as m,u as S,j as s,D as b,I as D,b as F,L as _,c as v,d as y}from"./app-CnHTP8XK.js";import{u as L}from"./ShippingCosts-02cJeo9X.js";import w from"./BodyForm-CyIV0vNp.js";import"./InputRupiah-c2TKoE6L.js";import"./Villages-CfasG80K.js";const N=({openDialog:i,setOpenDialog:e,dtEdit:a,halaman:c})=>{const{addData:p,updateData:u}=L(),[d,h]=m.useState(!1),{register:t,handleSubmit:r,setValue:o,control:f,formState:{errors:g},watch:x}=S(),n=()=>{o("id",""),o("village_id",""),o("shipping_cost",0)};m.useEffect(()=>{a?(o("id",a.id),o("village_id",a.village_id),o("shipping_cost",a.shipping_cost)):n()},[e,a]);const l=async j=>{y({row:j,dtEdit:a,setIsLoading:h,setShowModal:e,addData:p,updateData:u,resetForm:n})};return s.jsx(b,{openDialog:i,setOpenDialog:e,title:`Form ${c}`,children:s.jsxs("form",{onSubmit:r(l),children:[s.jsx(D,{name:"id",register:t,type:"hidden"}),s.jsx("div",{className:"grid grid-cols-8 gap-2 mb-4",children:s.jsx(w,{register:t,errors:g,dtEdit:a,control:f,watch:x,setValue:o,showModal:i})}),s.jsx(F,{children:d?s.jsx(_,{}):s.jsx(v,{onClick:r(l),type:"submit",children:"Simpan"})})]})})};export{N as default};
import{r as c,u as g,j as s,D as S,I as D,b as F,L as y,c as L,d as w}from"./app-CSgTi1V-.js";import{u as B}from"./Banners-kEZXxaWb.js";import I from"./BodyForm-Buc7xSMj.js";import"./index-BxCqxJQM.js";const C=({openDialog:r,setOpenDialog:e,dtEdit:a,halaman:u})=>{const{addData:l,updateData:d}=B(),[p,f]=c.useState(!1),{register:t,handleSubmit:i,setValue:o,control:x,formState:{errors:h},watch:j}=g(),n=()=>{o("id",""),o("position",1),o("banner_img","")};c.useEffect(()=>{a?(o("id",a.id),o("position",a.position),o("banner_img","")):n()},[e,a]);const m=async b=>{w({row:b,dtEdit:a,setIsLoading:f,setShowModal:e,addData:l,updateData:d,resetForm:n})};return s.jsx(S,{openDialog:r,setOpenDialog:e,title:`Form ${u}`,children:s.jsxs("form",{onSubmit:i(m),children:[s.jsx(D,{name:"id",register:t,type:"hidden"}),s.jsx("div",{className:"grid grid-cols-8 gap-2 mb-4",children:s.jsx(I,{register:t,errors:h,dtEdit:a,control:x,watch:j,setValue:o,showModal:r})}),s.jsx(F,{children:p?s.jsx(y,{}):s.jsx(L,{onClick:i(m),type:"submit",children:"Simpan"})})]})})};export{C as default};

import{r as o,a as d,j as e,i as g,B as c,P as u}from"./app-CSgTi1V-.js";import{S as f}from"./ScrollRevealComponent-DtYkaQEz.js";import{a as p}from"./addToCart-CspCCCLQ.js";const b=({product:s,cart:t})=>{const[l,r]=o.useState((t==null?void 0:t.quantity)||1),i=()=>{r(a=>a+1)},m=()=>{r(a=>Math.max(a-1,1))},n=s.product_image.length>0?s.product_image[0]:null,x=n?`${d}/${n.product_img}`:"/images/no_image.png";return o.useEffect(()=>(p({productId:s.id,costumQuantity:l,isLoggedIn:!0}),()=>{}),[l]),e.jsx(f,{offset:50,className:"w-fit border-b",children:e.jsxs("div",{className:"flex flex-col lg:flex-row gap-x-12",children:[e.jsx("div",{className:"h-max-h-32",children:e.jsx("img",{src:x,alt:s.product_nm,className:"w-80"})}),e.jsxs("div",{className:"w-full grow flex flex-col gap-y-2",children:[e.jsxs("div",{className:"flex flex-col gap-y-4",children:[e.jsx("h1",{className:"text-lg font-bold",children:s.product_nm}),e.jsx("h4",{className:"text-xl font-bold text-primary",children:g(s.price)})]}),e.jsxs("div",{className:"flex items-center space-x-2 w-48 border rounded-md",children:[e.jsx(c,{onClick:m,className:"text-4xl text-gray-600 bg-transparent",children:"-"}),e.jsx(u,{type:"number",value:l,readOnly:!0,onChange:a=>r(Number(a.target.value)),className:"text-center border-none focus:border-none"}),e.jsx(c,{onClick:i,className:"text-4xl text-gray-600 bg-transparent",children:"+"})]}),e.jsx("div",{className:"flex gap-x-4 items-center"})]})]})})};export{b as default};

import{r as u,j as s,D as d,a as h,i as o,B as g}from"./app-DTygMt2q.js";import j from"./Penilaian-DcQU2ClB.js";import"./RatingStars-8aV3-3TF.js";import"./Reviews-Dw-6p1GX.js";const D=({order:a,openDetail:p,setOpenDetail:x})=>{var i,l;const[m,e]=u.useState(!1);return console.log({order:a}),s.jsx(d,{openDialog:p,setOpenDialog:x,title:"Detail",children:a&&s.jsx("section",{className:"container mt-10 flex flex-col gap-5",children:s.jsxs("div",{className:"flex flex-col",children:[a==null?void 0:a.order_items.map(t=>{var c;const n=(c=t==null?void 0:t.product)==null?void 0:c.product_image[0],r=n?`${h}/${n.product_img}`:"/images/no_image.png";return s.jsxs("div",{className:"flex border-y h-24",children:[s.jsx("img",{src:r,alt:t.product.product_nm,className:"w-24 object-cover"}),s.jsxs("div",{className:"ml-4 w-full",children:[s.jsx("h1",{className:"text-lg font-bold",children:t.product.product_nm}),s.jsxs("h4",{className:"",children:["x ",t.quantity]})]}),s.jsx("div",{className:"w-fit flex justify-end items-center",children:s.jsx("span",{className:"whitespace-nowrap text-primary font-bold",children:o(t.product.price)})})]},t.id)}),s.jsxs("div",{className:"flex justify-end gap-x-2",children:[s.jsx("span",{children:"Total Pesanan:"}),s.jsx("span",{className:"text-primary font-bold",children:o(a.total_price)})]}),s.jsx("div",{className:"flex items-center mt-4",children:(((i=a==null?void 0:a.shipping_status)==null?void 0:i.status)==="dikirim"||((l=a==null?void 0:a.shipping_status)==null?void 0:l.status)==="diterima")&&s.jsxs(s.Fragment,{children:[s.jsx(g,{variant:"outline",className:"ml-auto border-secondary hover:bg-secondary hover:text-secondary-foreground",onClick:()=>{e(!0)},children:a.review.length>0?"Lihat":"Belum Dinilai"}),s.jsx(j,{openDialog:m,setOpenDialog:e,user_id:a.user_id,order:a})]})})]})})})};export{D as default};

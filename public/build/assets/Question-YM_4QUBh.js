import{r,j as e,D as v,b as _,c as w,B as C,aI as a,aN as L}from"./app-DTygMt2q.js";import{u as S}from"./Orders-Bs8JYhNs.js";const P=({setOpenDialog:o,openDialog:m,carts:d,user:n,shipping:c,MIDTRANS_CLIENT_KEY:y})=>{const[f,h]=r.useState(!1),[b,l]=r.useState(!1),{addData:g}=S();r.useEffect(()=>{const t=document.createElement("script");return t.src="https://app.sandbox.midtrans.com/snap/snap.js",t.setAttribute("data-client-key",y||""),t.onload=()=>h(!0),document.body.appendChild(t),()=>{document.body.removeChild(t)}},[]);const j=async()=>{l(!0);const t=d.reduce((k,p)=>k+p.product.price*p.quantity,0),u=t+c.shipping_cost,i={user_id:n==null?void 0:n.id,shipping_cost_id:c.id,total_price:t,total_payment:u,status:"tunggu",carts:d},s=await g(i);console.log({res:s}),s.status==="success"&&(o(!1),x(s.data.data),a.visit("/orders")),l(!1)},x=async t=>{if(!f){alert("Snap.js is not loaded yet!");return}const i=(await L.post("/payment",{order_id:t.id})).data;window.snap.pay(i,{onSuccess:function(s){console.log({result:s}),a.visit("https://erta-beauty.sitoko.my.id/orders")},onPending:function(s){console.log({result:s}),a.visit("https://erta-beauty.sitoko.my.id/orders")},onError:function(s){console.log({result:s}),a.visit("https://erta-beauty.sitoko.my.id/orders")},onClose:function(){console.log("user closed the popup"),a.visit("https://erta-beauty.sitoko.my.id/orders")}})};return e.jsxs(v,{openDialog:m,setOpenDialog:o,title:"Lanjut Ke Proses Pembayaran ?",children:[e.jsx("p",{children:"Anda tidak dapat mengubah pesanan setelah melanjutkan ke proses pembayaran."}),e.jsx(_,{children:e.jsxs("div",{className:"w-full flex gap-x-2 justify-center items-end",children:[!b&&e.jsx(w,{addClass:"bg-primary",onClick:j,children:"Lanjut"}),e.jsx(C,{variant:"outline",onClick:()=>o(!1),children:"Tidak"})]})})]})};export{P as default};

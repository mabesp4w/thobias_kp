import{e as h,f as D,g as o,h as d}from"./app-DTygMt2q.js";const p=h(D(u=>({dtSubDistricts:{last_page:0,current_page:0,data:[]},setSubDistricts:async({page:s=1,limit:a=10,search:r,sortby:t,order:e})=>{var i;try{const n=await o.getState().setToken(),c=await d({method:"get",url:"/subDistricts",headers:{Authorization:`Bearer ${n}`},params:{limit:a,page:s,search:r,sortby:t,order:e}});return u(b=>({...b,dtSubDistricts:c.data})),console.log({response:c}),{status:"berhasil",data:c.data}}catch(n){return{status:"error",error:(i=n.response)==null?void 0:i.data}}},setShowSubDistricts:async s=>{var a;try{const r=await o.getState().setToken(),t=await d({method:"get",url:`/subDistricts/${s}`,headers:{Authorization:`Bearer ${r}`}});return u(e=>({...e,dtSubDistricts:t.data.data})),{status:"berhasil",data:t.data}}catch(r){return{status:"error",error:(a=r.response)==null?void 0:a.data}}},addData:async s=>{try{const a=await o.getState().setToken(),r=await d({method:"post",url:"/subDistricts",headers:{Authorization:`Bearer ${a}`},data:s});return u(t=>({dtSubDistricts:{last_page:t.dtSubDistricts.last_page,current_page:t.dtSubDistricts.current_page,data:[r.data.data,...t.dtSubDistricts.data]}})),{status:"berhasil tambah",data:r.data}}catch(a){return{status:"error",data:a.response.data}}},removeData:async s=>{try{const a=await o.getState().setToken(),r=await d({method:"delete",url:`/subDistricts/${s}`,headers:{Authorization:`Bearer ${a}`}});return u(t=>({dtSubDistricts:{last_page:t.dtSubDistricts.last_page,current_page:t.dtSubDistricts.current_page,data:t.dtSubDistricts.data.filter(e=>e.id!==s)}})),{status:"berhasil hapus",data:r.data}}catch(a){return{status:"error",data:a.response.data}}},updateData:async(s,a)=>{try{const r=await o.getState().setToken(),t=await d({method:"PUT",url:`/subDistricts/${s}`,headers:{Authorization:`Bearer ${r}`},data:a});return u(e=>({dtSubDistricts:{last_page:e.dtSubDistricts.last_page,current_page:e.dtSubDistricts.current_page,data:e.dtSubDistricts.data.map(i=>i.id===s?{...i,...t.data.data}:i)}})),{status:"berhasil update",data:t.data}}catch(r){return{status:"error",data:r.response.data}}}})));export{p as u};
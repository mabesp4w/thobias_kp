import{e as c,f as h,g as d,h as n}from"./app-CSgTi1V-.js";const V=c(h(o=>({dtVillages:{last_page:0,current_page:0,data:[]},setVillages:async({page:r=1,limit:t=10,search:e,sortby:a,order:s})=>{var l;try{const i=await d.getState().setToken(),g=await n({method:"get",url:"/villages",headers:{Authorization:`Bearer ${i}`},params:{limit:t,page:r,search:e,sortby:a,order:s}});return o(u=>({...u,dtVillages:g.data})),console.log({response:g}),{status:"berhasil",data:g.data}}catch(i){return{status:"error",error:(l=i.response)==null?void 0:l.data}}},setShowVillages:async r=>{var t;try{const e=await d.getState().setToken(),a=await n({method:"get",url:`/villages/${r}`,headers:{Authorization:`Bearer ${e}`}});return o(s=>({...s,dtVillages:a.data.data})),{status:"berhasil",data:a.data}}catch(e){return{status:"error",error:(t=e.response)==null?void 0:t.data}}},addData:async r=>{try{const t=await d.getState().setToken(),e=await n({method:"post",url:"/villages",headers:{Authorization:`Bearer ${t}`},data:r});return o(a=>({dtVillages:{last_page:a.dtVillages.last_page,current_page:a.dtVillages.current_page,data:[e.data.data,...a.dtVillages.data]}})),{status:"berhasil tambah",data:e.data}}catch(t){return{status:"error",data:t.response.data}}},removeData:async r=>{try{const t=await d.getState().setToken(),e=await n({method:"delete",url:`/villages/${r}`,headers:{Authorization:`Bearer ${t}`}});return o(a=>({dtVillages:{last_page:a.dtVillages.last_page,current_page:a.dtVillages.current_page,data:a.dtVillages.data.filter(s=>s.id!==r)}})),{status:"berhasil hapus",data:e.data}}catch(t){return{status:"error",data:t.response.data}}},updateData:async(r,t)=>{try{const e=await d.getState().setToken(),a=await n({method:"PUT",url:`/villages/${r}`,headers:{Authorization:`Bearer ${e}`},data:t});return o(s=>({dtVillages:{last_page:s.dtVillages.last_page,current_page:s.dtVillages.current_page,data:s.dtVillages.data.map(l=>l.id===r?{...l,...a.data.data}:l)}})),{status:"berhasil update",data:a.data}}catch(e){return{status:"error",data:e.response.data}}}})));export{V as u};

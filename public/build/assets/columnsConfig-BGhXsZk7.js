import{j as a,i as l}from"./app-CSgTi1V-.js";const n=[{header:"Kecamatan/Distrik",cell:({row:i})=>a.jsx("div",{className:"capitalize",children:i.original.village.sub_district.sub_district_nm})},{header:"Kelurahan",cell:({row:i})=>a.jsx("div",{className:"capitalize",children:i.original.village.village_nm})},{header:"Ongkir",cell:({row:i})=>a.jsx("div",{className:"capitalize",children:l(i.original.shipping_cost)})}];function o(i,r){return i.map((e,c)=>{const s=r[c]||null;return!e.accessorKey&&s?{...e,accessorKey:s.split(".").join("_")+"_filter"}:e.accessorKey&&r.includes(e.accessorKey)?{...e,accessorKey:s.split(".").join("_")+"_filter"}:e})}export{n as columnsConfig,o as updateAccessorKeys};

import{aN as r}from"./app-CSgTi1V-.js";const i=async({productId:s,quantity:e=1,isLoggedIn:d,costumQuantity:t})=>{let a="";d?t?a="/carts/setCartQuantity":a="/carts/addToCartDatabase":a="/carts/addToCartSession",t&&(e=t),await r.post(a,{product_id:s,quantity:e}),window.dispatchEvent(new Event("cartUpdated"))};export{i as a};

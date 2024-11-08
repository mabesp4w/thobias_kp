import ProductsTypes from "./Products";

// Carts
export default interface CartsTypes {
    id: string;
    product_id: string;
    user_id: string;
    qty: number;
    total_price: number;
    product: ProductsTypes;
}

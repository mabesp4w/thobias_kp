import OrderItemsTypes from "./OrderItems";
import ShippingCostsTypes from "./ShippingCosts";

// orders
export default interface OrdersTypes {
    id: string;
    user_id: string;
    shpipping_cost_id: string;
    total_price: number;
    total_payment: number;
    status: string;
    order_items: OrderItemsTypes[];
    snap_token: string;
    created_at: string;
    shipping_cost: ShippingCostsTypes;
}

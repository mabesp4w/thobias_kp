import OrderItemsTypes from "./OrderItems";

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
}

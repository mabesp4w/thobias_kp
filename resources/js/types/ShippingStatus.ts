import OrdersTypes from "./Orders";

// shippingStatuses
export default interface ShippingStatusesTypes {
    id: string;
    order_id: string;
    user_id: string;
    orders: OrdersTypes;
    status: string;
}

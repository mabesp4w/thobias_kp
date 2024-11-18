import { Button } from "@/components/ui/button";
import showRupiah from "@/lib/rupiah";
import { BASE_URL } from "@/services/baseURL";
import useShippingStatuses from "@/store/crud/ShippingStatus";
import OrdersTypes from "@/types/Orders";

type Props = {
    order: OrdersTypes;
};

const History = ({ order }: Props) => {
    const { updateData } = useShippingStatuses();

    return (
        <section className="container mt-10 flex flex-col gap-5">
            <div className="flex flex-col">
                {order?.order_items.map((item) => {
                    const img = item?.product?.product_image[0];
                    const urlImg = img
                        ? `${BASE_URL}/${img.product_img}`
                        : "/images/no_image.png";
                    return (
                        <div className="flex border-y h-24" key={item.id}>
                            <img
                                src={urlImg}
                                alt={item.product.product_nm}
                                className="w-24 object-cover"
                            />
                            <div className="ml-4 w-full">
                                <h1 className="text-lg font-bold">
                                    {item.product.product_nm}
                                </h1>
                                <h4 className="">x {item.quantity}</h4>
                            </div>
                            <div className="w-fit flex justify-end items-center">
                                <span className="whitespace-nowrap text-primary font-bold">
                                    {showRupiah(item.product.price)}
                                </span>
                            </div>
                        </div>
                    );
                })}
                <div className="flex justify-end gap-x-2">
                    <span>Total Pesanan:</span>
                    <span className="text-primary font-bold">
                        {showRupiah(order.total_price)}
                    </span>
                </div>
                <div className="flex items-center mt-2">
                    <div className="flex flex-col">
                        <span className="text-primary font-bold capitalize">
                            Status Pesanan: {order.status}
                        </span>
                        {order?.shipping_status && (
                            <span className="font-bold capitalize">
                                Status Pengiriman:{" "}
                                {order.shipping_status.status}
                            </span>
                        )}
                    </div>
                    {order?.shipping_status && (
                        <Button
                            variant={"outline"}
                            className="ml-auto hover:bg-secondary hover:text-secondary-foreground"
                            onClick={() => {}}
                        >
                            Penilaian
                        </Button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default History;

import { Button } from "@/components/ui/button";
import showRupiah from "@/lib/rupiah";
import { BASE_URL } from "@/services/baseURL";
import OrdersTypes from "@/types/Orders";
import { Dispatch, SetStateAction, useState } from "react";
import DefaultDialog from "@/components/dialog/DefaultDialog";
import Penilaian from "./Penilaian";

type Props = {
    order: OrdersTypes | null;
    openDetail: boolean;
    setOpenDetail: Dispatch<SetStateAction<boolean>>;
};

const Detail = ({ order, openDetail, setOpenDetail }: Props) => {
    const [openDialog, setOpenDialog] = useState(false);
    console.log({ order });
    return (
        <DefaultDialog
            openDialog={openDetail}
            setOpenDialog={setOpenDetail}
            title={`Detail`}
        >
            {order && (
                <section className="container mt-10 flex flex-col gap-5">
                    <div className="flex flex-col">
                        {order?.order_items.map((item) => {
                            const img = item?.product?.product_image[0];
                            const urlImg = img
                                ? `${BASE_URL}/${img.product_img}`
                                : "/images/no_image.png";
                            return (
                                <div
                                    className="flex border-y h-24"
                                    key={item.id}
                                >
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
                        <div className="flex items-center mt-4">
                            {(order?.shipping_status?.status === "dikirim" ||
                                order?.shipping_status?.status ===
                                    "diterima") && (
                                <>
                                    <Button
                                        variant={"outline"}
                                        className="ml-auto border-secondary hover:bg-secondary hover:text-secondary-foreground"
                                        onClick={() => {
                                            setOpenDialog(true);
                                        }}
                                    >
                                        {order.review.length > 0
                                            ? "Lihat"
                                            : "Belum Dinilai"}
                                    </Button>
                                    <Penilaian
                                        openDialog={openDialog}
                                        setOpenDialog={setOpenDialog}
                                        user_id={order.user_id}
                                        order={order}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </section>
            )}
        </DefaultDialog>
    );
};

export default Detail;

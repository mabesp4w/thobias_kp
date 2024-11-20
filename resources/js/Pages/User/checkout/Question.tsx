import BtnDefault from "@/components/button/BtnDefault";
import DefaultDialog from "@/components/dialog/DefaultDialog";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import useOrders from "@/store/crud/Orders";
import { User } from "@/types";
import CartsTypes from "@/types/Carts";
import OrdersTypes from "@/types/Orders";
import ShippingCostsTypes from "@/types/ShippingCosts";
import { router } from "@inertiajs/react";
import axios from "axios";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

type Props = {
    openDialog: boolean;
    setOpenDialog: Dispatch<SetStateAction<boolean>>;
    shipping: ShippingCostsTypes;
    carts: CartsTypes[];
    user?: User;
    MIDTRANS_CLIENT_KEY?: string;
};

const Question: FC<Props> = ({
    setOpenDialog,
    openDialog,
    carts,
    user,
    shipping,
    MIDTRANS_CLIENT_KEY,
}) => {
    // state
    const [snapLoaded, setSnapLoaded] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // store
    const { addData } = useOrders();
    // useEffect
    useEffect(() => {
        // Memuat skrip Snap.js
        const script = document.createElement("script");
        script.src = "https://app.sandbox.midtrans.com/snap/snap.js"; // URL untuk sandbox atau production
        //  get MIDTRANS_CLIENT_KEY from .env
        script.setAttribute("data-client-key", MIDTRANS_CLIENT_KEY || "");
        script.onload = () => setSnapLoaded(true);
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleSubmit = async () => {
        setIsLoading(true);
        const total_price = carts.reduce(
            (total, cart) => total + cart.product.price * cart.quantity,
            0
        );
        const total_payment = total_price + shipping.shipping_cost;

        const row = {
            user_id: user?.id,
            shipping_cost_id: shipping.id,
            total_price,
            total_payment,
            status: "tunggu",
            carts,
        };
        const res = await addData(row);
        console.log({ res });
        if (res.status === "success") {
            setOpenDialog(false);
            handlePayment(res.data.data);
            router.visit("/orders");
        }
        setIsLoading(false);
    };

    const handlePayment = async (order: OrdersTypes) => {
        if (!snapLoaded) {
            alert("Snap.js is not loaded yet!");
            return;
        }
        const response = await axios.post("/payment", { order_id: order.id });
        const snapToken = response.data;
        // Gunakan snapToken untuk membuka Snap popup
        // @ts-ignore
        window.snap.pay(snapToken, {
            onSuccess: function (result: any) {
                /* Handle success */
                console.log({ result });
                router.visit("https://erta-beauty.sitoko.my.id/orders");
            },
            onPending: function (result: any) {
                /* Handle pending */
                console.log({ result });
                router.visit("https://erta-beauty.sitoko.my.id/orders");
            },
            onError: function (result: any) {
                /* Handle error */
                console.log({ result });
                router.visit("https://erta-beauty.sitoko.my.id/orders");
            },
            onClose: function () {
                /* Handle when user close the popup without finishing payment */
                console.log("user closed the popup");
                router.visit("https://erta-beauty.sitoko.my.id/orders");
            },
        });
    };
    return (
        <DefaultDialog
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
            title={`Lanjut Ke Proses Pembayaran ?`}
        >
            <p>
                Anda tidak dapat mengubah pesanan setelah melanjutkan ke proses
                pembayaran.
            </p>
            <DialogFooter>
                <div className="w-full flex gap-x-2 justify-center items-end">
                    {!isLoading && (
                        <BtnDefault
                            addClass="bg-primary"
                            onClick={handleSubmit}
                        >
                            Lanjut
                        </BtnDefault>
                    )}
                    <Button
                        variant={"outline"}
                        onClick={() => setOpenDialog(false)}
                    >
                        Tidak
                    </Button>
                </div>
            </DialogFooter>
        </DefaultDialog>
    );
};

export default Question;

import OrdersTypes from "@/types/Orders";
import { Head, router } from "@inertiajs/react";
import DetailsOrder from "./DetailsOrder";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type Props = {
    order: OrdersTypes;
    MIDTRANS_CLIENT_KEY?: string;
};

const Orders = ({ order, MIDTRANS_CLIENT_KEY }: Props) => {
    // state
    const [snapLoaded, setSnapLoaded] = useState<boolean>(false);
    useEffect(() => {
        // event cartUpdated
        window.dispatchEvent(new Event("cartUpdated"));
    }, []);

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

    console.log({ order });

    const openSnap = async () => {
        if (!snapLoaded) {
            alert("Snap.js is not loaded yet!");
            return;
        }
        // @ts-ignore
        window.snap.pay(order.snap_token, {
            onSuccess: function (result: any) {
                /* Handle success */
                console.log({ result });
                router.visit("/orders");
            },
            onPending: function (result: any) {
                /* Handle pending */
                console.log({ result });
                router.visit("/orders");
            },
            onError: function (result: any) {
                /* Handle error */
                console.log({ result });
                router.visit("/orders");
            },
            onClose: function () {
                /* Handle when user close the popup without finishing payment */
                console.log("user closed the popup");
            },
        });
    };

    return (
        <>
            <Head title="Orders" />
            <section className="container mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* rincian */}
                <div className="border">
                    <h1>Rincian pesanan</h1>
                    <div>
                        {order?.order_items.map((item) => (
                            <DetailsOrder
                                product={item.product}
                                key={item.id}
                            />
                        ))}
                    </div>
                </div>
                {/* metode pembayaran */}
                <div className="border">
                    <h1>Metode pembayaran</h1>
                    <Button onClick={openSnap}>Bayar</Button>
                </div>
            </section>
        </>
    );
};

export default Orders;

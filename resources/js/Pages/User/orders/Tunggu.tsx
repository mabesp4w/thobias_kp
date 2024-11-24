import OrdersTypes from "@/types/Orders";
import DetailsOrder from "./DetailsOrder";
import showRupiah from "@/lib/rupiah";
import { useEffect, useState } from "react";
import moment from "moment";
import useOrders from "@/store/crud/Orders";
import { router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";

type Props = {
    order: OrdersTypes;
    snapLoaded: boolean;
};

const Tunggu = ({ order, snapLoaded }: Props) => {
    // store
    const { updateData } = useOrders();
    // hitung mundur
    const [timeLeft, setTimeLeft] = useState("");
    const [pay, setPay] = useState(true);

    useEffect(() => {
        // Menambahkan 120 menit ke waktu created_at
        const endTime = moment(order?.created_at).add(120, "minutes");

        const interval = setInterval(() => {
            const now = moment();
            const duration = moment.duration(endTime.diff(now));

            const timeFormatted = `${duration.hours()} jam, ${duration.minutes()} menit, ${duration.seconds()} detik`;
            setTimeLeft(timeFormatted);

            if (duration.asSeconds() <= 0) {
                clearInterval(interval);
                setTimeLeft("Time is up!");
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [order?.created_at]);

    // setPay false if time 0
    useEffect(() => {
        if (timeLeft === "Time is up!") {
            setPay(false);
            const row = {
                status: "expired",
            };
            // @ts-ignore
            updateData(order.id, row);
        }
    }, [timeLeft]);

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
                router.visit("https://erta-beauty.sitoko.my.id/orders");
                console.log("user closed the popup");
            },
        });
    };

    return (
        <section className="container mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* rincian pesanan */}
            <div className="">
                <h1 className="text-center font-bold mb-4">
                    Rincian pesanan
                    <hr />
                </h1>
                <div>
                    {order?.order_items.map((item) => (
                        <DetailsOrder product={item.product} key={item.id} />
                    ))}
                </div>
            </div>
            {/* metode pembayaran */}
            <div className="">
                {/* rincian pembayaran */}
                <h1 className="text-center font-bold mb-4">
                    Rincian pembayaran
                    <hr />
                </h1>
                <div className="flex flex-col gap-y-4 w-full">
                    <div className="flex justify-between grow">
                        <span className="font-semibold">Subtotal</span>
                        <span className="font-semibold">
                            {showRupiah(order.total_price)}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Ongkir</span>
                        <span className="font-semibold">
                            {showRupiah(order.shipping_cost.shipping_cost)}
                        </span>
                    </div>
                    <div className="flex justify-between text-primary">
                        <span className="font-semibold">Total</span>
                        <span className="font-semibold">
                            {showRupiah(order.total_payment)}
                        </span>
                    </div>
                </div>
                {pay ? (
                    <div className="flex flex-col gap-y-4 mt-10">
                        <p className="text-lg text-center">{timeLeft}</p>
                        <Button onClick={openSnap}>Bayar</Button>
                    </div>
                ) : (
                    <p>Waktu pembayaran telah habis</p>
                )}
            </div>
        </section>
    );
};

export default Tunggu;

import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import showRupiah from "@/lib/rupiah";
import DetailProdct from "@/Pages/User/checkout/DetailProdct";
import useShippingCostsApi from "@/store/api/ShippingCosts";
import { User } from "@/types";
import CartsTypes from "@/types/Carts";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Question from "./Question";

type Props = {
    carts: CartsTypes[];
};

const Index = ({ carts }: Props) => {
    // state
    const [user, setUser] = useState<User>();
    const [openDialog, setOpenDialog] = useState(false);
    // store
    const { setShowShippingCosts, showSippingCost } = useShippingCostsApi();
    // cek status
    const cek = async () => {
        const res = await axios.get("/status");
        setUser(res.data.user);
    };
    useEffect(() => {
        cek();

        return () => {};
    }, []);

    useEffect(() => {
        console.log({ user });
        if (user?.user_info && user?.user_info?.length > 0) {
            setShowShippingCosts(user?.user_info[0]?.village_id);
        }
    }, [user]);

    if (!user?.user_info || user?.user_info?.length === 0) {
        return (
            <>
                <Head title="Checkout" />
                <Toaster />
                <div className="flex items-center justify-center h-screen">
                    <h1>Loading...</h1>
                </div>
            </>
        );
    }

    return (
        <>
            <Head title="Checkout" />
            <Toaster />
            <Question
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                shipping={showSippingCost}
                carts={carts}
                user={user}
            />
            <section className="container mt-10 flex flex-col gap-y-10">
                <h1 className="text-center text-2xl font-bold">Checkout</h1>
                <div className="flex mx-auto w-full justify-center">
                    <div className="flex flex-col gap-y-6">
                        {carts.map((cart) => (
                            <DetailProdct
                                key={cart.id}
                                product={cart.product}
                                cart={cart}
                            />
                        ))}
                    </div>
                    {/* total */}
                    <div className="w-[20rem]">
                        <div className="flex flex-col gap-y-4 w-full">
                            <div className="flex justify-between grow">
                                <span className="font-semibold">Subtotal</span>
                                <span className="font-semibold">
                                    {showRupiah(
                                        carts.reduce(
                                            (total, cart) =>
                                                total +
                                                cart.product.price *
                                                    cart.quantity,
                                            0
                                        )
                                    )}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold">Ongkir</span>
                                {showSippingCost && (
                                    <span className="font-semibold">
                                        {showRupiah(
                                            showSippingCost.shipping_cost
                                        )}
                                    </span>
                                )}
                            </div>
                            {showSippingCost && (
                                <div className="flex justify-between text-primary">
                                    <span className="font-semibold">Total</span>
                                    <span className="font-semibold">
                                        {showRupiah(
                                            showSippingCost.shipping_cost +
                                                carts.reduce(
                                                    (total, cart) =>
                                                        total +
                                                        cart.product.price *
                                                            cart.quantity,
                                                    0
                                                )
                                        )}
                                    </span>
                                </div>
                            )}

                            <div className="flex justify-end">
                                <Button
                                    className="font-semibold bg-secondary"
                                    onClick={() => setOpenDialog(true)}
                                >
                                    Pembayaran
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Index;
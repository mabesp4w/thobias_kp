import showRupiah from "@/lib/rupiah";
import DetailProdct from "@/Pages/User/checkout/DetailProdct";
import CartsTypes from "@/types/Carts";
import { Head } from "@inertiajs/react";

type Props = {
    carts: CartsTypes[];
};

const Index = ({ carts }: Props) => {
    console.log({ carts });
    return (
        <>
            <Head title="Checkout" />
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
                        <div className="flex flex-col gap-y-4 w-full border">
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
                                <span className="font-semibold">Shipping</span>
                                <span className="font-semibold">Rp. 0</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Index;

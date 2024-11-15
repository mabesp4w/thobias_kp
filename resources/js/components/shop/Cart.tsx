import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { BsHandbag, BsTrash } from "react-icons/bs";
import { motion } from "framer-motion";
import useProductsApi from "@/store/api/Products";
import { BASE_URL } from "@/services/baseURL";
import showRupiah from "@/lib/rupiah";
import { router } from "@inertiajs/react";
import { Button } from "../ui/button";
import axios from "axios";

type Props = {};

interface CartItem {
    product_id: string;
    quantity: number;
}

const Cart = (props: Props) => {
    // state
    const [open, setOpen] = useState(false);
    const [cart, setCart] = useState<any[]>([]);
    const [isShaking, setIsShaking] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // store
    const { getProductIds, dtProducts } = useProductsApi();

    // cek statue
    const cek = async () => {
        const res = await axios.get("/status");
        console.log({ res });
        setIsLoggedIn(res?.data?.user);
    };

    console.log({ isLoggedIn });

    // getCart
    const fetchCartData = async () => {
        try {
            const response = await axios.get("/carts/getCartData");
            const cartItems: CartItem[] = Object.values(response.data.data);
            setCart(cartItems);
        } catch (error) {
            console.error("Failed to fetch cart data", error);
        }
    };

    useEffect(() => {
        // ambil data saat pertama diload
        fetchCartData();
        // Event listener untuk perubahan session
        const handleCartChange = () => fetchCartData();
        // Event listener custom untuk memantau perubahan pada wish
        window.addEventListener("cartUpdated", handleCartChange);

        // Cleanup saat komponen dibongkar
        return () => {
            window.removeEventListener("cartUpdated", handleCartChange);
        };
    }, []);

    useEffect(() => {
        if (open) {
            getProductIds(cart);
        }
    }, [open, cart]);

    const removeItem = async (id: string) => {
        const endpoint = isLoggedIn
            ? "/carts/removeFromCartDatabase"
            : "/carts/removeFromCartSession";

        await axios.post(endpoint, { product_id: id });

        // Memicu event custom untuk memperbarui komponen cart
        window.dispatchEvent(new Event("cartUpdated"));
    };

    const gotoDetail = (id: string) => {
        setOpen(false);
        router.visit(`/products/detail/${id}`);
    };

    const gotoCheckout = () => {
        // Memicu event custom untuk memperbarui komponen cart
        if (!isLoggedIn) {
            return window.dispatchEvent(new Event("checkoutUpdated"));
        }
        if (isLoggedIn) {
            setOpen(false);
            return router.visit("/checkout");
        }
    };

    useEffect(() => {
        if (cart.length > 0) {
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 500);
        }
        cek();
    }, [cart]);

    return (
        <>
            <motion.div
                className="flex items-center relative cursor-pointer select-none"
                animate={isShaking ? { rotate: [0, -10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.5 }}
                onClick={() => setOpen(true)}
            >
                {cart.length > 0 && (
                    <span className="absolute -top-3 -right-4 bg-secondary text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                        {cart.reduce((total, item) => total + item.quantity, 0)}
                    </span>
                )}
                <BsHandbag />
            </motion.div>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle className="text-primary my-4">
                            {cart.length > 0
                                ? `${cart.length} jenis Belanjaan`
                                : "Keranjang belanja kosong"}
                        </SheetTitle>
                        <div className="flex flex-col gap-4">
                            {dtProducts.data.length > 0 && (
                                <>
                                    {dtProducts.data.map((item) => {
                                        const imgSrc =
                                            item.product_image?.[0]
                                                ?.product_img;
                                        const cartItem = cart.find(
                                            ({ product_id }) =>
                                                product_id === item.id
                                        );
                                        return (
                                            <div
                                                key={item.id}
                                                className="relative cursor-pointer"
                                                onClick={() =>
                                                    gotoDetail(item.id)
                                                }
                                            >
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={
                                                            imgSrc
                                                                ? `${BASE_URL}/${imgSrc}`
                                                                : "/images/no_image.png"
                                                        }
                                                        alt={item.product_nm}
                                                        className="w-16 object-cover"
                                                    />
                                                    <div className="flex flex-col w-full">
                                                        <div className="flex justify-between">
                                                            <span className=" font-semibold">
                                                                {
                                                                    item.product_nm
                                                                }
                                                            </span>
                                                            <span className="text-sm">
                                                                {
                                                                    cartItem?.quantity
                                                                }{" "}
                                                                pc
                                                            </span>
                                                        </div>
                                                        <span className="text-primary font-semibold">
                                                            {showRupiah(
                                                                item.price
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div
                                                    className="absolute bottom-4 cursor-pointer right-0"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeItem(item.id);
                                                    }}
                                                >
                                                    <BsTrash />
                                                </div>
                                                <hr className="my-2" />
                                            </div>
                                        );
                                    })}
                                    <div className="flex justify-between">
                                        <span className="font-semibold">
                                            Total
                                        </span>
                                        <span className="font-semibold">
                                            {showRupiah(
                                                dtProducts.data.reduce(
                                                    (total, item) =>
                                                        total +
                                                        item.price *
                                                            (cart.find(
                                                                ({
                                                                    product_id,
                                                                }) =>
                                                                    product_id ===
                                                                    item.id
                                                            )?.quantity || 0),
                                                    0
                                                )
                                            )}
                                        </span>
                                    </div>
                                    <Button
                                        className="w-full"
                                        onClick={gotoCheckout}
                                    >
                                        Checkout
                                    </Button>
                                </>
                            )}
                        </div>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </>
    );
};

export default Cart;

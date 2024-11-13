import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { BsHandbag } from "react-icons/bs";
import Cookies from "js-cookie";
import { motion } from "framer-motion";

type Props = {};

const Cart = (props: Props) => {
    const [open, setOpen] = useState(false);
    const [cart, setCart] = useState<string[]>([]);
    const [isShaking, setIsShaking] = useState(false);
    // cek cookies cart

    // Fungsi untuk mengambil cart dari cookies
    const fetchCartFromCookies = () => {
        const cartData = JSON.parse(Cookies.get("cart") || "[]");
        setCart(cartData);
    };

    useEffect(() => {
        // Ambil cart saat komponen pertama kali dimuat
        fetchCartFromCookies();

        // Event listener untuk perubahan cookies
        const handleCartChange = () => fetchCartFromCookies();

        // Event listener custom untuk memantau perubahan pada cart
        window.addEventListener("cartUpdated", handleCartChange);

        // Cleanup saat komponen dibongkar
        return () => {
            window.removeEventListener("cartUpdated", handleCartChange);
        };
    }, []);

    useEffect(() => {
        // Mengaktifkan animasi goyangan ketika `cart.length` berubah
        if (cart.length > 0) {
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 500);
        }
    }, [cart]);

    return (
        <>
            <motion.div
                className="flex items-center relative cursor-pointer select-none"
                animate={isShaking ? { rotate: [0, -10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.5 }}
            >
                {cart.length > 0 && (
                    <span className="absolute -top-3 -right-4 bg-secondary text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                        {cart.length}
                    </span>
                )}
                <BsHandbag />
            </motion.div>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>
                            {cart.length > 0
                                ? `Anda memiliki ${cart.length} belanjaan di keranjang`
                                : "Keranjang belanja kosong"}
                        </SheetTitle>
                        <SheetDescription></SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </>
    );
};

export default Cart;

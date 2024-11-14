import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { BsHeart } from "react-icons/bs";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
type Props = {};

const Wishlist = (props: Props) => {
    const [open, setOpen] = useState(false);
    const [wish, setWish] = useState<string[]>([]);
    const [isShaking, setIsShaking] = useState(false);
    // cek cookies wish

    // Fungsi untuk mengambil wish dari cookies
    const fetchWishFromCookies = () => {
        const wishData = JSON.parse(Cookies.get("wish") || "[]");
        setWish(wishData);
    };

    useEffect(() => {
        // Ambil wish saat komponen pertama kali dimuat
        fetchWishFromCookies();

        // Event listener untuk perubahan cookies
        const handleWishChange = () => fetchWishFromCookies();

        // Event listener custom untuk memantau perubahan pada wish
        window.addEventListener("wishUpdated", handleWishChange);

        // Cleanup saat komponen dibongkar
        return () => {
            window.removeEventListener("wishUpdated", handleWishChange);
        };
    }, []);

    useEffect(() => {
        // Mengaktifkan animasi goyangan ketika `wish.length` berubah
        if (wish.length > 0) {
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 500);
        }
    }, [wish]);
    return (
        <>
            <motion.div
                className="flex items-center relative cursor-pointer select-none"
                onClick={() => setOpen(true)}
                animate={isShaking ? { rotate: [0, -10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.5 }}
            >
                {wish.length > 0 && (
                    <span className="absolute -top-3 -right-4 bg-secondary text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                        {wish.length}
                    </span>
                )}
                <BsHeart />
            </motion.div>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle className="mt-4">
                            {wish.length > 0
                                ? "Daftar Wishlist"
                                : "Wishlist Kosong"}
                        </SheetTitle>
                        <SheetDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </>
    );
};

export default Wishlist;

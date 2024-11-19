import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { BsHeart, BsTrash } from "react-icons/bs";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import useProductsApi from "@/store/api/Products";
import showRupiah from "@/lib/rupiah";
import { BASE_URL } from "@/services/baseURL";
import { router } from "@inertiajs/react";
type Props = {};

const Wishlist = (props: Props) => {
    const [open, setOpen] = useState(false);
    const [wish, setWish] = useState<string[]>([]);
    const [isShaking, setIsShaking] = useState(false);
    // cek cookies wish
    // store
    const { getProductIds, dtProducts } = useProductsApi();

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
        if (open) {
            getProductIds(wish);
        }
    }, [open, wish]);

    useEffect(() => {
        // Mengaktifkan animasi goyangan ketika `wish.length` berubah
        if (wish.length > 0) {
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 500);
        }
    }, [wish]);

    const removeWish = (product_id: string) => {
        const wishData = JSON.parse(Cookies.get("wish") || "[]");
        const updatedWish = wishData.filter(
            (item: any) => item.product_id !== product_id
        );
        console.log({ wishData, updatedWish });
        Cookies.set("wish", JSON.stringify(updatedWish));
        setWish(updatedWish);
    };

    const gotoDetail = (id: string) => {
        setOpen(false);
        router.visit(`/products/detail/${id}`);
    };
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
                    </SheetHeader>
                    <div className="flex flex-col gap-4">
                        {dtProducts.data.length > 0 && (
                            <>
                                {dtProducts.data.map((item) => {
                                    const imgSrc =
                                        item.product_image?.[0]?.product_img;
                                    return (
                                        <div
                                            key={item.id}
                                            className="relative cursor-pointer"
                                            onClick={() => gotoDetail(item.id)}
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
                                                            {item.product_nm}
                                                        </span>
                                                    </div>
                                                    <span className="text-primary font-semibold">
                                                        {showRupiah(item.price)}
                                                    </span>
                                                </div>
                                            </div>
                                            <div
                                                className="absolute bottom-4 cursor-pointer right-0"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeWish(item.id);
                                                }}
                                            >
                                                <BsTrash />
                                            </div>
                                            <hr className="my-2" />
                                        </div>
                                    );
                                })}
                            </>
                        )}
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
};

export default Wishlist;

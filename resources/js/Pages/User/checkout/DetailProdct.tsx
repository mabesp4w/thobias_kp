import { useEffect, useState } from "react";
import { Input } from "../../../components/ui/input";
import showRupiah from "@/lib/rupiah";
import ProductsTypes from "@/types/Products";
import { BASE_URL } from "@/services/baseURL";
import ScrollRevealComponent from "../../../components/effects/ScrollRevealComponent";
import CartsTypes from "@/types/Carts";
import { Button } from "@/components/ui/button";
import addToCart from "@/lib/addToCart";

type Props = {
    product: ProductsTypes;
    cart?: CartsTypes;
};

const DetailProdct = ({ product, cart }: Props) => {
    const [value, setValue] = useState(cart?.quantity || 1);

    const increment = () => {
        setValue((prevValue) => prevValue + 1);
    };
    const decrement = () => {
        setValue((prevValue) => Math.max(prevValue - 1, 1));
    }; // Nilai tidak bisa kurang dari 1

    const img =
        product.product_image.length > 0 ? product.product_image[0] : null;
    const urlImg = img
        ? `${BASE_URL}/${img.product_img}`
        : "/images/no_image.png";

    useEffect(() => {
        addToCart({
            productId: product.id,
            costumQuantity: value,
            isLoggedIn: true,
        });

        return () => {};
    }, [value]);

    return (
        <ScrollRevealComponent offset={50} className="w-fit border-b">
            <div className="flex flex-col lg:flex-row gap-x-12">
                {/* image */}
                <div className="h-max-h-32">
                    <img
                        src={urlImg}
                        alt={product.product_nm}
                        className="w-80"
                    />
                </div>
                {/* product detail */}
                <div className="w-full grow flex flex-col gap-y-2">
                    {/* details */}
                    <div className="flex flex-col gap-y-4">
                        <h1 className="text-lg font-bold">
                            {product.product_nm}
                        </h1>
                        <h4 className="text-xl font-bold text-primary">
                            {showRupiah(product.price)}
                        </h4>
                    </div>
                    {/* jumlah */}
                    <div className="flex items-center space-x-2 w-48 border rounded-md">
                        {/* Tombol Kurang */}
                        <Button
                            onClick={decrement}
                            className="text-4xl text-gray-600 bg-transparent"
                        >
                            -
                        </Button>

                        {/* Input Angka */}
                        <Input
                            type="number"
                            value={value}
                            readOnly
                            onChange={(e) => setValue(Number(e.target.value))}
                            className="text-center border-none focus:border-none"
                        />

                        {/* Tombol Tambah */}
                        <Button
                            onClick={increment}
                            className="text-4xl text-gray-600 bg-transparent"
                        >
                            +
                        </Button>
                    </div>
                    {/* button */}
                    <div className="flex gap-x-4 items-center"></div>
                </div>
            </div>
        </ScrollRevealComponent>
    );
};

export default DetailProdct;

import showRupiah from "@/lib/rupiah";
import ProductsTypes from "@/types/Products";
import { BASE_URL } from "@/services/baseURL";
import ScrollRevealComponent from "../../../components/effects/ScrollRevealComponent";

type Props = {
    product: ProductsTypes;
};

const DetailsOrder = ({ product }: Props) => {
    const img =
        product.product_image.length > 0 ? product.product_image[0] : null;
    const urlImg = img
        ? `${BASE_URL}/${img.product_img}`
        : "/images/no_image.png";

    return (
        <ScrollRevealComponent offset={50} className="w-fit border-b">
            <div className="flex flex-col lg:flex-row gap-x-12">
                {/* image */}
                <div className="h-max-h-32">
                    <img
                        src={urlImg}
                        alt={product.product_nm}
                        className="w-40"
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
                    <div className="flex items-center space-x-2 w-48 border rounded-md"></div>
                </div>
            </div>
        </ScrollRevealComponent>
    );
};

export default DetailsOrder;

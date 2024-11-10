import BannersTypes from "@/types/Banners";
import { Head } from "@inertiajs/react";
import Banners from "./Banners";
import ProductsTypes from "@/types/Products";
import NewProducts from "./NewProducts";

interface Props {
    banners: BannersTypes[];
    newProduct: ProductsTypes[];
    bestSeller: ProductsTypes[];
}

export default function Welcome({ banners, newProduct, bestSeller }: Props) {
    return (
        <>
            <Head title="Home" />
            <main className="grow flex flex-col -mt-6 gap-y-16">
                <Banners banners={banners} />
                {/* best seller */}
                <div className="container relative">
                    <h3 className="text-center text-2xl font-bold uppercase mb-4">
                        Produk Terlaris
                    </h3>
                    <NewProducts newProduct={bestSeller} />
                </div>
                {/* new product */}
                <div className="container relative">
                    <h3 className="text-center text-2xl font-bold uppercase mb-4">
                        Produk Terbaru
                    </h3>
                    <NewProducts newProduct={newProduct} />
                </div>
            </main>
        </>
    );
}

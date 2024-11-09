import BannersTypes from "@/types/Banners";
import { Head } from "@inertiajs/react";
import Banners from "./Banners";
import ProductsTypes from "@/types/Products";
import NewProducts from "./NewProducts";

interface Props {
    banners: BannersTypes[];
    newProduct: ProductsTypes[];
}

export default function Welcome({ banners, newProduct }: Props) {
    return (
        <>
            <Head title="Home" />
            <main className="grow flex flex-col -mt-6 gap-y-16">
                <Banners banners={banners} />
                {/* best seller */}
                {/* new product */}
                <div className="relative container">
                    <h3 className="text-center text-2xl font-bold uppercase mb-4">
                        Produk Terbaru
                    </h3>
                    <NewProducts newProduct={newProduct} />
                </div>
            </main>
        </>
    );
}

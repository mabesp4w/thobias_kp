import BannersTypes from "@/types/Banners";
import { Head } from "@inertiajs/react";
import Banners from "./Banners";
import ProductsTypes from "@/types/Products";
import NewProducts from "./NewProducts";
import ScrollRevealComponent from "@/components/effects/ScrollRevealComponent";

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
                <ScrollRevealComponent
                    offset={200}
                    className="container relative"
                >
                    <h3 className="text-center text-2xl font-bold uppercase mb-4">
                        Produk Terlaris
                    </h3>
                    <NewProducts newProduct={bestSeller} />
                </ScrollRevealComponent>
                {/* section */}
                <section className="grid grid-cols-3 lg:gap-x-28 gap-x-2 container my-10">
                    {/* original */}
                    <ScrollRevealComponent
                        className="flex gap-x-2"
                        animations="slide-right"
                    >
                        <img src="/images/secure.svg" alt="" className="w-20" />
                        <div>
                            <h3 className="text-lg font-bold ">
                                Asli & 100% BPOM
                            </h3>
                            <p>
                                Belanja produk kecantikan pasti asli dan
                                bersertifikasi BPOM.
                            </p>
                        </div>
                    </ScrollRevealComponent>
                    {/* Beuty Everyday */}
                    <ScrollRevealComponent
                        className="flex gap-x-2"
                        animations="zoom-out-down"
                    >
                        <img src="/images/love.svg" alt="" className="w-20" />
                        <div>
                            <h3 className="text-lg font-bold ">
                                Cantik Tiap Hari
                            </h3>
                            <p>
                                Temukan ribuan produk kecantikan favorit kamu
                                dengan promo spesial setiap hari.
                            </p>
                        </div>
                    </ScrollRevealComponent>
                    {/* Trusted Review */}
                    <ScrollRevealComponent
                        className="flex gap-x-2"
                        animations="slide-left"
                    >
                        <img
                            src="/images/reading.svg"
                            alt=""
                            className="w-20"
                        />
                        <div>
                            <h3 className="text-lg font-bold ">
                                Review Terpercaya
                            </h3>
                            <p>
                                Baca ulasan terpercaya sebelum kamu berbelanja,
                                jangan ragu.
                            </p>
                        </div>
                    </ScrollRevealComponent>
                </section>
                {/* new product */}
                <ScrollRevealComponent
                    animations="zoom-out-down"
                    className="container relative"
                >
                    <h3 className="text-center text-2xl font-bold uppercase mb-4">
                        Produk Terbaru
                    </h3>
                    <NewProducts newProduct={newProduct} />
                </ScrollRevealComponent>
            </main>
        </>
    );
}

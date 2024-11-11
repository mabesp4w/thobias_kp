import ScrollRevealComponent from "@/components/effects/ScrollRevealComponent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import showRupiah from "@/lib/rupiah";
import { BASE_URL } from "@/services/baseURL";
import ProductsTypes from "@/types/Products";
import SubCategoriesTypes from "@/types/SubCategories";
import { Head, router } from "@inertiajs/react";
import { FC } from "react";

type Props = {
    products: {
        last_page: number;
        current_page: number;
        data: ProductsTypes[];
    };
    subCategory: SubCategoriesTypes;
};

const Index: FC<Props> = ({ products, subCategory }) => {
    console.log({ subCategory });
    console.log({ products });
    return (
        <>
            <Head
                title={`${subCategory.sub_category_nm} | ${subCategory.category.category_nm}`}
            />
            <div className="container mt-10">
                <ScrollRevealComponent
                    animations="fade-down"
                    delay={500}
                    duration={500}
                    className="text-primary"
                >
                    <h3 className="text-center text-lg font-bold">
                        {subCategory.category.category_nm}
                    </h3>
                    <h4 className="text-center text-xl font-bold">
                        {subCategory.sub_category_nm}
                    </h4>
                </ScrollRevealComponent>
                <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 my-6">
                    {products?.data &&
                        products?.data.map((product) => {
                            const { product_nm, price, product_image } =
                                product;
                            const imgSrc = product_image?.[0]?.product_img;
                            return (
                                <ScrollRevealComponent
                                    key={product.id}
                                    offset={100}
                                >
                                    <Card
                                        className="flex flex-col gap-y-4 border-none shadow-none cursor-pointer z-10"
                                        onClick={() => {
                                            router.visit(
                                                `/products/detail/${product.id}`
                                            );
                                        }}
                                    >
                                        <CardContent
                                            className="relative flex flex-col items-center justify-center group overflow-hidden"
                                            style={{
                                                height: "200px",
                                            }}
                                        >
                                            {/* Background image as pseudo-element */}
                                            <div
                                                className="absolute inset-0 transition-transform duration-700 ease-in-out scale-100 group-hover:scale-125 z-0 bg-cover bg-center"
                                                style={{
                                                    backgroundImage: `url(${
                                                        imgSrc
                                                            ? `${BASE_URL}/${imgSrc}`
                                                            : "/images/no_image.png"
                                                    })`,
                                                }}
                                            ></div>
                                            <Button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    console.log({ product });
                                                }}
                                                type="button"
                                                className="bg-pink-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50"
                                            >
                                                + Keranjang
                                            </Button>
                                        </CardContent>
                                        <CardFooter className="flex flex-col justify-start items-start p-0">
                                            <h3>{product_nm}</h3>
                                            <h4 className="text-sm font-bold text-primary">
                                                {showRupiah(price)}
                                            </h4>
                                        </CardFooter>
                                    </Card>
                                </ScrollRevealComponent>
                            );
                        })}
                    {products && products.data.length === 0 && (
                        <h3>Produk tidak ditemukan</h3>
                    )}
                </section>
            </div>
        </>
    );
};

export default Index;

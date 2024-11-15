import ProductsTypes from "@/types/Products";
import { FC, useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./style.css";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import useWindowWidth from "@/lib/windowWidth";
import { BASE_URL } from "@/services/baseURL";
import showRupiah from "@/lib/rupiah";
import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";
import addToCart from "@/lib/addToCart";
import axios from "axios";

interface Props {
    newProduct: ProductsTypes[];
}

const NewProducts: FC<Props> = ({ newProduct }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [perView, setPerView] = useState(4);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isChanged, setIsChanged] = useState(false);

    // cek statue
    const cek = async () => {
        const res = await axios.get("/status");
        setIsLoggedIn(res?.data?.user || false);
        console.log("cek");
    };

    useEffect(() => {
        cek();
    }, [isChanged]);

    useEffect(() => {
        // Event listener untuk perubahan session
        const handleProdukChange = () => setIsChanged(!isChanged);
        // Event listener custom untuk memantau perubahan pada wish
        window.addEventListener("productUpdated", handleProdukChange);

        // Cleanup saat komponen dibongkar
        return () => {
            window.removeEventListener("productUpdated", handleProdukChange);
        };
    }, []);

    const windowWidth = useWindowWidth();

    useEffect(() => {
        if (windowWidth > 1100) {
            return setPerView(5);
        }
        if (windowWidth > 1000) {
            return setPerView(4);
        }
        if (windowWidth > 700) {
            return setPerView(2);
        }
        if (windowWidth < 500) {
            return setPerView(1);
        }

        return () => {};
    }, [windowWidth]);

    const [sliderRef, instanceRef] = useKeenSlider(
        {
            loop: true,
            mode: "free-snap",
            slides: {
                perView,
                spacing: 5,
            },

            slideChanged(slider) {
                setCurrentSlide(slider.track.details.rel);
            },
            created() {
                setLoaded(true);
            },
        },
        [
            (slider) => {
                let timeout: string | number | NodeJS.Timeout | undefined;
                let mouseOver = false;
                function clearNextTimeout() {
                    clearTimeout(timeout);
                }
                function nextTimeout() {
                    clearTimeout(timeout);
                    if (mouseOver) return;
                    timeout = setTimeout(() => {
                        slider.next();
                    }, 5000);
                }
                slider.on("created", () => {
                    slider.container.addEventListener("mouseover", () => {
                        mouseOver = true;
                        clearNextTimeout();
                    });
                    slider.container.addEventListener("mouseout", () => {
                        mouseOver = false;
                        nextTimeout();
                    });
                    nextTimeout();
                });
                slider.on("dragStarted", clearNextTimeout);
                slider.on("animationEnded", nextTimeout);
                slider.on("updated", nextTimeout);
            },
        ]
    );

    return (
        <section className="slider-container">
            <div ref={sliderRef} className="h-fit flex overflow-hidden mx-5">
                {newProduct.map((product) => {
                    const { product_nm, price, sub_category, product_image } =
                        product;
                    const imgSrc = product_image?.[0]?.product_img;
                    return (
                        <Card
                            className="md:w-[300px] w-[200px] keen-slider__slide flex flex-col gap-y-4 border-none shadow-none cursor-pointer z-10"
                            key={product.id}
                            onClick={() => {
                                router.visit(`/products/detail/${product.id}`);
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
                                        addToCart(product.id, 1, isLoggedIn);
                                    }}
                                    type="button"
                                    className="bg-pink-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50"
                                >
                                    + Keranjang
                                </Button>
                            </CardContent>
                            <CardFooter className="flex flex-col justify-start items-start p-0">
                                <h3 className="text-sm font-bold">
                                    {sub_category.category.category_nm}-
                                    {sub_category.sub_category_nm}
                                </h3>
                                <h3>{product_nm}</h3>
                                <h4 className="text-sm font-bold text-primary">
                                    {showRupiah(price)}
                                </h4>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
            {loaded && instanceRef.current && (
                <>
                    <Arrow
                        left
                        onClick={(e: any) =>
                            e.stopPropagation() || instanceRef.current?.prev()
                        }
                        disabled={currentSlide === 0}
                    />

                    <Arrow
                        onClick={(e: any) =>
                            e.stopPropagation() || instanceRef.current?.next()
                        }
                        disabled={
                            currentSlide ===
                            instanceRef.current.track.details.slides.length - 1
                        }
                    />
                </>
            )}
        </section>
    );
};

function Arrow(props: any) {
    return (
        <>
            {props.left && (
                <div
                    onClick={props.onClick}
                    className="absolute select-none top-1/2 left-0 z-10 cursor-pointer border-2 rounded-full p-2 shadow-2xl"
                >
                    <BsChevronLeft className="text-xl" />
                </div>
            )}
            {!props.left && (
                <div
                    onClick={props.onClick}
                    className="absolute select-none top-1/2 right-0 z-10 cursor-pointer border-2 rounded-full p-2 shadow-2xl"
                >
                    <BsChevronRight className="text-xl" />
                </div>
            )}
        </>
    );
}

export default NewProducts;

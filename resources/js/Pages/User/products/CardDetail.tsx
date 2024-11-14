import { BASE_URL } from "@/services/baseURL";
import ProductsTypes from "@/types/Products";
import { FC, MutableRefObject, useState } from "react";
import {
    useKeenSlider,
    KeenSliderPlugin,
    KeenSliderInstance,
} from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./style.css";
import showRupiah from "@/lib/rupiah";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart } from "lucide-react";
import { BsHandbag } from "react-icons/bs";
import DOMPurify from "dompurify";
import addToWishlist from "@/lib/addToWishlits";
import addToCart from "@/lib/addToCart";

type Props = {
    product: ProductsTypes;
};
function ThumbnailPlugin(
    mainRef: MutableRefObject<KeenSliderInstance | null>
): KeenSliderPlugin {
    return (slider) => {
        function removeActive() {
            slider.slides.forEach((slide) => {
                slide.classList.remove("active");
            });
        }
        function addActive(idx: number) {
            slider.slides[idx].classList.add("active");
        }

        function addClickEvents() {
            slider.slides.forEach((slide, idx) => {
                slide.addEventListener("click", () => {
                    if (mainRef.current) mainRef.current.moveToIdx(idx);
                });
            });
        }

        slider.on("created", () => {
            if (!mainRef.current) return;
            addActive(slider.track.details.rel);
            addClickEvents();
            mainRef.current.on("animationStarted", (main: any) => {
                removeActive();
                const next = main.animator.targetIdx || 0;
                addActive(main.track.absToRel(next));
                slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
            });
        });
    };
}

const CardDetail: FC<Props> = ({ product }) => {
    const [value, setValue] = useState(1);

    const increment = () => setValue((prevValue) => prevValue + 1);
    const decrement = () => setValue((prevValue) => Math.max(prevValue - 1, 1)); // Nilai tidak bisa kurang dari 1

    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
        slides: product?.product_image ? product.product_image.length : 0,
    });
    const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
        {
            initial: 0,
            slides: {
                perView: 4,
                spacing: 5,
            },
            loop: true,
        },
        [ThumbnailPlugin(instanceRef)]
    );

    const cleanContent = DOMPurify.sanitize(product.description);
    return (
        <section className="">
            <div className="flex flex-col lg:flex-row gap-x-12">
                {/* image */}
                <div className="lg:min-w-[28rem] lg:max-w-[28rem] min-w-[100%]">
                    {/* show */}
                    <div ref={sliderRef} className="keen-slider w-[30rem]">
                        {product.product_image.length > 0 ? (
                            product.product_image.map((image) => {
                                const imgSrc = image?.product_img;
                                return (
                                    <img
                                        key={image.id}
                                        src={`${BASE_URL}/${imgSrc}`}
                                        alt=""
                                        className="keen-slider__slide"
                                    />
                                );
                            })
                        ) : (
                            <img
                                src="/images/no_image.png"
                                alt=""
                                className="keen-slider__slide"
                            />
                        )}
                    </div>
                    {/* thumbnail */}
                    <div ref={thumbnailRef} className="keen-slider thumbnail">
                        {product.product_image.length > 0 ? (
                            product.product_image.map((image) => {
                                const imgSrc = image?.product_img;
                                return (
                                    <img
                                        key={image.id}
                                        src={
                                            imgSrc
                                                ? `${BASE_URL}/${imgSrc}`
                                                : "/images/no_image.png"
                                        }
                                        alt=""
                                        className="keen-slider__slide"
                                    />
                                );
                            })
                        ) : (
                            <img
                                src="/images/no_image.png"
                                alt=""
                                className="keen-slider__slide"
                            />
                        )}
                    </div>
                </div>
                {/* product detail */}
                <div className="w-full grow flex flex-col gap-y-6">
                    {/* details */}
                    <div className="flex flex-col gap-y-4">
                        <h1 className="text-2xl font-bold">
                            {product.product_nm}
                        </h1>
                        <h4 className="text-xl font-bold text-primary">
                            {showRupiah(product.price)}
                        </h4>
                    </div>
                    <div className="flex gap-x-2">
                        {/* peniliaian */}
                        {/* <RatingStars rating={3.5} /> */}
                        <p>Belum ada penilaian</p>
                        {/* terjual */}
                        <p>
                            | <span>0</span> Terjual
                        </p>
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
                    <div className="flex gap-x-4 items-center">
                        {/* whislist */}
                        <Heart
                            onClick={() => {
                                addToWishlist(product.id);
                            }}
                            className="text-primary cursor-pointer"
                        />
                        {/* add to cart */}
                        <Button
                            onClick={() => {
                                addToCart(product.id, value);
                            }}
                            className="text-primary bg-transparent"
                            type="button"
                        >
                            <BsHandbag /> Tambah ke keranjang
                        </Button>
                        {/* buy now */}
                        <Button onClick={() => {}} type="button">
                            Beli sekarang
                        </Button>
                    </div>

                    {/* deskripsi */}
                    <div className="mt-12">
                        <h1 className="text-2xl font-bold">Deskripsi Produk</h1>
                        <div
                            className="prose"
                            dangerouslySetInnerHTML={{ __html: cleanContent }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CardDetail;

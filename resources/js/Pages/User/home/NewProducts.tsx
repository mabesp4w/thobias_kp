import ProductsTypes from "@/types/Products";
import { FC, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

interface Props {
    newProduct: ProductsTypes[];
}

const NewProducts: FC<Props> = ({ newProduct }) => {
    if (!newProduct.length) return null;
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [sliderRef, instanceRef] = useKeenSlider(
        {
            loop: true,
            mode: "free-snap",
            slides: {
                perView: 4,
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
        <section>
            <div ref={sliderRef} className="h-fit flex overflow-hidden mx-5">
                {newProduct.map((product) => (
                    <Card
                        className="w-[350px] keen-slider__slide"
                        key={product.id}
                    >
                        <CardHeader>
                            <CardTitle>Create project</CardTitle>
                            <CardDescription>
                                Deploy your new project in one-click.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form>
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            placeholder="Name of your project"
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="framework">
                                            Framework
                                        </Label>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline">Cancel</Button>
                            <Button>Deploy</Button>
                        </CardFooter>
                    </Card>
                ))}
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
                    className="absolute top-1/2 left-0 z-10 cursor-pointer border-2 rounded-full p-2 shadow-2xl"
                >
                    <BsChevronLeft className="text-xl" />
                </div>
            )}
            {!props.left && (
                <div
                    onClick={props.onClick}
                    className="absolute top-1/2 right-0 z-10 cursor-pointer border-2 rounded-full p-2 shadow-2xl"
                >
                    <BsChevronRight className="text-xl" />
                </div>
            )}
        </>
    );
}

export default NewProducts;

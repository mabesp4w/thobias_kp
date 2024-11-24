import { useKeenSlider } from "keen-slider/react";
import BannersTypes from "@/types/Banners";
import { FC, useState } from "react";
import "keen-slider/keen-slider.min.css";
import "./style.css";

type Props = {
    banners: BannersTypes[];
};

const Banners: FC<Props> = ({ banners }) => {
    const [opacities, setOpacities] = useState<any>([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loaded, setLoaded] = useState(false);

    if (!banners.length) return null;

    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
        {
            slides: banners.length,
            initial: 0,
            slideChanged(slider) {
                setCurrentSlide(slider.track.details.rel);
            },
            created() {
                setLoaded(true);
            },
            loop: true,
            detailsChanged(s) {
                const new_opacities = s.track.details.slides.map(
                    (slide) => slide.portion
                );
                setOpacities(new_opacities);
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
            <div ref={sliderRef} className="fader h-[30rem] w-full">
                {banners.map((src, idx) => (
                    <div
                        key={idx}
                        className="fader__slide"
                        style={{ opacity: opacities[idx] }}
                    >
                        <img src={src.banner_img} />
                    </div>
                ))}

                {loaded && instanceRef.current && (
                    <>
                        <Arrow
                            left
                            onClick={(e: any) =>
                                e.stopPropagation() ||
                                instanceRef.current?.prev()
                            }
                            disabled={currentSlide === 0}
                        />

                        <Arrow
                            onClick={(e: any) =>
                                e.stopPropagation() ||
                                instanceRef.current?.next()
                            }
                            disabled={
                                currentSlide ===
                                instanceRef.current.track.details.slides
                                    .length -
                                    1
                            }
                        />
                    </>
                )}
            </div>
            {loaded && instanceRef.current && (
                <div className="dots">
                    {[
                        ...Array(
                            instanceRef.current.track.details.slides.length
                        ).keys(),
                    ].map((idx) => {
                        return (
                            <button
                                key={idx}
                                onClick={() => {
                                    instanceRef.current?.moveToIdx(idx);
                                }}
                                className={
                                    "dot" +
                                    (currentSlide === idx ? " active" : "")
                                }
                            ></button>
                        );
                    })}
                </div>
            )}
        </section>
    );
};

function Arrow(props: any) {
    return (
        <svg
            onClick={props.onClick}
            className={`arrow ${props.left ? "arrow--left" : "arrow--right"}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            {props.left && (
                <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
            )}
            {!props.left && (
                <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
            )}
        </svg>
    );
}

export default Banners;

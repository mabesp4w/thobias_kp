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

    const [sliderRef] = useKeenSlider<HTMLDivElement>(
        {
            slides: banners.length,
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
        <div ref={sliderRef} className="fader">
            {banners.map((src, idx) => (
                <div
                    key={idx}
                    className="fader__slide"
                    style={{ opacity: opacities[idx] }}
                >
                    <img src={src.banner_img} />
                </div>
            ))}
        </div>
    );
};

export default Banners;

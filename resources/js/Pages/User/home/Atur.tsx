import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./style.css";

const Atur = () => {
    const [ref] = useKeenSlider({
        slides: { perView: 1, spacing: 5 },
        breakpoints: {
            "(min-width: 400px)": {
                slides: { perView: 2, spacing: 10 },
            },
            "(min-width: 1000px)": {
                slides: { perView: 3, spacing: 15 },
            },
        },
        loop: true,
    });

    return (
        <div className="slider-container">
            <div ref={ref} className="keen-slider">
                <div className="keen-slider__slide number-slide1">1</div>
                <div className="keen-slider__slide number-slide2">2</div>
                <div className="keen-slider__slide number-slide3">3</div>
                <div className="keen-slider__slide number-slide4">4</div>
                <div className="keen-slider__slide number-slide5">5</div>
                <div className="keen-slider__slide number-slide6">6</div>
            </div>
        </div>
    );
};

export default Atur;

/** @format */
import React, { FC, useEffect, useRef, useState } from "react";
import ScrollReveal from "scrollreveal";
import LoadingSpiner from "../loading/LoadingSpiner";

interface Props {
    children: React.ReactNode;
    duration?: number;
    distance?: string;
    easing?: "ease-in-out" | "ease-in" | "ease-out" | "linear" | "cubic-bezier";
    origin?: "top" | "bottom" | "left" | "right";
    reset?: boolean;
    className?: string;
    selectorClass: string;
    viewFactor?: number;
    viewOffset?: { left: number; top: number };
    delay?: number;
    interval?: number;
    scale?: number;
    rotate?: { x: number; y: number; z: number };
}

const ScrollRevealComponent: FC<Props> = ({
    children,
    easing,
    origin,
    duration = 1000,
    distance = "100%",
    reset = false,
    className,
    selectorClass,
    viewFactor = 0.5,
    viewOffset = { left: 0, top: 0 },
    delay = 0,
    interval = 0,
    scale = 1,
    rotate = { x: 0, y: 0, z: 0 },
}) => {
    const [isRefreshing, setIsRefreshing] = useState(true);
    // ref
    const myRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (myRef.current) {
            setTimeout(() => {
                // Menyembunyikan loading setelah render pertama
                setIsRefreshing(false);
            }, 100);
        }
    }, []);

    useEffect(() => {
        if (!isRefreshing) {
            // Pastikan ScrollReveal hanya berjalan jika halaman tidak dalam status loading
            ScrollReveal().reveal(`.${selectorClass}`, {
                duration: duration,
                distance: distance,
                easing: easing || "ease-in-out",
                origin: origin || "bottom",
                reset: reset,
                viewFactor: viewFactor,
                viewOffset: viewOffset,
                delay: delay,
                interval: interval,
                scale: scale,
                rotate: rotate,
            });
        }
    }, [
        delay,
        distance,
        duration,
        easing,
        interval,
        isRefreshing, // Tambahkan dependensi ini
        origin,
        reset,
        rotate,
        scale,
        selectorClass,
        viewFactor,
        viewOffset,
    ]);

    return (
        <div ref={myRef} className={`${selectorClass} ${className}`}>
            {isRefreshing ? <LoadingSpiner /> : children}
        </div>
    );
};

export default ScrollRevealComponent;

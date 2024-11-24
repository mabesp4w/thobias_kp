import { useState, useEffect } from "react";

const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        // Tambahkan event listener untuk resize
        window.addEventListener("resize", handleResize);

        // Hapus event listener ketika komponen di-unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return windowWidth;
};

export default useWindowWidth;

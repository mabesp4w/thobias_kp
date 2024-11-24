import { useEffect, useState } from "react";
import NavbarComp from "../navbar/NavbarComp";
import { motion } from "framer-motion";

type Props = {};

const HeaderFixed = (props: Props) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 150) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <motion.section
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 z-50 bg-primary left-0 right-0 h-14 hidden md:flex justify-between items-center"
        >
            <NavbarComp isVisible={isVisible} />
        </motion.section>
    );
};

export default HeaderFixed;

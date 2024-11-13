import { FC } from "react";
import { motion } from "framer-motion";
type Props = {
    isThrown: boolean;
};

const ThrowEffect: FC<Props> = ({ isThrown }) => {
    console.log({ isThrown });
    return (
        <>
            {isThrown && (
                <motion.div
                    initial={{ opacity: 0, x: 0, y: 0 }}
                    animate={{ opacity: 1, x: "100vw", y: "-100vh" }} // Menuju kanan atas
                    transition={{ duration: 5, ease: "easeOut" }}
                    style={{
                        width: 50,
                        height: 50,
                        backgroundColor: "red",
                        borderRadius: "50%",
                        position: "absolute",
                    }}
                />
            )}
        </>
    );
};

export default ThrowEffect;

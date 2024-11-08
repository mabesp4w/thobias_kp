/** @format */

import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";
import { setUsersMenus } from "./ListMenu";
import MenuTypes from "@/types/MenuTypes";
const Mobile: FC = () => {
    const [ListMenu, setListMenu] = useState<MenuTypes[]>();
    const getMenuDynamic = async () => {
        const res = await setUsersMenus();
        setListMenu(res);
    };

    useEffect(() => {
        getMenuDynamic();
    }, []);
    // Define animation variants
    const variants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };

    const pathname = window.location.pathname;

    // state
    return (
        <div className="h-full px-3 py-4 overflow-y-auto bg-menu-active">
            <ul className="space-y-2 font-medium">
                {ListMenu &&
                    ListMenu.map((item, index) => {
                        const isActive = pathname === item.href;
                        return (
                            <motion.li
                                key={index}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={{
                                    delay: index * 0.1,
                                    exit: { delay: index * 0.1 },
                                }}
                                variants={variants}
                            >
                                <Link
                                    href={item.href || "#"}
                                    className={`${
                                        isActive && "text-primary font-bold"
                                    } block py-1 text-color-2 rounded-full hover:text-primary hover:font-bold transition-colors duration-300`}
                                >
                                    <span>{item.name}</span>
                                </Link>
                            </motion.li>
                        );
                    })}
            </ul>
        </div>
    );
};

export default Mobile;

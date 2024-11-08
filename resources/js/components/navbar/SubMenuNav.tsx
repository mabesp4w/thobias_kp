/** @format */

import MenuTypes from "@/types/MenuTypes";
import { Link } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
import { FC, useState } from "react";
import { BsArrowDownShort, BsArrowRightShort } from "react-icons/bs";

type Props = {
    subMenus: MenuTypes[];
    addClass?: string;
};

const SubMenu: FC<Props> = ({ subMenus, addClass }) => {
    const pathname = window.location.pathname;

    const [hoverIndex, setHoverIndex] = useState<null | number>(null);

    const variants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };

    return (
        <motion.ul
            className={`absolute top-4 pt-7 flex flex-col bg-transparent shadow-lg rounded-lg z-50 uppercase min-w-full ${
                addClass ? addClass : ""
            }`}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
        >
            {subMenus.map((item, index) => {
                const isActive = pathname === item.href;
                const isHovered = hoverIndex === index;

                return (
                    <motion.li
                        key={index}
                        onMouseEnter={() => setHoverIndex(index)}
                        onMouseLeave={() => setHoverIndex(null)}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={variants}
                        transition={{ delay: index * 0.1 }}
                        className={`relative text-nowrap bg-white`}
                    >
                        <Link
                            href={item.href || "#"}
                            className={`flex items-center ${
                                isActive ? "text-primary font-bold" : ""
                            } block py-2 px-4 text-accent hover:text-primary hover:font-bold transition-colors duration-300 whitespace-nowrap text-[13px]`}
                        >
                            <span>{item.name}</span>
                            {item.subMenus && (
                                <span className="ml-2">
                                    {isHovered ? (
                                        <BsArrowDownShort />
                                    ) : (
                                        <BsArrowRightShort />
                                    )}
                                </span>
                            )}
                        </Link>
                        {item.subMenus && (
                            <AnimatePresence>
                                {isHovered && (
                                    <SubMenu
                                        subMenus={item.subMenus}
                                        addClass="left-full top-0"
                                    />
                                )}
                            </AnimatePresence>
                        )}
                    </motion.li>
                );
            })}
        </motion.ul>
    );
};

export default SubMenu;

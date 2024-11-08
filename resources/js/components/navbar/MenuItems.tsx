/** @format */

import { FC } from "react";
import { BsArrowDownShort, BsArrowRightShort } from "react-icons/bs";
import { AnimatePresence } from "framer-motion";
import MenuTypes from "@/types/MenuTypes";
import { Link } from "@inertiajs/react";
import SubMenu from "./SubMenuNav";

interface MenuItemProps {
    item: MenuTypes;
    index: number;
    hoverIndex: number | null;
    setHoverIndex: (index: number | null) => void;
    pathname: string;
    addClass?: string;
}

const MenuItem: FC<MenuItemProps> = ({
    item,
    index,
    hoverIndex,
    setHoverIndex,
    pathname,
    addClass,
}) => {
    // Cek apakah path saat ini ada di item atau submenu
    const isMenuActive = (item: MenuTypes): boolean => {
        if (pathname === item.href) return true;
        if (item.subMenus) {
            return item.subMenus.some((subItem) => pathname === subItem.href);
        }
        return false;
    };

    const isActive = isMenuActive(item);
    const isHovered = hoverIndex === index;

    return (
        <li
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
            className={`relative flex ${addClass}`}
        >
            <Link
                href={item.href || "#"}
                className={`${
                    isActive ? "text-primary font-bold" : ""
                } flex items-center py-1 text-muted`}
            >
                <span>{item.name}</span>
                {item.subMenus && (
                    <span className="ml-1">
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
                    {isHovered && <SubMenu subMenus={item.subMenus} />}
                </AnimatePresence>
            )}
        </li>
    );
};

export default MenuItem;

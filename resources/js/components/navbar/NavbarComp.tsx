import { FC, useEffect, useState } from "react";
import { setUsersMenus } from "./ListMenu";
import MenuTypes from "@/types/MenuTypes";
import MenuItem from "./MenuItems";
import { BsTelephoneInbound } from "react-icons/bs";
import Akun from "../shop/Akun";
import Wishlist from "../shop/Wishlist";
import Cart from "../shop/Cart";

type Props = {
    isVisible?: boolean;
};

const NavbarComp: FC<Props> = ({ isVisible }) => {
    const [menus, setMenus] = useState<MenuTypes[]>([]);
    const [hoverIndex, setHoverIndex] = useState<null | number>(null);
    const pathname = window.location.pathname;
    const getMenuDynamic = async () => {
        const res = await setUsersMenus();
        setMenus(res);
    };

    useEffect(() => {
        getMenuDynamic();
    }, []);

    return (
        <div className="relative uppercase text-white h-full w-full flex justify-between items-center container">
            <ul className="flex gap-x-4 whitespace-nowrapitems-center h-full">
                {menus.map((item, index) => (
                    <MenuItem
                        key={index}
                        item={item}
                        index={index}
                        hoverIndex={hoverIndex}
                        setHoverIndex={setHoverIndex}
                        pathname={pathname}
                        addClass={
                            index === 0
                                ? "justify-self-start"
                                : index === menus.length - 1
                                ? "justify-self-end"
                                : "justify-self-center"
                        }
                    />
                ))}
            </ul>
            {!isVisible && (
                <div className="flex items-center gap-x-2">
                    <BsTelephoneInbound className="text-2xl text-secondary" />
                    <span>0812-3456-789</span>
                </div>
            )}
            {isVisible && (
                <div className="flex items-center gap-6">
                    <Akun />
                    <Wishlist />
                    <Cart />
                </div>
            )}
        </div>
    );
};

export default NavbarComp;

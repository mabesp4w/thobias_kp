import { FC, useCallback, useEffect, useState } from "react";
import BtnDefault from "../button/BtnDefault";
import MenuTypes from "@/types/MenuTypes";
import SubMenu from "./SubMenu";
import LoadingSpiner from "../loading/LoadingSpiner";
import { setAdminMenus } from "./ListMenu";
import useLogout from "@/store/auth/logout";
import { Link } from "@inertiajs/react";
import handleLogout from "@/Pages/Auth/logout/logout";
type Props = {
    type?: string;
};

const Sidebar: FC<Props> = ({ type = "admin" }) => {
    const [menus, setMenus] = useState<MenuTypes[]>([]);
    const [openMenus, setOpenMenus] = useState<string[]>([]);
    const [loadLogout, setLoadLogout] = useState(false);
    // store
    const { setLogout } = useLogout();
    // pathname
    const { pathname } = window.location;

    const getMenuDynamic = useCallback(async () => {
        let res: MenuTypes[] = [];
        if (type === "admin") {
            res = await setAdminMenus();
        }
        setMenus(res);
    }, [type]);

    useEffect(() => {
        getMenuDynamic();
    }, [getMenuDynamic]);

    // submenu
    const findOpenMenus = (menuList: MenuTypes[]) => {
        for (const menu of menuList) {
            // console.log({ slug, menu });
            if (menu?.href === pathname) {
                const second = pathname?.split("/");
                // if second.length > 0 remove index 0
                second.splice(0, 1);
                setOpenMenus(second);
            }
            // console.log({ menu });
            if (menu.subMenus) {
                // console.log({ menu });
                findOpenMenus(menu.subMenus);
            }
        }
    };

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        menus && findOpenMenus(menus);
        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [menus, pathname]);

    return (
        <>
            <aside
                className={`z-40 w-full h-screen transition-transform -translate-x-full sm:translate-x-0`}
                aria-label="Sidebar"
            >
                <div className="sidebar z-50 h-full px-3 pt-4 overflow-y-auto text-third flex flex-row-reverse justify-between sm:block">
                    <div className="flex flex-col gap-4 h-full sidebar w-full overflow-hidden">
                        <div className="h-40 sidebar">
                            <h1 className="font-Redkits text-5xl text-center text-primary">
                                Erta Beauty
                            </h1>
                        </div>
                        <ul className="space-y-2 grow w-full h-full overflow-auto scrollbar list-none p-0">
                            {menus &&
                                menus.map((menu, index) => {
                                    const isActive = pathname === menu.href;
                                    const subMenus = menu?.subMenus;
                                    const { name, icon, slug } = menu;
                                    const truncatedName =
                                        name.length > 10
                                            ? name.slice(0, 10) + "..."
                                            : name;

                                    return subMenus ? (
                                        SubMenu({
                                            subMenus,
                                            name,
                                            truncatedName,
                                            icon,
                                            slug,
                                            index,
                                            pathname,
                                            openMenus,
                                        })
                                    ) : (
                                        <li
                                            key={index}
                                            className="relative select-none"
                                        >
                                            <Link
                                                href={menu.href || "#"}
                                                className={`flex w-full items-start p-2 text-color-2 hover:font-normal transition-all duration-300 rounded-lg group ${
                                                    isActive &&
                                                    "text-secondary font-bold"
                                                }`}
                                                title={name}
                                            >
                                                {icon}
                                                <span className="ms-3">
                                                    {truncatedName}
                                                </span>
                                            </Link>
                                            {isActive && (
                                                <hr className="absolute left-10 right-0 top-8 border-secondary " />
                                            )}
                                        </li>
                                    );
                                })}
                        </ul>
                        {loadLogout ? (
                            <LoadingSpiner />
                        ) : (
                            <div className="flex justify-center">
                                <BtnDefault
                                    addClass="bg-secondary text-fourth"
                                    onClick={() =>
                                        handleLogout({
                                            setLogout,
                                            setLoadLogout,
                                        })
                                    }
                                >
                                    Logout
                                </BtnDefault>
                            </div>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;

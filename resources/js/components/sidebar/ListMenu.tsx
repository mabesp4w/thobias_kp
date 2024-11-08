/** @format */
import MenuTypes from "@/types/MenuTypes";
import { ImageIcon } from "@radix-ui/react-icons";

import { BsHouseDoor, BsPerson } from "react-icons/bs";

const createUrl = (path: string) => `/admin${path}`;

const setAdminMenus = async () => {
    const ListMenu: MenuTypes[] = [
        {
            name: "Home",
            href: createUrl(""),
            icon: <BsHouseDoor />,
        },
        {
            name: "Banner",
            href: createUrl("/banners"),
            icon: <ImageIcon />,
        },
        {
            name: "Kategori",
            slug: "categories",
            icon: <BsPerson />,
            subMenus: [
                {
                    name: "Foto",
                    href: createUrl("/categories/lists"),
                },
                {
                    name: "Vidio",
                    href: createUrl("/categories/subcategories"),
                },
            ],
        },
    ];

    return ListMenu;
};

export { setAdminMenus };

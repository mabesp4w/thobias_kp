/** @format */
import { BASE_URL } from "@/services/baseURL";
import MenuTypes from "@/types/MenuTypes";
import axios from "axios";

import { BsActivity, BsHouseDoor, BsPerson } from "react-icons/bs";

const createUrl = (path: string) => `/${path}`;

const setUsersMenus = async () => {
    // fetch categories from api axios
    const res = await axios.get(`${BASE_URL}/api/categories`);
    const categories = await res.data.data;

    const ListMenu: MenuTypes[] = [
        {
            name: "Home",
            href: createUrl(""),
            icon: <BsHouseDoor />,
        },
        {
            name: "Wome Collection",
            href: createUrl("products"),
            icon: <BsActivity />,
        },
        {
            name: "Shop",
            slug: "shop",
            icon: <BsPerson />,
            subMenus: [
                {
                    name: "Product",
                    href: createUrl("/shop/photos"),
                },
                {
                    name: "Cart",
                    href: createUrl("/shop/videos"),
                },
            ],
        },

        {
            name: "Galeri",
            slug: "galleries",
            icon: <BsPerson />,
            subMenus: [
                {
                    name: "Foto",
                    href: createUrl("/galleries/photos"),
                },
                {
                    name: "Vidio",
                    href: createUrl("/galleries/videos"),
                },
            ],
        },
    ];

    return ListMenu;
};

export { setUsersMenus };

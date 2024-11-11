/** @format */
import { BASE_URL } from "@/services/baseURL";
import CategoriesTypes from "@/types/Categories";
import MenuTypes from "@/types/MenuTypes";
import SubCategoriesTypes from "@/types/SubCategories";
import axios from "axios";

import { BsHouseDoor, BsPerson } from "react-icons/bs";

const createUrl = (path: string) => `/${path}`;

const setUsersMenus = async () => {
    // fetch categories from api axios
    const res = await axios.get(`${BASE_URL}/api/categories/all`);
    const categories = await res.data.data;

    console.log({ categories });

    const ListMenu: MenuTypes[] = [
        {
            name: "Home",
            href: createUrl(""),
            icon: <BsHouseDoor />,
        },
    ];

    categories.forEach((category: CategoriesTypes) => {
        const subCategory = category?.sub_category;
        if (subCategory) {
            ListMenu.push({
                name: category.category_nm,
                slug: category.slug,
                icon: <BsPerson />,
                subMenus: subCategory.map((sub: SubCategoriesTypes) => {
                    return {
                        name: sub.sub_category_nm,
                        href: createUrl(`${category.slug}/${sub.slug}`),
                    };
                }),
            });
        } else {
            ListMenu.push({
                name: category.category_nm,
                href: createUrl(`/categories/${category.slug}`),
            });
        }
    });

    return ListMenu;
};

export { setUsersMenus };

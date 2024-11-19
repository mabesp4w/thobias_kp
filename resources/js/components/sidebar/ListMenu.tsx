/** @format */
import MenuTypes from "@/types/MenuTypes";
import { ImageIcon } from "@radix-ui/react-icons";

import { BsBagHeart, BsHouseDoor, BsMarkerTip, BsPerson } from "react-icons/bs";

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
            name: "Lokasi",
            slug: "locations",
            icon: <BsMarkerTip />,
            subMenus: [
                {
                    name: "Kecamatan/Distrik",
                    href: createUrl("/locations/subDistricts"),
                },
                {
                    name: "Kelurahan",
                    href: createUrl("/locations/villages"),
                },
                {
                    name: "Ongkir",
                    href: createUrl("/locations/shippingCosts"),
                },
            ],
        },
        {
            name: "Kategori",
            slug: "categories",
            icon: <BsPerson />,
            subMenus: [
                {
                    name: "Daftar Kategori",
                    href: createUrl("/categories/lists"),
                },
                {
                    name: "Sub Kategori",
                    href: createUrl("/categories/subCategories"),
                },
            ],
        },
        {
            name: "Produk",
            href: createUrl("/products/lists"),
            icon: <ImageIcon />,
        },
        {
            name: "Pesanan",
            href: createUrl("/orders"),
            icon: <BsBagHeart />,
        },
    ];

    return ListMenu;
};

export { setAdminMenus };

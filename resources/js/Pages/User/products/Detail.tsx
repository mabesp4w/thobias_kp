import ProductsTypes from "@/types/Products";
import CardDetail from "./CardDetail";
import BreadcrumbCustom from "@/components/others/BreadcrumbCostume";

type Props = {
    product: ProductsTypes;
};

const Detail = (props: Props) => {
    const breadcrumbData = [
        { label: "Home", href: "/" },
        {
            label: props.product.sub_category.category.category_nm,
        },
        {
            label: props.product.sub_category.sub_category_nm,
            href: `/products/${props.product.sub_category.category.slug}/${props.product.sub_category.id}`,
        },
        {
            label: props.product.product_nm,
            href: `/products/detail/${props.product.id}`,
        }, // Ini adalah halaman saat ini
    ];
    return (
        <section className="container mt-10 flex flex-col gap-y-10">
            <BreadcrumbCustom items={breadcrumbData} />
            <CardDetail product={props.product} />
        </section>
    );
};

export default Detail;

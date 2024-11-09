import SubCategoriesTypes from "./SubCategories";

// Products
export default interface ProductsTypes {
    id: string;
    sub_category_id: string;
    product_nm: string;
    slug: string;
    price: number;
    stock: number;
    sub_category: SubCategoriesTypes;
}

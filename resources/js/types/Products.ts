import SubCategoriesTypes from "./SubCategories";

// Products
export default interface ProductsTypes {
    id: string;
    sub_category_id: number;
    product_nm: string;
    slug: string;
    price: string;
    stock: number;
    sub_categories: SubCategoriesTypes;
}

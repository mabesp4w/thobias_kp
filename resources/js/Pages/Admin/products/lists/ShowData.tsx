import { FC, useCallback, useEffect, useState } from "react";
import _ from "lodash";
import { DataTable } from "@/components/table/TableDefault";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import { generateColumns } from "@/lib/generateColumns";
import transformDataWithFilters from "@/lib/transformDataWithFilters";
import { columnsConfig, updateAccessorKeys } from "./columnsConfig";
import useProducts from "@/store/crud/Products";
import ProductsTypes from "@/types/Products";

// subjects
type DeleteProps = {
    id?: number | string;
    isDelete: boolean;
};
type Props = {
    setDelete: ({ id, isDelete }: DeleteProps) => void;
    setEdit: (row: any) => void;
};

// products
const ShowData: FC<Props> = ({ setDelete, setEdit }) => {
    // store
    const { setProducts, dtProducts } = useProducts();
    // state
    const [limit, setLimit] = useState<number>(10);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    // params
    const params = new URLSearchParams(window.location.search);
    const search = params.get("cari") || "";
    const sortby = params.get("sortby") || "";
    const order = params.get("order") || "";
    // Define the debounced function outside of `useCallback`
    const debouncedFetchProducts = _.debounce((fetchProducts) => {
        fetchProducts();
    }, 500); // 500ms delay

    const fetchProducts = useCallback(async () => {
        setLimit(10);
        await setProducts({
            limit,
            search,
            sortby,
            order,
        });
        setIsLoading(false);
    }, [setProducts, limit, search, sortby, order]);

    useEffect(() => {
        debouncedFetchProducts(fetchProducts);

        // Cleanup debounce
        return () => {
            debouncedFetchProducts.cancel();
        };
    }, [search, sortby, order, limit]);

    // Panggil fungsi dengan data dan filter yang diinginkan
    const nestedFilters = [
        "row.original.sub_category.category.category_nm",
        "sub_category.sub_category_nm",
        "product_nm",
        "product_price",
        "product_stock",
    ];
    const transformedData = transformDataWithFilters(
        dtProducts.data,
        nestedFilters
    );
    // Buat konfigurasi kolom dengan accessorKey yang diperbarui
    const updatedColumnsConfig = updateAccessorKeys(
        columnsConfig,
        nestedFilters
    );

    return (
        <div className="flex-1 flex-col max-w-full h-full overflow-auto">
            {!isLoading ? (
                <DataTable
                    data={transformedData}
                    columns={generateColumns<ProductsTypes>(
                        updatedColumnsConfig,
                        setEdit,
                        (rowId) => setDelete({ id: rowId, isDelete: false })
                    )}
                    filters={nestedFilters.map(
                        (key) => `${key.split(".").join("_")}_filter`
                    )}
                />
            ) : (
                <div className="flex justify-center items-center h-full">
                    <LoadingSpiner />
                </div>
            )}
        </div>
    );
};

export default ShowData;

import { FC, useCallback, useEffect, useState } from "react";
import _ from "lodash";
import useShippingCosts from "@/store/crud/ShippingCosts";
import { DataTable } from "@/components/table/TableDefault";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import { generateColumns } from "@/lib/generateColumns";
import transformDataWithFilters from "@/lib/transformDataWithFilters";
import { columnsConfig, updateAccessorKeys } from "./columnsConfig";

// subjects
type DeleteProps = {
    id?: number | string;
    isDelete: boolean;
};
type Props = {
    setDelete: ({ id, isDelete }: DeleteProps) => void;
    setEdit: (row: any) => void;
};

// shippingCosts
const ShowData: FC<Props> = ({ setDelete, setEdit }) => {
    // store
    const { setShippingCosts, dtShippingCosts } = useShippingCosts();
    // state
    const [limit, setLimit] = useState<number>(10);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    // params
    const params = new URLSearchParams(window.location.search);
    const search = params.get("cari") || "";
    const sortby = params.get("sortby") || "";
    const order = params.get("order") || "";
    // Define the debounced function outside of `useCallback`
    const debouncedFetchShippingCosts = _.debounce((fetchShippingCosts) => {
        fetchShippingCosts();
    }, 500); // 500ms delay

    const fetchShippingCosts = useCallback(async () => {
        setLimit(10);
        await setShippingCosts({
            limit,
            search,
            sortby,
            order,
        });
        setIsLoading(false);
    }, [setShippingCosts, limit, search, sortby, order]);

    useEffect(() => {
        debouncedFetchShippingCosts(fetchShippingCosts);

        // Cleanup debounce
        return () => {
            debouncedFetchShippingCosts.cancel();
        };
    }, [search, sortby, order, limit]);

    // Panggil fungsi dengan data dan filter yang diinginkan
    const nestedFilters = [
        "village.sub_district.sub_district_nm",
        "village.village_nm",
    ];
    const transformedData = transformDataWithFilters(
        dtShippingCosts.data,
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
                    columns={generateColumns(
                        updatedColumnsConfig as any,
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

import { FC, useCallback, useEffect, useState } from "react";
import _ from "lodash";
import { DataTable } from "@/components/table/TableDefault";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import { generateColumns } from "@/lib/generateColumns";
import transformDataWithFilters from "@/lib/transformDataWithFilters";
import { columnsConfig, updateAccessorKeys } from "./columnsConfig";
import useSubCategories from "@/store/crud/SubCategories";

// subjects
type DeleteProps = {
    id?: number | string;
    isDelete: boolean;
};
type Props = {
    setDelete: ({ id, isDelete }: DeleteProps) => void;
    setEdit: (row: any) => void;
};

// subCategories
const ShowData: FC<Props> = ({ setDelete, setEdit }) => {
    // store
    const { setSubCategories, dtSubCategories } = useSubCategories();
    // state
    const [limit, setLimit] = useState<number>(10);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    // params
    const params = new URLSearchParams(window.location.search);
    const search = params.get("cari") || "";
    const sortby = params.get("sortby") || "";
    const order = params.get("order") || "";
    // Define the debounced function outside of `useCallback`
    const debouncedFetchSubCategories = _.debounce((fetchSubCategories) => {
        fetchSubCategories();
    }, 500); // 500ms delay

    const fetchSubCategories = useCallback(async () => {
        setLimit(10);
        await setSubCategories({
            limit,
            search,
            sortby,
            order,
        });
        setIsLoading(false);
    }, [setSubCategories, limit, search, sortby, order]);

    useEffect(() => {
        debouncedFetchSubCategories(fetchSubCategories);

        // Cleanup debounce
        return () => {
            debouncedFetchSubCategories.cancel();
        };
    }, [search, sortby, order, limit]);

    // Panggil fungsi dengan data dan filter yang diinginkan
    const nestedFilters = ["category.category_nm", "sub_category_nm"];
    const transformedData = transformDataWithFilters(
        dtSubCategories.data,
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

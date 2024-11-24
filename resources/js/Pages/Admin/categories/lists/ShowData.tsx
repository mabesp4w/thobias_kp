import { FC, useCallback, useEffect, useState } from "react";
import _ from "lodash";
import useCategories from "@/store/crud/Categories";
import { DataTable } from "@/components/table/TableDefault";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import { generateColumns } from "@/lib/generateColumns";
import columnsConfig from "./columnsConfig";

// subjects
type DeleteProps = {
    id?: number | string;
    isDelete: boolean;
};
type Props = {
    setDelete: ({ id, isDelete }: DeleteProps) => void;
    setEdit: (row: any) => void;
};

// categories
const ShowData: FC<Props> = ({ setDelete, setEdit }) => {
    // store
    const { setCategories, dtCategories } = useCategories();
    // state
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    // params
    const params = new URLSearchParams(window.location.search);
    const search = params.get("cari") || "";
    const sortby = params.get("sortby") || "";
    const order = params.get("order") || "";
    // Define the debounced function outside of `useCallback`
    const debouncedFetchCategories = _.debounce((fetchCategories) => {
        fetchCategories();
    }, 500); // 500ms delay

    const fetchCategories = useCallback(async () => {
        setLimit(10);
        await setCategories({
            page,
            limit,
            search,
            sortby,
            order,
        });
        setIsLoading(false);
    }, [setCategories, page, limit, search, sortby, order]);

    useEffect(() => {
        debouncedFetchCategories(fetchCategories);

        // Cleanup debounce
        return () => {
            debouncedFetchCategories.cancel();
        };
    }, [search, sortby, order, page, limit]);

    return (
        <div className="flex-1 flex-col max-w-full h-full overflow-auto">
            {!isLoading ? (
                <DataTable
                    data={dtCategories.data}
                    columns={generateColumns(columnsConfig, setEdit, (rowId) =>
                        setDelete({ id: rowId, isDelete: false })
                    )}
                    filters={["category_nm"]}
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

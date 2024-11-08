import { FC, useCallback, useEffect, useState } from "react";
import _ from "lodash";
import useVillages from "@/store/crud/Villages";
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

// villages
const ShowData: FC<Props> = ({ setDelete, setEdit }) => {
    // store
    const { setVillages, dtVillages } = useVillages();
    // state
    const [limit, setLimit] = useState<number>(10);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    // params
    const params = new URLSearchParams(window.location.search);
    const search = params.get("cari") || "";
    const sortby = params.get("sortby") || "";
    const order = params.get("order") || "";
    // Define the debounced function outside of `useCallback`
    const debouncedFetchVillages = _.debounce((fetchVillages) => {
        fetchVillages();
    }, 500); // 500ms delay

    const fetchVillages = useCallback(async () => {
        setLimit(10);
        await setVillages({
            limit,
            search,
            sortby,
            order,
        });
        setIsLoading(false);
    }, [setVillages, limit, search, sortby, order]);

    useEffect(() => {
        debouncedFetchVillages(fetchVillages);

        // Cleanup debounce
        return () => {
            debouncedFetchVillages.cancel();
        };
    }, [search, sortby, order, limit]);

    return (
        <div className="flex-1 flex-col max-w-full h-full overflow-auto">
            {!isLoading ? (
                <DataTable
                    data={dtVillages.data}
                    columns={generateColumns(
                        columnsConfig as any,
                        setEdit,
                        (rowId) => setDelete({ id: rowId, isDelete: false })
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

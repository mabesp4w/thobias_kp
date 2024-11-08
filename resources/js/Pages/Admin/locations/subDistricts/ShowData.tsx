import { FC, useCallback, useEffect, useState } from "react";
import _ from "lodash";
import useSubDistricts from "@/store/crud/SubDistricts";
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

// subDistricts
const ShowData: FC<Props> = ({ setDelete, setEdit }) => {
    // store
    const { setSubDistricts, dtSubDistricts } = useSubDistricts();
    // state
    const [limit, setLimit] = useState<number>(10);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    // params
    const params = new URLSearchParams(window.location.search);
    const search = params.get("cari") || "";
    const sortby = params.get("sortby") || "";
    const order = params.get("order") || "";
    // Define the debounced function outside of `useCallback`
    const debouncedFetchSubDistricts = _.debounce((fetchSubDistricts) => {
        fetchSubDistricts();
    }, 500); // 500ms delay

    const fetchSubDistricts = useCallback(async () => {
        setLimit(10);
        await setSubDistricts({
            limit,
            search,
            sortby,
            order,
        });
        setIsLoading(false);
    }, [setSubDistricts, limit, search, sortby, order]);

    useEffect(() => {
        debouncedFetchSubDistricts(fetchSubDistricts);

        // Cleanup debounce
        return () => {
            debouncedFetchSubDistricts.cancel();
        };
    }, [search, sortby, order, limit]);

    return (
        <div className="flex-1 flex-col max-w-full h-full overflow-auto">
            {!isLoading ? (
                <DataTable
                    data={dtSubDistricts.data}
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

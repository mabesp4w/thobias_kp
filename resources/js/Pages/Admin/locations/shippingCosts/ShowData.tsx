import { FC, useCallback, useEffect, useState } from "react";
import _ from "lodash";
import useShippingCosts from "@/store/crud/ShippingCosts";
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

    return (
        <div className="flex-1 flex-col max-w-full h-full overflow-auto">
            {!isLoading ? (
                <DataTable
                    data={dtShippingCosts.data}
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

import { FC, useCallback, useEffect, useState } from "react";
import _ from "lodash";
import useOrders from "@/store/crud/Orders";
import { DataTable } from "@/components/table/TableDefault";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import { generateColumns } from "@/lib/generateColumns";
import transformDataWithFilters from "@/lib/transformDataWithFilters";
import { columnsConfig, updateAccessorKeys } from "./columnsConfig";
import OrdersTypes from "@/types/Orders";
import Detail from "./Detail";

// orders
type DeleteProps = {
    id?: number | string;
    isDelete: boolean;
};
type Props = {
    setDelete: ({ id, isDelete }: DeleteProps) => void;
    setEdit: (row: any) => void;
};

// orders
const ShowData: FC<Props> = ({ setDelete, setEdit }) => {
    // store
    const { setOrders, dtOrders } = useOrders();
    // state
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [openDetail, setOpenDetail] = useState<boolean>(false);
    const [rowDetail, setRowDetail] = useState<OrdersTypes | null>(null);
    // params
    const params = new URLSearchParams(window.location.search);
    const search = params.get("cari") || "";
    const sortby = params.get("sortby") || "";
    const order = params.get("order") || "";
    // Define the debounced function outside of `useCallback`
    const debouncedFetchOrders = _.debounce((fetchOrders) => {
        fetchOrders();
    }, 500); // 500ms delay

    const fetchOrders = useCallback(async () => {
        setLimit(10);
        await setOrders({
            page,
            limit,
            search,
            sortby,
            order,
            status: "dibayar,selesai",
        });
        setIsLoading(false);
    }, [setOrders, page, limit, search, sortby, order]);

    useEffect(() => {
        debouncedFetchOrders(fetchOrders);

        // Cleanup debounce
        return () => {
            debouncedFetchOrders.cancel();
        };
    }, [search, sortby, order, page, limit]);

    // Panggil fungsi dengan data dan filter yang diinginkan
    const nestedFilters = ["user_info.[0].nm_user", "village.village_nm"];
    const transformedData = transformDataWithFilters(
        dtOrders.data,
        nestedFilters
    );
    // Buat konfigurasi kolom dengan accessorKey yang diperbarui
    const updatedColumnsConfig = updateAccessorKeys(
        columnsConfig,
        nestedFilters
    );
    const onRowClick = (row: OrdersTypes) => {
        setRowDetail(row);
        setOpenDetail(true);
    };

    return (
        <div className="flex-1 flex-col max-w-full h-full overflow-auto">
            {!isLoading ? (
                <>
                    <DataTable
                        data={transformedData}
                        // @ts-ignore
                        columns={generateColumns(
                            updatedColumnsConfig,
                            setEdit,
                            (rowId) => setDelete({ id: rowId, isDelete: false })
                        )}
                        filters={nestedFilters.map(
                            (key) => `${key.split(".").join("_")}_filter`
                        )}
                        onRowClick={onRowClick}
                    />
                    <Detail
                        order={rowDetail || null}
                        openDetail={openDetail}
                        setOpenDetail={setOpenDetail}
                    />
                    ;
                </>
            ) : (
                <div className="flex justify-center items-center h-full">
                    <LoadingSpiner />
                </div>
            )}
        </div>
    );
};

export default ShowData;

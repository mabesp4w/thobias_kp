import { FC, useCallback, useEffect, useState } from "react";
import _ from "lodash";
import { DataTable } from "@/components/table/TableDefault";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import { generateColumns } from "@/lib/generateColumns";
import transformDataWithFilters from "@/lib/transformDataWithFilters";
import { columnsConfig, updateAccessorKeys } from "./columnsConfig";
import useProductImages from "@/store/crud/ProductImages";
import LightPlugins from "@/components/lightBox/LightPlugins";
import lightImgDB from "@/components/lightBox/lightImgDB";
import { usePage } from "@inertiajs/react";

// subjects
type DeleteProps = {
    id?: number | string;
    isDelete: boolean;
};
type Props = {
    setDelete: ({ id, isDelete }: DeleteProps) => void;
    setEdit: (row: any) => void;
};

// productImages
const ShowData: FC<Props> = ({ setDelete, setEdit }) => {
    const { product_id } = usePage().props;
    // store
    const { setProductImages, dtProductImages } = useProductImages();
    // state
    const [limit, setLimit] = useState<number>(10);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [indexBox, setIndexBox] = useState<number>(-1);
    const [showSlides, setShowSlides] = useState<never>();
    // params
    const params = new URLSearchParams(window.location.search);
    const search = params.get("cari") || "";
    const sortby = params.get("sortby") || "";
    const order = params.get("order") || "";
    // Define the debounced function outside of `useCallback`
    const debouncedFetchProductImages = _.debounce((fetchProductImages) => {
        fetchProductImages();
    }, 500); // 500ms delay

    const fetchProductImages = useCallback(async () => {
        setLimit(10);
        await setProductImages({
            limit,
            search,
            sortby,
            order,
            product_id: product_id as string,
        });
        setIsLoading(false);
    }, [setProductImages, limit, search, sortby, order]);

    useEffect(() => {
        debouncedFetchProductImages(fetchProductImages);

        // Cleanup debounce
        return () => {
            debouncedFetchProductImages.cancel();
        };
    }, [search, sortby, order, limit]);

    useEffect(() => {
        setShowSlides(
            lightImgDB({
                data: dtProductImages?.data,
                picture: "product_img",
                title: { path: "position" },
                description: { path: "" },
                width: 3840,
                height: 5760,
            })
        );
    }, [dtProductImages?.data]);

    // Panggil fungsi dengan data dan filter yang diinginkan
    const nestedFilters = ["position"];
    const transformedData = transformDataWithFilters(
        dtProductImages.data,
        nestedFilters
    );
    // Buat konfigurasi kolom dengan accessorKey yang diperbarui
    const updatedColumnsConfig = updateAccessorKeys(
        columnsConfig({ setIndexBox }),
        nestedFilters
    );

    return (
        <div className="flex-1 flex-col max-w-full h-full overflow-auto">
            {/* lightBox */}
            <LightPlugins
                index={indexBox}
                setIndex={setIndexBox}
                slides={showSlides}
            />
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

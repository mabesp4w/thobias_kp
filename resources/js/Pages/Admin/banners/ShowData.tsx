import { FC, useCallback, useEffect, useState } from "react";
import _ from "lodash";
import useBanners from "@/store/crud/Banners";
import { DataTable } from "@/components/table/TableDefault";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import { generateColumns } from "@/lib/generateColumns";
import columnsConfig from "./columnsConfig";
import LightPlugins from "@/components/lightBox/LightPlugins";
import lightImgDB from "@/components/lightBox/lightImgDB";

type DeleteProps = {
    id?: number | string;
    isDelete: boolean;
};
type Props = {
    setDelete: ({ id, isDelete }: DeleteProps) => void;
    setEdit: (row: any) => void;
};

// banners
const ShowData: FC<Props> = ({ setDelete, setEdit }) => {
    // store
    const { setBanners, dtBanners } = useBanners();
    // state
    const [page, setPage] = useState<number>(1);
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
    const debouncedFetchBanners = _.debounce((fetchBanners) => {
        fetchBanners();
    }, 500); // 500ms delay

    const fetchBanners = useCallback(async () => {
        setLimit(10);
        await setBanners({
            page,
            limit,
            search,
            sortby,
            order,
        });
        setIsLoading(false);
    }, [setBanners, page, limit, search, sortby, order]);

    useEffect(() => {
        debouncedFetchBanners(fetchBanners);

        // Cleanup debounce
        return () => {
            debouncedFetchBanners.cancel();
        };
    }, [search, sortby, order, page, limit]);

    useEffect(() => {
        setShowSlides(
            lightImgDB({
                data: dtBanners?.data,
                picture: "banner_img",
                title: { path: "position" },
                description: { path: "" },
                width: 3840,
                height: 5760,
            })
        );
    }, [dtBanners?.data]);

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
                    data={dtBanners.data}
                    columns={generateColumns(
                        columnsConfig({ setIndexBox }) as any,
                        setEdit,
                        (rowId) => setDelete({ id: rowId, isDelete: false })
                    )}
                    filters={["banner_img"]}
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

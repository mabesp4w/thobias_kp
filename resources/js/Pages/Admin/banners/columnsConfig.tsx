import { BASE_URL } from "@/services/baseURL";
import BannersTypes from "@/types/Banners";
import { ColumnDef } from "@tanstack/react-table";
// banners

type ColumnsConfigProps = {
    setIndexBox: (index: number) => void;
};

const columnsConfig = ({
    setIndexBox,
}: ColumnsConfigProps): ColumnDef<BannersTypes>[] => [
    {
        header: "Posisi",
        cell: ({ row }) => (
            <div className="capitalize">
                {row.original.position || "Tidak ada kategori"}
            </div>
        ),
    },
    {
        header: "Gambar",
        cell: ({ row }) => (
            <img
                src={`${BASE_URL}/${row.original.banner_img}`}
                className="h-20 cursor-pointer"
                onClick={() => {
                    setIndexBox(row.index); // Gunakan setIndexBox di sini
                }}
            />
        ),
    },
];

export default columnsConfig;

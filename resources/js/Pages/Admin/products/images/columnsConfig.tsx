import { BASE_URL } from "@/services/baseURL";
import ProductImagesTypes from "@/types/ProductImages";
import { ColumnDef } from "@tanstack/react-table";

type ColumnsConfigProps = {
    setIndexBox: (index: number) => void;
};

// productImages
const columnsConfig = ({
    setIndexBox,
}: ColumnsConfigProps): ColumnDef<ProductImagesTypes>[] => [
    {
        header: "No. Urut",
        cell: ({ row }) => (
            <div className="capitalize">{row.original.position}</div>
        ),
    },
    {
        header: "Gambar",
        cell: ({ row }) => (
            <img
                src={`${BASE_URL}/${row.original.product_img}`}
                className="h-20 cursor-pointer"
                onClick={() => {
                    setIndexBox(row.index); // Gunakan setIndexBox di sini
                }}
            />
        ),
    },
];

// Fungsi untuk memperbarui atau menambahkan accessorKey pada columnsConfig
function updateAccessorKeys(columns: any, nestedFilters: any) {
    return columns.map((column: any, index: any) => {
        // Periksa apakah ada nested filter yang sesuai dengan kolom ini
        const matchedFilter = nestedFilters[index] || null;

        // Jika kolom tidak memiliki accessorKey tetapi ada filter yang cocok, tambahkan accessorKey
        if (!column.accessorKey && matchedFilter) {
            return {
                ...column,
                accessorKey: matchedFilter.split(".").join("_") + "_filter",
            };
        }

        // Jika kolom sudah memiliki accessorKey, perbarui hanya jika ada nested filter yang cocok
        if (column.accessorKey && nestedFilters.includes(column.accessorKey)) {
            return {
                ...column,
                accessorKey: matchedFilter.split(".").join("_") + "_filter",
            };
        }

        return column; // Kembalikan kolom asli jika tidak perlu diubah
    });
}

export { columnsConfig, updateAccessorKeys };

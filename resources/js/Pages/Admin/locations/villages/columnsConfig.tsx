import VillagesTypes from "@/types/Villages";
import { ColumnDef } from "@tanstack/react-table";

// villages
const columnsConfig: ColumnDef<VillagesTypes>[] = [
    {
        header: "Kecamatan/Distrik",
        cell: ({ row }) => (
            <div className="capitalize">
                {row.original.sub_district.sub_district_nm}
            </div>
        ),
    },
    {
        header: "Kelurahan",
        cell: ({ row }) => (
            <div className="capitalize">{row.original.village_nm}</div>
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

import showRupiah from "@/lib/rupiah";
import ShippingCostsTypes from "@/types/ShippingCosts";
import { ColumnDef } from "@tanstack/react-table";

// shippingCosts
const columnsConfig: ColumnDef<ShippingCostsTypes>[] = [
    {
        header: "Kecamatan/Distrik",
        cell: ({ row }) => (
            <div className="capitalize">
                {row.original.village.sub_district.sub_district_nm}
            </div>
        ),
    },
    {
        header: "Kelurahan",
        cell: ({ row }) => (
            <div className="capitalize">{row.original.village.village_nm}</div>
        ),
    },
    {
        header: "Ongkir",
        cell: ({ row }) => (
            <div className="capitalize">
                {showRupiah(row.original.shipping_cost)}
            </div>
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

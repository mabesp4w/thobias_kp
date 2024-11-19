import OrdersTypes from "@/types/Orders";
import { ColumnDef } from "@tanstack/react-table";

// orders
const columnsConfig: ColumnDef<OrdersTypes>[] = [
    {
        header: "Nama",
        cell: ({ row }) => (
            <div className="capitalize">
                {row.original.user.user_info?.[0]?.nm_user}
            </div>
        ),
    },
    {
        header: "No. HP",
        cell: ({ row }) => (
            <div className="capitalize">
                {row.original.user.user_info?.[0]?.phone_number}
            </div>
        ),
    },
    {
        header: "Kecamatan - Kelurahan",
        cell: ({ row }) => (
            <div className="capitalize">
                {
                    row.original.shipping_cost.village.sub_district
                        .sub_district_nm
                }{" "}
                - {row.original.shipping_cost.village.village_nm}
            </div>
        ),
    },
    {
        header: "Alamat",
        cell: ({ row }) => (
            <div className="capitalize">
                {row.original.user.user_info?.[0]?.address}
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

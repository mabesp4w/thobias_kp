import showRupiah from "@/lib/rupiah";
import ProductsTypes from "@/types/Products";
import { ColumnDef } from "@tanstack/react-table";

// products
const columnsConfig: ColumnDef<ProductsTypes>[] = [
    {
        header: "Kategori",
        cell: ({ row }) => (
            <div className="capitalize">
                {row.original.sub_category.category.category_nm}
            </div>
        ),
    },
    {
        header: "Sub Kategori",
        cell: ({ row }) => (
            <div className="capitalize">
                {row.original.sub_category.sub_category_nm}
            </div>
        ),
    },
    {
        header: "Produk",
        cell: ({ row }) => (
            <div className="capitalize">{row.original.product_nm}</div>
        ),
    },
    {
        header: "Harga",
        cell: ({ row }) => (
            <div className="capitalize">{showRupiah(row.original.price)}</div>
        ),
    },
    {
        header: "Stok",
        cell: ({ row }) => (
            <div className="capitalize">{row.original.stock}</div>
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

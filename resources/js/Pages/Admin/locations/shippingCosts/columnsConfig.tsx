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
        header: "Biaya Pengiriman",
        cell: ({ row }) => (
            <div className="capitalize">
                {showRupiah(row.original.shipping_cost)}
            </div>
        ),
    },
];

export default columnsConfig;

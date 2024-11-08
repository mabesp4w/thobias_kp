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

export default columnsConfig;

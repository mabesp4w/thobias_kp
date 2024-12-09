const columnsConfig = [
    {
        accessorKey: "sub_district_nm",
        header: "Nama Kecamatan/Distrik",
        cell: ({ row }: any) => (
            <div className="capitalize">{row.getValue("sub_district_nm")}</div>
        ),
    },
];

export default columnsConfig;

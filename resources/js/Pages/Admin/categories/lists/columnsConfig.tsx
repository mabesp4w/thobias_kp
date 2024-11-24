const columnsConfig = [
    {
        accessorKey: "category_nm",
        header: "Category",
        cell: ({ row }: any) => (
            <div className="capitalize">{row.getValue("category_nm")}</div>
        ),
    },
];

export default columnsConfig;

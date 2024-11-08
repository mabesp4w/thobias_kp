import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

type ColumnConfig<T> = {
    accessorKey: keyof T;
    header: string;
    cell?: (row: any) => JSX.Element;
};

// Fungsi untuk membuat kolom dinamis dengan setEdit dan setDelete sebagai parameter
export function generateColumns<T extends { id: string }>(
    dynamicColumns: ColumnConfig<T>[],
    setEdit: (row: T) => void,
    setDelete: (rowId: string) => void
): ColumnDef<T>[] {
    return [
        {
            id: "no",
            enableSorting: true,
            enableHiding: false,
            header: "No",
            cell: (info: any) => info.row.index + 1,
        },
        ...dynamicColumns.map(({ accessorKey, header, cell }) => ({
            accessorKey,
            header,
            cell: cell || (({ row }) => <div>{row.getValue(accessorKey)}</div>),
        })),
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const { original } = row;
                const rowId = original.id;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <DotsHorizontalIcon className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => setEdit(original)}>
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setDelete(rowId)}>
                                Hapus
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];
}

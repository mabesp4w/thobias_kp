import ShowData from "./ShowData";

import { useState } from "react";
import Form from "./form/Form";
import { Toaster } from "@/components/ui/toaster";
import useOrders from "@/store/crud/Orders";
import { showToast } from "@/lib/showToast";
import { Head } from "@inertiajs/react";
import DeleteDialog from "@/components/dialog/DeleteDialog";
import ShippingStatusesTypes from "@/types/ShippingStatuses";

// type setDelete
type Delete = {
    id?: number | string;
    isDelete: boolean;
};

const Index = () => {
    const halaman = "Orders";
    // store
    const { removeData } = useOrders();
    // state
    const [openDialog, setOpenDialog] = useState(false);
    const [dtEdit, setDtEdit] = useState<ShippingStatusesTypes | null>();
    const [idDel, setIdDel] = useState<number | string>();
    const [showDelete, setShowDelete] = useState<boolean>(false);

    const setEdit = (row: any) => {
        console.log({ row });
        setOpenDialog(true);
        setDtEdit(row.shipping_status);
    };

    const setDelete = async ({ id, isDelete }: Delete) => {
        setIdDel(id);
        if (isDelete) {
            const { data } = await removeData(idDel as number);
            showToast({
                type: data?.type,
                description: data?.message,
            });
            setShowDelete(false);
        } else setShowDelete(true);
    };

    return (
        <>
            <Head title={halaman} />
            <div className="grow flex flex-col">
                <div className="flex items-center justify-between">
                    <h1>Data Orders</h1>
                </div>
                {/* form */}
                <Form
                    openDialog={openDialog}
                    setOpenDialog={setOpenDialog}
                    dtEdit={dtEdit}
                    halaman={halaman}
                />
                {/* dialog delete */}
                <DeleteDialog
                    setShowDel={setShowDelete}
                    showDel={showDelete}
                    setDelete={setDelete}
                />
                <ShowData setDelete={setDelete} setEdit={setEdit} />
                <Toaster />
            </div>
        </>
    );
};

export default Index;

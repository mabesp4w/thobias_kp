import ShowData from "./ShowData";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import Form from "./form/Form";
import { Toaster } from "@/components/ui/toaster";
import { showToast } from "@/lib/showToast";
import { Head } from "@inertiajs/react";
import DeleteDialog from "@/components/dialog/DeleteDialog";
import ProductsTypes from "@/types/Products";
import useProducts from "@/store/crud/Products";

// type setDelete
type Delete = {
    id?: number | string;
    isDelete: boolean;
};
// products
const Index = () => {
    const halaman = "Products";
    // store
    const { removeData } = useProducts();
    // state
    const [openDialog, setOpenDialog] = useState(false);
    const [dtEdit, setDtEdit] = useState<ProductsTypes | null>();
    const [idDel, setIdDel] = useState<number | string>();
    const [showDelete, setShowDelete] = useState<boolean>(false);

    const handleTambah = () => {
        setOpenDialog(true);
        setDtEdit(null);
    };

    const setEdit = (row: any) => {
        setOpenDialog(true);
        setDtEdit(row);
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
                    <h1>Data Products</h1>
                    <Button variant="outline" onClick={handleTambah}>
                        Tambah Data
                    </Button>
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
import ShowData from "./ShowData";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import Form from "./form/Form";
import { CategoriesTypes } from "@/types/Categories";
import { Toaster } from "@/components/ui/toaster";
import useCategories from "@/store/crud/Categories";
import { showToast } from "@/lib/showToast";
import { Head } from "@inertiajs/react";
import DeleteDialog from "@/components/dialog/DeleteDialog";

// type setDelete
type Delete = {
    id?: number | string;
    isDelete: boolean;
};

const Index = () => {
    const halaman = "Categories";
    // store
    const { removeData } = useCategories();
    // state
    const [openDialog, setOpenDialog] = useState(false);
    const [dtEdit, setDtEdit] = useState<CategoriesTypes | null>();
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
                    <h1>Data Categories</h1>
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

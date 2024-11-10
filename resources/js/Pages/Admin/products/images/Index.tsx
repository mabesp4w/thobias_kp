import ShowData from "./ShowData";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Form from "./form/Form";
import { Toaster } from "@/components/ui/toaster";
import { showToast } from "@/lib/showToast";
import { Head, Link, usePage } from "@inertiajs/react";
import DeleteDialog from "@/components/dialog/DeleteDialog";
import ProductImagesTypes from "@/types/ProductImages";
import useProductImages from "@/store/crud/ProductImages";
import { useWelcomeContext } from "@/context/WelcomeContext";
import useProducts from "@/store/crud/Products";

// type setDelete
type Delete = {
    id?: number | string;
    isDelete: boolean;
};
// productImages
const Index = () => {
    const { product_id } = usePage().props;
    // context
    const { setWelcome } = useWelcomeContext();
    const halaman = "Gambar Produk";
    // store
    const { removeData } = useProductImages();
    const { setShowProducts, showProduct } = useProducts();
    // state
    const [openDialog, setOpenDialog] = useState(false);
    const [dtEdit, setDtEdit] = useState<ProductImagesTypes | null>();
    const [idDel, setIdDel] = useState<number | string>();
    const [showDelete, setShowDelete] = useState<boolean>(false);
    // getProducts
    useEffect(() => {
        if (product_id) {
            setShowProducts(product_id as string);
        }
    }, [product_id]);

    // setWelcome
    useEffect(() => {
        if (showProduct) {
            setWelcome(showProduct?.product_nm || "");
        }
    }, [showProduct]);

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
                    <h1>Data {halaman}</h1>
                    <Button variant="outline" onClick={handleTambah}>
                        Tambah Data
                    </Button>
                </div>
                {/* form */}
                <Link
                    href="/admin/products/lists"
                    className="underline text-secondary hover:no-underline cursor-pointer w-fit"
                >
                    Kembali
                </Link>
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

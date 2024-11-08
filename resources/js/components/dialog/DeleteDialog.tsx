import { FC } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import BtnDefault from "../button/BtnDefault";

type Props = {
    showDel: boolean;
    setShowDel: (data: boolean) => void;
    setDelete: ({
        id,
        isDelete,
    }: {
        id?: number | string;
        isDelete: boolean;
    }) => void;
};

const DeleteDialog: FC<Props> = ({ showDel, setShowDel, setDelete }) => {
    return (
        <Dialog open={showDel} onOpenChange={setShowDel}>
            <DialogContent className={`sm:max-w-[425px]`}>
                <DialogHeader>
                    <DialogTitle>Hapus Data</DialogTitle>
                </DialogHeader>
                <div>
                    <p>Apakah Anda Yakin Menghapus Data Ini?</p>
                    <p>Data akan dihapus permanen!</p>
                    <div className="flex justify-center gap-4 mt-4">
                        <BtnDefault
                            addClass="bg-destructive"
                            onClick={() => setDelete({ isDelete: true })}
                        >
                            Hapus
                        </BtnDefault>
                        <BtnDefault
                            addClass="bg-muted text-black"
                            onClick={() => setShowDel(false)}
                        >
                            Batal
                        </BtnDefault>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteDialog;

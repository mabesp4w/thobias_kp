import BtnDefault from "@/components/button/BtnDefault";
import DefaultDialog from "@/components/dialog/DefaultDialog";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { User } from "@/types";
import CartsTypes from "@/types/Carts";
import ShippingCostsTypes from "@/types/ShippingCosts";
import { Dispatch, FC, SetStateAction } from "react";

type Props = {
    openDialog: boolean;
    setOpenDialog: Dispatch<SetStateAction<boolean>>;
    shipping?: ShippingCostsTypes;
    carts: CartsTypes[];
    user?: User;
};

const Question: FC<Props> = ({ setOpenDialog, openDialog }) => {
    return (
        <DefaultDialog
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
            title={`Pertanyaan`}
        >
            <p>Apakah anda ingin melanjutkan ke proses pembayaran?</p>
            <DialogFooter>
                <div className="w-full flex gap-x-2 justify-center items-end">
                    <BtnDefault
                        addClass="bg-primary"
                        onClick={() => setOpenDialog(false)}
                    >
                        Ya
                    </BtnDefault>
                    <Button
                        variant={"outline"}
                        onClick={() => setOpenDialog(false)}
                    >
                        Tidak
                    </Button>
                </div>
            </DialogFooter>
        </DefaultDialog>
    );
};

export default Question;

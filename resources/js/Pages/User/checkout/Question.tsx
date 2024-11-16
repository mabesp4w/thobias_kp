import BtnDefault from "@/components/button/BtnDefault";
import DefaultDialog from "@/components/dialog/DefaultDialog";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import useOrders from "@/store/crud/Orders";
import { User } from "@/types";
import CartsTypes from "@/types/Carts";
import ShippingCostsTypes from "@/types/ShippingCosts";
import { Dispatch, FC, SetStateAction } from "react";

type Props = {
    openDialog: boolean;
    setOpenDialog: Dispatch<SetStateAction<boolean>>;
    shipping: ShippingCostsTypes;
    carts: CartsTypes[];
    user?: User;
};

const Question: FC<Props> = ({
    setOpenDialog,
    openDialog,
    carts,
    user,
    shipping,
}) => {
    const { addData } = useOrders();

    const handleSubmit = async () => {
        const total_price = carts.reduce(
            (total, cart) => total + cart.product.price * cart.quantity,
            0
        );
        const total_payment = total_price + shipping.shipping_cost;

        const row = {
            user_id: user?.id,
            shipping_cost_id: shipping.id,
            total_price,
            total_payment,
            status: "tunggu pembayaran",
            carts,
        };

        await addData(row);
    };
    return (
        <DefaultDialog
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
            title={`Proses Pembayaran?`}
        >
            <p>
                Anda tidak dapat mengubah pesanan setelah melanjutkan ke proses
                pembayaran.
            </p>
            <DialogFooter>
                <div className="w-full flex gap-x-2 justify-center items-end">
                    <BtnDefault addClass="bg-primary" onClick={handleSubmit}>
                        Lanjut
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

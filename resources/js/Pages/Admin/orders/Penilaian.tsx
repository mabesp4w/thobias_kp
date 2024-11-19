import DefaultDialog from "@/components/dialog/DefaultDialog";
import RatingStars from "@/components/shop/RatingStars";
import submitData from "@/services/submitData";
import useReviews from "@/store/crud/Reviews";
import OrdersTypes from "@/types/Orders";
import { router } from "@inertiajs/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {
    setOpenDialog: Dispatch<SetStateAction<boolean>>;
    openDialog: boolean;
    user_id: string;
    order: OrdersTypes;
};

const Penilaian = ({ openDialog, setOpenDialog, user_id, order }: Props) => {
    // state
    const [isLoading, setIsLoading] = useState(false);
    const [ratting, setRating] = useState(0);
    // store
    const { addData, setShowReviews, dtReviews } = useReviews();
    // get data
    const getData = async () => {
        await setShowReviews(order.id);
    };

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log({ dtReviews });
    // hook form
    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
        watch,
    } = useForm<any>();

    const onSubmit: SubmitHandler<any> = async (row) => {
        row.user_id = user_id;
        row.order_id = order.id;
        console.log({ row });
        //  submit data
        await submitData({
            row,
            addData,
            setIsLoading,
            setShowModal: setOpenDialog,
        });
        setOpenDialog(false);
        return router.visit("/orders");
    };

    return (
        <DefaultDialog
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
            title={`Penilaian`}
        >
            {dtReviews.length > 0 && (
                <div className="flex flex-col gap-y-4">
                    {dtReviews.map((item) => {
                        return (
                            <div
                                key={item.id}
                                className="flex flex-col border-b shadow-md"
                            >
                                <h1>{item.product.product_nm}</h1>
                                <div>
                                    <RatingStars rating={item.rating} />
                                </div>
                                <p>{item.comment}</p>
                            </div>
                        );
                    })}
                </div>
            )}
        </DefaultDialog>
    );
};

export default Penilaian;

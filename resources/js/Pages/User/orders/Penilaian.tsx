import BtnDefault from "@/components/button/BtnDefault";
import DefaultDialog from "@/components/dialog/DefaultDialog";
import InputTextDefault from "@/components/input/InputTextDefault";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import StarRating from "@/components/others/StartRating";
import RatingStars from "@/components/shop/RatingStars";
import { DialogFooter } from "@/components/ui/dialog";
import { BASE_URL } from "@/services/baseURL";
import submitData from "@/services/submitData";
import useReviews from "@/store/crud/Reviews";
import OrdersTypes from "@/types/Orders";
import { router } from "@inertiajs/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

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
                                className="flex flex-col border-b"
                            >
                                <h1>{item.product.product_nm}</h1>
                                <p>
                                    <RatingStars rating={item.rating} />
                                </p>
                                <p>{item.comment}</p>
                            </div>
                        );
                    })}
                </div>
            )}
            {dtReviews.length === 0 && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-8 gap-2 mb-4 gap-y-10">
                        {order.order_items.map((product, index) => {
                            const img = product?.product?.product_image[0];
                            const urlImg = img
                                ? `${BASE_URL}/${img.product_img}`
                                : "/images/no_image.png";
                            return (
                                <div
                                    key={product.id}
                                    className="flex flex-col col-span-8"
                                >
                                    <div className="flex border-y h-24 col-span-8 items-center">
                                        <img
                                            src={urlImg}
                                            alt={product.product.product_nm}
                                            className="h-24 object-cover"
                                        />
                                        <div className="ml-4 w-full">
                                            <h1 className="">
                                                {product.product.product_nm}
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="col-span-8">
                                        <Controller
                                            name={`rating[${index}]`}
                                            control={control}
                                            render={({ field }) => (
                                                <StarRating
                                                    totalStars={5}
                                                    onChangeRating={
                                                        field.onChange
                                                    }
                                                    name={field.name}
                                                />
                                            )}
                                        />
                                    </div>
                                    <InputTextDefault
                                        name={`product_id[${index}]`}
                                        register={register}
                                        type="hidden"
                                        value={product.product_id}
                                    />
                                    <InputTextDefault
                                        label="Komentar"
                                        name={`comment[${index}]`}
                                        register={register}
                                        addClass="col-span-8"
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <DialogFooter>
                        {isLoading ? (
                            <LoadingSpiner />
                        ) : (
                            <BtnDefault
                                onClick={handleSubmit(onSubmit)}
                                type="submit"
                            >
                                Simpan
                            </BtnDefault>
                        )}
                    </DialogFooter>
                </form>
            )}
        </DefaultDialog>
    );
};

export default Penilaian;

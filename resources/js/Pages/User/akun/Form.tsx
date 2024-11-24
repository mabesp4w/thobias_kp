import DefaultDialog from "@/components/dialog/DefaultDialog";
import useVillagesApi from "@/store/api/Villages";
import { User } from "@/types";
import UserInfoTypes from "@/types/UserInfos";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import submitData from "@/services/submitData";
import InputTextDefault from "@/components/input/InputTextDefault";
import BodyForm from "./BodyForm";
import { DialogFooter } from "@/components/ui/dialog";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import BtnDefault from "@/components/button/BtnDefault";
import useUserInfos from "@/store/crud/UserInfo";

type Props = {
    openDialog: boolean;
    setOpenDialog: Dispatch<SetStateAction<boolean>>;
    halaman?: string;
    user: User;
};

const Form: FC<Props> = ({ openDialog, setOpenDialog, halaman, user }) => {
    // state
    const [isLoading, setIsLoading] = useState(false);
    const [dtEdit, setDtEdit] = useState<UserInfoTypes | null>();
    // store
    const { setVillages, dtVillages } = useVillagesApi();
    const { addData, updateData, setShowUserInfos } = useUserInfos();
    // window.dispatchEvent(new Event("cartUpdated"));

    useEffect(() => {
        setIsLoading(true);
        setVillages();
        setIsLoading(false);

        return () => {};
    }, []);

    // hook form
    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
        watch,
    } = useForm<UserInfoTypes>();

    const getData = async () => {
        const res = await setShowUserInfos(user.id);
        // @ts-ignore
        setDtEdit(res.data?.data?.user_info?.[0] || null);
    };

    useEffect(() => {
        getData();

        return () => {};
    }, []);

    // reset form
    const resetForm = () => {
        setValue("id", "");
        setValue("nm_user", "");
    };

    // data edit
    useEffect(() => {
        if (dtEdit) {
            console.log({ dtEdit });
            setValue("id", dtEdit.id);
            setValue("nm_user", dtEdit.nm_user);
            setValue("phone_number", dtEdit.phone_number);
            setValue("village_id", dtEdit.village_id);
            setValue("address", dtEdit.address);
        } else {
            resetForm();
        }
    }, [openDialog, dtEdit]);
    // simpan data
    const onSubmit: SubmitHandler<UserInfoTypes> = async (row) => {
        row.user_id = user.id;
        row.is_active = true;
        //  submit data
        submitData({
            row,
            dtEdit,
            setIsLoading,
            addData,
            updateData,
            resetForm,
        });
        const event = window.dispatchEvent(new Event("akunUpdated"));
        if (event) {
            setOpenDialog(false);
        }
    };

    return (
        <DefaultDialog
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
            title={`Form ${halaman}`}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputTextDefault name="id" register={register} type="hidden" />
                <div className="grid grid-cols-8 gap-2 mb-4">
                    <BodyForm
                        register={register}
                        errors={errors as any}
                        dtEdit={dtEdit as any}
                        control={control}
                        watch={watch}
                        setValue={setValue}
                        showModal={openDialog}
                    />
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
        </DefaultDialog>
    );
};

export default Form;

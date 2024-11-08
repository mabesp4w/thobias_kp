import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { DialogFooter } from "@/components/ui/dialog";
import submitData from "@/services/submitData";
import useVillages from "@/store/crud/Villages";
import InputTextDefault from "@/components/input/InputTextDefault";
import BodyForm from "./BodyForm";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import BtnDefault from "@/components/button/BtnDefault";
import DefaultDialog from "@/components/dialog/DefaultDialog";
import VillagesTypes from "@/types/Villages";

type Props = {
    openDialog: boolean;
    setOpenDialog: Dispatch<SetStateAction<boolean>>;
    dtEdit?: VillagesTypes | null;
    halaman?: string;
};

// villages

const Form: FC<Props> = ({ openDialog, setOpenDialog, dtEdit, halaman }) => {
    // store
    const { addData, updateData } = useVillages();
    // state
    const [isLoading, setIsLoading] = useState(false);
    // hook form
    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
        watch,
    } = useForm<VillagesTypes>();

    // reset form
    const resetForm = () => {
        setValue("id", "");
        setValue("sub_district_id", "");
        setValue("village_nm", "");
    };

    // data edit
    useEffect(() => {
        if (dtEdit) {
            setValue("id", dtEdit.id);
            setValue("sub_district_id", dtEdit.sub_district_id);
            setValue("village_nm", dtEdit.village_nm);
        } else {
            resetForm();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setOpenDialog, dtEdit]);
    // simpan data
    const onSubmit: SubmitHandler<VillagesTypes> = async (row) => {
        //  submit data
        submitData({
            row,
            dtEdit,
            setIsLoading,
            setShowModal: setOpenDialog,
            addData,
            updateData,
            resetForm,
        });
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
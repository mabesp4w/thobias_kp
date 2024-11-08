import InputFile from "@/components/input/InputFile";
import InputTextDefault from "@/components/input/InputTextDefault";
import BannersTypes from "@/types/Banners";
import { FC } from "react";

type Props = {
    register: any;
    errors: BannersTypes;
    dtEdit: BannersTypes | null;
    control: any;
    watch: any;
    setValue: any;
    showModal: boolean;
};
// banners
const BodyForm: FC<Props> = ({
    register,
    errors,
    dtEdit,
    showModal,
    setValue,
    watch,
    control,
}) => {
    return (
        <>
            <InputTextDefault
                label="Posisi"
                name="position"
                register={register}
                required
                type="number"
                min={1}
                errors={errors.position}
                addClass="col-span-8"
            />
            <InputFile
                label="Gambar"
                name="banner_img"
                register={register}
                addClass="col-span-8"
                setValue={setValue}
                required={!dtEdit?.banner_img}
                errors={errors.banner_img}
                fileEdit={dtEdit?.banner_img}
                initialValue={dtEdit?.banner_img || ""}
                watch={watch}
                accept={"image/*"}
            />
        </>
    );
};

export default BodyForm;

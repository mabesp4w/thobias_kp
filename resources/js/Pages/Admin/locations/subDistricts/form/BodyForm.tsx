import InputTextDefault from "@/components/input/InputTextDefault";
import SubDistrictsTypes from "@/types/SubDistricts";
import { FC } from "react";

type Props = {
    register: any;
    errors: SubDistrictsTypes;
    dtEdit: SubDistrictsTypes | null;
    control: any;
    watch: any;
    setValue: any;
    showModal: boolean;
};
// subDistricts
const BodyForm: FC<Props> = ({ register, errors, showModal, control }) => {
    return (
        <>
            <InputTextDefault
                label="Nama Kecamatan/Distrik"
                name="sub_district_nm"
                register={register}
                required
                minLength={2}
                errors={errors.sub_district_nm}
                addClass="col-span-8"
            />
        </>
    );
};

export default BodyForm;

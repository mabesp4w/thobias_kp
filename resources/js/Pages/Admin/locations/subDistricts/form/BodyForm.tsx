import InputTextDefault from "@/components/input/InputTextDefault";
import useSubDistricts from "@/store/crud/SubDistricts";
import SubDistrictsTypes from "@/types/SubDistricts";
import { FC, useCallback, useEffect, useState } from "react";

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
    // store
    const { setSubDistricts, dtSubDistricts } = useSubDistricts();
    // state
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const fetchSubDistricts = useCallback(async () => {
        setIsLoading(true);
        await setSubDistricts({ page: 1, limit: 10 });
        setIsLoading(false);
    }, [setSubDistricts]);

    // call fetch
    useEffect(() => {
        fetchSubDistricts();
    }, [showModal]);

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

import InputTextDefault from "@/components/input/InputTextDefault";
import SelectFromDb from "@/components/select/SelectFromDB";
import useSubDistricts from "@/store/crud/SubDistricts";
import VillagesTypes from "@/types/Villages";
import { FC, useCallback, useEffect, useState } from "react";

type Props = {
    register: any;
    errors: VillagesTypes;
    dtEdit: VillagesTypes | null;
    control: any;
    watch: any;
    setValue: any;
    showModal: boolean;
};
// villages
const BodyForm: FC<Props> = ({ register, errors, showModal, control }) => {
    // store
    const { setSubDistricts, dtSubDistricts } = useSubDistricts();
    // state
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const fetchVillages = useCallback(async () => {
        setIsLoading(true);
        await setSubDistricts({ page: 1, limit: 10 });
        setIsLoading(false);
    }, [setSubDistricts]);

    // call fetch
    useEffect(() => {
        fetchVillages();
    }, [showModal]);

    return (
        <>
            <InputTextDefault
                label="Nama Kelurahan"
                name="village_nm"
                register={register}
                required
                minLength={2}
                errors={errors.village_nm}
                addClass="col-span-8"
            />
            {!isLoading && (
                <SelectFromDb
                    label="Kecamatan/Distrik"
                    placeholder="Pilih Kecamatan/Distrik"
                    name="sub_district_id"
                    dataDb={dtSubDistricts.data}
                    body={["id", "sub_district_nm"]}
                    control={control}
                    required
                    errors={errors.sub_district_id}
                    addClass="col-span-8 text-black relative"
                    menuPortalTarget
                />
            )}
        </>
    );
};

export default BodyForm;

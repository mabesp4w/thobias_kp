import InputTextDefault from "@/components/input/InputTextDefault";
import SelectFromDb from "@/components/select/SelectFromDB";
import useVillagesApi from "@/store/api/Villages";
import UserInfoTypes from "@/types/UserInfos";
import { FC, useCallback, useEffect, useState } from "react";

type Props = {
    register: any;
    errors: UserInfoTypes;
    dtEdit: UserInfoTypes | null;
    control: any;
    watch: any;
    setValue: any;
    showModal: boolean;
};

const BodyForm: FC<Props> = ({ register, errors, showModal, control }) => {
    // store
    const { setVillages, dtVillages } = useVillagesApi();
    // state
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchShippingCosts = useCallback(async () => {
        setIsLoading(true);
        await setVillages();
        setIsLoading(false);
    }, [setVillages]);

    // call fetch
    useEffect(() => {
        fetchShippingCosts();
    }, [showModal]);

    return (
        <>
            <InputTextDefault
                label="Nama Penerima"
                name="nm_user"
                register={register}
                required
                minLength={2}
                errors={errors.nm_user}
                addClass="col-span-8"
            />
            <InputTextDefault
                label="No. HP"
                name="phone_number"
                register={register}
                required
                minLength={2}
                errors={errors.phone_number}
                addClass="col-span-8"
            />
            {!isLoading && (
                <SelectFromDb
                    label="Kelurahan"
                    placeholder="Pilih Kelurahan"
                    name="village_id"
                    dataDb={dtVillages}
                    body={["id", "sub_district.sub_district_nm", "village_nm"]}
                    control={control}
                    required
                    errors={errors.village_id}
                    addClass="col-span-8 text-black relative"
                    menuPortalTarget
                />
            )}
            <InputTextDefault
                label="Alamat"
                name="address"
                register={register}
                required
                minLength={2}
                errors={errors.address}
                addClass="col-span-8"
            />
        </>
    );
};

export default BodyForm;

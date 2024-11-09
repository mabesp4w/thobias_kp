import InputRupiah from "@/components/input/InputRupiah";
import SelectFromDb from "@/components/select/SelectFromDB";
import useVillages from "@/store/crud/Villages";
import ShippingCostsTypes from "@/types/ShippingCosts";
import { FC, useCallback, useEffect, useState } from "react";

type Props = {
    register: any;
    errors: ShippingCostsTypes;
    dtEdit: ShippingCostsTypes | null;
    control: any;
    watch: any;
    setValue: any;
    showModal: boolean;
};
// shippingCosts
const BodyForm: FC<Props> = ({ register, errors, showModal, control }) => {
    // store
    const { setVillages, dtVillages } = useVillages();
    // state
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const fetchShippingCosts = useCallback(async () => {
        setIsLoading(true);
        await setVillages({ page: 1, limit: 10 });
        setIsLoading(false);
    }, [setVillages]);

    // call fetch
    useEffect(() => {
        fetchShippingCosts();
    }, [showModal]);

    return (
        <>
            {!isLoading && (
                <SelectFromDb
                    label="Kelurahan"
                    placeholder="Pilih Kelurahan"
                    name="village_id"
                    dataDb={dtVillages.data}
                    body={["id", "sub_district.sub_district_nm", "village_nm"]}
                    control={control}
                    required
                    errors={errors.village_id}
                    addClass="col-span-8 text-black relative"
                    menuPortalTarget
                />
            )}
            <InputRupiah
                label="Biaya Pengiriman"
                control={control}
                name="shipping_cost"
                errors={errors.shipping_cost}
                addClass="col-span-8"
                required
                minLength={0}
            />
        </>
    );
};

export default BodyForm;

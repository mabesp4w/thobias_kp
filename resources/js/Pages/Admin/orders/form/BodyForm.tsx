import SelectDef from "@/components/select/SelectDef";
import ShippingStatusesTypes from "@/types/ShippingStatuses";
import { FC } from "react";

type Props = {
    register: any;
    errors: ShippingStatusesTypes;
    dtEdit: ShippingStatusesTypes | null;
    control: any;
    watch: any;
    setValue: any;
    showModal: boolean;
};

const BodyForm: FC<Props> = ({ register, errors, showModal, control }) => {
    return (
        <>
            <SelectDef
                name="status"
                label="Status Kirim"
                placeholder="Pilih Status Kirim"
                options={[
                    { value: "dikemas", label: "Dikemas" },
                    { value: "dikirim", label: "Dikirim" },
                    { value: "diterima", label: "Diterima" },
                ]}
                addClass={"col-span-8"}
                required
                errors={errors.status}
                control={control}
            />
        </>
    );
};

export default BodyForm;

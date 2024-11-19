import InputTextDefault from "@/components/input/InputTextDefault";
import CategoriesTypes from "@/types/Categories";
import { FC } from "react";

type Props = {
    register: any;
    errors: CategoriesTypes;
    dtEdit: CategoriesTypes | null;
    control: any;
    watch: any;
    setValue: any;
    showModal: boolean;
};

const BodyForm: FC<Props> = ({ register, errors, showModal, control }) => {
    return (
        <>
            <InputTextDefault
                label="Nama Kategori"
                name="category_nm"
                register={register}
                required
                minLength={2}
                errors={errors.category_nm}
                addClass="col-span-8"
            />
        </>
    );
};

export default BodyForm;

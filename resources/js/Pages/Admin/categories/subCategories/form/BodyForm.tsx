import InputTextDefault from "@/components/input/InputTextDefault";
import SelectFromDb from "@/components/select/SelectFromDB";
import useCategories from "@/store/crud/Categories";
import SubCategoriesTypes from "@/types/SubCategories";
import { FC, useCallback, useEffect, useState } from "react";

type Props = {
    register: any;
    errors: SubCategoriesTypes;
    dtEdit: SubCategoriesTypes | null;
    control: any;
    watch: any;
    setValue: any;
    showModal: boolean;
};
// subCategories
const BodyForm: FC<Props> = ({ register, errors, showModal, control }) => {
    // store
    const { setCategories, dtCategories } = useCategories();
    // state
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const fetchCategories = useCallback(async () => {
        setIsLoading(true);
        await setCategories({ page: 1, limit: 10 });
        setIsLoading(false);
    }, [setCategories]);

    // call fetch
    useEffect(() => {
        fetchCategories();
    }, [showModal]);

    return (
        <>
            {!isLoading && (
                <SelectFromDb
                    label="Kategori"
                    placeholder="Pilih Kategori"
                    name="category_id"
                    dataDb={dtCategories.data}
                    body={["id", "category_nm"]}
                    control={control}
                    required
                    errors={errors.category_id}
                    addClass="col-span-8 text-black relative"
                    menuPortalTarget
                />
            )}
            <InputTextDefault
                label="Sub Kategori"
                name="sub_category_nm"
                register={register}
                required
                minLength={2}
                errors={errors.sub_category_nm}
                addClass="col-span-8"
            />
        </>
    );
};

export default BodyForm;

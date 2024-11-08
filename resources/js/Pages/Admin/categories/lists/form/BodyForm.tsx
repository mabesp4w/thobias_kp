import InputTextDefault from "@/components/input/InputTextDefault";
import SelectFromDb from "@/components/select/SelectFromDB";
import useCategories from "@/store/crud/Categories";
import { CategoriesTypes } from "@/types/Categories";
import { FC, useCallback, useEffect, useState } from "react";

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
            <InputTextDefault
                label="Nama Kategori"
                name="category_nm"
                register={register}
                required
                minLength={2}
                errors={errors.category_nm}
                addClass="col-span-8"
            />
            {!isLoading && (
                <SelectFromDb
                    label="Siswa"
                    placeholder="Pilih Kategori"
                    name="parent_id"
                    dataDb={dtCategories.data}
                    body={["id", "category_nm"]}
                    control={control}
                    addClass="col-span-8 text-black"
                    menuPosition="absolute"
                />
            )}
        </>
    );
};

export default BodyForm;

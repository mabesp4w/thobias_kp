import InputRupiah from "@/components/input/InputRupiah";
import InputTextDefault from "@/components/input/InputTextDefault";
import SelectFromDb from "@/components/select/SelectFromDB";
import useSubCategories from "@/store/crud/SubCategories";
import ProductsTypes from "@/types/Products";
import { FC, useCallback, useEffect, useState } from "react";

type Props = {
    register: any;
    errors: ProductsTypes;
    dtEdit: ProductsTypes | null;
    control: any;
    watch: any;
    setValue: any;
    showModal: boolean;
};
// products
const BodyForm: FC<Props> = ({ register, errors, showModal, control }) => {
    // store
    const { setSubCategories, dtSubCategories } = useSubCategories();
    // state
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const fetchSubCategories = useCallback(async () => {
        setIsLoading(true);
        await setSubCategories({ page: 1, limit: 10 });
        setIsLoading(false);
    }, [setSubCategories]);

    // call fetch
    useEffect(() => {
        fetchSubCategories();
    }, [showModal]);

    return (
        <>
            {!isLoading && (
                <SelectFromDb
                    label="Kategori"
                    placeholder="Pilih Kategori"
                    name="sub_category_id"
                    dataDb={dtSubCategories.data}
                    body={["id", "category.category_nm", "sub_category_nm"]}
                    control={control}
                    required
                    errors={errors.sub_category_id}
                    addClass="col-span-8 text-black relative"
                    menuPortalTarget
                />
            )}
            <InputTextDefault
                label="Nama Produk"
                name="product_nm"
                register={register}
                required
                minLength={2}
                errors={errors.product_nm}
                addClass="col-span-8"
            />
            <InputRupiah
                label="Harga"
                control={control}
                name="price"
                errors={errors.price}
                addClass="col-span-8"
                required
                minLength={0}
            />
            <InputTextDefault
                label="Stok"
                name="stock"
                register={register}
                required
                min={1}
                type="number"
                valueAsNumber
                errors={errors.stock}
                addClass="col-span-8"
            />
        </>
    );
};

export default BodyForm;

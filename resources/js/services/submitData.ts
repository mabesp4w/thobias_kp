import { showToast } from "@/lib/showToast";

type Props = {
    row: any;
    dtEdit?: any;
    setIsLoading: (value: boolean) => void;
    setShowModal?: (value: boolean) => void;
    addData?: any;
    updateData?: any;
    resetForm?: () => void;
    goTo?: any;
};

// export default function
export default async function submitData({
    row,
    dtEdit,
    setIsLoading,
    setShowModal,
    addData,
    updateData,
    resetForm,
    goTo,
}: Props) {
    setIsLoading(true);
    // jika dtEdit tidak kosong maka update
    if (dtEdit) {
        const { data } = await updateData(dtEdit.id, row);
        showToast({
            type: data?.type,
            description: data?.message,
        });
        if (data?.type === "success") {
            setShowModal && setShowModal(false);
        }
        console.log("update");
        goTo && goTo();
    } else {
        const { data } = await addData(row);
        showToast({
            type: data?.type,
            description: data?.message,
        });
        if (data?.type === "success") {
            console.log("simpan");
            resetForm && resetForm();
            goTo && goTo();
        }
    }
    setIsLoading(false);
}

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import Login from "@/Pages/User/auth/Login";
import { PersonIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Form from "@/Pages/User/akun/Form";
type Props = {};

const Akun = (props: Props) => {
    const [open, setOpen] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [user, setUser] = useState<any>();
    const [isChange, setIsChange] = useState(false);

    // cek statue
    const cek = async () => {
        const res = await axios.get("/status");
        setUser(res.data.user);
        console.log("cek");
    };

    useEffect(() => {
        const handleCartChange = () => setOpen(true);
        const akunUpdated = () => setIsChange(!isChange);

        window.addEventListener("checkoutUpdated", handleCartChange);
        window.addEventListener("akunUpdated", akunUpdated);
        // Cleanup saat komponen dibongkar
        return () => {
            window.removeEventListener("checkoutUpdated", handleCartChange);
            window.removeEventListener("akunUpdated", akunUpdated);
        };
    }, []);

    useEffect(() => {
        cek();
    }, [open, isChange]);

    const logout = () => {
        // method post
        axios
            .post("/logout")
            .then((res) => {
                window.dispatchEvent(new Event("cartUpdated"));
                window.dispatchEvent(new Event("productUpdated"));
                setUser(null);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <>
            <div
                className="flex items-center relative cursor-pointer select-none"
                onClick={() => setOpen(true)}
            >
                <PersonIcon />
            </div>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent className="">
                    <SheetHeader>
                        <SheetTitle>Akun anda</SheetTitle>
                    </SheetHeader>
                    <div className="h-full ">
                        {!user && <Login />}
                        {user && (
                            <div className="flex flex-col justify-between h-full pb-2">
                                <div>
                                    <div className="flex flex-col gap-y-2">
                                        <div className="border-t border-gray-200">
                                            <dl>
                                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                    <dt className="text-sm font-medium text-gray-500">
                                                        Nama
                                                    </dt>
                                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                        {user.name}
                                                    </dd>
                                                </div>
                                                {user.user_info?.length > 0 && (
                                                    <div className="text-sm flex flex-col gap-y-2 items-center">
                                                        <div className="mb-4">
                                                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                                <dt className="text-sm font-medium text-gray-500">
                                                                    Penerima
                                                                </dt>
                                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                    {
                                                                        user
                                                                            .user_info[0]
                                                                            .nm_user
                                                                    }
                                                                </dd>
                                                            </div>
                                                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                                <dt className="text-sm font-medium text-gray-500">
                                                                    No. HP
                                                                </dt>
                                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                    {
                                                                        user
                                                                            .user_info[0]
                                                                            .phone_number
                                                                    }
                                                                </dd>
                                                            </div>
                                                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                                <dt className="text-sm font-medium text-gray-500">
                                                                    Alamat
                                                                </dt>
                                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                    {
                                                                        user
                                                                            .user_info[0]
                                                                            .village
                                                                            .sub_district
                                                                            .sub_district_nm
                                                                    }
                                                                    -
                                                                    {
                                                                        user
                                                                            .user_info[0]
                                                                            .village
                                                                            .village_nm
                                                                    }
                                                                    ,
                                                                    {
                                                                        user
                                                                            .user_info[0]
                                                                            .address
                                                                    }
                                                                </dd>
                                                            </div>
                                                        </div>
                                                        <Button
                                                            onClick={() =>
                                                                setOpenForm(
                                                                    true
                                                                )
                                                            }
                                                            type="button"
                                                            variant={"outline"}
                                                            className="border border-secondary hover:bg-secondary hover:text-secondary-foreground"
                                                        >
                                                            Ubah
                                                        </Button>
                                                    </div>
                                                )}
                                                {!user.user_info && (
                                                    <div className="text-sm flex flex-col gap-y-2 items-center mt-10">
                                                        <p>
                                                            Anda belum
                                                            melengkapi data
                                                        </p>
                                                        <Button
                                                            onClick={() =>
                                                                setOpenForm(
                                                                    true
                                                                )
                                                            }
                                                            type="button"
                                                            variant={"outline"}
                                                            className="border border-secondary hover:bg-secondary hover:text-secondary-foreground"
                                                        >
                                                            Lengkapi
                                                        </Button>
                                                    </div>
                                                )}
                                                <Form
                                                    openDialog={openForm}
                                                    setOpenDialog={setOpenForm}
                                                    halaman="Detail Akun"
                                                    user={user}
                                                />
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                                <Button onClick={logout}>Logout</Button>
                            </div>
                        )}
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
};

export default Akun;

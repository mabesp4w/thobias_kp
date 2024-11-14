import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import Login from "@/Pages/User/auth/Login";
import { usePage } from "@inertiajs/react";
import { PersonIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
type Props = {};

const Akun = (props: Props) => {
    const { auth } = usePage().props;
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState<any>(auth?.user);
    useEffect(() => {
        const handleCartChange = () => setOpen(true);

        window.addEventListener("checkoutUpdated", handleCartChange);

        // Cleanup saat komponen dibongkar
        return () => {
            window.removeEventListener("checkoutUpdated", handleCartChange);
        };
    }, []);

    console.log({ auth });
    const logout = () => {
        // method post
        axios
            .post("/logout")
            .then((res) => {
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
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Are you absolutely sure?</SheetTitle>
                        <div>
                            {!user && <Login />}
                            {user && (
                                <div>
                                    <p>{user.name}</p>
                                    <Button onClick={logout}>Logout</Button>
                                </div>
                            )}
                        </div>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </>
    );
};

export default Akun;

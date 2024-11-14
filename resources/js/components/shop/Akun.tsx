import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { PersonIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
type Props = {};

const Akun = (props: Props) => {
    const [open, setOpen] = useState(false);
    useEffect(() => {
        const handleCartChange = () => setOpen(true);

        window.addEventListener("checkoutUpdated", handleCartChange);

        // Cleanup saat komponen dibongkar
        return () => {
            window.removeEventListener("checkoutUpdated", handleCartChange);
        };
    }, []);
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
                        <SheetDescription>test</SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </>
    );
};

export default Akun;

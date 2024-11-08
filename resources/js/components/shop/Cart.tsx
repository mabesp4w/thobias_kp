import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";
import { BsHandbag } from "react-icons/bs";
type Props = {};

const Cart = (props: Props) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <div
                className="flex items-center relative cursor-pointer select-none"
                onClick={() => setOpen(true)}
            >
                <span className="absolute -top-3 -right-[14px] bg-primary text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    2
                </span>
                <BsHandbag />
            </div>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Are you absolutely sure?</SheetTitle>
                        <SheetDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </>
    );
};

export default Cart;

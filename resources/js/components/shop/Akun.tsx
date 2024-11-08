import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { PersonIcon } from "@radix-ui/react-icons";
import { useState } from "react";
type Props = {};

const Akun = (props: Props) => {
    const [open, setOpen] = useState(false);
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

export default Akun;

import { Dispatch, FC, ReactNode, SetStateAction } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

type Props = {
    openDialog: boolean;
    setOpenDialog: Dispatch<SetStateAction<boolean>>;
    children: ReactNode;
    title?: string;
    className?: string;
};

const DefaultDialog: FC<Props> = ({
    openDialog,
    setOpenDialog,
    children,
    title,
    className,
}) => {
    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent
                className={`sm:max-w-[525px] max-h-[90vh] overflow-auto ${className}`}
            >
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    );
};

export default DefaultDialog;

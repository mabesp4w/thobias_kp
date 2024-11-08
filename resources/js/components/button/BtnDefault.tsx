/** @format */

import { FC, ReactNode } from "react";
import { Button } from "../ui/button";

type Props = {
    children?: ReactNode;
    addClass?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
};

const BtnDefault: FC<Props> = ({
    children,
    onClick,
    addClass = "",
    type = "button",
}) => {
    return (
        <Button type={type} className={`${addClass}`} onClick={onClick}>
            {children}
        </Button>
    );
};

export default BtnDefault;

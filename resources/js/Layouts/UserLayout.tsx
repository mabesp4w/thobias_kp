import LuxyWrapper from "@/components/effects/LuxyWrapper";
import HeaderComp from "@/components/header/HeaderComp";
import { FC, ReactNode } from "react";

interface Props {
    children: ReactNode;
}

const UserLayout: FC<Props> = ({ children }) => {
    return (
        <LuxyWrapper className="flex flex-col text-[16px] min-h-full font-Cocomat-Pro">
            <header className="container">
                <HeaderComp />
            </header>
            <main className="flex grow">{children}</main>
            <footer>User Footer</footer>
        </LuxyWrapper>
    );
};

export default UserLayout;

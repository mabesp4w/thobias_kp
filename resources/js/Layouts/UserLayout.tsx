import LuxyWrapper from "@/components/effects/LuxyWrapper";
import FooterComp from "@/components/footer/FooterComp";
import HeaderComp from "@/components/header/HeaderComp";
import HeaderFixed from "@/components/header/HeaderFixed";
import { FC, ReactNode } from "react";

interface Props {
    children: ReactNode;
}

const UserLayout: FC<Props> = ({ children }) => {
    return (
        <>
            <HeaderFixed />

            <LuxyWrapper className="flex flex-col text-[16px] min-h-full font-Cocomat-Pro">
                <header className="container">
                    <HeaderComp />
                </header>

                <main className="flex grow mb-10 -mt-6 overflow-auto">
                    {children}
                </main>
                <FooterComp />
            </LuxyWrapper>
        </>
    );
};

export default UserLayout;

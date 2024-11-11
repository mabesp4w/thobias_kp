import LuxyWrapper from "@/components/effects/LuxyWrapper";
import HeaderComp from "@/components/header/HeaderComp";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import { router } from "@inertiajs/react";
import { FC, ReactNode, useEffect, useState } from "react";

interface Props {
    children: ReactNode;
}

const UserLayout: FC<Props> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(true);
        if (window.history.length > 1) {
            const url = window?.history?.state?.url;
            if (url) {
                console.log({ url });
                const splitUrl = url && url.split("/");
                const refresh = splitUrl[1];
                console.log({ refresh });
                if (refresh !== "refresh" && url !== "/") {
                    console.log("refresh");
                    router.visit(`/refresh${url}`);
                }
                if (url === "/") {
                    router.visit("/refresh/home");
                }
            } else {
                router.visit("/refresh/home"); // Redirect ke halaman utama
            }
        } else {
            // Tidak ada riwayat halaman sebelumnya
            router.visit("/refresh/home"); // Redirect ke halaman utama
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 100);
        return () => {};
    }, []);

    return (
        <LuxyWrapper className="flex flex-col text-[16px] min-h-full font-Cocomat-Pro">
            <header className="container">
                <HeaderComp />
            </header>
            {isLoading ? (
                <div className="flex items-center justify-center h-screen w-full">
                    <LoadingSpiner />
                </div>
            ) : (
                <main className="flex grow mb-10">{children}</main>
            )}
            <footer>User Footer</footer>
        </LuxyWrapper>
    );
};

export default UserLayout;

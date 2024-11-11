import LoadingSpiner from "@/components/loading/LoadingSpiner";
import { router } from "@inertiajs/react";
import { useEffect } from "react";

const RefreshHandler = ({ url }: any) => {
    console.log("refresh");
    console.log({ url });
    useEffect(() => {
        if (url !== "home") {
            setTimeout(() => router.visit(`/${url}`), 1500);
        }
        if (url === "home") {
            setTimeout(() => router.visit("/"), 1500);
        }
    }, []);

    return (
        <div className="flex items-center justify-center h-screen w-full">
            <LoadingSpiner />
        </div>
    );
};

export default RefreshHandler;

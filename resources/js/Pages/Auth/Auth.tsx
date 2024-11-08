/** @format */
"use client";
import { useEffect, useState } from "react";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import useLogin from "@/store/auth/login";

const Auth = () => {
    // state
    const [isLoading, setIsLoading] = useState(true);
    const { pathname } = window.location;
    const { cekToken } = useLogin();
    const getCek = async () => {
        const res = await cekToken();
        if (res?.error) {
            // redirect to login
            window.location.href = "/login";
            console.log({ res });
        }
        return res;
    };

    useEffect(() => {
        getCek();
        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    const loadData = async () => {
        const cek = await getCek();
        if (!cek?.error) {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadData();
        console.log("pertama render");
        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) {
        return (
            <div className="flex absolute inset-0 bg-white min-h-screen h-screen justify-center items-center z-50">
                <LoadingSpiner />
            </div>
        );
    }
    return null;
};

export default Auth;

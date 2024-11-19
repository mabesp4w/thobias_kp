/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */

import { router } from "@inertiajs/react";
import axios from "axios";

type LogoutResponse = {
    status: string;
};

type Props = {
    setLogout: () => Promise<LogoutResponse>;
    setLoadLogout: React.Dispatch<React.SetStateAction<boolean>>;
};
const handleLogout = async ({ setLogout, setLoadLogout }: Props) => {
    setLoadLogout(true);
    // method post
    axios
        .post("/logout")
        .then((res) => {
            window.dispatchEvent(new Event("cartUpdated"));
            window.dispatchEvent(new Event("productUpdated"));
            router.visit("/");
        })
        .catch((err) => {
            console.log(err);
        });
    setLoadLogout(false);
};

export default handleLogout;

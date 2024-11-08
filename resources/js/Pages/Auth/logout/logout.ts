/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */

import Cookies from "js-cookie"; /** @format */

type LogoutResponse = {
    status: string;
};

type Props = {
    setLogout: () => Promise<LogoutResponse>;
    setLoadLogout: React.Dispatch<React.SetStateAction<boolean>>;
};
const handleLogout = async ({ setLogout, setLoadLogout }: Props) => {
    setLoadLogout(true);
    const res = await setLogout();
    if (res?.status === "success") {
        // delete cookie
        Cookies.remove("token");
        Cookies.remove("role");
        Cookies.remove("user");
        return (window.location.href = "/");
    }
};

export default handleLogout;

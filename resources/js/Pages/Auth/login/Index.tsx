/** @format */

import { Head } from "@inertiajs/react";
import Form from "./Form";

const Login = () => {
    return (
        <div className="min-h-screen bg-2 bg-cover bg-center flex flex-col justify-center ">
            <Head title="Login" />
            <div className="px-10 pb-10 xs:p-0">
                <div className="backdrop-blur-lg shadow w-full rounded-lg pb-3  mx-auto md:w-full md:max-w-md">
                    <Form />
                </div>
            </div>
        </div>
    );
};

export default Login;

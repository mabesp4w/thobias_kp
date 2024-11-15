import LoadingSpiner from "@/components/loading/LoadingSpiner";
import { Button } from "@/components/ui/button";
import { Head, useForm } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";

type Props = {};

const Login = (props: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        setIsLoading(true);
        e.preventDefault();
        await axios
            .post("/login", data)
            .then((res) => {
                window.dispatchEvent(new Event("cartUpdated"));
                window.dispatchEvent(new Event("akunUpdated"));
                window.dispatchEvent(new Event("productUpdated"));
            })
            .catch((err) => {
                console.log(err);
            });
        setIsLoading(false);
    };

    return (
        <>
            <Head title="Login" />
            <div>
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-md p-8 bg-white rounded shadow"
                >
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                        {errors.email && (
                            <div className="text-red-600 text-sm mt-1">
                                {errors.email}
                            </div>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                        {errors.password && (
                            <div className="text-red-600 text-sm mt-1">
                                {errors.password}
                            </div>
                        )}
                    </div>
                    <div className="flex justify-center">
                        {isLoading && <LoadingSpiner />}
                        {!isLoading && (
                            <Button
                                type="submit"
                                disabled={processing}
                                className="w-full"
                            >
                                Login
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;

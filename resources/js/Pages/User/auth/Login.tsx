import LoadingSpiner from "@/components/loading/LoadingSpiner";
import { Button } from "@/components/ui/button";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { showToast } from "@/lib/showToast";

type Props = {
    onSwitch: () => void;
    flipVariants: any;
    cek: () => void;
};

const Login = ({ onSwitch, flipVariants, cek }: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        setIsLoading(true);
        e.preventDefault();
        try {
            const res = await axios.post("/login", data);
            window.dispatchEvent(new Event("cartUpdated"));
            window.dispatchEvent(new Event("akunUpdated"));
            window.dispatchEvent(new Event("productUpdated"));
            cek();
        } catch (error: any) {
            const { type, message } = error.response.data;
            console.log("Error data:", error.response.data);
            showToast({
                type,
                description: message,
            });
        }
        setIsLoading(false);
    };

    return (
        <>
            <Head title="Login" />
            <motion.div
                variants={flipVariants}
                initial="enter"
                animate="center"
                exit="exit"
            >
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
                <div>
                    <p>
                        Belum punya akun?{" "}
                        <button
                            className="text-secondary hover:underline"
                            onClick={onSwitch}
                        >
                            Daftar
                        </button>
                    </p>
                </div>
            </motion.div>
        </>
    );
};

export default Login;

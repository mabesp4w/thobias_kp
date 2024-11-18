import LoadingSpiner from "@/components/loading/LoadingSpiner";
import { Button } from "@/components/ui/button";
import { showToast } from "@/lib/showToast";
import { Head, useForm } from "@inertiajs/react";
import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";

type Props = {
    onSwitch: () => void;
    flipVariants: any;
};

const Register = ({ onSwitch, flipVariants }: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        setIsLoading(true);
        e.preventDefault();

        try {
            const response = await axios.post("/register", data);
            console.log("Response:", response);
            window.dispatchEvent(new Event("cartUpdated"));
            window.dispatchEvent(new Event("akunUpdated"));
            window.dispatchEvent(new Event("productUpdated"));
            setIsLoading(false);
        } catch (error: any) {
            if (error.response) {
                const { type, message } = error.response.data;
                // Request made and server responded
                console.log("Error data:", error.response.data);
                showToast({
                    type,
                    description: message,
                });
                setIsLoading(false);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error message:", error.message);
                setIsLoading(false);
            }
        }
    };

    return (
        <>
            <Head title="Register" />
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
                    <h1 className="text-2xl font-bold mb-6">Register</h1>
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                        {errors.name && (
                            <div className="text-red-600 text-sm mt-1">
                                {errors.name}
                            </div>
                        )}
                    </div>
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
                            required
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
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                        {errors.password && (
                            <div className="text-red-600 text-sm mt-1">
                                {errors.password}
                            </div>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password_confirmation"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Confirm Password
                        </label>
                        <input
                            id="password_confirmation"
                            type="password"
                            required
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                        {errors.password_confirmation && (
                            <div className="text-red-600 text-sm mt-1">
                                {errors.password_confirmation}
                            </div>
                        )}
                    </div>
                    {isLoading && <LoadingSpiner />}
                    {!isLoading && (
                        <Button
                            type="submit"
                            disabled={processing}
                            className="w-full"
                        >
                            Register
                        </Button>
                    )}
                </form>
                <div>
                    <p>
                        Sudah punya akun?{" "}
                        <button
                            className="text-secondary hover:underline"
                            onClick={onSwitch}
                        >
                            Login
                        </button>
                    </p>
                </div>
            </motion.div>
        </>
    );
};

export default Register;

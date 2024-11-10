import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";

const RefreshHandler = () => {
    const { props } = usePage();

    useEffect(() => {
        if (window.history.length > 1) {
            // Ada halaman sebelumnya
            window.history.back();
        } else {
            // Tidak ada riwayat halaman sebelumnya
            setTimeout(() => Inertia.visit("/"), 50); // Redirect ke halaman utama
        }
    }, []);

    return null;
};

export default RefreshHandler;

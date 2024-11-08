import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import AdminLayout from "./Layouts/AdminLayout";
import UserLayout from "./Layouts/UserLayout";

const appName = import.meta.env.VITE_APP_NAME || "Toko Online";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx")
        ).then((module) => {
            const Page = (module as any).default;
            // Tentukan layout berdasarkan nama halaman
            Page.layout =
                Page.layout ||
                ((page: any) => {
                    if (name.startsWith("Admin")) {
                        return <AdminLayout>{page}</AdminLayout>;
                    } else if (name.startsWith("User")) {
                        return <UserLayout>{page}</UserLayout>;
                    }
                    return page;
                });
            return Page;
        }),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: "#4B5563",
    },
});

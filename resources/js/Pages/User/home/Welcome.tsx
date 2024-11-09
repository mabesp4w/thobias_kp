import BannersTypes from "@/types/Banners";
import { Head } from "@inertiajs/react";
import Banners from "./Banners";

interface Props {
    banners: BannersTypes[];
}

export default function Welcome({ banners }: Props) {
    return (
        <>
            <Head title="Home" />
            <main className="grow flex flex-col">
                <Banners banners={banners} />
                <h1 className="text-secondary">Hallo User 14234242</h1>
            </main>
        </>
    );
}

import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useOrdersApi from "@/store/api/Orders";
import History from "./History";
import { User } from "@/types";
import Tunggu from "./Tunggu";

type Props = {
    MIDTRANS_CLIENT_KEY?: string;
    user: User;
};

const Orders = ({ MIDTRANS_CLIENT_KEY, user }: Props) => {
    // state
    const [tabStatus, setTabStatus] = useState("tunggu");
    const [snapLoaded, setSnapLoaded] = useState<boolean>(false);
    // store
    const { setOrdersAll, dtOrders } = useOrdersApi();

    useEffect(() => {
        // event cartUpdated
        window.dispatchEvent(new Event("cartUpdated"));
    }, []);

    // useEffect
    useEffect(() => {
        // Memuat skrip Snap.js
        const script = document.createElement("script");
        script.src = "https://app.sandbox.midtrans.com/snap/snap.js"; // URL untuk sandbox atau production
        //  get MIDTRANS_CLIENT_KEY from .env
        script.setAttribute("data-client-key", MIDTRANS_CLIENT_KEY || "");
        script.onload = () => setSnapLoaded(true);
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleTabChange = async (value: string) => {
        await setOrdersAll({ status: value, user_id: user.id });
    };

    useEffect(() => {
        handleTabChange(tabStatus);
    }, []);

    console.log({ dtOrders });

    return (
        <main className="container mt-10">
            <Head title="Orders" />
            <Tabs
                defaultValue="tunggu"
                onValueChange={handleTabChange}
                className="w-full"
            >
                <TabsList>
                    <TabsTrigger value="tunggu">Tunggu</TabsTrigger>
                    <TabsTrigger value="selesai,dibayar,dikirim">
                        Selesai
                    </TabsTrigger>
                    <TabsTrigger value="expired">Batal</TabsTrigger>
                </TabsList>
                <TabsContent value="tunggu">
                    {dtOrders.length > 0 ? (
                        dtOrders.map((item) => (
                            <Tunggu key={item.id} order={item} snapLoaded />
                        ))
                    ) : (
                        <section className="container mt-10">
                            <h1 className="text-center font-bold">
                                Tidak ada pesanan
                            </h1>
                        </section>
                    )}
                </TabsContent>
                <TabsContent value="selesai,dibayar,dikirim">
                    {dtOrders.length > 0 ? (
                        dtOrders.map((item) => (
                            <History key={item.id} order={item} />
                        ))
                    ) : (
                        <section className="container mt-10">
                            <h1 className="text-center font-bold">
                                Tidak ada pesanan
                            </h1>
                        </section>
                    )}
                </TabsContent>
                <TabsContent value="expired">
                    {dtOrders.length > 0 ? (
                        dtOrders.map((item) => (
                            <History key={item.id} order={item} />
                        ))
                    ) : (
                        <section className="container mt-10">
                            <h1 className="text-center font-bold">
                                Tidak ada pesanan
                            </h1>
                        </section>
                    )}
                </TabsContent>
            </Tabs>
        </main>
    );
};

export default Orders;

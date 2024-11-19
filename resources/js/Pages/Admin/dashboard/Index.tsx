import ScrollRevealComponent from "@/components/effects/ScrollRevealComponent";
import { Head } from "@inertiajs/react";

const Dashboard: React.FC = () => {
    return (
        <>
            <Head title="Dashboard Admin" />
            <ScrollRevealComponent>
                <h2 className="text-center text-2xl">Admin panel</h2>
            </ScrollRevealComponent>
        </>
    );
};

export default Dashboard;

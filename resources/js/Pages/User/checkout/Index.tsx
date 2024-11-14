import CartsTypes from "@/types/Carts";

type Props = {
    carts: CartsTypes[];
};

const Index = ({ carts }: Props) => {
    console.log({ carts });
    return <section className="container mt-10">Index</section>;
};

export default Index;

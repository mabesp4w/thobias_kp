import { BsSearch } from "react-icons/bs";
import NavbarComp from "../navbar/NavbarComp";
import Cart from "../shop/Cart";
import Wishlist from "../shop/Wishlist";
import Akun from "../shop/Akun";

type Props = {};

const HeaderComp = (props: Props) => {
    return (
        <main className="flex flex-col mb-20">
            <section className="h-24 flex justify-between items-center">
                {/* brand */}
                <div className="flex items-center gap-x-24 w-full grow">
                    <div className="flex gap-1 text-2xl text-primary">
                        <span className="font-Redkits text-4xl">
                            Erta Beauty
                        </span>
                    </div>
                    {/* search */}
                    <div className="flex items-center border rounded-full px-3 w-96">
                        <input
                            className="border-none focus-visible:ring-0 outline-none w-full"
                            placeholder="Cari"
                        />
                        <BsSearch />
                    </div>
                </div>
                {/* login & cart */}
                <div className="flex items-center gap-6">
                    <Akun />
                    <Wishlist />
                    <Cart />
                </div>
            </section>
            {/* navbar */}
            <section className="bg-primary absolute left-0 right-0 top-24 h-14 flex justify-between items-center">
                <NavbarComp />
            </section>
        </main>
    );
};

export default HeaderComp;

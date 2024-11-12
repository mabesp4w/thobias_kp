import { BsSearch } from "react-icons/bs";
import Cart from "../shop/Cart";
import Wishlist from "../shop/Wishlist";
import Akun from "../shop/Akun";
import NavbarComp from "../navbar/NavbarComp";

type Props = {};

const HeaderComp = (props: Props) => {
    return (
        <main className="flex flex-col md:mb-20">
            <section className="h-24 flex justify-between items-center">
                {/* brand */}
                <div className="flex items-center gap-x-24 w-full grow">
                    <div className="flex gap-1 text-2xl text-primary">
                        <span className="font-Redkits lg:text-4xl md:text-5xl sm:text-4xl text-3xl">
                            Erta Beauty
                        </span>
                    </div>
                    {/* search */}
                    <div className="md:flex items-center border rounded-full px-3 w-96 hidden">
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
            <section
                id="navbar"
                className="bg-primary absolute top-24 left-0 right-0 h-14 hidden md:flex justify-between items-center"
            >
                <NavbarComp />
            </section>
        </main>
    );
};

export default HeaderComp;

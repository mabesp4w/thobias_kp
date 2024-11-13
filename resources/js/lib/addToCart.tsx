import Cookies from "js-cookie";

const addToCart = async (productId: string, quantity: number) => {
    // const isLoggedIn = checkLoginStatus(); // Fungsi untuk mengecek status login
    const isLoggedIn = false;

    if (isLoggedIn) {
        await fetch("/api/cart", {
            method: "POST",
            body: JSON.stringify({ productId }),
        });
    } else {
        // Ambil cart dari cookies atau buat array kosong jika belum ada
        const cart = JSON.parse(Cookies.get("cart") || "[]");

        // Cari produk dalam cart berdasarkan productId
        const existingProduct = cart.find(
            (item: { productId: string }) => item.productId === productId
        );

        if (existingProduct) {
            // Jika produk sudah ada, tambah quantity
            existingProduct.quantity += quantity;
        } else {
            // Jika produk belum ada, tambahkan produk baru ke cart
            cart.push({ productId, quantity });
        }

        // Simpan kembali cart ke cookies
        Cookies.set("cart", JSON.stringify(cart));

        // Memicu event custom untuk memperbarui komponen cart
        window.dispatchEvent(new Event("cartUpdated"));
    }
};

export default addToCart;

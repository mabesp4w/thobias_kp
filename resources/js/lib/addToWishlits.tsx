import Cookies from "js-cookie";

const addToWishlist = async (product_id: string) => {
    // const isLoggedIn = checkLoginStatus(); // Fungsi untuk mengecek status login
    const isLoggedIn = false;

    if (isLoggedIn) {
        await fetch("/api/wish", {
            method: "POST",
            body: JSON.stringify({ product_id }),
        });
    } else {
        // Ambil wish dari cookies atau buat array kosong jika belum ada
        const wish = JSON.parse(Cookies.get("wish") || "[]");

        // Cari produk dalam wish berdasarkan product_id
        const existingProduct = wish.find(
            (item: { product_id: string }) => item.product_id === product_id
        );

        if (existingProduct) {
            // Jika produk sudah ada, tambah quantity
            // existingProduct.quantity += quantity;
        } else {
            // Jika produk belum ada, tambahkan produk baru ke wish
            wish.push({ product_id });
        }

        // Simpan kembali wish ke cookies
        Cookies.set("wish", JSON.stringify(wish));

        // Memicu event custom untuk memperbarui komponen wish
        window.dispatchEvent(new Event("wishUpdated"));
    }
};

export default addToWishlist;

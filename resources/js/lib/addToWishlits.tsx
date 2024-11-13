import Cookies from "js-cookie";

const addToWishlist = async (productId: string) => {
    // const isLoggedIn = checkLoginStatus(); // Fungsi untuk mengecek status login
    const isLoggedIn = false;

    if (isLoggedIn) {
        await fetch("/api/wish", {
            method: "POST",
            body: JSON.stringify({ productId }),
        });
    } else {
        // Ambil wish dari cookies atau buat array kosong jika belum ada
        const wish = JSON.parse(Cookies.get("wish") || "[]");

        // Cari produk dalam wish berdasarkan productId
        const existingProduct = wish.find(
            (item: { productId: string }) => item.productId === productId
        );

        if (existingProduct) {
            // Jika produk sudah ada, tambah quantity
            // existingProduct.quantity += quantity;
        } else {
            // Jika produk belum ada, tambahkan produk baru ke wish
            wish.push({ productId });
        }

        // Simpan kembali wish ke cookies
        Cookies.set("wish", JSON.stringify(wish));

        // Memicu event custom untuk memperbarui komponen wish
        window.dispatchEvent(new Event("wishUpdated"));
    }
};

export default addToWishlist;

import axios from "axios";

const addToCart = async (
    productId: string,
    quantity: number,
    isLoggedIn: boolean
) => {
    // const isLoggedIn = checkLoginStatus(); // Fungsi untuk mengecek status login
    const endpoint = isLoggedIn
        ? "/carts/addToCartDatabase"
        : "/carts/addToCartSession";

    await axios.post(endpoint, { product_id: productId, quantity });

    // Memicu event custom untuk memperbarui komponen cart
    window.dispatchEvent(new Event("cartUpdated"));
};

export default addToCart;

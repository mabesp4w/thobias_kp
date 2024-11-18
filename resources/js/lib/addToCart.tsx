import axios from "axios";

interface Props {
    productId: string;
    quantity?: number;
    isLoggedIn: boolean;
    costumQuantity?: number;
}

const addToCart = async ({
    productId,
    quantity = 1,
    isLoggedIn,
    costumQuantity,
}: Props) => {
    let endpoint = "";
    if (isLoggedIn) {
        if (costumQuantity) {
            endpoint = "/carts/setCartQuantity";
        } else {
            endpoint = "/carts/addToCartDatabase";
        }
    } else {
        endpoint = "/carts/addToCartSession";
    }

    if (costumQuantity) {
        quantity = costumQuantity;
    }

    await axios.post(endpoint, { product_id: productId, quantity });

    // Memicu event custom untuk memperbarui komponen cart
    window.dispatchEvent(new Event("cartUpdated"));
};

export default addToCart;

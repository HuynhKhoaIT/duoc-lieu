import { useState } from "react";
import { useRouter } from "next/router";

import paths from "@/constants/paths";
import useAlert from "@/hooks/useAlert";
import useCart from "@/hooks/useCart";

export default function useProductDetail() {
    const router = useRouter();
    const { addToCart } = useCart();
    const { showAlert } = useAlert();

    const [ quantity, setQuantity ] = useState(1);

    const increaseQuantity = () => setQuantity((prev) => prev + 1);

    const decreaseQuantity = () =>
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    const changeQuantity = (value) => {
        const val = parseInt(value, 10);
        setQuantity(isNaN(val) || val < 1 ? 1 : val);
    };

    const buyNow = async (item) => {
        try {
            await addToCart({ item, qty: quantity });
            router.push(paths.checkOut);
        } catch (error) {
            console.error("Lỗi khi mua ngay:", error);
            showAlert("Không thể thực hiện mua ngay", "error");
        }
    };

    return {
        quantity,
        increaseQuantity,
        decreaseQuantity,
        changeQuantity,
        buyNow,
        addToCart, // expose từ useCart để ProductDetail có thể gọi trực tiếp
    };
}

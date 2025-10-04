import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { storageKeys } from "@/constants";
import { useGlobalContext } from "@/contexts/GlobalContext";
import useAuth from "@/hooks/useAuth";
import { getLocalData, setLocalData } from "@/utils/localStorage";

export default function useCart(initialData) {
    const { isAuthenticated } = useAuth();

    const { cart, setCart, data, setData } = useGlobalContext();

    const [ cartItems, setCartItems ] = useState(initialData);
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        const localCart = getLocalData(storageKeys.CART_DATA) || [];
        setCartItems(localCart);
    }, [ initialData ]);

    const addToCart = async ({ item, qty = 1 }) => {
        if (!item?.id) return;

        // User chưa đăng nhập -> lưu localStorage
        const existingCart = [ ...cartItems ];
        const existingIndex = existingCart.findIndex(
            (cartItem) => cartItem.id === item.id,
        );

        if (existingIndex > -1) {
            existingCart[existingIndex].quantity += qty;
        } else {
            existingCart.push({
                id: item.id,
                product: {
                    id: item.id,
                    name: item.name,
                    thumbnail: item.thumbnail,
                    price_wholesale: item.price_wholesale,
                    price_retail: item.price_retail || null,
                    type: item.type,
                },
                quantity: qty,
            });
        }

        setCartItems(existingCart);
        setData(existingCart); // cập nhật GlobalContext
        setLocalData(storageKeys.CART_DATA, existingCart);

        const totalQty = existingCart.reduce(
            (sum, cartItem) => sum + cartItem.quantity,
            0,
        );
        setCart(totalQty);

        toast.success("Thêm vào giỏ hàng thành công");
        return;
    };

    const incrementQty = async (item) => {
        const updatedCart = cartItems.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
        setCartItems(updatedCart);
        setData(updatedCart);
        setLocalData(storageKeys.CART_DATA, updatedCart);
        setCart(cart + 1);
        return;
    };

    const decrementQty = async (item) => {
        if (item?.quantity === 1) {
            removeItem(item);
            return;
        }

        const updatedCart = cartItems.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i,
        );
        setCartItems(updatedCart);
        setData(updatedCart);
        setLocalData(storageKeys.CART_DATA, updatedCart);
        setCart(cart - 1);
        return;
    };

    const removeItem = async (item) => {
        const updatedCart = cartItems.filter((i) => i.id !== item.id);
        setCartItems(updatedCart);
        setData(updatedCart);
        setLocalData(storageKeys.CART_DATA, updatedCart);
        setCart(cart - item.quantity);
        return;
    };
    /** --------------------------
     *  Cập nhật số lượng nhập trực tiếp
     * -------------------------- */
    const updateQty = async (item, newQty) => {
        // Nếu value là "" thì giữ nguyên để user tiếp tục nhập
        if (newQty === "") {
            const updatedCart = cartItems.map((i) =>
                i.id === item.id ? { ...i, quantity: "" } : i,
            );
            setCartItems(updatedCart);
            return;
        }

        // Sau khi có số hợp lệ, đảm bảo trong khoảng 1 - 100
        let qty = parseInt(newQty, 10);
        if (isNaN(qty) || qty < 1) qty = 1;

        const updatedCart = cartItems.map((i) =>
            i.id === item.id ? { ...i, quantity: qty } : i,
        );

        setCartItems(updatedCart);
        setData(updatedCart);
        setLocalData(storageKeys.CART_DATA, updatedCart);

        const totalQty = updatedCart.reduce(
            (sum, cartItem) => sum + (parseInt(cartItem.quantity, 10) || 0),
            0,
        );
        setCart(totalQty);
    };

    const totalPrice = useMemo(() => {
        if (!Array.isArray(cartItems)) return 0;

        return cartItems.reduce((acc, item) => {
            const price = isAuthenticated
                ? item?.product?.price_wholesale
                : item?.product?.price_retail;

            return acc + (price || 0) * (item?.quantity || 0);
        }, 0);
    }, [ cartItems, isAuthenticated ]);

    const totalQty = useMemo(() => {
        return Array.isArray(cartItems)
            ? cartItems.reduce((acc, item) => acc + (item?.quantity || 0), 0)
            : 0;
    }, [ cartItems ]);

    return {
        cartItems,
        loading,
        totalPrice,
        totalQty,
        addToCart,
        incrementQty,
        decrementQty,
        removeItem,
        setCartItems,
        updateQty,
    };
}

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { storageKeys } from "@/constants";
import { useGlobalContext } from "@/contexts/GlobalContext";
import useAuth from "@/hooks/useAuth";
import { getLocalData, setLocalData } from "@/utils/localStorage";

export default function useCart(initialData) {
    const { isAuthenticated } = useAuth();
    const { cart, setCart,data, setData } = useGlobalContext();

    const [ cartItems, setCartItems ] = useState(initialData);
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            const localCart = getLocalData(storageKeys.CART_DATA) || [];
            setCartItems(localCart);
        } else {
            setCartItems(initialData);
        }
    }, [ isAuthenticated, initialData ]);

    const addToCart = async ({ item, qty = 1 }) => {
        if (!item?.id) return;

        // User chưa đăng nhập -> lưu localStorage
        if (!isAuthenticated) {
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

            toast.success("Thêm vào giỏ hàng thành công (local)");
            return;
        }

        // User đã đăng nhập -> gọi API
        try {
            setLoading(true);

            const res = await fetch("/api/cart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    product_id: item.id,
                    quantity: qty,
                }),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result?.message || "Thêm giỏ hàng thất bại");
            }
            console.log("cartItems",cartItems);

            // Cập nhật state client-side
            const existingIndex = cartItems?.findIndex(
                (cartItem) => cartItem.product.id === item.id,
            );
            let updatedCart;

            if (existingIndex > -1) {
                updatedCart = cartItems.map((cartItem, idx) =>
                    idx === existingIndex
                        ? { ...cartItem, quantity: cartItem.quantity + qty }
                        : cartItem,
                );
            } else {
                updatedCart = [
                    ...cartItems,
                    {
                        id: result.data?.id || Math.random(), // fallback ID nếu API không trả về
                        product: item,
                        quantity: qty,
                    },
                ];
            }

            setCartItems(updatedCart);
            setData(updatedCart); // cập nhật GlobalContext
            setCart(cart + qty);

            toast.success("Thêm vào giỏ hàng thành công");
        } catch (error) {
            console.error("Lỗi khi thêm vào giỏ hàng:", error);
            toast.error(error.message || "Thêm giỏ hàng thất bại");
        } finally {
            setLoading(false);
        }
    };

    const incrementQty = async (item) => {
        if (!isAuthenticated) {
            const updatedCart = cartItems.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
            );
            setCartItems(updatedCart);
            setData(updatedCart);
            setLocalData(storageKeys.CART_DATA, updatedCart);
            setCart(cart + 1);
            return;
        }

        try {
            await fetch(`/api/cart`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    product_id: item?.product?.id,
                    quantity: 1,
                }),
            });

            const updatedCart = cartItems.map((i) =>
                i.id === item?.id ? { ...i, quantity: i.quantity + 1 } : i,
            );
            setCartItems(updatedCart);
            setData(updatedCart);
            setCart(cart + 1);
        } catch (error) {
            console.error("Lỗi khi tăng số lượng:", error);
            toast.error("Không thể tăng số lượng sản phẩm");
        }
    };

    const decrementQty = async (item) => {
        if (item?.quantity === 1) {
            removeItem(item);
            return;
        }

        if (!isAuthenticated) {
            const updatedCart = cartItems.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i,
            );
            setCartItems(updatedCart);
            setData(updatedCart);
            setLocalData(storageKeys.CART_DATA, updatedCart);
            setCart(cart - 1);
            return;
        }

        try {
            await fetch(`/api/cart/${item?.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    product_id: item?.product?.id,
                    quantity: item?.quantity - 1,
                }),
            });

            const updatedCart = cartItems.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i,
            );
            setCartItems(updatedCart);
            setData(updatedCart);
            setCart(cart - 1);
        } catch (error) {
            console.error("Lỗi khi giảm số lượng:", error);
            toast.error("Không thể giảm số lượng sản phẩm");
        }
    };

    const removeItem = async (item) => {
        if (!isAuthenticated) {
            const updatedCart = cartItems.filter((i) => i.id !== item.id);
            setCartItems(updatedCart);
            setData(updatedCart);
            setLocalData(storageKeys.CART_DATA, updatedCart);
            setCart(cart - item.quantity);
            return;
        }

        try {
            await fetch(`/api/cart/${item?.id}`, {
                method: "DELETE",
            });

            const updatedCart = cartItems.filter((i) => i.id !== item.id);
            setCartItems(updatedCart);
            setData(updatedCart);
            setCart(cart - item.quantity);
        } catch (error) {
            console.error("Lỗi khi xoá sản phẩm:", error);
            toast.error("Không thể xóa sản phẩm");
        }
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
    };
}

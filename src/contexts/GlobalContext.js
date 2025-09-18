import { createContext, useContext, useEffect, useState } from "react";

import { storageKeys } from "@/constants";
import { getLocalData } from "@/utils/localStorage";

const GlobalContext = createContext({
    data: [],
    setData: () => [],
    cart: 0,
    setCart: () => 0,
});

export const GlobalContextProvider = ({ children }) => {
    const [ data, setData ] = useState([]);
    const [ cart, setCart ] = useState(0);
    // const isLogin = getLocalData(storageKeys.IS_LOGIN);

    useEffect(() => {
        // async function fetchCart() {
        //     try {
        //         const res = await fetch("/api/cart");

        //         if (!res.ok) throw new Error("API lỗi");

        //         const json = await res.json();
        //         const cartData = json?.data || [];

        //         const totalQuantity = Array.isArray(cartData)
        //             ? cartData.reduce(
        //                 (acc, item) => acc + (item?.quantity || 0),
        //                 0,
        //             )
        //             : 0;

        //         setCart(totalQuantity);
        //         setData(cartData);
        //     } catch (err) {
        //         console.error("Lỗi khi load cart:", err);
        //     }
        // }

        // if (isLogin) {
        //     fetchCart();
        // } else {
        //     const cartData = getLocalData(storageKeys.CART_DATA);
        //     console.log(cartData);
        //     const totalQuantity = Array.isArray(cartData)
        //         ? cartData.reduce((acc, item) => acc + (item?.quantity || 0), 0)
        //         : 0;

        //     setCart(totalQuantity || 0);
        //     setData(cartData || []);
        // }
        const cartData = getLocalData(storageKeys.CART_DATA);
        console.log(cartData);
        const totalQuantity = Array.isArray(cartData)
            ? cartData.reduce((acc, item) => acc + (item?.quantity || 0), 0)
            : 0;

        setCart(totalQuantity || 0);
        setData(cartData || []);
    }, []);

    return (
        <GlobalContext.Provider value={{ data, setData, cart, setCart }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);

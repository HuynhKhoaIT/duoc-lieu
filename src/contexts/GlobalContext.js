import { storageKeys } from "@/constants";
import { getLocalData } from "@/utils/localStorage";
import { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext({
    data: [],
    setData: () => [],
    cart: 0,
    setCart: () => 0,
});

export const GlobalContextProvider = ({ children }) => {
    const [ data, setData ] = useState([]);
    const [ cart, setCart ] = useState(0);

    useEffect(() => {
        const isLogin = getLocalData(storageKeys.IS_LOGIN);
        if (!isLogin) return;

        async function fetchCart() {
            try {
                const res = await fetch("/api/cart");

                if (!res.ok) throw new Error("API lỗi");

                const json = await res.json();
                const cartData = json?.data || [];

                const totalQuantity = Array.isArray(cartData)
                    ? cartData.reduce(
                        (acc, item) => acc + (item?.quantity || 0),
                        0,
                    )
                    : 0;

                setCart(totalQuantity);
                setData(cartData);
            } catch (err) {
                console.error("Lỗi khi load cart:", err);
            }
        }

        fetchCart();
    }, []);

    return (
        <GlobalContext.Provider value={{ data, setData, cart, setCart }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);

import { createContext, useContext, useState } from 'react';

const GlobalContext = createContext({
    userId: '',
    setUserId: () => '',
    data: [],
    setData: () => [],
    cart: 0,
    setCart: () => 0,
    noti: false,
    setNoti: () => false,
});

export const GlobalContextProvider = ({ children }) => {
    const [ userId, setUserId ] = useState('');
    const [ data, setData ] = useState([]);
    const [ cart, setCart ] = useState(0);
    const [ noti, setNoti ] = useState(false);

    return (
        <GlobalContext.Provider value={{ userId, setUserId, data, setData, cart, setCart, noti, setNoti }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);

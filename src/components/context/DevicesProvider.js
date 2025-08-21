import { createContext, useContext, useEffect, useState } from "react";

const Ctx = createContext(false);

const calcDevices = (width) => width <= 1024;

function DevicesProvider({ children, initial = false }) {
    const [devices, setDevices] = useState(null); 

    useEffect(() => {
        if (typeof window === "undefined") return; 
        const value = calcDevices(window.innerWidth);
        setDevices(value);
    }, []);

    if (devices === null) return null; 

    return <Ctx.Provider value={devices}>{children}</Ctx.Provider>;
}

export function useDevices() {
    return useContext(Ctx);
}

export default DevicesProvider;

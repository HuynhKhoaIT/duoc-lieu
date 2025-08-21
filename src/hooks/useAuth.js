import { useMemo } from "react";

import { storageKeys } from "@/constants";
import { getLocalData } from "@/utils/localStorage";

// Hàm helper để lấy cookie từ client-side
const getCookie = (name) => {
    if (typeof window === "undefined") return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
};

const useAuth = () => {
    // Lấy profile từ localStorage
    const profile = getLocalData(storageKeys.PROFILE);

    // Lấy token từ cookie (client-side)
    const token = getCookie(storageKeys.TOKEN);

    // Xác định trạng thái loading
    const immediate = !!token && !profile;

    // Tối ưu với useMemo
    const authData = useMemo(() => {
        const isAuthenticated = !!token;

        return {
            isAuthenticated,
            profile: token ? profile : null,
            token: token || null,
            loading: immediate,
        };
    }, [ profile, token, immediate ]);

    return authData;
};

export default useAuth;

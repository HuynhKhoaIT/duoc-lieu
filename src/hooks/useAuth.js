import { useMemo } from "react";

import { storageKeys } from "@/constants";
import { getLocalData } from "@/utils/localStorage";

// Hàm helper: lấy cookie client-side
const getCookie = (name) => {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)"),
    );
    return match ? match[2] : null;
};

const useAuth = () => {
    // Lấy profile từ localStorage
    const profile = getLocalData(storageKeys.PROFILE);

    const authData = useMemo(() => {
        const loading = !profile;

        return {
            isAuthenticated: !!profile,
            profile: profile ? profile : null,
            loading,
        };
    }, [ profile ]);

    return authData;
};

export default useAuth;

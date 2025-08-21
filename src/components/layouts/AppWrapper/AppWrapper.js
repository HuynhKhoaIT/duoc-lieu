import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import LoadingOverlay from "@/components/Common/LoadingOverlay/LoadingOverLay";
import LoadingOverlayProvider from "@/components/Common/LoadingOverlay/LoadingOverlayProvider";
import { DEFAULT_LOCALE, ROLES_CODE, storageKeys } from "@/constants";
import { AppProvider } from "@/contexts";
import LocaleProvider from "@/locales/LocaleProvider";
import { setAuthCookie } from "@/utils/auth";

import ConfirmModalWrapper from "./ConfirmModalWrapper";

function AppWrapper({ children, locale, role, branchId }) {
    const queryClient = useQueryClient();
    const [ _locale, setLocale ] = useState(locale || DEFAULT_LOCALE);
    const [ activeRole, setActiveRole ] = useState(role);
    const [ activeBranch, setActiveBranch ] = useState(branchId);

    const isSuperAdmin = activeRole === ROLES_CODE.SUPER_ADMIN;

    const changeActiveRole = (role, branchId) => {
        setAuthCookie(storageKeys.role, role);
        setAuthCookie(storageKeys.branchId, branchId);
        setActiveRole(role);
        setActiveBranch(branchId);
        queryClient.invalidateQueries();
    };

    return (
        <AppProvider
            locale={_locale}
            setLocale={setLocale}
            isSuperAdmin={isSuperAdmin}
            activeRole={activeRole}
            activeBranch={activeBranch}
            changeActiveRole={changeActiveRole}
        >
            <LocaleProvider>
                <LoadingOverlayProvider>
                    <LoadingOverlay />
                    <ConfirmModalWrapper>{children} </ConfirmModalWrapper>
                </LoadingOverlayProvider>
            </LocaleProvider>
        </AppProvider>
    );
}

export default AppWrapper;

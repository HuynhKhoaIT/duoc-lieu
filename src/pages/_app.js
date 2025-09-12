import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Toaster } from "sonner";

import NavigateProgress from "@/components/Common/NavigateProgress";
import DevicesProvider from "@/components/context/DevicesProvider";
import AppWrapper from "@/components/layouts/AppWrapper";
import { storageKeys } from "@/constants";
import { QueryProvider } from "@/contexts";
import { GlobalContextProvider } from "@/contexts/GlobalContext";
import { NextQueryParamProvider } from "@/hocs";
import { setLocalData } from "@/utils/localStorage";

import theme from "../../theme";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "./globals.css";
import "@/assets/styles/fontawesome-override.scss";

export default function App({ Component, pageProps }) {
    const getLayout = Component.getLayout || ((page) => page);
    const router = useRouter();

    useEffect(() => {
        const checkReferral = () => {
            let referral = router.query.referral;

            if (!referral && typeof window !== "undefined") {
                const params = new URLSearchParams(window.location.search);
                referral = params.get("referral");
            }

            if (referral) {
                setLocalData(storageKeys.REFERRAL_PHONE, referral);
            }
        };

        checkReferral();
    }, [ router.query ]);

    return (
        <NextQueryParamProvider>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
                />
            </Head>

            <ThemeProvider theme={theme}>
                <CssBaseline />
                <GlobalContextProvider>
                    <QueryProvider {...pageProps}>
                        <AppWrapper {...pageProps}>
                            <DevicesProvider>
                                {getLayout(
                                    <Component {...pageProps} />,
                                    pageProps,
                                )}
                            </DevicesProvider>
                        </AppWrapper>
                    </QueryProvider>
                    <Toaster richColors closeButton position="top-center" />
                    <NavigateProgress options={{ showSpinner: false }} />
                </GlobalContextProvider>
            </ThemeProvider>
        </NextQueryParamProvider>
    );
}

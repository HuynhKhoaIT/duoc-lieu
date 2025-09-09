import Head from "next/head";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Toaster } from "sonner";

import NavigateProgress from "@/components/Common/NavigateProgress";
import DevicesProvider from "@/components/context/DevicesProvider";
import AppWrapper from "@/components/layouts/AppWrapper";
import { QueryProvider } from "@/contexts";
import { GlobalContextProvider } from "@/contexts/GlobalContext";
import { NextQueryParamProvider } from "@/hocs";

import theme from "../../theme";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "./globals.css";

export default function App({ Component, pageProps }) {
    const getLayout = Component.getLayout || ((page) => page);

    return (
        <NextQueryParamProvider>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
                />
                <meta property="og:title" content="TamPhucThanh" />
                <meta
                    property="og:description"
                    content="Dược Liệu Xanh An Lành Cho Sức Khỏe"
                />
                <meta property="og:image" content="/images/logo.png" />
                <link rel="icon" href="/images/logo.png" type="image/png" />
                <meta property="og:type" content="website" />
                <title>TamPhucThanh</title>
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

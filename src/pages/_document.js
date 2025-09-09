import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="vi">
            <Head>
                <meta name="theme-color" content="#000000" />
                <link rel="icon" href="/images/logo.png" type="image/png" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Play:wght@400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

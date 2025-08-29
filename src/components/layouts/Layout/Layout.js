import React from "react";
import Head from "next/head";
import classNames from "classnames";

import { useGlobalContext } from "@/contexts/GlobalContext";

import Breadcrumb from "../Breadcrumb";
import Footer from "../Footer";
import Header from "../Header";

import styles from "./Layout.module.scss";

function Body({ children, className }) {
    return (
        <div className={classNames(styles.content, className)}>{children}</div>
    );
}

function Root({ children, title, className }) {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <main className={classNames(styles.masterLayout, className)}>
                {children}
            </main>
        </>
    );
}

function Layout({ children, title, breadcrumb }) {
    const { cart } = useGlobalContext();
    return (
        <LayoutDesktop cart={cart} title={title} breadcrumb={breadcrumb}>
            {children}
        </LayoutDesktop>
    );
}

const LayoutDesktop = ({ title, children, cart }) => {
    return (
        <Root title={title}>
            <Header cart={cart} />
            <Body>{children}</Body>
            <Footer />
        </Root>
    );
};

Layout.Body = Body;
Layout.Root = Root;
Layout.Header = Header;
Layout.Footer = Footer;
Layout.Breadcrumb = Breadcrumb;

export default Layout;

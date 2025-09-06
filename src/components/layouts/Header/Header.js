"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { storageKeys } from "@/constants";
import paths from "@/constants/paths";
import { useGlobalContext } from "@/contexts/GlobalContext";
import useAuth from "@/hooks/useAuth";
import { removeLocalItem } from "@/utils/localStorage";

import styles from "./Header.module.scss";

export default function Header() {
    const { cart } = useGlobalContext();
    const { profile, isAuthenticated } = useAuth();
    const [ isSticky, setIsSticky ] = useState(false);
    const [ isShowMenu, setIsShowMenu ] = useState(false);
    const pathname = usePathname();
    const [ username, setUsername ] = useState("");
    const [ mounted, setMounted ] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const isActive = (href) => {
        if (!pathname) {
            return false;
        }
        if (href === "/") {
            return pathname === "/";
        }
        if (href === "/user") {
            return pathname === "/user";
        }
        return pathname.startsWith(href);
    };

    const menuConfig = [
        { path: paths.home, label: "Trang Chủ" },
        { path: paths.about, label: "Giới thiệu" },
        { path: paths.shop, label: "Sản Phẩm" },
        { path: paths.combo, label: "Đặt Hàng" },
        { path: paths.news, label: "Bài Viết" },
        { path: paths.contact, label: "Liên Hệ" },
    ];

    const menuUserConfig = [
        { path: paths.user, label: "Tổng quát" },
        { path: paths.wallet, label: "Giao dịch" },
        { path: paths.agent, label: "Đại lý" },
        { path: paths.order, label: "Đặt hàng" },
        { path: paths.bill, label: "Đơn hàng" },
        { path: paths.setting, label: "Cài đặt" },
    ];

    const isUserNav = useMemo(() => {
        return pathname?.startsWith(paths?.user);
    }, [ pathname ]);
    const activeMenu = isUserNav ? menuUserConfig : menuConfig;

    useEffect(() => {
        if (profile?.phone_number) {
            setUsername(profile.username);
        }
    }, []);

    async function handleLogout() {
        try {
            removeLocalItem(storageKeys.PROFILE);
            removeLocalItem(storageKeys.IS_LOGIN);

            await fetch("/api/account/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            window.location.href = "/login";
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }
    if (!mounted) return null;

    return (
        <div
            id="sticker-sticky-wrapper"
            className={`${styles.stickyWrapper} ${isSticky ? styles.stickyActive : ""}`}
        >
            <div
                className={`
                    ${styles.topHeaderArea} 
                    transition-colors duration-500 delay-150
                    ${isSticky ? "bg-[#008080] !py-[15px]" : "bg-transparent"}
                `}
                id="sticker"
            >
                <div className="container mx-auto relative">
                    <div className="flex align-center">
                        <div className="w-full text-center">
                            <div className={styles.mainMenuWrap}>
                                {/* logo */}
                                <div className={styles.siteLogo}>
                                    <Link
                                        href={
                                            isUserNav ? paths.user : paths.home
                                        }
                                    >
                                        <div className="relative w-[100px] h-[45px]">
                                            <Image
                                                src="/images/logo.png"
                                                alt="Logo"
                                                fill
                                                className="object-contain"
                                                priority
                                            />
                                        </div>
                                    </Link>
                                </div>
                                {/* logo */}

                                {/* menu start */}
                                <nav className={styles.mainMenu}>
                                    <ul>
                                        {activeMenu?.map((item) => (
                                            <li
                                                key={item.path}
                                                className={
                                                    isActive(item.path)
                                                        ? styles.currentListItem
                                                        : ""
                                                }
                                            >
                                                <Link href={item.path}>
                                                    {item.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                                <div className={styles.headerIcons}>
                                    <Link
                                        className={`${styles.iconLink} ${styles.mobileHide}`}
                                        href={paths.profile}
                                    >
                                        {username}
                                    </Link>

                                    {mounted && (
                                        <Link
                                            className={`${styles.iconLink} ${styles.mobileHide}`}
                                            href={
                                                isAuthenticated
                                                    ? paths.userCart
                                                    : paths.cart
                                            }
                                        >
                                            <i className="fas fa-shopping-cart">
                                                <span
                                                    className={`${styles.cartBadge} pl-1 pr-1 pt-0 pb-0`}
                                                >
                                                    {cart}
                                                </span>
                                            </i>
                                        </Link>
                                    )}

                                    {isAuthenticated ? (
                                        <a
                                            className={`${styles.iconLink} ${styles.mobileHide}`}
                                            onClick={handleLogout}
                                        >
                                            <i className="fas fa-sign-in-alt"></i>
                                        </a>
                                    ) : (
                                        <Link
                                            className={`${styles.iconLink} ${styles.mobileHide}`}
                                            href={paths.login}
                                        >
                                            <i className="fas fa-sign-in-alt"></i>
                                        </Link>
                                    )}

                                    {!isShowMenu ? (
                                        <div
                                            onClick={() => setIsShowMenu(true)}
                                            className={
                                                styles["meanmenu-reveal"]
                                            }
                                        >
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    ) : (
                                        <div
                                            onClick={() => setIsShowMenu(false)}
                                            className={
                                                styles["meanmenu-reveal"]
                                            }
                                            style={{
                                                fontSize: 18,
                                                textAlign: "center",
                                            }}
                                        >
                                            X
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`${styles["mean-bar"]} ${
                            isShowMenu ? styles.show : styles.hide
                        } transition-all duration-300 ease-in-out`}
                    >
                        <nav className={styles["mean-nav"]}>
                            <ul className="block">
                                {activeMenu?.map((item) => (
                                    <li
                                        key={item.path}
                                        onClick={() => setIsShowMenu(false)}
                                    >
                                        <Link href={item.path}>
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}

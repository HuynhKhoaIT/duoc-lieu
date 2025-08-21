"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import styles from "./Header.module.scss";

export default function Header() {
    const [ isSticky, setIsSticky ] = useState(false);

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
    return (
        <div
            id="sticker-sticky-wrapper"
            className={`${styles.stickyWrapper} ${isSticky ? styles.stickyActive : ""}`}
        >
            <div
                className={`
                    ${styles.topHeaderArea} 
                    transition-colors duration-500 delay-1000
                    ${isSticky ? "bg-[#004c49]" : "bg-transparent"}
                `}
                id="sticker"
            >
                <div className="container mx-auto">
                    <div className="flex align-center">
                        <div className="w-full text-center">
                            <div className={styles.mainMenuWrap}>
                                {/* logo */}
                                <div className={styles.siteLogo}>
                                    <Link href="/">
                                        <img
                                            src="/images/logo.png"
                                            alt="Logo"
                                            height="45"
                                        />
                                    </Link>
                                </div>
                                {/* logo */}

                                {/* menu start */}
                                <nav className={styles.mainMenu}>
                                    <ul>
                                        <li className={styles.currentListItem}>
                                            <Link href="/">Trang Chủ</Link>
                                        </li>
                                        <li>
                                            <Link href="/about">
                                                Giới Thiệu
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/shop">Sản Phẩm</Link>
                                        </li>
                                        <li>
                                            <Link href="/combo">Đặt Hàng</Link>
                                        </li>
                                        <li>
                                            <Link href="/news">Bài Viết</Link>
                                        </li>
                                        <li>
                                            <Link href="/contact">Liên Hệ</Link>
                                        </li>
                                        <li>
                                            <div className={styles.headerIcons}>
                                                <Link
                                                    className={`${styles.iconLink} ${styles.mobileHide}`}
                                                    href="/user/cart"
                                                >
                                                    <i className="fas fa-shopping-cart">
                                                        <span
                                                            className={`${styles.cartBadge} pl-1 pr-1 pt-0 pb-0`}
                                                        >
                                                            0
                                                        </span>
                                                    </i>
                                                </Link>
                                                <Link
                                                    className={`${styles.iconLink} ${styles.mobileHide}`}
                                                    href="/login"
                                                >
                                                    <i className="fas fa-sign-in-alt"></i>
                                                </Link>
                                            </div>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

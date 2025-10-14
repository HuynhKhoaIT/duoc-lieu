"use client";

import Link from "next/link";

import styles from "./Footer.module.scss";

export default function Footer() {
    return (
        <footer>
            <div className={styles.footerArea}>
                <div className="container mx-auto">
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full md:w-1/2 lg:w-1/4 px-4">
                            <div
                                className={`${styles.footerBox} ${styles.aboutWidget}`}
                            >
                                <h2 className={styles.widgetTitle}>
                                    Về chúng tôi
                                </h2>
                                <p>
                                    Một công trình nghiên cứu kinh nghiệm 22 năm
                                    của Dược Sĩ Kim Ngọc, chuyên tâm, chuyên
                                    sâu, lĩnh vực chăm sóc tóc bằng tinh dược
                                    liệu. Mang lại giá trị thiết thực, Tin Cậy,
                                    An Toàn, Hiệu Quả cho người tiêu dùng.
                                </p>
                                {/* <div
                                    style={{
                                        position: "relative",
                                        width: "200px",
                                        height: "100px",
                                    }}
                                >
                                    <Image
                                        src="/images/logo-da-thong-bao-bo-cong-thuong.webp"
                                        alt="logo-cong-thuong"
                                        fill
                                        style={{ objectFit: "contain" }}
                                    />
                                </div> */}
                            </div>
                        </div>

                        {/* Contact */}
                        <div className="w-full md:w-1/2 lg:w-1/4 px-4">
                            <div
                                className={`${styles.footerBox} ${styles.getInTouch}`}
                            >
                                <h2 className={styles.widgetTitle}>Liên hệ</h2>
                                <ul>
                                    <li>
                                        Địa chỉ: Âp 10, xã Vị Thuỷ, thành phố
                                        Cần Thơ
                                    </li>
                                    <li>Hotline: 0931.003.004</li>
                                </ul>
                            </div>
                        </div>

                        {/* Pages */}
                        <div className="w-full md:w-1/2 lg:w-1/4 px-4">
                            <div
                                className={`${styles.footerBox} ${styles.pages}`}
                            >
                                <h2 className={styles.widgetTitle}>
                                    Thông tin
                                </h2>
                                <div className="flex flex-wrap -mx-4">
                                    <ul className="w-full">
                                        <li>
                                            <Link href="/">Trang chủ</Link>
                                        </li>
                                        <li>
                                            <Link href="/about">
                                                Giới thiệu
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/shop">Sản phẩm</Link>
                                        </li>
                                        <li>
                                            <Link href="/cart">Giỏ hàng</Link>
                                        </li>
                                        <li>
                                            <Link href="/combo">Đặt hàng</Link>
                                        </li>
                                        <li>
                                            <Link href="/contact">Liên hệ</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/4 px-4">
                            <div
                                className={`${styles.footerBox} ${styles.pages}`}
                            >
                                <h2 className={styles.widgetTitle}>
                                    Chính sách
                                </h2>
                                <div className="flex flex-wrap -mx-4">
                                 
                                    <ul className="w-full">
                                        <li>
                                            <Link href="/news/2acb0ab0-9d43-42cb-9852-47abf821cb57">
                                                Chính sách về thuế
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/news/86509f0e-feb1-4af8-a3fc-af5d7d155a44">
                                                Chính sách mua hàng và đổi trả
                                            </Link>
                                        </li>
                                        <li>    
                                            <Link href="/news/c6e3cfff-5c62-4d34-ac29-51764b6542d4">
                                                Bảo mật thông tin
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/news/ecaf0e70-c79e-4786-a3c5-a559185f2a1b">
                                                Vận chuyển và thanh toán
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${styles.copyright}`}>
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                        {/* Left */}
                        <div>
                            <p>
                                Bản quyền © 2025 -{" "}
                                <Link
                                    href="https://www.duoclieuxanhn22.com/"
                                    className="text-blue-600 hover:underline"
                                >
                                    duoclieuxanhn22.com
                                </Link>
                                <br />
                                Thiết kế bởi{" "}
                                <Link
                                    href="https://avaz.vn/"
                                    className="text-blue-600 hover:underline"
                                >
                                    Avaz
                                </Link>
                            </p>
                        </div>

                        {/* Right */}
                        <div className="flex justify-start md:justify-end">
                            <ul
                                className={`${styles.socialIcons} flex space-x-4`}
                            >
                                <li>
                                    <Link href="/" target="_blank">
                                        <i className="fab fa-facebook-f"></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/" target="_blank">
                                        <i className="fab fa-twitter"></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/" target="_blank">
                                        <i className="fab fa-instagram"></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/" target="_blank">
                                        <i className="fab fa-linkedin"></i>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

import React from "react";

import styles from "./Hero.module.scss";
export default function Hero() {
    return (
        <div className={`${styles.heroArea} ${styles.heroBg}`}>
            <div className="container px-4 mx-auto">
                <div className="grid grid-cols-12">
                    <div className="col-span-12 lg:col-span-9 lg:col-start-3 text-center">
                        <div className={styles.heroText}>
                            <div className={styles.heroTextTablecell}>
                                <p className={styles.subtitle}>
                                    Dược Liệu Xanh <br /> An lành cho Sức khỏe
                                </p>
                                <h1 className="text-3xl md:text-5xl font-bold mb-6">
                                    Dược Liệu Xanh N22
                                </h1>
                                <div className="flex gap-4 justify-center">
                                    <a href="/shop" className={styles.mainBtn}>
                                        Sản Phẩm
                                    </a>
                                    <a
                                        href="/combo"
                                        className={styles.borderedBtn}
                                    >
                                        Đặt Hàng
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

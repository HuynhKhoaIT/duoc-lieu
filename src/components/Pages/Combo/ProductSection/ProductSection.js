"use client";

import ProductComboCard from "@/components/Common/Card/ProductComboCard";

import styles from "./ProductSection.module.scss";

const products = [
    {
        id: 1,
        name: "Dầu Gội Dược Liệu N22 250ml",
        img: "/images/products/n223.png",
        category: "pro1",
    },
    {
        id: 2,
        name: "Dầu Gội Dược Liệu N22 500ml",
        img: "/images/products/n225.png",
        category: "pro1",
    },
    {
        id: 3,
        name: "Dầu Gội Dược Liệu N22 1000ml",
        img: "/images/products/n224.png",
        category: "pro1",
    },
    {
        id: 4,
        name: "Dầu Gội Kích Mọc Tóc N22 200ml",
        img: "/images/products/n222.png",
        category: "pro1",
    },
    {
        id: 5,
        name: "Dầu Gội Bộ Đặc Biệt N22",
        img: "/images/products/n226.png",
        category: "pro1",
    },
    {
        id: 6,
        name: "Dầu Gội Bộ Ngăn Bạc N22",
        img: "/images/products/n227.png",
        category: "pro1",
    },
];

export default function ProductSection() {
    return (
        <div className={styles.productSection}>
            <div className="container mx-auto mt-5 mb-4">
                <div className="flex justify-center items-center">
                    <div className="w-full">
                        <div className={styles.productFilters}>
                            <ul className="flex flex-wrap justify-center gap-2">
                                <li
                                    className={`${styles.active} btn-sm`}
                                    data-filter="*"
                                >
                                    Tất cả
                                </li>
                                <li className="btn-sm" data-filter=".pro1">
                                    Dầu Gội
                                </li>
                                <li className="btn-sm" data-filter=".pro2">
                                    Sữa Tắm
                                </li>
                                <li className="btn-sm" data-filter=".pro3">
                                    DDVS
                                </li>
                                <li className="btn-sm" data-filter=".pro4">
                                    Tinh Dầu
                                </li>
                                <li className="btn-sm" data-filter=".pro5">
                                    Tinh Chất
                                </li>
                                <li className="btn-sm" data-filter=".pro6">
                                    Serum
                                </li>
                                <li className="btn-sm" data-filter=".pro10">
                                    Rửa Chén
                                </li>
                                <li className="btn-sm" data-filter=".pro11">
                                    Rửa Tay
                                </li>
                                <li className="btn-sm" data-filter=".pro12">
                                    Nước Giặt
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Danh sách sản phẩm */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.map((p) => (
                        <ProductComboCard key={p.id} p={p} />
                    ))}
                </div>
            </div>
        </div>
    );
}

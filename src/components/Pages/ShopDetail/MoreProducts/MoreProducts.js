import ProductCardItem from "@/components/Common/Card/ProductCardItem";

import styles from "./MoreProducts.module.scss";

const products = [
    {
        id: 1,
        name: "Dầu Gội Dược Liệu N22 250ml",
        img: "/images/products/n223.png",
    },
    {
        id: 2,
        name: "Dầu Gội Dược Liệu N22 500ml",
        img: "/images/products/n225.png",
    },
    {
        id: 3,
        name: "Dầu Gội Dược Liệu N22 1000ml",
        img: "/images/products/n224.png",
    },
    {
        id: 4,
        name: "Dầu Gội Kích Mọc Tóc N22 200ml",
        img: "/images/products/n222.png",
    },
    {
        id: 5,
        name: "Dầu Gội Bộ Đặc Biệt N22",
        img: "/images/products/n226.png",
    },
    {
        id: 6,
        name: "Dầu Gội Bộ Ngăn Bạc N22",
        img: "/images/products/n227.png",
    },
];

export default function MoreProducts() {
    return (
        <div className={styles.productSection}>
            <div className="container px-4 mx-auto">
                {/* Tiêu đề */}
                <div className="grid grid-cols-12">
                    <div className="col-span-12 lg:col-span-8 lg:col-start-3">
                        <div className={styles.sectionTitle}>
                            <h3>
                                <span className={styles.orangeText}>
                                    Sản phẩm
                                </span>{" "}
                                Tương Tự
                            </h3>
                        </div>
                    </div>
                </div>

                {/* Danh sách sản phẩm */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((p) => (
                        <ProductCardItem p={p} key={p.id} />
                    ))}
                </div>
            </div>
        </div>
    );
}

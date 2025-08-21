import styles from "./ProductSection.module.scss";

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

export default function ProductSection() {
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
                                Tiêu biểu
                            </h3>
                        </div>
                    </div>
                </div>

                {/* Danh sách sản phẩm */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((p) => (
                        <div key={p.id} className="text-center">
                            <div className={styles.singleProductItem}>
                                <a href={`/shop/${p.id}`}>
                                    <img
                                        src={p.img}
                                        alt={p.name}
                                        className={styles.productImage}
                                    />
                                </a>
                                <h6 className={`${styles.goldBg} ${styles.blueText} p-2 !mb-0`}>{p.name}</h6>
                                <div className={`${styles.blueBg} p-3 m-0 flex justify-between align-end`}>
                                    <a href="/combo">
                                        <button
                                            className={`${styles.borderedBtn} ${styles.btnSm} w-[110px]`}
                                        >
                                            Đặt hàng
                                        </button>
                                    </a>
                                    <a href={`/shop/${p.id}`}>
                                        <button
                                            className={`${styles.borderedBtn} ${styles.btnSm}`}
                                        >
                                            Xem thêm
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

import styles from "./ShopBanner.module.scss";

export default function ShopBanner() {
    return (
        <section
            className={`${styles.shopBanner} mb-5`}
        >
            <div className="container mx-auto px-4">
                <h3>
                    Nhiều chương trình <br />
                    khuyến mãi{" "}
                    <span className={styles.orangeText}>Hấp dẫn...</span>
                </h3>

                <div className={styles.salePercent}>
                    <span>
                        Cùng nhiều phần thưởng! <br /> Lên đến
                    </span>
                    53% <span>Cực hot</span>
                </div>

                <a href="/shop" className={styles.cartBtn}>
                    Xem thêm
                </a>
            </div>
        </section>
    );
}

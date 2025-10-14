import styles from "./ListSection.module.scss";

export default function ListSection() {
    return (
        <div className={styles.listSection}>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Box 1 */}
                    <div className={styles.listBox}>
                        <div className={styles.listIcon}>
                            <i className="fas fa-shipping-fast"></i>
                        </div>
                        <div className={styles.content}>
                            <h3>Miễn Phí giao hàng</h3>
                            <p>Khi mua bộ sản phẩm</p>
                        </div>
                    </div>

                    {/* Box 2 */}
                    <div className={styles.listBox}>
                        <div className={styles.listIcon}>
                            <i className="fas fa-phone-volume"></i>
                        </div>
                        <div className={styles.content}>
                            <h3>Hỗ trợ 24/7</h3>
                            <p>Hotline: 0941.003.004</p>
                        </div>
                    </div>

                    {/* Box 3 */}
                    <div className={styles.listBox}>
                        <div className={styles.listIcon}>
                            <i className="fas fa-gift"></i>
                        </div>
                        <div className={styles.content}>
                            <h3>Chính sách ưu đãi</h3>
                            <p>Tiêu dùng thông minh</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

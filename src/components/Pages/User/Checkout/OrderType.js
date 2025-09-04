import styles from "./Checkout.module.scss";

export default function OrderType({ open, toggle }) {
    return (
        <div
            className={`${styles.card} ${styles.singleAccordion} mb-3 bg-white shadow-md rounded`}
        >
            <div className={styles.cardHeader}>
                <h5 className="mb-0">
                    <button
                        className="text-left w-full"
                        type="button"
                        onClick={() => toggle("orderType")}
                    >
                        Phân Loại Đơn Hàng
                    </button>
                </h5>
            </div>
            <div
                className={`${styles.collapse} ${open === "orderType" ? styles.show : ""}`}
            >
                <div className="p-2">
                    {/* Đại lý */}
                    <div className="w-full mb-2">
                        <div
                            className={`${styles.card} p-2 bg-white shadow-md rounded`}
                        >
                            <div
                                className={`${styles.cardHeader} ${styles.breadcrumbBg}`}
                            >
                                <div
                                    className={`${styles.formCheck} ${styles.customRadio} text-center`}
                                >
                                    <input
                                        className={`${styles.formCheckInput} mt-2`}
                                        type="radio"
                                        name="order"
                                        id="agent"
                                        value="DaiLy0"
                                        defaultChecked
                                    />
                                    <label
                                        className={styles.formCheckLabel}
                                        htmlFor="agent"
                                    >
                                        <strong className="gold-text">
                                            Đại Lý
                                        </strong>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bảng tri ân */}
                    <div className="w-full">
                        <div
                            className={`${styles.card} p-2 bg-white shadow-md rounded`}
                        >
                            <div
                                className={`${styles.cardHeader} text-center ${styles.breadcrumbBg}`}
                            >
                                <strong className="gold-text">
                                    Bảng Tri Ân
                                </strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

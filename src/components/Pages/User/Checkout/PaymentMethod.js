import useAuth from "@/hooks/useAuth";

import styles from "./Checkout.module.scss";

export default function PaymentMethod({ open, toggle }) {
    const { isAuthenticated } = useAuth();
    return (
        <div
            className={`${styles.card} ${styles.singleAccordion} mb-3 bg-white shadow-md rounded`}
        >
            <div className={styles.cardHeader}>
                <h5 className="mb-0">
                    <button
                        className="text-left w-full"
                        type="button"
                        onClick={() => toggle("payment")}
                    >
                        Phương Thức Thanh Toán
                    </button>
                </h5>
            </div>
            <div
                className={`${styles.collapse} ${open === "payment" ? styles.show : ""}`}
            >
                <div className={styles.cardBody}>
                    <div className={styles.shippingAddressForm}>
                        {/* Chuyển khoản */}
                        <div
                            className={`${styles.formCheck} ${styles.customRadio} flex items-start mb-4`}
                        >
                            <input
                                className={`${styles.formCheckInput} mt-2`}
                                type="radio"
                                name="payment"
                                id="transfer"
                                value="bank_transfer"
                                defaultChecked
                            />
                            <label
                                className={styles.formCheckLabel}
                                htmlFor="transfer"
                            >
                                <strong className="gold-text">
                                    Chuyển Khoản
                                </strong>
                                <p className="ml-4 pl-2">
                                    Với nội dung: &quot;Mã đơn hàng của
                                    bạn&quot;
                                </p>
                                <p className="ml-4 pl-2">
                                    Số tài khoản: 0931003004
                                </p>
                                <p className="ml-4 pl-2">Ngân hàng: Sacombank chi nhánh tỉnh Hậu Giang</p>
                                <p className="ml-4 pl-2">
                                    Chủ tài khoản: Đặng Thị Kim Ngọc
                                </p>
                            </label>
                        </div>

                        {/* Ví */}
                        {isAuthenticated ? (
                            <div
                                className={`${styles.formCheck} ${styles.customRadio} flex items-start mb-4`}
                            >
                                <input
                                    className={`${styles.formCheckInput} mt-2`}
                                    type="radio"
                                    name="payment"
                                    id="wallet"
                                    value="wallet"
                                />
                                <label
                                    className={styles.formCheckLabel}
                                    htmlFor="wallet"
                                >
                                    <strong className="gold-text">
                                        Tài Khoản Ví
                                    </strong>
                                    <p className="ml-4 pl-2">
                                        Thanh toán bằng số dư có sẵn trong tài
                                        khoản ví
                                    </p>
                                </label>
                            </div>
                        ) : (
                            <div
                                className={`${styles.formCheck} ${styles.customRadio} flex items-start mb-4`}
                            >
                                <input
                                    className={`${styles.formCheckInput} mt-2`}
                                    type="radio"
                                    name="payment"
                                    id="code"
                                    value="code"
                                />
                                <label
                                    className={styles.formCheckLabel}
                                    htmlFor="code"
                                >
                                    <strong className="gold-text">
                                        Thanh toán tiền mặt
                                    </strong>
                                    <p className="ml-4 pl-2">
                                        Thanh toán khi nhận hàng.
                                    </p>
                                </label>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

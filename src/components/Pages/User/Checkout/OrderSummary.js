import useAuth from "@/hooks/useAuth";

import styles from "./Checkout.module.scss";

export default function OrderSummary({
    cartItems,
    totalPrice,
    totalQty,
    loading,
}) {
    const { isAuthenticated } = useAuth();

    return (
        <div className={styles.accordion}>
            <div className={`${styles.card} ${styles.singleAccordion}`}>
                <div className={styles.cardHeader}>
                    <h5 className="mb-0">
                        <button className="text-left w-full" type="button">
                            Chi Tiết Đơn Hàng
                        </button>
                    </h5>
                </div>

                <div className={`${styles.collapse} ${styles.show}`}>
                    <div className={styles.cardBody}>
                        <div className={`${styles.totalSection} mt-0`}>
                            <table className={styles.totalTable}>
                                <thead className={styles.totalTableHead}>
                                    <tr className={styles.tableTotalRow}>
                                        <th className="text-center p-1">
                                            Sản Phẩm
                                        </th>
                                        <th className="text-center p-1">SL</th>
                                        <th className="text-center p-1">
                                            Đơn Giá
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className={styles.tableTotalRow}>
                                    {cartItems?.map((item, index) => (
                                        <tr
                                            key={index}
                                            className={styles.totalData}
                                        >
                                            <td>{item?.product?.name}</td>
                                            <td>{item?.quantity}</td>
                                            <td className="text-right">
                                                {Number(
                                                    isAuthenticated
                                                        ? item?.product
                                                            ?.price_wholesale
                                                        : item?.product
                                                            ?.price_retail,
                                                ).toLocaleString("vi-VN")}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tbody className={styles.tableTotalRow}>
                                    <tr className={styles.totalData}>
                                        <th className={styles.pl3}>
                                            Tổng Số Lượng
                                        </th>
                                        <td colSpan="2">
                                            <strong>{totalQty}</strong>
                                        </td>
                                    </tr>
                                    <tr className={styles.totalData}>
                                        <th className={styles.pl3}>
                                            Thành tiền
                                        </th>
                                        <td colSpan="2">
                                            <strong>
                                                {totalPrice.toLocaleString(
                                                    "vi-VN",
                                                )}
                                            </strong>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="text-center mt-3">
                                <button
                                    type="submit"
                                    className="main-btn cursor-pointer"
                                >
                                    {loading ? "Đang xử lý" : "Xác Nhận"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

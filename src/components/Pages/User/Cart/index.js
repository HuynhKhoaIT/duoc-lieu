import styles from "./Cart.module.scss";

export default function Cart() {
    return (
        <div className={`${styles.cartSection} mt-5 mb-5`}>
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Bảng giỏ hàng */}
                    <div className="lg:col-span-8 col-span-12">
                        <div className={styles.cartTableWrap}>
                            <table className={styles.cartTable}>
                                <thead className={styles.cartTableHead}>
                                    <tr className={styles.tableHeadRow}>
                                        <th className={styles.productRemove}></th>
                                        <th className={styles.productImage}>Ảnh sản phẩm</th>
                                        <th className={styles.productName}>Tên</th>
                                        <th className={styles.productPrice}>Đơn giá</th>
                                        <th className={styles.productQuantity}>Số lượng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className={styles.tableBodyRow}>
                                        <td className={styles.productRemove}>
                                            <a href="/user/del-cart/2">
                                                <i className="far fa-window-close"></i>
                                            </a>
                                        </td>
                                        <td className={styles.productImage}>
                                            <img src="/public/upload/product/n225.png" />
                                        </td>
                                        <td className={styles.productName}>
                                            Dầu Gội Dược Liệu N22 500ml
                                        </td>
                                        <td className={styles.productPrice}>170.000</td>
                                        <td className={styles.quantity}>
                                            <div className={styles.proqty}>
                                                <a href="/user/dec-cart/2">
                                                    <span className={`${styles.qtybtn} dec`}>-</span>
                                                </a>
                                                <input
                                                    type="text"
                                                    min="1"
                                                    max="100"
                                                    value="1"
                                                    readOnly
                                                />
                                                <a href="/user/inc-cart/2">
                                                    <span className={`${styles.qtybtn} inc`}>+</span>
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Tổng đơn hàng */}
                    <div className="lg:col-span-4 col-span-12">
                        <form action="/user/checkout" method="get">
                            <div className={styles.totalSection}>
                                <table className={styles.totalTable}>
                                    <thead className={styles.totalTableHead}>
                                        <tr className={styles.tableTotalRow}>
                                            <th className="text-center" colSpan={2}>
                                                <strong>ĐƠN HÀNG</strong>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className={styles.totalData}>
                                            <td>
                                                <strong>Số Lượng: </strong>
                                            </td>
                                            <td>1</td>
                                        </tr>
                                        <tr className={styles.totalData}>
                                            <td>
                                                <strong>Thành Tiền: </strong>
                                            </td>
                                            <td>170.000</td>
                                        </tr>
                                        <tr className={styles.totalData}>
                                            <td colSpan={2}>
                                                <div className="flex justify-center mt-0">
                                                    <button
                                                        type="submit"
                                                        className={`${styles.mainBtn} text-center`}
                                                    >
                                                        Đặt Hàng
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

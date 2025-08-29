import styles from "./contactForm.module.scss";

export default function ContactForm() {
    return (
        <div className={`${styles.contactForm} pt-5 pb-3`}>
            <div className="max-w-7xl mx-auto">
                <div className="flex">
                    <div className="w-full lg:w-9/12 mx-auto">
                        <div className="flex">
                            <div className="w-full">
                                <div
                                    className={`${styles.blueBg} rounded-xl shadow p-6`}
                                >
                                    {/* Tháng này */}
                                    <div className="w-full">
                                        <h5
                                            className={`${styles.goldText} text-center mb-2`}
                                        >
                                            Tháng này
                                        </h5>
                                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <h5
                                                    className={`${styles.goldText} mb-1`}
                                                >
                                                    Đại lý 1:
                                                </h5>
                                                <h4 className="mb-1 text-white">
                                                    2
                                                </h4>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <h5
                                                    className={`${styles.goldText} mb-1`}
                                                >
                                                    Tiêu dùng:
                                                </h5>
                                                <h4 className="mb-1 text-white">
                                                    0
                                                </h4>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Nút */}
                                    <div className="flex justify-center items-center mt-4 gap-3">
                                        <a
                                            href="/signin/0907458839"
                                            className={`${styles.borderedBtn} text-center`}
                                            style={{ width: "115px" }}
                                        >
                                            Đăng ký
                                        </a>
                                        <a
                                            href="/user/order"
                                            className={styles.borderedBtn}
                                        >
                                            Đặt Hàng
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bảng đơn hàng */}
                        <div className="mt-6 overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="text-left border-b">
                                        <th className={styles.blueText}>#</th>
                                        <th className={styles.blueText}>
                                            Mã ĐH
                                        </th>
                                        <th className={styles.blueText}>
                                            Ngày đặt
                                        </th>
                                        <th className={styles.blueText}>
                                            Số tiền
                                        </th>
                                        <th className={styles.blueText}>
                                            Thanh toán
                                        </th>
                                        <th className={styles.blueText}>
                                            Trạng thái
                                        </th>
                                        <th className={styles.blueText}>
                                            Phản hồi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b">
                                        <td>1</td>
                                        <td>060710171973</td>
                                        <td>07/06/2025 10:17:19</td>
                                        <td className="text-center text-white">
                                            <a
                                                href="/user/bill/106"
                                                className="underline hover:text-blue-400"
                                            >
                                                500.000
                                            </a>
                                        </td>
                                        <td>Chuyển khoản</td>
                                        <td>Đã giao</td>
                                        <td className="p-0">
                                            <form
                                                action="/user/bill/106"
                                                method="POST"
                                            >
                                                <button
                                                    type="button"
                                                    className={`${styles.mainBtn} text-sm`}
                                                >
                                                    <strong>Phản Hồi</strong>
                                                </button>
                                                {/* Modal (giữ nguyên, có thể refactor sau) */}
                                            </form>
                                        </td>
                                    </tr>

                                    <tr className="border-b">
                                        <td>2</td>
                                        <td>052217240178</td>
                                        <td>22/05/2025 17:24:01</td>
                                        <td className="text-center text-white">
                                            <a
                                                href="/user/bill/84"
                                                className="underline hover:text-blue-400"
                                            >
                                                585.000
                                            </a>
                                        </td>
                                        <td>Chuyển khoản</td>
                                        <td>Đã giao</td>
                                        <td className="p-0">
                                            <form
                                                action="/user/bill/84"
                                                method="POST"
                                            >
                                                <button
                                                    type="button"
                                                    className={`${styles.mainBtn} text-sm`}
                                                >
                                                    <strong>Phản Hồi</strong>
                                                </button>
                                            </form>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <nav
                            aria-label="Page navigation"
                            className="pt-3 flex justify-center"
                        >
                            <ul className="flex gap-2">
                                {/* thêm item sau */}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}

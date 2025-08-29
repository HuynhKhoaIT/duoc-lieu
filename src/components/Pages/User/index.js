import styles from "./User.module.scss";

export default function UserDashboardPage() {
    return (
        <div className="pt-[48px] pb-[24px] mb-2">
            <div className="container">
                <div className="flex flex-wrap">
                    <div className="w-full lg:w-9/12 mx-auto">
                        <div className="flex flex-wrap">
                            <div className="w-full">
                                <div
                                    className={`${styles.card} gold-bg p-3 mb-3 flex justify-center items-center`}
                                >
                                    <div className="flex items-center">
                                        <div className="flex justify-center items-center mr-3">
                                            <h3>
                                                <i
                                                    className={`fas fa-medal blue-text`}
                                                />
                                            </h3>
                                        </div>
                                        <div>
                                            <span
                                                className={`text-center blue-text`}
                                            >
                                                Danh Hiệu Cá Nhân
                                            </span>
                                            <h4 className="text-center text-light">
                                                NPP 1 sao
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Thống kê 3 ô */}
                        <div className="flex flex-wrap -mx-2">
                            <div className="w-full md:w-1/2 lg:w-1/3 px-2">
                                <div
                                    className={`${styles.card} blue-bg p-3 mb-3 flex justify-center items-center`}
                                >
                                    <div className="flex items-center">
                                        <div className="flex justify-center items-center mr-3">
                                            <h3>
                                                <i
                                                    className={`fas fa-dollar-sign gold-text`}
                                                />
                                            </h3>
                                        </div>
                                        <div>
                                            <span
                                                className={`text-center gold-text`}
                                            >
                                                Số Dư Tài Khoản
                                            </span>
                                            <h4 className="text-center text-light">
                                                278.634
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full md:w-1/2 lg:w-1/3 px-2">
                                <div
                                    className={`${styles.card} blue-bg p-3 mb-3 flex justify-center items-center`}
                                >
                                    <div className="flex items-center">
                                        <div className="flex justify-center items-center mr-3">
                                            <h3>
                                                <i
                                                    className={`fas fa-heartbeat gold-text`}
                                                />
                                            </h3>
                                        </div>
                                        <div>
                                            <span
                                                className={`text-center gold-text`}
                                            >
                                                Trạng thái
                                            </span>
                                            <h5 className="text-center text-light mb-1">
                                                Đang hoạt động
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full md:w-1/2 lg:w-1/3 px-2">
                                <div
                                    className={`${styles.card} blue-bg p-3 mb-3 flex justify-center items-center`}
                                >
                                    <div className="flex items-center">
                                        <div className="flex justify-center items-center mr-3">
                                            <h3>
                                                <i
                                                    className={`fas fa-file-invoice-dollar gold-text`}
                                                />
                                            </h3>
                                        </div>
                                        <div>
                                            <span
                                                className={`text-center gold-text`}
                                            >
                                                Đơn Hàng Cá Nhân
                                            </span>
                                            <h4 className="text-center text-light">
                                                0 | 2
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card lớn chứa 3 thống kê */}
                        <div
                            className={`${styles.card} gold-bg pt-3`}
                        >
                            <div className="flex flex-wrap text-center">
                                <div className="w-full md:w-1/2 lg:w-1/3 pb-3 flex justify-center items-center">
                                    <div className="flex justify-center items-center mr-3">
                                        <h3>
                                            <i
                                                className={`fas fa-user blue-text`}
                                            />
                                        </h3>
                                    </div>
                                    <div>
                                        <span
                                            className={`text-center blue-text`}
                                        >
                                            Lượt đăng ký
                                        </span>
                                        <h4 className="text-center text-light">
                                            1
                                        </h4>
                                    </div>
                                </div>

                                <div className="w-full md:w-1/2 lg:w-1/3 pb-3 flex justify-center items-center">
                                    <div className="flex justify-center items-center mr-3">
                                        <h3>
                                            <i
                                                className={`fas fa-user-friends blue-text`}
                                            />
                                        </h3>
                                    </div>
                                    <div>
                                        <span
                                            className={`text-center blue-text`}
                                        >
                                            Số Đại Lý 1
                                        </span>
                                        <h4 className="text-center text-light">
                                            2 | 11
                                        </h4>
                                    </div>
                                </div>

                                <div className="w-full md:w-1/2 lg:w-1/3 pb-3 flex justify-center items-center">
                                    <div className="flex justify-center items-center mr-3">
                                        <h3>
                                            <i
                                                className={`fas fa-users blue-text`}
                                            />
                                        </h3>
                                    </div>
                                    <div>
                                        <span
                                            className={`text-center blue-text`}
                                        >
                                            Tổng Số Đại Lý
                                        </span>
                                        <h4 className="text-center text-light">
                                            598
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Doanh số */}
                        <div className="flex flex-wrap mt-3 -mx-2">
                            <div className="w-full md:w-1/3 px-2">
                                <div
                                    className={`${styles.card} blue-bg p-3 mb-3 flex justify-center items-center`}
                                >
                                    <div className="flex items-center">
                                        <div className="flex justify-center items-center mr-3">
                                            <h3>
                                                <i
                                                    className={`fas fa-address-book gold-text`}
                                                />
                                            </h3>
                                        </div>
                                        <div>
                                            <span
                                                className={`text-center gold-text`}
                                            >
                                                Doanh Số Cá Nhân
                                            </span>
                                            <h4 className="text-center text-light">
                                                1.085.000
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full md:w-1/3 px-2">
                                <div
                                    className={`${styles.card} blue-bg p-3 mb-3 flex justify-center items-center`}
                                >
                                    <div className="flex items-center">
                                        <div className="flex justify-center items-center mr-3">
                                            <h3>
                                                <i
                                                    className={`far fa-address-book gold-text`}
                                                />
                                            </h3>
                                        </div>
                                        <div>
                                            <span
                                                className={`text-center gold-text`}
                                            >
                                                Doanh Số Đại Lý
                                            </span>
                                            <h4 className="text-center text-light">
                                                319.090.000
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full md:w-1/3 px-2">
                                <div
                                    className={`${styles.card} blue-bg p-3 mb-3 flex justify-center items-center`}
                                >
                                    <div className="flex items-center">
                                        <div className="flex justify-center items-center mr-3">
                                            <h3>
                                                <i
                                                    className={`far fa-id-badge gold-text`}
                                                />
                                            </h3>
                                        </div>
                                        <div>
                                            <span
                                                className={`text-center gold-text`}
                                            >
                                                Tổng Doanh Số
                                            </span>
                                            <h4 className="text-center text-light">
                                                320.175.000
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Ghi chú */}
                        <div className="mt-2">
                            <h6 className={"blue-text"}>
                                <i>
                                    # Ghi chú: Số liệu thống kê trong tháng | Số
                                    liệu tổng
                                </i>
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { Skeleton } from "@mui/material";

import { agentLevelOptions, userStatusOptions } from "@/constants";
import { formatDateString } from "@/utils";

import styles from "./User.module.scss";
export default function UserDashboardPage({ dashboardData, loading }) {
    const statusInfo = userStatusOptions.find(
        (item) => item.value === dashboardData?.user?.status,
    );
    if (loading) {
        return (
            <div className="pt-[48px] pb-[24px] mb-2">
                <div className="container">
                    <div className="flex flex-wrap">
                        <div className="w-full lg:w-9/12 mx-auto">
                            <div className="mb-3">
                                <Skeleton
                                    variant="rectangular"
                                    height={80}
                                    className="mb-3 rounded-lg"
                                />
                            </div>

                            <div className="flex flex-wrap -mx-2">
                                {[ 1, 2, 3 ].map((i) => (
                                    <div
                                        key={i}
                                        className="w-full md:w-1/2 lg:w-1/3 px-2"
                                    >
                                        <Skeleton
                                            variant="rectangular"
                                            height={100}
                                            className="mb-3 rounded-lg"
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-wrap mt-3 -mx-2">
                                {[ 1, 2, 3 ].map((i) => (
                                    <div
                                        key={i}
                                        className="w-full md:w-1/3 px-2"
                                    >
                                        <Skeleton
                                            variant="rectangular"
                                            height={100}
                                            className="mb-3 rounded-lg"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-[48px] pb-[24px] mb-2">
            <div className="container">
                <div className="flex flex-wrap">
                    <div className="w-full mx-auto">
                        {statusInfo?.value === "expiring_soon" && (
                            <div className="mb-2">
                                <h6 className={"!text-red-600"}>
                                    <i>
                                        # Cảnh báo:{" "}
                                        {formatDateString(
                                            dashboardData?.user
                                                ?.commission_expired_at,
                                        )}{" "}
                                        NGÀY CUỐI ĐỂ PHÙ HỢP HƯỞNG CHO TÀI KHOẢN
                                        CỦA BẠN
                                    </i>
                                </h6>
                            </div>
                        )}
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
                                                TK KHÁCH HÀNG THÂN THIẾT
                                            </span>
                                            <h4 className="text-center text-light">
                                                {
                                                    agentLevelOptions[
                                                        dashboardData?.user
                                                            ?.agent_level
                                                    ]
                                                }
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Thống kê 3 ô */}
                        <div className="flex flex-wrap -mx-2">
                            <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-3">
                                <div
                                    className={`${styles.card} h-full blue-bg p-3  flex justify-center items-center`}
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
                                                Điểm Thưởng Tích Lũy Hiện Tại
                                            </span>
                                            <h4 className="text-center text-light">
                                                {(
                                                    dashboardData?.wallet
                                                        ?.balance * 1
                                                )?.toLocaleString("vi-VN")}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-3 ">
                                <div
                                    className={`${styles.card} h-full blue-bg p-3 flex justify-center items-center`}
                                >
                                    <div className="flex items-center">
                                        <div className="flex justify-center items-center mr-3">
                                            <h3>
                                                {/* <i
                                                    className="fas fa-check"
                                                    style={{
                                                        color: statusInfo?.color,
                                                    }}
                                                /> */}
                                                <i
                                                    className={statusInfo?.icon}
                                                    style={{
                                                        color: statusInfo?.color,
                                                    }}
                                                />
                                            </h3>
                                        </div>
                                        <div>
                                            <span
                                                className={`text-center gold-text`}
                                            >
                                                Tài khoản
                                            </span>
                                            <h4 className="text-center text-light mb-1">
                                                {statusInfo?.label}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full md:w-1/2 lg:w-1/3  mb-3 px-2">
                                <div
                                    className={`${styles.card} h-full blue-bg p-3 flex justify-center items-center`}
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
                                                Số Đơn Hàng Bạn Đã Mua
                                            </span>
                                            <h4 className="text-center text-light">
                                                {
                                                    dashboardData?.orders
                                                        ?.orders_pending
                                                }{" "}
                                                |{" "}
                                                {
                                                    dashboardData?.orders
                                                        ?.orders_completed
                                                }
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card lớn chứa 3 thống kê */}
                        <div className={`${styles.card} gold-bg pt-3`}>
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
                                            Lượt Đăng Ký Phát Sinh Từ Bạn Chưa Hoạt Động
                                        </span>
                                        <h4 className="text-center text-light">
                                            {
                                                dashboardData?.network
                                                    ?.members_without_completed_orders
                                            }
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
                                            Khách Hàng Trực Tiếp Của Bạn
                                        </span>
                                        <h4 className="text-center text-light">
                                            {dashboardData?.network?.f1_count} |{" "}
                                            {
                                                dashboardData?.network
                                                    ?.members_completed_orders
                                            }
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
                                            Tổng Khách Hàng Phát Sinh Từ Bạn
                                        </span>
                                        <h4 className="text-center text-light">
                                            {
                                                dashboardData?.network
                                                    ?.total_members
                                            }
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
                                                DS Cá Nhân Bạn Tiêu Dùng
                                            </span>
                                            <h4 className="text-center text-light">
                                                {(
                                                    dashboardData?.sales
                                                        ?.personal_sales * 1
                                                )?.toLocaleString("vi-VN")}
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
                                                DS Trực Tiếp Của Bạn
                                            </span>
                                            <h4 className="text-center text-light">
                                                {(
                                                    dashboardData?.sales
                                                        ?.agency_sales * 1
                                                )?.toLocaleString("vi-VN")}
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
                                                Tổng DS Phát Sinh Từ Bạn
                                            </span>
                                            <h4 className="text-center text-light">
                                                {(
                                                    dashboardData?.sales
                                                        ?.total_sales * 1
                                                )?.toLocaleString("vi-VN")}
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

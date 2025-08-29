"use client";
import { useState } from "react";

import styles from "./accordion.module.scss";

export default function AccountAccordion() {
    const [ open, setOpen ] = useState("taiKhoan"); // tab đang mở

    const toggle = (key) => {
        setOpen(open === key ? "" : key);
    };

    return (
        <div className="mt-5 mb-5">
            <div className="flex flex-col lg:flex-row max-w-7xl mx-auto gap-6">
                {/* Cột trái */}
                <div className="w-full lg:w-1/3 md:w-1/2 mx-auto">
                    <div className="space-y-3">
                        {/* Accordion 1 - Tài khoản */}
                        <div className="border rounded-lg overflow-hidden">
                            <button
                                className={`${styles.accordionHeader}`}
                                onClick={() => toggle("taiKhoan")}
                            >
                                Tài Khoản
                            </button>
                            {open === "taiKhoan" && (
                                <div className={`${styles.accordionBody}`}>
                                    <div
                                        className={`${styles.blueBg} p-3 text-center`}
                                    >
                                        <span className="text-white">
                                            Kích hoạt | Tài khoản | Đã nhận
                                        </span>
                                        <div className="mt-2">
                                            <span className="text-white">
                                                Bạn chưa tham gia
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Accordion 2 - Đăng ký */}
                        <div className="border rounded-lg overflow-hidden">
                            <button
                                className={styles.accordionHeader}
                                onClick={() => toggle("dangKy")}
                            >
                                Đăng Ký
                            </button>
                            {open === "dangKy" && (
                                <div className={styles.accordionBody}>
                                    <div className={`${styles.blueBg} p-4`}>
                                        <form
                                            action="/user/register"
                                            method="POST"
                                        >
                                            <input
                                                type="hidden"
                                                name="_token"
                                                value="6EYJb1O04R7JALnbNHEMsgtMzclwtTn6ijRDelCN"
                                                autoComplete="off"
                                            />
                                            <input
                                                type="text"
                                                name="username"
                                                placeholder="Tài khoản"
                                                className={styles.inputField}
                                            />
                                            <input
                                                type="text"
                                                name="affiliate"
                                                placeholder="Tài khoản liên kết"
                                                className={`${styles.inputField} mt-2`}
                                            />
                                            <button
                                                type="submit"
                                                className={`${styles.goldBg} w-full mt-3 font-semibold py-2 rounded-md`}
                                            >
                                                OK
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Accordion 3 - Tiền thưởng */}
                        <div className="border rounded-lg overflow-hidden">
                            <button
                                className={styles.accordionHeader}
                                onClick={() => toggle("thuong")}
                            >
                                Tiền Thưởng
                            </button>
                            {open === "thuong" && (
                                <div className={styles.accordionBody}>
                                    <div className={`${styles.blueBg} p-4`}>
                                        <h6 className="text-white text-center">
                                            Tổng thưởng:{" "}
                                            <strong className={styles.goldText}>
                                                0
                                            </strong>
                                        </h6>
                                        <div className="overflow-x-auto mt-3">
                                            <table className="w-full border-collapse">
                                                <thead>
                                                    <tr
                                                        className={
                                                            styles.tableHeadRow
                                                        }
                                                    >
                                                        <th
                                                            className={`${styles.blueText} p-1`}
                                                        >
                                                            #
                                                        </th>
                                                        <th
                                                            className={`${styles.blueText} p-1`}
                                                        >
                                                            Số tiền
                                                        </th>
                                                        <th
                                                            className={`${styles.blueText} p-1`}
                                                        >
                                                            Nhận từ
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td
                                                            colSpan="3"
                                                            className="text-white text-center p-1"
                                                        >
                                                            Chưa nhận
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Accordion 4 - Phiếu mua hàng */}
                        <div className="border rounded-lg overflow-hidden">
                            <button
                                className={styles.accordionHeader}
                                onClick={() => toggle("voucher")}
                            >
                                Phiếu Mua Hàng
                            </button>
                            {open === "voucher" && (
                                <div className={styles.accordionBody}>
                                    <div className={`${styles.blueBg} p-4`}>
                                        <h6 className="text-white text-center">
                                            Khả dụng:{" "}
                                            <strong className={styles.goldText}>
                                                0
                                            </strong>
                                        </h6>
                                        <div className="overflow-x-auto mt-3">
                                            <table className="w-full border-collapse">
                                                <thead>
                                                    <tr
                                                        className={
                                                            styles.tableHeadRow
                                                        }
                                                    >
                                                        <th
                                                            className={`${styles.blueText} p-1`}
                                                        >
                                                            #
                                                        </th>
                                                        <th
                                                            className={`${styles.blueText} p-1`}
                                                        >
                                                            Mệnh giá
                                                        </th>
                                                        <th
                                                            className={`${styles.blueText} p-1`}
                                                        >
                                                            Nhận từ
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td
                                                            colSpan="3"
                                                            className="text-white text-center p-1"
                                                        >
                                                            Chưa nhận
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Cột phải - Bảng thưởng */}
                <div className="w-full lg:w-2/3">
                    <div className="border rounded-lg overflow-hidden">
                        <button
                            className={styles.accordionHeader}
                            onClick={() => toggle("bangThuong")}
                        >
                            Bảng Thưởng
                        </button>
                        {open === "bangThuong" && (
                            <div className={styles.accordionBody}>
                                <div className={`${styles.blueBg} p-4`}>
                                    <div className="overflow-x-auto">
                                        <table className="w-full border text-white bg-red-600">
                                            <tbody>
                                                <tr>
                                                    <th
                                                        colSpan="8"
                                                        className="text-center"
                                                    >
                                                        <strong>-</strong>
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <td
                                                        colSpan="4"
                                                        className="text-center"
                                                    >
                                                        <strong>-</strong>
                                                    </td>
                                                    <td
                                                        colSpan="4"
                                                        className="text-center"
                                                    >
                                                        <strong>-</strong>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td
                                                        colSpan="2"
                                                        className="text-center"
                                                    >
                                                        <strong>-</strong>
                                                    </td>
                                                    <td
                                                        colSpan="2"
                                                        className="text-center"
                                                    >
                                                        <strong>-</strong>
                                                    </td>
                                                    <td
                                                        colSpan="2"
                                                        className="text-center"
                                                    >
                                                        <strong>-</strong>
                                                    </td>
                                                    <td
                                                        colSpan="2"
                                                        className="text-center"
                                                    >
                                                        <strong>-</strong>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">
                                                        <strong>-</strong>
                                                    </td>
                                                    <td className="text-center">
                                                        <strong>-</strong>
                                                    </td>
                                                    <td className="text-center">
                                                        <strong>-</strong>
                                                    </td>
                                                    <td className="text-center">
                                                        <strong>-</strong>
                                                    </td>
                                                    <td className="text-center">
                                                        <strong>-</strong>
                                                    </td>
                                                    <td className="text-center">
                                                        <strong>-</strong>
                                                    </td>
                                                    <td className="text-center">
                                                        <strong>-</strong>
                                                    </td>
                                                    <td className="text-center">
                                                        <strong>-</strong>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

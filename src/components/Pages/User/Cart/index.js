"use client";
import Link from "next/link";

import paths from "@/constants/paths";
import useAuth from "@/hooks/useAuth";
import useCart from "@/hooks/useCart";

import styles from "./Cart.module.scss";

export default function CartPage({ cartsData }) {
    const { isAuthenticated } = useAuth();
    const {
        cartItems,
        totalPrice,
        totalQty,
        loading,
        incrementQty,
        decrementQty,
        removeItem,
    } = useCart(cartsData);

    return (
        <div className={`${styles.cartSection} mt-[48px] mb-[48px]`}>
            <div className="container">
                {cartItems?.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-8 col-span-12">
                            <div className={styles.cartTableWrap}>
                                <table className={styles.cartTable}>
                                    <thead className={styles.cartTableHead}>
                                        <tr className={styles.tableHeadRow}>
                                            <th
                                                className={styles.productRemove}
                                            ></th>
                                            <th className={styles.productImage}>
                                                Ảnh sản phẩm
                                            </th>
                                            <th className={styles.productName}>
                                                Tên
                                            </th>
                                            <th className={styles.productPrice}>
                                                Đơn giá
                                            </th>
                                            <th
                                                className={
                                                    styles.productQuantity
                                                }
                                            >
                                                Số lượng
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item) => (
                                            <tr
                                                key={item.id}
                                                className={styles.tableBodyRow}
                                            >
                                                <td
                                                    className={
                                                        styles.productRemove
                                                    }
                                                >
                                                    <button
                                                        onClick={() =>
                                                            removeItem(item)
                                                        }
                                                        className="cursor-pointer"
                                                    >
                                                        <i className="far fa-window-close"></i>
                                                    </button>
                                                </td>
                                                <td className="flex justify-center items-center">
                                                    <img
                                                        src={
                                                            item?.product
                                                                ?.thumbnail
                                                        }
                                                        alt={
                                                            item?.product?.name
                                                        }
                                                        className="!w-[50px] rounded-sm"
                                                    />
                                                </td>
                                                <td
                                                    className={
                                                        styles.productName
                                                    }
                                                >
                                                    {item?.product?.name}
                                                </td>
                                                <td
                                                    className={
                                                        styles.productPrice
                                                    }
                                                >
                                                    {(
                                                        item?.product
                                                            ?.price_wholesale *
                                                        1
                                                    ).toLocaleString()}
                                                </td>
                                                <td className={styles.quantity}>
                                                    <div
                                                        className={
                                                            styles.proqty
                                                        }
                                                    >
                                                        <button
                                                            className={`${styles.qtybtn} dec`}
                                                            onClick={() =>
                                                                decrementQty(
                                                                    item,
                                                                )
                                                            }
                                                        >
                                                            -
                                                        </button>
                                                        <input
                                                            type="text"
                                                            min="1"
                                                            max="100"
                                                            value={
                                                                item.quantity
                                                            }
                                                            readOnly
                                                        />
                                                        <button
                                                            className={`${styles.qtybtn} inc`}
                                                            onClick={() =>
                                                                incrementQty(
                                                                    item,
                                                                )
                                                            }
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="lg:col-span-4 col-span-12">
                            <form action="/user/checkout" method="get">
                                <div className={styles.totalSection}>
                                    <table className={styles.totalTable}>
                                        <thead
                                            className={styles.totalTableHead}
                                        >
                                            <tr
                                                className={styles.tableTotalRow}
                                            >
                                                <th
                                                    className="text-center"
                                                    colSpan={2}
                                                >
                                                    <strong>ĐƠN HÀNG</strong>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className={styles.totalData}>
                                                <td>
                                                    <strong>Số Lượng: </strong>
                                                </td>
                                                <td>{totalQty}</td>
                                            </tr>
                                            <tr className={styles.totalData}>
                                                <td>
                                                    <strong>
                                                        Thành Tiền:{" "}
                                                    </strong>
                                                </td>
                                                <td>
                                                    {totalPrice.toLocaleString()}
                                                </td>
                                            </tr>
                                            <tr className={styles.totalData}>
                                                <td colSpan={2}>
                                                    <div className="flex justify-center mt-0">
                                                        <Link
                                                            href={
                                                                isAuthenticated
                                                                    ? paths.userCheckOut
                                                                    : paths.checkOut
                                                            }
                                                        >
                                                            <button
                                                                className="main-btn text-center"
                                                                disabled={
                                                                    loading
                                                                }
                                                                style={{
                                                                    cursor: "pointer",
                                                                }}
                                                            >
                                                                Đặt Hàng
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div className="text-center">
                        <h5>Chưa có sản phẩm nào được chọn</h5>
                        <Link
                            className={`${styles.cartBtn} text-center`}
                            href={paths.order}
                        >
                            Chọn sản phẩm
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

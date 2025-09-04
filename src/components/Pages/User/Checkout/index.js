import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";

import paths from "@/constants/paths";
import useAuth from "@/hooks/useAuth";
import useCart from "@/hooks/useCart";

import styles from "./Checkout.module.scss";

export default function CheckoutForm({ cartsData }) {
    const { profile } = useAuth();
    const { push } = useRouter();
    const [ open, setOpen ] = useState("payment");
    const [ loading, setLoading ] = useState(false);
    const { cartItems, totalPrice, totalQty } = useCart(cartsData);

    const toggle = (id) => {
        setOpen(open === id ? null : id);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        // Thu thập dữ liệu từ form
        const formData = new FormData(e.target);
        const data = {
            name: formData.get("name"),
            phone_number: formData.get("phone"),
            address: formData.get("address"),
            note: formData.get("note") || "",
            payment_method: formData.get("payment"),
        };
        try {
            const res = await fetch("/api/checkOut", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const result = await res.json();
            if (result.success) {
                toast.success("Đặt hàng thành công");
                push(paths.bill);
            } else {
                toast.error("Đặt hàng thất bại");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`${styles.checkoutSection} mt-5 mb-5`}>
            <form action="/user/checkout" method="post" onSubmit={handleSubmit}>
                <div className="container">
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full lg:w-1/2 px-4">
                            <div className="alert alert-warning bg-yellow-100 border border-yellow-400 text-yellow-700 p-4 rounded">
                                <i className="fas fa-exclamation-triangle mb-1 mr-2 gold-text"></i>
                                Vui lòng kiểm tra chính xác các thông tin trước
                                khi xác nhận đơn hàng. Không thể hủy hoặc thay
                                đổi thông tin khi đơn hàng đã duyệt. <br />
                                Xin trân trọng cảm ơn!
                            </div>
                            <div className={styles.checkoutAccordionWrap}>
                                <div className={styles.accordion}>
                                    {/* Accordion: Phương Thức Thanh Toán */}
                                    <div
                                        className={`${styles.card} ${styles.singleAccordion} mb-3 bg-white shadow-md rounded`}
                                    >
                                        <div className={styles.cardHeader}>
                                            <h5 className="mb-0">
                                                <button
                                                    className="text-left w-full"
                                                    type="button"
                                                    onClick={() =>
                                                        toggle("payment")
                                                    }
                                                >
                                                    Phương Thức Thanh Toán
                                                </button>
                                            </h5>
                                        </div>
                                        <div
                                            className={`${styles.collapse} ${open === "payment" ? styles.show : ""}`}
                                        >
                                            <div className={styles.cardBody}>
                                                <div
                                                    className={
                                                        styles.shippingAddressForm
                                                    }
                                                >
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
                                                            className={
                                                                styles.formCheckLabel
                                                            }
                                                            htmlFor="transfer"
                                                        >
                                                            <strong className="gold-text">
                                                                Chuyển Khoản
                                                            </strong>
                                                            <p className="ml-4 pl-2">
                                                                Với nội dung:
                                                                &quot;Mã đơn
                                                                hàng của
                                                                bạn&quot;
                                                            </p>
                                                            <p className="ml-4 pl-2">
                                                                Số tài khoản:
                                                                244985649
                                                            </p>
                                                            <p className="ml-4 pl-2">
                                                                Ngân hàng: ACB
                                                            </p>
                                                            <p className="ml-4 pl-2">
                                                                Chủ tài khoản:
                                                                Trương Đình Anh
                                                            </p>
                                                        </label>
                                                    </div>
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
                                                            className={
                                                                styles.formCheckLabel
                                                            }
                                                            htmlFor="wallet"
                                                        >
                                                            <strong className="gold-text">
                                                                Tài Khoản Ví
                                                            </strong>
                                                            <p className="ml-4 pl-2">
                                                                Thanh toán bằng
                                                                số dư có sẵn
                                                                trong tài khoản
                                                                ví
                                                            </p>
                                                        </label>
                                                    </div>
                                                    <div
                                                        className={`${styles.formCheck} ${styles.customRadio} flex items-start mb-4`}
                                                    >
                                                        <input
                                                            className={`${styles.formCheckInput} mt-2`}
                                                            type="radio"
                                                            name="payment"
                                                            id="voucher"
                                                            value="voucher"
                                                        />
                                                        <label
                                                            className={
                                                                styles.formCheckLabel
                                                            }
                                                            htmlFor="voucher"
                                                        >
                                                            <strong className="gold-text">
                                                                Phiếu Mua Hàng
                                                            </strong>
                                                            <p className="ml-4 pl-2">
                                                                Thanh toán bằng
                                                                mệnh giá khả
                                                                dụng của phiếu
                                                                mua hàng
                                                            </p>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Accordion: Phân Loại Đơn Hàng */}
                                    <div
                                        className={`${styles.card} ${styles.singleAccordion} mb-3 bg-white shadow-md rounded`}
                                    >
                                        <div className={styles.cardHeader}>
                                            <h5 className="mb-0">
                                                <button
                                                    className="text-left w-full"
                                                    type="button"
                                                    onClick={() =>
                                                        toggle("orderType")
                                                    }
                                                >
                                                    Phân Loại Đơn Hàng
                                                </button>
                                            </h5>
                                        </div>
                                        <div
                                            className={`${styles.collapse} ${open === "orderType" ? styles.show : ""}`}
                                        >
                                            <div className="p-2">
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
                                                                    className={
                                                                        styles.formCheckLabel
                                                                    }
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

                                    {/* Accordion: Thông Tin Giao Hàng */}
                                    <div
                                        className={`${styles.card} ${styles.singleAccordion} mb-3 bg-white shadow-md rounded`}
                                    >
                                        <div className={styles.cardHeader}>
                                            <h5 className="mb-0">
                                                <button
                                                    className="text-left w-full"
                                                    type="button"
                                                    onClick={() =>
                                                        toggle("shippingInfo")
                                                    }
                                                >
                                                    Thông Tin Giao Hàng
                                                </button>
                                            </h5>
                                        </div>
                                        <div
                                            className={`${styles.collapse} ${open === "shippingInfo" ? styles.show : ""}`}
                                        >
                                            <div className="p-0">
                                                <div
                                                    className={
                                                        styles.billingAddressForm
                                                    }
                                                >
                                                    <p className="flex justify-between items-center pr-0 pl-0">
                                                        <span className="w-[30%]">
                                                            Họ & tên
                                                        </span>
                                                        <input
                                                            type="text"
                                                            className="w-[70%] h-[60px]"
                                                            name="name"
                                                            defaultValue={
                                                                profile?.name
                                                            }
                                                        />
                                                    </p>
                                                    <p className="flex justify-between items-center pr-0 pl-0">
                                                        <span className="w-[30%]">
                                                            Điện thoại
                                                        </span>
                                                        <input
                                                            type="text"
                                                            className="w-[70%] h-[60px]"
                                                            name="phone"
                                                            defaultValue={
                                                                profile?.phone_number
                                                            }
                                                        />
                                                    </p>
                                                    <p className="flex justify-between items-center pr-0 pl-0">
                                                        <span className="w-[30%]">
                                                            Địa chỉ
                                                        </span>
                                                        <input
                                                            type="text"
                                                            className="w-[70%] h-[60px]"
                                                            name="address"
                                                            defaultValue={
                                                                profile?.address
                                                            }
                                                        />
                                                    </p>
                                                    <p className="flex justify-between items-center pr-0 pl-0">
                                                        <span className="w-[30%]">
                                                            Ghi chú
                                                        </span>
                                                        <input
                                                            type="text"
                                                            className="w-[70%] h-[60px]"
                                                            name="note"
                                                        />
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 px-4">
                            <div className={styles.accordion} id="accordion2">
                                {/* Accordion: Chi Tiết Đơn Hàng */}
                                <div
                                    className={`${styles.card} ${styles.singleAccordion}`}
                                >
                                    <div className={styles.cardHeader}>
                                        <h5 className="mb-0">
                                            <button
                                                className="text-left w-full"
                                                type="button"
                                            >
                                                Chi Tiết Đơn Hàng
                                            </button>
                                        </h5>
                                    </div>
                                    <div
                                        className={`${styles.collapse} ${styles.show}`}
                                    >
                                        <div className={styles.cardBody}>
                                            <div
                                                className={`${styles.totalSection} mt-0`}
                                            >
                                                <table
                                                    className={
                                                        styles.totalTable
                                                    }
                                                >
                                                    <thead
                                                        className={
                                                            styles.totalTableHead
                                                        }
                                                    >
                                                        <tr
                                                            className={
                                                                styles.tableTotalRow
                                                            }
                                                        >
                                                            <th className="text-center p-1">
                                                                <strong>
                                                                    Sản Phẩm
                                                                </strong>
                                                            </th>
                                                            <th className="text-center p-1">
                                                                <strong>
                                                                    SL
                                                                </strong>
                                                            </th>
                                                            <th className="text-center p-1">
                                                                <strong>
                                                                    Đơn Giá
                                                                </strong>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody
                                                        className={
                                                            styles.tableTotalRow
                                                        }
                                                    >
                                                        {cartItems?.map(
                                                            (item, index) => (
                                                                <tr
                                                                    key={index}
                                                                    className={
                                                                        styles.totalData
                                                                    }
                                                                >
                                                                    <td>
                                                                        {
                                                                            item
                                                                                ?.product
                                                                                .name
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            item?.quantity
                                                                        }
                                                                    </td>
                                                                    <td className="text-right">
                                                                        {(
                                                                            item
                                                                                ?.product
                                                                                ?.price_wholesale *
                                                                            1
                                                                        ).toLocaleString()}
                                                                    </td>
                                                                </tr>
                                                            ),
                                                        )}
                                                    </tbody>
                                                    <tbody
                                                        className={
                                                            styles.tableTotalRow
                                                        }
                                                    >
                                                        <tr
                                                            className={
                                                                styles.totalData
                                                            }
                                                        >
                                                            <th
                                                                className={
                                                                    styles.pl3
                                                                }
                                                            >
                                                                Tổng Số Lượng
                                                            </th>
                                                            <td colSpan="2">
                                                                <strong>
                                                                    {totalQty}
                                                                </strong>
                                                            </td>
                                                        </tr>
                                                        <tr
                                                            className={
                                                                styles.totalData
                                                            }
                                                        >
                                                            <th
                                                                className={
                                                                    styles.pl3
                                                                }
                                                            >
                                                                Thành tiền
                                                            </th>
                                                            <td colSpan="2">
                                                                <strong>
                                                                    {totalPrice.toLocaleString()}
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
                                                        {loading
                                                            ? "Đang xử lý"
                                                            : "Xác Nhận"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

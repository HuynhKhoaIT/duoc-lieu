"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";

import { storageKeys } from "@/constants";
import apiConfig from "@/constants/apiConfig";
import paths from "@/constants/paths";
import { useGlobalContext } from "@/contexts/GlobalContext";
import useAlert from "@/hooks/useAlert";
import useAuth from "@/hooks/useAuth";
import useCart from "@/hooks/useCart";
import fetcher from "@/services/fetcher";
import { cleanObject, getFirstErrorMessage } from "@/utils";
import { getLocalData, removeLocalItem } from "@/utils/localStorage";

import OrderSummary from "./OrderSummary";
import PaymentMethod from "./PaymentMethod";
import ShippingInfo from "./ShippingInfo";

import styles from "./Checkout.module.scss";

export default function CheckoutForm({ cartsData }) {
    const { setCart, setData } = useGlobalContext();
    const { profile, isAuthenticated } = useAuth();
    const { push } = useRouter();
    const { showAlert } = useAlert();
    const [ open, setOpen ] = useState("payment");
    const [ loading, setLoading ] = useState(false);
    const { cartItems, totalPrice, totalQty } = useCart(cartsData);
    const referral = getLocalData(storageKeys.REFERRAL_PHONE);

    const toggle = (id) => {
        setOpen(open === id ? null : id);
    };

    const validateForm = (data) => {
        if (!data.name?.trim()) {
            showAlert("Vui lòng nhập họ tên");
            return false;
        }

        if (!data.phone_number?.trim()) {
            showAlert("Vui lòng nhập số điện thoại");
            return false;
        }

        const phoneRegex = /^[0-9]{9,15}$/;
        if (!phoneRegex.test(data.phone_number)) {
            showAlert("Số điện thoại không hợp lệ");
            return false;
        }

        if (!data.address?.trim()) {
            showAlert("Vui lòng nhập địa chỉ giao hàng");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const data = {
            name: formData.get("name"),
            phone_number: formData.get("phone"),
            address: formData.get("address"),
            note: formData.get("note") || "",
            payment_method: formData.get("payment"),
            referrer_phone: referral,
        };

        if (!validateForm(data)) {
            setLoading(false);
            return;
        }
        if (isAuthenticated) {
            try {
                const res = await fetch("/api/checkOut", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(
                        cleanObject({
                            ...data,
                            items: cartItems?.map((item) => {
                                return {
                                    product_id: item.product.id,
                                    quantity: item.quantity,
                                };
                            }),
                        }),
                    ),
                });

                const result = await res.json();
                if (result.success) {
                    toast.success("Đặt hàng thành công");
                    push(paths.bill);
                    setCart(0);
                    setData([]);
                    removeLocalItem(storageKeys.CART_DATA);
                } else {
                    const errorMessage = getFirstErrorMessage(result.errors);
                    showAlert(
                        errorMessage ||
                            result.message ||
                            "Có lỗi xảy ra, vui lòng thử lại",
                    );
                }
            } catch (error) {
                console.error(error);
                const errorMessage = getFirstErrorMessage(
                    error?.response?.data?.errors,
                );
                showAlert(
                    errorMessage ||
                        error?.response?.data.message ||
                        "Có lỗi xảy ra, vui lòng thử lại",
                );
            } finally {
                setLoading(false);
            }
        } else {
            try {
                const res = await fetcher(apiConfig.checkOutV3.create, {
                    data: {
                        ...data,
                        items: cartItems?.map((item) => {
                            return {
                                product_id: item.product.id,
                                quantity: item.quantity,
                            };
                        }),
                    },
                });

                if (res?.data) {
                    toast.success("Đặt hàng thành công");
                    push(paths.home);
                    setCart(0);
                    setData([]);
                    removeLocalItem(storageKeys.CART_DATA);
                } else {
                    const errorMessage = getFirstErrorMessage(res.errors);
                    showAlert(
                        errorMessage ||
                            res.message ||
                            "Có lỗi xảy ra, vui lòng thử lại",
                    );
                }
            } catch (error) {
                const errorMessage = getFirstErrorMessage(
                    error?.response?.data?.errors,
                );
                showAlert(
                    errorMessage ||
                        error?.response?.data.message ||
                        "Có lỗi xảy ra, vui lòng thử lại",
                );
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className={`${styles.checkoutSection} mt-5 mb-5`}>
            <form onSubmit={handleSubmit}>
                <div className="container">
                    <div className="flex flex-wrap -mx-4">
                        {/* Left side */}
                        <div className="w-full lg:w-1/2 px-4">
                            <div className="alert alert-warning bg-yellow-100 border border-yellow-400 text-yellow-700 p-4 rounded">
                                <i className="fas fa-exclamation-triangle mb-1 mr-2 gold-text"></i>
                                Vui lòng kiểm tra chính xác các thông tin trước
                                khi xác nhận đơn hàng. Không thể hủy hoặc thay
                                đổi thông tin khi đơn hàng đã duyệt. <br />
                                Xin trân trọng cảm ơn!
                            </div>

                            <div className={styles.checkoutAccordionWrap}>
                                <ShippingInfo
                                    open={"shippingInfo"}
                                    toggle={toggle}
                                    profile={profile}
                                />
                                <PaymentMethod
                                    open={"payment"}
                                    toggle={toggle}
                                />
                            </div>
                        </div>

                        {/* Right side */}
                        <div className="w-full lg:w-1/2 px-4">
                            <OrderSummary
                                cartItems={cartItems}
                                totalPrice={totalPrice}
                                totalQty={totalQty}
                                loading={loading}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

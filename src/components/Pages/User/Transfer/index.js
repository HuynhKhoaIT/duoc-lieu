"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";

import ConfirmTransactionModal from "@/components/Common/Modal/ConfirmTransactionModal/ConfirmUpdateModal";
import paths from "@/constants/paths";
import useAlert from "@/hooks/useAlert"; // <-- custom hook SweetAlert2

import styles from "./TransferForm.module.scss";

export default function TransferForm({ balanceData }) {
    const { push } = useRouter();
    const { showAlert } = useAlert();
    const [ showModal, setShowModal ] = useState(false);
    const [ formData, setFormData ] = useState({
        amount: "",
        to_phone_number: "",
        transaction_password: "",
    });

    const validateForm = () => {
        const balance = balanceData?.balance || 0;

        if (!formData.amount) {
            showAlert("Bạn phải nhập số tiền.");
            return false;
        }

        const amount = parseFloat(formData.amount);
        if (isNaN(amount)) {
            showAlert("Số điểm phải là số hợp lệ.");
            return false;
        }

        if (amount < 100000) {
            showAlert("Số điểm tối thiểu 100,000.");
            return false;
        }

        if (amount > balance) {
            showAlert("Số điểm vượt quá số điểm hiện tại.");
            return false;
        }

        const phoneRegex = /^0[1-9]\d{8,10}$/;
        if (!formData.to_phone_number) {
            showAlert("Bạn phải nhập số điện thoại người nhận.");
            return false;
        }

        if (!phoneRegex.test(formData.to_phone_number)) {
            showAlert("Số điện thoại không hợp lệ.");
            return false;
        }

        return true;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleOpenModal = () => {
        if (validateForm()) {
            setShowModal(true);
        }
    };

    const handleConfirmTransaction = async ({ transactionPassword }) => {
        setFormData((prev) => ({
            ...prev,
            transaction_password: transactionPassword,
        }));
        if (!validateForm()) return;

        try {
            const res = await fetch(
                "/api/account/verify-transaction-password",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        transaction_password: transactionPassword,
                    }),
                },
            );
            const data = await res.json();
            if (data?.success) {
                await handleSubmit({ transactionPassword });
            } else {
                showAlert(data?.message || "Xác minh mật khẩu thất bại.");
            }
        } catch (error) {
            showAlert(error.message || "Lỗi hệ thống.");
        }
    };

    const handleSubmit = async ({ transactionPassword }) => {
        try {
            const res = await fetch("/api/wallet/transfer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: formData.amount,
                    to_phone_number: formData.to_phone_number,
                    transaction_password: transactionPassword,
                }),
            });
            const data = await res.json();
            if (data?.success) {
                toast.success("Chuyển tiền thành công!");
                push(paths.wallet);
            } else {
                showAlert(data?.message || "Chuyển tiền thất bại.");
            }
        } catch (error) {
            showAlert(error.message || "Lỗi hệ thống.");
        } finally {
            setShowModal(false);
        }
    };

    return (
        <div className={`${styles.contactForm} blue-bg pb-[600px]`}>
            <div className="container mx-auto">
                <div className="flex justify-center">
                    <div className="w-full lg:w-9/12 sm:w-7/12">
                        <div className={styles.contactForm}>
                            <form className="text-center">
                                <h5 className="gold-text">
                                    Số điểm:{" "}
                                    <b className="text-light">
                                        {balanceData?.balance
                                            ? (balanceData?.balance*1).toLocaleString(
                                                "vi-VN",
                                            )
                                            : "0"}
                                    </b>
                                </h5>

                                <p className="w-full flex flex-col justify-center items-center px-1">
                                    <input
                                        type="number"
                                        className={`${styles["input"]} mt-3`}
                                        name="amount"
                                        placeholder="Bạn cần chuyển bao nhiêu?"
                                        value={formData.amount}
                                        onChange={handleInputChange}
                                    />
                                </p>
                                <p className="w-full flex flex-col justify-center items-center px-1">
                                    <input
                                        type="text"
                                        className={`${styles["input"]} mt-3`}
                                        name="to_phone_number"
                                        placeholder="Số điện thoại người nhận?"
                                        value={formData.to_phone_number}
                                        onChange={handleInputChange}
                                    />
                                </p>
                                <div className="text-center">
                                    <button
                                        type="button"
                                        onClick={handleOpenModal}
                                        className={styles.boxedBtn}
                                    >
                                        <strong>Chuyển</strong>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ConfirmTransactionModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleConfirmTransaction}
            />
        </div>
    );
}

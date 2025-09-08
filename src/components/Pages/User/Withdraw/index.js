"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";

import ConfirmTransactionModal from "@/components/Common/Modal/ConfirmTransactionModal/ConfirmUpdateModal";
import paths from "@/constants/paths";
import useAlert from "@/hooks/useAlert";

import styles from "./WithdrawForm.module.scss";

export default function WithdrawForm({ balanceData }) {
    const { showAlert } = useAlert();

    const { push } = useRouter();
    const [ showModal, setShowModal ] = useState(false);
    const [ formData, setFormData ] = useState({
        amount: "",
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
            showAlert("Số tiền phải là số hợp lệ.");
            return false;
        }

        if (amount < 10000) {
            showAlert("Số tiền rút tối thiểu là 10,000.");
            return false;
        }

        if (amount > balance) {
            showAlert("Số tiền phải nhỏ hơn hoặc bằng số dư hiện tại.");
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
            showAlert(error?.message || "Xác minh mật khẩu thất bại.");
        }
    };

    const handleSubmit = async ({ transactionPassword }) => {
        try {
            const res = await fetch("/api/wallet/withdraw", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: Number(formData.amount),
                    transaction_password: transactionPassword,
                }),
            });
            const data = await res.json();
            if (data?.success) {
                toast.success("Rút tiền thành công.");
                push(paths.wallet);
            } else {
                showAlert(data?.message, "warning", paths.profile);
            }
        } catch (error) {
            showAlert(error?.message, "warning", paths.profile);
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
                                    Số dư:{" "}
                                    <b className="text-light">
                                        {balanceData?.balance
                                            ? (
                                                balanceData?.balance * 1
                                            ).toLocaleString("vi-VN")
                                            : "0"}{" "}
                                    </b>
                                </h5>

                                <div className="w-full flex  justify-center items-center px-1">
                                    <p className="w-full flex flex-col">
                                        <input
                                            type="text"
                                            className={`${styles["input"]} mt-3 w-full mx-auto`}
                                            name="amount"
                                            placeholder="Bạn cần rút bao nhiêu?"
                                            value={formData.amount}
                                            onChange={handleInputChange}
                                        />
                                    </p>
                                </div>

                                <div className="text-center mt-5">
                                    <button
                                        type="button"
                                        className={styles.boxedBtn}
                                        onClick={handleOpenModal}
                                    >
                                        <strong>Rút</strong>
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

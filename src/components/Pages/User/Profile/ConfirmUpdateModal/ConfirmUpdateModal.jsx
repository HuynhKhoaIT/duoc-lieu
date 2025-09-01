"use client";

import React, { useEffect, useState } from "react";

import ModalBase from "@/components/Common/Modal/ModalBase";

import styles from "./ConfirmUpdateModal.module.scss";

const ConfirmUpdateModal = ({ isOpen, onClose, onSubmit }) => {
    const [ transactionPassword, setTransactionPassword ] = useState("");

    useEffect(() => {
        if (!isOpen) {
            setTransactionPassword(""); // reset input khi modal tắt
        }
    }, [ isOpen ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ transactionPassword });
        setTransactionPassword(""); // reset sau khi submit
        onClose(); // đóng modal sau khi gửi
    };

    return (
        <ModalBase isOpen={isOpen} onClose={onClose}>
            <div
                className={`${styles.modalContent} blue-bg text-center py-4 px-6`}
            >
                <h5
                    className={`${styles.modalTitle} gold-text font-bold text-xl mb-4`}
                >
                    Mật khẩu giao dịch
                </h5>
                <form
                    className="flex flex-col items-center gap-4"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        name="transactionPassword"
                        placeholder="Vui lòng nhập mật khẩu giao dịch"
                        value={transactionPassword}
                        className={`${styles.input} w-full max-w-md border border-gray-300 rounded-lg px-4 py-2`}
                        onChange={(e) => setTransactionPassword(e.target.value)}
                        autoFocus
                        required
                    />
                </form>
                <div className="flex justify-center gap-2 pt-2 pb-4">
                    <button
                        type="submit"
                        className={"bordered-btn"}
                        onClick={handleSubmit}
                    >
                        Xác nhận
                    </button>
                    <button
                        type="button"
                        className={`bordered-btn w-[110px]`}
                        onClick={onClose}
                    >
                        Hủy bỏ
                    </button>
                </div>
            </div>
        </ModalBase>
    );
};

export default ConfirmUpdateModal;

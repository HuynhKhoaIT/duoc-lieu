"use client";

import React, { useEffect,useState } from "react";

import ModalBase from "../ModalBase";

import styles from "./FeedbackModal.module.scss";

const FeedbackModal = ({ isOpen, onClose, onSubmit }) => {
    const [ feedback, setFeedback ] = useState("");

    useEffect(() => {
        if (!isOpen) {
            setFeedback(""); // reset input khi modal tắt
        }
    }, [ isOpen ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ feedback });
        setFeedback(""); // reset sau khi submit
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
                    PHẢN HỒI ĐƠN HÀNG
                </h5>
                <form
                    className="flex flex-col items-center gap-4"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        name="feedback"
                        placeholder="Vui lòng nhập vấn đề về đơn hàng"
                        value={feedback}
                        className={`${styles.input} w-full max-w-md border border-gray-300 rounded-lg px-4 py-2`}
                        onChange={(e) => setFeedback(e.target.value)}
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

export default FeedbackModal;

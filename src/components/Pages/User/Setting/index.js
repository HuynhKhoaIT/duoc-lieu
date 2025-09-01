'use client';
import { useState } from "react";

import PasswordForm from "./PasswordForm";
import TransactionForm from "./TransactionForm";

import styles from "./Setting.module.scss";

export default function SettingForm() {
    const [ activeForm, setActiveForm ] = useState("password");
    return (
        <div className={`${styles.contactForm} pt-[48px] pb-4`}>
            <div className="container">
                <div className="mb-3">
                    <div className="w-full lg:w-9/12 mx-auto">
                        <div className={`blue-bg p-4 mb-3 rounded-sm shadow`}>
                            <h5 className="text-center mb-3">
                                <b className="gold-text">
                                    {activeForm === "password"
                                        ? "Mật Khẩu Đăng Nhập"
                                        : "Mật Khẩu Giao Dịch"}
                                </b>
                            </h5>
                            <div className="flex justify-center items-center gap-2 mb-2">
                                <button
                                    className={
                                        activeForm === "password"
                                            ? "main-btn"
                                            : "bordered-btn text-center"
                                    }
                                    onClick={() => setActiveForm("password")}
                                >
                                    MK Đăng Nhập
                                </button>
                                <button
                                    className={
                                        activeForm === "transaction"
                                            ? "main-btn"
                                            : "bordered-btn text-center"
                                    }
                                    style={{ width: "150px" }}
                                    onClick={() => setActiveForm("transaction")}
                                >
                                    MK Giao Dịch
                                </button>
                            </div>
                        </div>

                        <div
                            className={`${styles.contactForm} blue-bg p-6 mb-3 shadow`}
                        >
                            {activeForm === "password" ? (
                                <PasswordForm />
                            ) : (
                                <TransactionForm />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

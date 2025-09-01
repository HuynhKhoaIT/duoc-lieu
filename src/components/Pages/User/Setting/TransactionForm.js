"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";

import apiConfig from "@/constants/apiConfig";
import paths from "@/constants/paths";
import fetcher from "@/services/fetcher";

import styles from "./Setting.module.scss";

export default function TransactionForm() {
    const { push } = useRouter();
    const [ loading, setLoading ] = useState(false);
    const [ errors, setErrors ] = useState({});
    const [ form, setForm ] = useState({
        password: "",
        transaction_password: "",
        transaction_password_confirmation: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        let newErrors = {};

        if (!form.password) {
            newErrors.password = "Vui lòng nhập mật khẩu đăng nhập";
        }

        if (
            !form.transaction_password ||
            form.transaction_password.length < 8
        ) {
            newErrors.transaction_password =
                "Mật khẩu giao dịch mới phải có ít nhất 8 ký tự";
        }

        if (
            form.transaction_password !== form.transaction_password_confirmation
        ) {
            newErrors.transaction_password_confirmation =
                "Mật khẩu nhập lại không khớp";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setLoading(false);
            return;
        }

        try {
            await fetcher(apiConfig.account.updateTransaction, {
                data: {
                    password: form.password,
                    transaction_password: form.transaction_password,
                    transaction_password_confirmation:
                        form.transaction_password_confirmation,
                },
            });
            toast.success("Cập nhật mật khẩu giao dịch thành công!");
            setForm({
                password: "",
                transaction_password: "",
                transaction_password_confirmation: "",
            });
            push(paths.profile);
        } catch (err) {
            console.error(err);
            toast.error("Cập nhật thất bại!");
        } finally {
            setLoading(false);
        }
    };

    const inputClass = (name) =>
        `w-full max-w-md border rounded-lg px-4 py-2 ${
            errors[name] ? "border-red-500" : "border-gray-300"
        }`;

    return (
        <form className="text-center" onSubmit={handleSubmit}>
            {/* MK hiện tại */}
            <p className="mb-3 flex flex-col items-center">
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Nhập MKĐN cho lần đầu"
                    className={inputClass("password")}
                />
                {errors.password && (
                    <span className="text-red-500 text-sm mt-1">
                        {errors.password}
                    </span>
                )}
            </p>

            {/* MK mới */}
            <p className="mb-3 flex flex-col items-center">
                <input
                    type="password"
                    name="transaction_password"
                    value={form.transaction_password}
                    onChange={handleChange}
                    placeholder="MK giao dịch mới (≥ 8 ký tự)"
                    className={inputClass("transaction_password")}
                />
                {errors.transaction_password && (
                    <span className="text-red-500 text-sm mt-1">
                        {errors.transaction_password}
                    </span>
                )}
            </p>

            {/* Nhập lại MK */}
            <p className="mb-3 flex flex-col items-center">
                <input
                    type="password"
                    name="transaction_password_confirmation"
                    value={form.transaction_password_confirmation}
                    onChange={handleChange}
                    placeholder="Nhập lại MK giao dịch mới"
                    className={inputClass("transaction_password_confirmation")}
                />
                {errors.transaction_password_confirmation && (
                    <span className="text-red-500 text-sm mt-1">
                        {errors.transaction_password_confirmation}
                    </span>
                )}
            </p>

            {/* Submit */}
            <div className={styles.searchBarTablecell}>
                <button type="submit" className="main-btn" disabled={loading}>
                    {loading ? "Đang cập nhật..." : "Cập Nhật"}
                </button>
            </div>
        </form>
    );
}

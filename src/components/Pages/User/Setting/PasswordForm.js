"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";

import apiConfig from "@/constants/apiConfig";
import paths from "@/constants/paths";
import fetcher from "@/services/fetcher";

import styles from "./Setting.module.scss";

export default function PasswordForm() {
    const { push } = useRouter();
    const [ loading, setLoading ] = useState(false);
    const [ errors, setErrors ] = useState({});

    const [ form, setForm ] = useState({
        password: "",
        new_password: "",
        new_password_confirmation: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" }); // clear error khi nhập lại
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        let newErrors = {};

        // validate password hiện tại
        if (!form.password) {
            newErrors.password = "Vui lòng nhập mật khẩu hiện tại";
        }

        // validate mật khẩu mới
        if (!form.new_password || form.new_password.length < 8) {
            newErrors.new_password = "Mật khẩu mới phải có ít nhất 8 ký tự";
        }

        // validate nhập lại mật khẩu
        if (form.new_password !== form.new_password_confirmation) {
            newErrors.new_password_confirmation =
                "Mật khẩu nhập lại không khớp";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setLoading(false);
            return;
        }

        try {
            await fetcher(apiConfig.account.updatePassword, {
                data: {
                    password: form.password,
                    new_password: form.new_password,
                    new_password_confirmation: form.new_password_confirmation,
                },
            });
            toast.success("Cập nhật mật khẩu thành công!");
            setForm({
                password: "",
                new_password: "",
                new_password_confirmation: "",
            });
            push(paths.profile);
        } catch (err) {
            console.error(err);
            toast.error("Cập nhật mật khẩu thất bại!");
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
                    required
                    value={form.password}
                    onChange={handleChange}
                    placeholder="MK đăng nhập hiện tại"
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
                    name="new_password"
                    required
                    value={form.new_password}
                    onChange={handleChange}
                    placeholder="MK đăng nhập mới (≥ 8 ký tự)"
                    className={inputClass("new_password")}
                />
                {errors.new_password && (
                    <span className="text-red-500 text-sm mt-1">
                        {errors.new_password}
                    </span>
                )}
            </p>

            {/* Nhập lại MK */}
            <p className="mb-3 flex flex-col items-center">
                <input
                    type="password"
                    name="new_password_confirmation"
                    value={form.new_password_confirmation}
                    onChange={handleChange}
                    placeholder="Nhập lại MK đăng nhập mới"
                    className={inputClass("new_password_confirmation")}
                />
                {errors.new_password_confirmation && (
                    <span className="text-red-500 text-sm mt-1">
                        {errors.new_password_confirmation}
                    </span>
                )}
            </p>

            {/* Submit */}
            <div className={styles.searchBarTablecell}>
                <button type="submit" className="main-btn" disabled={loading}>
                    {loading ? "Đang cập nhật..." : "Cập nhật"}
                </button>
            </div>
        </form>
    );
}

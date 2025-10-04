"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

import paths from "@/constants/paths";

import styles from "./Setting.module.scss";

export default function PasswordForm() {
    const { push } = useRouter();
    const [ loading, setLoading ] = useState(false);
    const [ errors, setErrors ] = useState({});
    const [ showPasswordOld, setShowPasswordOld ] = useState(false);
    const [ showPassword, setShowPassword ] = useState(false);
    const [ showPasswordConfirm, setShowPasswordConfirm ] = useState(false);

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
            const res = await fetch("/api/account/update-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    password: form.password,
                    new_password: form.new_password,
                    new_password_confirmation: form.new_password_confirmation,
                }),
            });
            const data = await res.json();
            if (data?.success) {
                toast.success("Cập nhật mật khẩu thành công!");
                setForm({
                    password: "",
                    new_password: "",
                    new_password_confirmation: "",
                });
            }
            // push(paths.profile);
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
        <form
            className="text-center flex justify-center flex-col items-center"
            onSubmit={handleSubmit}
        >
            {/* MK hiện tại */}
            <p className="mb-3 relative w-full max-w-md flex flex-col items-center">
                <input
                    type={showPasswordOld ? "text" : "password"}
                    name="password"
                    required
                    value={form.password}
                    onChange={handleChange}
                    placeholder="MK đăng nhập hiện tại"
                    className={inputClass("password")}
                />
                <span
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPasswordOld(!showPasswordOld)}
                >
                    {showPasswordOld ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
                {errors.password && (
                    <span className="text-red-500 text-sm mt-1">
                        {errors.password}
                    </span>
                )}
            </p>

            {/* MK mới */}
            <p className="mb-3 relative w-full max-w-md flex flex-col items-center">
                <input
                    type={showPassword ? "text" : "password"}
                    name="new_password"
                    required
                    value={form.new_password}
                    onChange={handleChange}
                    placeholder="MK đăng nhập mới (≥ 8 ký tự)"
                    className={inputClass("new_password")}
                />
                <span
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
                {errors.new_password && (
                    <span className="text-red-500 text-sm mt-1">
                        {errors.new_password}
                    </span>
                )}
            </p>

            {/* Nhập lại MK */}
            <p className="mb-3 relative w-full max-w-md flex flex-col items-center">
                <input
                    type={showPasswordConfirm ? "text" : "password"}
                    name="new_password_confirmation"
                    value={form.new_password_confirmation}
                    onChange={handleChange}
                    placeholder="Nhập lại MK đăng nhập mới"
                    className={inputClass("new_password_confirmation")}
                />
                <span
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                >
                    {showPasswordConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
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

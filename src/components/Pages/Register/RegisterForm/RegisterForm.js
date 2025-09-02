"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";

import { storageKeys } from "@/constants";
import paths from "@/constants/paths";
import useAlert from "@/hooks/useAlert"; // import hook SweetAlert
import { removeLocalItem } from "@/utils/localStorage";

import styles from "./RegisterForm.module.scss";

export default function RegisterForm() {
    const router = useRouter();
    const { phone } = router.query;
    const [ loading, setLoading ] = useState(false);
    const { showAlert } = useAlert();

    const validate = (formData) => {
        const name = formData.get("name")?.trim();
        const username = formData.get("username")?.trim();
        const phoneNumber = formData.get("phone_number")?.trim();
        const address = formData.get("address")?.trim();
        const email = formData.get("email")?.trim();
        const password = formData.get("password")?.trim();
        const confirmPassword = formData.get("confirmPassword")?.trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^(0|\+84)\d{9}$/;

        if (!name) return "Vui lòng nhập họ tên";
        if (!username) return "Vui lòng nhập tên đăng nhập";
        if (!phoneRegex.test(phoneNumber)) return "Số điện thoại không hợp lệ";
        if (!emailRegex.test(email)) return "Email không hợp lệ";
        if (!address) return "Vui lòng nhập địa chỉ";
        if (!password || password.length < 8)
            return "Mật khẩu phải tối thiểu 8 ký tự";
        if (confirmPassword !== password) return "Xác nhận mật khẩu không khớp";

        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const errorMsg = validate(formData);

        if (errorMsg) {
            showAlert(errorMsg, "warning");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/account/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.get("name"),
                    username: formData.get("username"),
                    phone_number: formData.get("phone_number"),
                    address: formData.get("address"),
                    email: formData.get("email"),
                    password: formData.get("password"),
                    referrer_phone: phone,
                    password_confirmation: formData.get("confirmPassword"),
                }),
            });
            const data = await res.json();

            if (data.success) {
                await handleLogout();
                toast.success("Đăng ký thành công");
                window.location.href = paths.user;
            } else {
                showAlert(data.message || "Đăng ký thất bại");
            }
        } catch (err) {
            showAlert(err.message);
        } finally {
            setLoading(false);
        }
    };

    async function handleLogout() {
        await fetch("/api/account/logout", { method: "POST" });
        removeLocalItem(storageKeys.PROFILE);
        removeLocalItem(storageKeys.IS_LOGIN);
        window.location.href = "/login";
    }

    return (
        <div className={`${styles.contactForm} blue-bg pb-[500px]`}>
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-row">
                    <div className="lg:w-9/12 sm:w-7/12 w-full mx-auto">
                        <div className={styles.contactForm}>
                            <form
                                onSubmit={handleSubmit}
                                className="text-center flex flex-col gap-4"
                            >
                                {[
                                    { name: "name", label: "Họ tên" },
                                    {
                                        name: "username",
                                        label: "Tên đăng nhập",
                                    },
                                    {
                                        name: "phone_number",
                                        label: "Số điện thoại",
                                    },
                                    {
                                        name: "email",
                                        label: "Email",
                                        type: "email",
                                    },
                                    { name: "address", label: "Địa chỉ" },
                                    {
                                        name: "password",
                                        label: "Mật khẩu",
                                        type: "password",
                                    },
                                    {
                                        name: "confirmPassword",
                                        label: "Xác nhận mật khẩu",
                                        type: "password",
                                    },
                                ].map((field) => (
                                    <div
                                        key={field.name}
                                        className="w-full flex flex-col items-center"
                                    >
                                        <input
                                            type={field.type || "text"}
                                            name={field.name}
                                            placeholder={field.label}
                                            className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                ))}

                                <div className={styles.searchBarTablecell}>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="max-w-md bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                                    >
                                        {loading
                                            ? "Đang đăng ký..."
                                            : "Đăng ký"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

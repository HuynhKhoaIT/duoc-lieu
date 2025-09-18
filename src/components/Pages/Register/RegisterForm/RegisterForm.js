"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

import { storageKeys } from "@/constants";
import paths from "@/constants/paths";
import useAlert from "@/hooks/useAlert";
import { removeLocalItem } from "@/utils/localStorage";

import styles from "./RegisterForm.module.scss";

export default function RegisterForm() {
    const router = useRouter();
    const { phone } = router.query;
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); 
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
    const { showAlert } = useAlert();

    const validate = (formData) => {
        const name = formData.get("name")?.trim();
        const username = formData.get("username")?.trim();
        const phoneNumber = formData.get("phone_number")?.trim();
        const address = formData.get("address")?.trim();
        const password = formData.get("password")?.trim();
        const confirmPassword = formData.get("confirmPassword")?.trim();

        const phoneRegex = /^(0|\+84)\d{9}$/;

        if (!name) return "Vui lòng nhập họ tên";
        if (!username) return "Vui lòng nhập tên đăng nhập";
        if (!phoneRegex.test(phoneNumber)) return "Số điện thoại không hợp lệ";
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
                const errorResponse = data.error;
                if (errorResponse?.errors) {
                    const errorMessages = Object.values(errorResponse.errors)
                        .flat()
                        .join("\n");
                    showAlert(errorMessages);
                } else {
                    showAlert("Có lỗi không xác định xảy ra!");
                }
            }
        } catch (err) {
            const errorResponse = err.error;
            if (errorResponse?.errors) {
                const errorMessages = Object.values(errorResponse.errors)
                    .flat()
                    .join("\n");
                showAlert(errorMessages);
            } else {
                showAlert("Có lỗi không xác định xảy ra!");
            }
        } finally {
            setLoading(false);
        }
    };

    async function handleLogout() {
        try {
            removeLocalItem(storageKeys.PROFILE);
            removeLocalItem(storageKeys.IS_LOGIN);

            await fetch("/api/account/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            window.location.href = "/login";
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

    return (
        <div className={`${styles.contactForm} blue-bg pb-[500px]`}>
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-row">
                    <div className="lg:w-9/12 sm:w-7/12 w-full mx-auto">
                        <div className={styles.contactForm}>
                            <form
                                onSubmit={handleSubmit}
                                className="text-center flex flex-col gap-4 items-center"
                            >
                                <div className="max-w-md w-full flex flex-col items-center">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Họ tên"
                                        className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2"
                                    />
                                </div>

                                <div className="max-w-md w-full flex flex-col items-center">
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Tên đăng nhập"
                                        className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2"
                                    />
                                </div>

                                <div className="max-w-md w-full flex flex-col items-center">
                                    <input
                                        type="tel"
                                        name="phone_number"
                                        placeholder="Số điện thoại"
                                        className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2"
                                    />
                                </div>

                                <div className="max-w-md w-full flex flex-col items-center">
                                    <input
                                        type="text"
                                        name="address"
                                        placeholder="Địa chỉ"
                                        className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2"
                                    />
                                </div>

                                <div className="relative w-full max-w-md flex flex-col items-center">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Mật khẩu"
                                        className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2 pr-10"
                                    />
                                    <span
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </span>
                                </div>

                                <div className="relative w-full max-w-md flex flex-col items-center">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        placeholder="Xác nhận mật khẩu"
                                        className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2 pr-10"
                                    />
                                    <span
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                                        onClick={() =>
                                            setShowConfirmPassword(!showConfirmPassword)
                                        }
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff size={20} />
                                        ) : (
                                            <Eye size={20} />
                                        )}
                                    </span>
                                </div>

                                <div className={styles.searchBarTablecell}>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="max-w-md bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                                    >
                                        {loading ? "Đang đăng ký..." : "Đăng ký"}
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

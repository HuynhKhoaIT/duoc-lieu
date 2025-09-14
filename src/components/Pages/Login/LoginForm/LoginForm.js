"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { storageKeys } from "@/constants";
import paths from "@/constants/paths";
import useAlert from "@/hooks/useAlert";
import { setLocalData } from "@/utils/localStorage";

import styles from "./LoginForm.module.scss";

export default function LoginForm() {
    const [ loading, setLoading ] = useState(false);
    const [ showPassword, setShowPassword ] = useState(false);
    const { showAlert } = useAlert();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const phone = formData.get("phone")?.trim();
        const password = formData.get("password")?.trim();

        if (!phone) {
            showAlert("Vui lòng nhập số điện thoại.");
            setLoading(false);
            return;
        }

        if (!/^[0-9]{9,11}$/.test(phone)) {
            showAlert("Số điện thoại không hợp lệ.");
            setLoading(false);
            return;
        }

        if (!password) {
            showAlert("Vui lòng nhập mật khẩu.");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/account/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    phone_number: phone,
                    password,
                }),
            });

            const data = await res.json();
            if (data.success) {
                setLocalData(storageKeys.IS_LOGIN, true);
                setLocalData(storageKeys.PROFILE, data.user);
                window.location.href = paths.user;
            } else {
                showAlert("Số điện thoại hoặc mật khẩu không đúng.");
            }
        } catch (err) {
            showAlert("Số điện thoại hoặc mật khẩu không đúng.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`${styles.contactForm} blue-bg pb-[500px]`}>
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-row">
                    <div className="lg:w-9/12 sm:w-7/12 w-full mx-auto">
                        <div className={styles.contactForm}>
                            <form
                                onSubmit={handleSubmit}
                                className="text-center flex justify-center items-center flex-col gap-4"
                            >
                                {/* Input số điện thoại */}
                                <p className="w-full flex justify-center items-center px-1">
                                    <input
                                        type="tel"
                                        placeholder="Số điện thoại"
                                        name="phone"
                                        className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2"
                                    />
                                </p>

                                <p className="w-full flex justify-center items-center px-1 relative max-w-md">
                                    <input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        placeholder="Mật khẩu"
                                        name="password"
                                        autoComplete="off"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10"
                                    />

                                    <span
                                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        {showPassword ? (
                                            <EyeOff size={20} />
                                        ) : (
                                            <Eye size={20} />
                                        )}
                                    </span>
                                </p>

                                <div className={styles.searchBarTablecell}>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full max-w-md bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                                    >
                                        {loading
                                            ? "Đang đăng nhập..."
                                            : "Đăng nhập"}
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

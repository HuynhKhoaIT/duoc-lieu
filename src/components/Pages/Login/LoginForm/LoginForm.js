"use client";
import { useState } from "react";
import { useRouter } from "next/router";

import { storageKeys } from "@/constants";
import apiConfig from "@/constants/apiConfig";
import paths from "@/constants/paths";
import fetcher from "@/services/fetcher";
import { setCookie } from "@/utils/cookie";
import { setLocalData } from "@/utils/localStorage";

import styles from "./LoginForm.module.scss";

export default function LoginForm() {
    const router = useRouter();
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const formData = new FormData(e.target);
        const phone = formData.get("phone");
        const password = formData.get("password");

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    phone_number: phone,
                    password,
                }),
            });

            const data = await res.json();

            if (data.success) {
                // ✅ Token đã lưu trong cookie (httpOnly)
                // Chỉ cần lưu profile vào localStorage
                setLocalData(storageKeys.PROFILE, data.user);

                router.push(paths.user);
            } else {
                setError(data.message || "Đăng nhập thất bại");
            }
        } catch (err) {
            setError(err.message);
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
                                {error && (
                                    <p className="text-red-500 text-sm">
                                        {error}
                                    </p>
                                )}

                                <p className="w-full flex justify-center items-center px-1">
                                    <input
                                        type="tel"
                                        placeholder="Số điện thoại"
                                        name="phone"
                                        className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2"
                                        required
                                    />
                                </p>

                                <p className="w-full flex justify-center items-center px-1">
                                    <input
                                        type="password"
                                        placeholder="Mật khẩu"
                                        name="password"
                                        autoComplete="off"
                                        className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2"
                                        required
                                    />
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

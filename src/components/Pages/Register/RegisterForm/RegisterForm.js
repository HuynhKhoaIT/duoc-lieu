"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";

import { storageKeys } from "@/constants";
import apiConfig from "@/constants/apiConfig";
import paths from "@/constants/paths";
import fetcher from "@/services/fetcher";
import { setCookie } from "@/utils/cookie";
import { setLocalData } from "@/utils/localStorage";

import styles from "./RegisterForm.module.scss";

export default function RegisterForm() {
    const router = useRouter();
    const { phone } = router.query;
    const [ loading, setLoading ] = useState(false);
    const [ errors, setErrors ] = useState({});

    const validate = (formData) => {
        const newErrors = {};

        const name = formData.get("name")?.trim();
        const username = formData.get("username")?.trim();
        const phone = formData.get("phone_number")?.trim();
        const address = formData.get("address")?.trim();
        const email = formData.get("email")?.trim();
        const password = formData.get("password")?.trim();
        const confirmPassword = formData.get("confirmPassword")?.trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^(0|\+84)\d{9}$/; // 10 số bắt đầu bằng 0 hoặc +84
        if (!name) newErrors.name = "Vui lòng nhập họ tên";
        if (!username) newErrors.username = "Vui lòng nhập tên đăng nhập";
        if (!phoneRegex.test(phone))
            newErrors.phone_number = "Số điện thoại không hợp lệ";
        if (!emailRegex.test(email)) newErrors.email = "Email không hợp lệ";
        if (!address) newErrors.address = "Vui lòng nhập địa chỉ";
        if (!password || password.length < 8)
            newErrors.password = "Mật khẩu phải tối thiểu 8 ký tự";
        if (confirmPassword !== password)
            newErrors.confirmPassword = "Xác nhận mật khẩu không khớp";

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        const formData = new FormData(e.target);
        const newErrors = validate(formData);

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setLoading(false);
            return;
        }

        try {
            const res = await fetcher(apiConfig.account.register, {
                data: {
                    name: formData.get("name"),
                    username: formData.get("username"),
                    phone_number: formData.get("phone_number"),
                    address: formData.get("address"),
                    email: formData.get("email"),
                    password: formData.get("password"),
                    referrer_phone: phone,
                    password_confirmation: formData.get("confirmPassword"),
                },
            });
            if (res.status === 201) {
                setCookie(storageKeys.TOKEN, res.data.token);
                setLocalData(storageKeys.PROFILE, res.data.user);
                toast.success("Đăng ký thành công");
                window.location.href = paths.user;
            }
        } catch (err) {
            setErrors({ form: err.message });
            toast.error("Đăng ký thất bại");
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
                                            className={`w-full max-w-md border rounded-lg px-4 py-2 ${
                                                errors[field.name]
                                                    ? "!border-red-500 !focus:border-red-500 !focus:ring-red-500"
                                                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                            }`}
                                            required
                                        />
                                        {errors[field.name] && (
                                            <p className="!text-red-500 text-sm mt-1">
                                                {errors[field.name]}
                                            </p>
                                        )}
                                    </div>
                                ))}

                                {errors.form && (
                                    <p className="!text-red-500 text-sm">
                                        {errors.form}
                                    </p>
                                )}
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

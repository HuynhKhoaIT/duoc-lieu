"use client";
import { useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import { toast } from "sonner";

import ConfirmTransactionModal from "@/components/Common/Modal/ConfirmTransactionModal/ConfirmUpdateModal";
import paths from "@/constants/paths";
import useAlert from "@/hooks/useAlert";
import useAuth from "@/hooks/useAuth";

import styles from "./Profile.module.scss";
export default function ProfileForm({ profileData, isLoading }) {
    const [ showModal, setShowModal ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const { showAlert } = useAlert();
    const { profile } = useAuth();

    const validateForm = (payload) => {
        if (!payload.name?.trim()) {
            showAlert("Họ tên không được để trống.");
            return false;
        }
        if (!payload.address?.trim()) {
            showAlert("Địa chỉ không được để trống.");
            return false;
        }
        if (!payload.bank_name?.trim()) {
            showAlert("Tên ngân hàng không được để trống.");
            return false;
        }
        if (!payload.bank_account_number?.trim()) {
            showAlert("Số tài khoản không được để trống.");
            return false;
        }
        if (isNaN(Number(payload.bank_account_number))) {
            showAlert("Số tài khoản phải là số.");
            return false;
        }
        if (!payload.bank_account_name?.trim()) {
            showAlert("Chủ tài khoản không được để trống.");
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        const form = document.querySelector("#profileForm");
        if (!form) return;

        const formData = new FormData(form);
        const payload = Object.fromEntries(formData.entries());

        if (!validateForm(payload)) return;

        setLoading(true);
        try {
            const res = await fetch("/api/account/update-profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...payload,
                }),
            });
            const data = await res.json();
            if (data?.success) {
                toast.success("Cập nhật thành công!");
                                
            } else {
                showAlert(data?.message || "Cập nhật thất bại.");
            }
        } catch (err) {
            showAlert(err.message || "Có lỗi xảy ra ❌");
        } finally {
            setLoading(false);
            setShowModal(false);
        }
    };

    const handleConfirmTransaction = async () => {
        await handleSubmit();
    };

    const [ copied, setCopied ] = useState(false);

    const handleCopy = async () => {
        const input = document.getElementById("link");
        if (input) {
            try {
                await navigator.clipboard.writeText(input.value);
                setCopied(true);
                toast.success("Đã sao chép liên kết!");
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error("Copy failed", err);
                showAlert("Sao chép thất bại!");
            }
        }
    };

    return (
        <div className={`${styles["contact-form"]} mt-[48px] mb-5`}>
            <div className="container">
                <div className="flex flex-wrap">
                    <div className="w-full lg:w-9/12 mx-auto">
                        {/* Skeleton khi loading */}
                        {isLoading ? (
                            <>
                                {/* Skeleton cho phần Liên kết */}
                                <Skeleton
                                    variant="rectangular"
                                    width="100%"
                                    height={100}
                                    className="mb-4"
                                />

                                {/* Skeleton cho phần Form */}
                                <Skeleton
                                    variant="rectangular"
                                    width="100%"
                                    height={300}
                                    className="mb-4"
                                />
                            </>
                        ) : (
                            <>
                                {/* Liên kết */}
                                <div className="flex flex-wrap">
                                    <div className="w-full">
                                        <div
                                            className={`${styles.card} blue-bg p-3`}
                                        >
                                            <h5 className="text-center mb-0">
                                                <b className="gold-text">
                                                    Liên Kết
                                                </b>
                                            </h5>
                                            <div className="w-full mb-2">
                                                <div className="flex flex-wrap justify-center items-center">
                                                    <input
                                                        className={`${styles["form-control"]} text-center mt-3 blue-text`}
                                                        style={{
                                                            height: "47px",
                                                            maxWidth: "400px",
                                                        }}
                                                        type="text"
                                                        id="link"
                                                        value={
                                                            window?.location
                                                                ?.origin +
                                                            paths.signin +
                                                            `/${profile.phone_number}`
                                                        }
                                                        readOnly
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={handleCopy}
                                                        className="read-more-btn mt-3"
                                                        style={{
                                                            height: "47px",
                                                            marginLeft: "-3px",
                                                        }}
                                                    >
                                                        <i className="fas fa-copy mr-1"></i>
                                                        {copied
                                                            ? "Đã Sao Chép"
                                                            : "Sao Chép"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Form Profile */}
                                <div className="flex flex-wrap mt-4">
                                    <div className="w-full">
                                        <div
                                            className={`p-4 ${styles["breadcrumb-bg"]}`}
                                        >
                                            <form id="profileForm">
                                                <div className="flex flex-wrap mb-3">
                                                    {/* Left */}
                                                    <div className="w-full md:w-1/2 mb-3 px-[15px]">
                                                        <p className="flex justify-between items-center px-0">
                                                            <span
                                                                className="blue-text"
                                                                style={{
                                                                    width: "40%",
                                                                }}
                                                            >
                                                                <strong>
                                                                    Họ & tên
                                                                </strong>
                                                            </span>
                                                            <input
                                                                style={{
                                                                    width: "60%",
                                                                }}
                                                                type="text"
                                                                name="name"
                                                                defaultValue={
                                                                    profileData.name
                                                                }
                                                            />
                                                        </p>
                                                        <p className="flex justify-between items-center px-0">
                                                            <span
                                                                className="blue-text"
                                                                style={{
                                                                    width: "40%",
                                                                }}
                                                            >
                                                                <strong>
                                                                    Điện thoại
                                                                </strong>
                                                            </span>
                                                            <input
                                                                style={{
                                                                    width: "60%",
                                                                }}
                                                                type="text"
                                                                name="phone_number"
                                                                defaultValue={
                                                                    profileData.phone_number
                                                                }
                                                                readOnly
                                                            />
                                                        </p>
                                                        <p className="flex justify-between items-center px-0">
                                                            <span
                                                                className="blue-text"
                                                                style={{
                                                                    width: "40%",
                                                                }}
                                                            >
                                                                <strong>
                                                                    Địa chỉ
                                                                </strong>
                                                            </span>
                                                            <input
                                                                style={{
                                                                    width: "60%",
                                                                }}
                                                                type="text"
                                                                name="address"
                                                                defaultValue={
                                                                    profileData.address
                                                                }
                                                            />
                                                        </p>
                                                        <p className="flex justify-between items-center px-0">
                                                            <span
                                                                className="blue-text"
                                                                style={{
                                                                    width: "40%",
                                                                }}
                                                            >
                                                                <strong>
                                                                    Giới thiệu
                                                                </strong>
                                                            </span>
                                                            <input
                                                                style={{
                                                                    width: "60%",
                                                                }}
                                                                type="text"
                                                                name="referrer_phone"
                                                                defaultValue={
                                                                    profileData.referrer_phone
                                                                }
                                                                readOnly
                                                            />
                                                        </p>
                                                    </div>

                                                    {/* Right */}
                                                    <div className="w-full md:w-1/2 px-[15px]">
                                                        <p className="flex justify-between items-center px-0">
                                                            <span
                                                                className="blue-text"
                                                                style={{
                                                                    width: "40%",
                                                                }}
                                                            >
                                                                <strong>
                                                                    Tên ngân
                                                                    hàng
                                                                </strong>
                                                            </span>
                                                            <input
                                                                style={{
                                                                    width: "60%",
                                                                }}
                                                                type="text"
                                                                name="bank_name"
                                                                defaultValue={
                                                                    profileData.bank_name
                                                                }
                                                            />
                                                        </p>
                                                        <p className="flex justify-between items-center px-0">
                                                            <span
                                                                className="blue-text"
                                                                style={{
                                                                    width: "40%",
                                                                }}
                                                            >
                                                                <strong>
                                                                    Số tài khoản
                                                                </strong>
                                                            </span>
                                                            <input
                                                                style={{
                                                                    width: "60%",
                                                                }}
                                                                type="text"
                                                                name="bank_account_number"
                                                                defaultValue={
                                                                    profileData.bank_account_number
                                                                }
                                                            />
                                                        </p>
                                                        <p className="flex justify-between items-center px-0">
                                                            <span
                                                                className="blue-text"
                                                                style={{
                                                                    width: "40%",
                                                                }}
                                                            >
                                                                <strong>
                                                                    Chủ tài
                                                                    khoản
                                                                </strong>
                                                            </span>
                                                            <input
                                                                style={{
                                                                    width: "60%",
                                                                }}
                                                                type="text"
                                                                name="bank_account_name"
                                                                defaultValue={
                                                                    profileData.bank_account_name
                                                                }
                                                            />
                                                        </p>

                                                        <div className="text-center">
                                                            <button
                                                                className="main-btn hover:cursor-pointer"
                                                                type="button"
                                                                onClick={() => {
                                                                    const form =
                                                                        document.querySelector(
                                                                            "#profileForm",
                                                                        );
                                                                    if (!form)
                                                                        return;

                                                                    const formData =
                                                                        new FormData(
                                                                            form,
                                                                        );
                                                                    const payload =
                                                                        Object.fromEntries(
                                                                            formData.entries(),
                                                                        );

                                                                    if (
                                                                        validateForm(
                                                                            payload,
                                                                        )
                                                                    ) {
                                                                        setShowModal(
                                                                            true,
                                                                        );
                                                                    }
                                                                }}
                                                                disabled={
                                                                    loading
                                                                }
                                                            >
                                                                <strong>
                                                                    {loading
                                                                        ? "Đang cập nhật..."
                                                                        : "Cập nhật"}
                                                                </strong>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                {/* End Form */}
                            </>
                        )}
                        <ConfirmTransactionModal
                            isOpen={showModal}
                            onClose={() => setShowModal(false)}
                            onSubmit={handleConfirmTransaction}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

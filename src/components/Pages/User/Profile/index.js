import { useState } from "react";
import { toast } from "sonner";

import apiConfig from "@/constants/apiConfig";
import fetcher from "@/services/fetcher";

import ConfirmUpdateModal from "./ConfirmUpdateModal/ConfirmUpdateModal";

import styles from "./Profile.module.scss";

export default function ProfileForm({ profileData, loadingProfile }) {
    console.log(profileData);
    const [ showModal, setShowModal ] = useState(false);
    const [ message, setMessage ] = useState("");
    const [ loading, setLoading ] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        // chuyển thành object
        const payload = Object.fromEntries(formData.entries());

        setLoading(true);
        try {
            const res = await fetcher(apiConfig.profile.update, {
                data: {
                    ...payload,
                },
            });
            toast.success("Cập nhật thành công");
            console.log(res);
        } catch (err) {
            setMessage("Có lỗi xảy ra ❌");
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmTransaction = async ({ transactionPassword }) => {
        console.log(transactionPassword);
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
                toast.error("Sao chép thất bại!");
            }
        }
    };
    return (
        <div className={`${styles["contact-form"]} mt-5 mb-5`}>
            <div className="container">
                <div className="flex flex-wrap">
                    <div className="w-full lg:w-9/12 mx-auto">
                        {/* Liên kết */}
                        <div className="flex flex-wrap">
                            <div className="w-full">
                                <div className={`${styles.card} blue-bg p-3`}>
                                    <h5 className="text-center mb-0">
                                        <b className={"gold-text"}>Liên Kết</b>
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
                                                value="https://duoclieuxanh.net/signin/0907458839"
                                                readOnly
                                            />
                                            <button
                                                type="button"
                                                onClick={handleCopy}
                                                className="read-more-btn mt-3"
                                                style={{
                                                    // maxWidth: "150px",
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
                                    <form>
                                        <div className="flex flex-wrap mb-3">
                                            {/* Left */}
                                            <div className="w-full md:w-1/2 mb-3 px-[15px]">
                                                <p className="flex justify-between items-center px-0">
                                                    <span
                                                        className={`blue-text`}
                                                        style={{ width: "40%" }}
                                                    >
                                                        <strong>
                                                            Họ & tên
                                                        </strong>
                                                    </span>
                                                    <input
                                                        style={{ width: "60%" }}
                                                        type="text"
                                                        name="name"
                                                        defaultValue={
                                                            profileData.name
                                                        }
                                                    />
                                                </p>
                                                <p className="flex justify-between items-center px-0">
                                                    <span
                                                        className={`blue-text`}
                                                        style={{ width: "40%" }}
                                                    >
                                                        <strong>
                                                            Điện thoại
                                                        </strong>
                                                    </span>
                                                    <input
                                                        style={{ width: "60%" }}
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
                                                        className={`blue-text`}
                                                        style={{ width: "40%" }}
                                                    >
                                                        <strong>Địa chỉ</strong>
                                                    </span>
                                                    <input
                                                        style={{ width: "60%" }}
                                                        type="text"
                                                        name="address"
                                                        defaultValue={
                                                            profileData.address
                                                        }
                                                    />
                                                </p>
                                                <p className="flex justify-between items-center px-0">
                                                    <span
                                                        className={`blue-text`}
                                                        style={{ width: "40%" }}
                                                    >
                                                        <strong>
                                                            Giới thiệu
                                                        </strong>
                                                    </span>
                                                    <input
                                                        style={{ width: "60%" }}
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
                                                        className={`blue-text`}
                                                        style={{ width: "40%" }}
                                                    >
                                                        <strong>
                                                            Tên ngân hàng
                                                        </strong>
                                                    </span>
                                                    <input
                                                        style={{ width: "60%" }}
                                                        type="text"
                                                        name="bank_name"
                                                        defaultValue={
                                                            profileData.bank_name
                                                        }
                                                    />
                                                </p>
                                                <p className="flex justify-between items-center px-0">
                                                    <span
                                                        className={`blue-text`}
                                                        style={{ width: "40%" }}
                                                    >
                                                        <strong>
                                                            Số tài khoản
                                                        </strong>
                                                    </span>
                                                    <input
                                                        style={{ width: "60%" }}
                                                        type="text"
                                                        name="bank_account_number"
                                                        defaultValue={
                                                            profileData.bank_account_number
                                                        }
                                                    />
                                                </p>
                                                <p className="flex justify-between items-center px-0">
                                                    <span
                                                        className={`blue-text`}
                                                        style={{ width: "40%" }}
                                                    >
                                                        <strong>
                                                            Chủ tài khoản
                                                        </strong>
                                                    </span>
                                                    <input
                                                        style={{ width: "60%" }}
                                                        type="text"
                                                        name="bank_account_name"
                                                        defaultValue={
                                                            profileData.bank_account_name
                                                        }
                                                    />
                                                </p>

                                                {/* Nút cập nhật + Modal */}
                                                <div className="text-center">
                                                    <button
                                                        className={
                                                            "main-btn hover:cursor-pointer"
                                                        }
                                                        type="button"
                                                        onClick={() => {
                                                            setShowModal(true);
                                                        }}
                                                        disabled={loading}
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
                        <ConfirmUpdateModal
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

import { useState } from "react";
import { toast } from "sonner";

import apiConfig from "@/constants/apiConfig";
import fetcher from "@/services/fetcher";

import styles from "./Profile.module.scss";

export default function ProfileForm({ profileData }) {
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
                                                className={`read-more-btn mt-3`}
                                                style={{
                                                    maxWidth: "150px",
                                                    height: "47px",
                                                    marginLeft: "-3px",
                                                }}
                                            >
                                                <i className="fas fa-copy mr-1"></i>
                                                Sao Chép
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
                                    <form onSubmit={handleSubmit}>
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
                                                        type="submit"
                                                        disabled={loading}
                                                    >
                                                        <strong>
                                                            {loading
                                                                ? "Đang cập nhật..."
                                                                : "Cập nhật"}
                                                        </strong>
                                                    </button>

                                                    {/* <div
                                                        id="modalauth"
                                                        className="modal"
                                                    >
                                                        <div className="modal-dialog">
                                                            <div
                                                                className={`modal-content ${styles["modal-center"]} blue-bg text-center`}
                                                            >
                                                                <h5
                                                                    className={`${styles["modal-title"]}  gold-text text-center pt-4`}
                                                                >
                                                                    <b>
                                                                        MẬT KHẨU
                                                                        GIAO
                                                                        DỊCH
                                                                    </b>
                                                                </h5>
                                                                <div className="modal-body flex justify-center items-center">
                                                                    <p>
                                                                        <input
                                                                            type="password"
                                                                            name="passauth"
                                                                            placeholder="Vui lòng nhập mật khẩu giao dịch"
                                                                            style={{
                                                                                width: "365px",
                                                                            }}
                                                                            required
                                                                        />
                                                                    </p>
                                                                </div>
                                                                <div
                                                                    className={`${styles["contact-form"]} pt-2 pb-4`}
                                                                >
                                                                    <button
                                                                        type="submit"
                                                                        className={
                                                                            "bordered-btn"
                                                                        }
                                                                    >
                                                                        Xác nhận
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className={`bordered-btn ml-2`}
                                                                        style={{
                                                                            width: "110px",
                                                                        }}
                                                                        data-dismiss="modal"
                                                                    >
                                                                        Hủy bỏ
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        {/* End Form */}
                    </div>
                </div>
            </div>
        </div>
    );
}

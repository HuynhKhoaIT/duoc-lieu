import Link from "next/link";

import paths from "@/constants/paths";

import styles from "./Setting.module.scss";

export default function PassAuthForm() {
    return (
        <div className={`${styles.contactForm} pt-[48px] pb-4`}>
            <div className="container">
                <div className="mb-3">
                    <div className="w-full lg:w-9/12 mx-auto">
                        {/* Card mật khẩu */}
                        <div className={`blue-bg p-4 mb-3 rounded-sm shadow`}>
                            <h5 className="text-center mb-3">
                                <b className="gold-text">Mật Khẩu Giao Dịch</b>
                            </h5>
                            <div className="flex justify-center items-center gap-2 mb-2">
                                <Link href={paths.setting} className="bordered-btn">
                                    MK Đăng Nhập
                                </Link>
                                <Link
                                    href="/user/passauth"
                                    className={`main-btn text-center`}
                                    style={{ width: "150px" }}
                                >
                                    MK Giao Dịch
                                </Link>
                            </div>
                        </div>

                        {/* Form đổi mật khẩu */}
                        <div
                            className={`${styles.contactForm} blue-bg p-6 mb-3 shadow`}
                        >
                            <form
                                className="text-center"
                                action="/user/setting"
                                method="post"
                            >
                                {/* MK hiện tại */}
                                <p className="mb-3 flex justify-center">
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Nhập MKĐN cho lần đầu"
                                        className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2"
                                    />
                                </p>

                                {/* MK mới */}
                                <p className="mb-3 flex justify-center">
                                    <input
                                        type="password"
                                        name="newpassword"
                                        placeholder="MK giao dịch mới"
                                        className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2"
                                    />
                                </p>

                                {/* Nhập lại MK */}
                                <p className="mb-3 flex justify-center">
                                    <input
                                        type="password"
                                        name="repassword"
                                        placeholder="Nhập lại MK giao dịch mới"
                                        className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2"
                                    />
                                </p>

                                {/* Submit */}
                                <div className={styles.searchBarTablecell}>
                                    <button type="submit" className="main-btn">
                                        Cập Nhật
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

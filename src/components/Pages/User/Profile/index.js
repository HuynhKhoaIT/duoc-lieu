import styles from "./Profile.module.css";

export default function Profile() {
    return (
        <div className={`${styles["contact-form"]} mt-5 mb-5`}>
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-wrap">
                    <div className="w-full lg:w-9/12 mx-auto">
                        {/* Liên kết */}
                        <div className="flex flex-wrap">
                            <div className="w-full">
                                <div
                                    className={`${styles.card} ${styles["blue-bg"]} p-3`}
                                >
                                    <h5 className="text-center mb-0">
                                        <b className={styles["gold-text"]}>
                                            Liên Kết
                                        </b>
                                    </h5>
                                    <div className="w-full mb-2">
                                        <div className="flex flex-wrap justify-center items-center">
                                            <input
                                                className={`form-control text-center mt-3 ${styles["blue-text"]}`}
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
                                                className={`${styles["read-more-btn"]} mt-3`}
                                                style={{
                                                    maxWidth: "150px",
                                                    marginLeft: "-3px",
                                                }}
                                                // onClick={() => copy("link")}
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
                                    <form action="/user/profile" method="post">
                                        <input
                                            type="hidden"
                                            name="_token"
                                            value="TOKEN_HERE"
                                        />

                                        <div className="flex flex-wrap mb-3">
                                            {/* Left */}
                                            <div className="w-full md:w-1/2 mb-3">
                                                <p className="flex justify-between items-center px-0">
                                                    <span
                                                        className={`${styles["blue-text"]}`}
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
                                                        defaultValue="Hồ Văn Vũ"
                                                    />
                                                </p>
                                                <p className="flex justify-between items-center px-0">
                                                    <span
                                                        className={`${styles["blue-text"]}`}
                                                        style={{ width: "40%" }}
                                                    >
                                                        <strong>
                                                            Điện thoại
                                                        </strong>
                                                    </span>
                                                    <input
                                                        style={{ width: "60%" }}
                                                        type="text"
                                                        name="phone"
                                                        defaultValue="0907458839"
                                                        readOnly
                                                    />
                                                </p>
                                                <p className="flex justify-between items-center px-0">
                                                    <span
                                                        className={`${styles["blue-text"]}`}
                                                        style={{ width: "40%" }}
                                                    >
                                                        <strong>Địa chỉ</strong>
                                                    </span>
                                                    <input
                                                        style={{ width: "60%" }}
                                                        type="text"
                                                        name="address"
                                                        defaultValue="01 Tô Hiến Thành, P. An Khánh, Q. Ninh Kiều, TP Cần Thơ"
                                                    />
                                                </p>
                                                <p className="flex justify-between items-center px-0">
                                                    <span
                                                        className={`${styles["blue-text"]}`}
                                                        style={{ width: "40%" }}
                                                    >
                                                        <strong>
                                                            Giới thiệu
                                                        </strong>
                                                    </span>
                                                    <input
                                                        style={{ width: "60%" }}
                                                        type="text"
                                                        name="sponsor"
                                                        defaultValue="0363810001"
                                                        readOnly
                                                    />
                                                </p>
                                            </div>

                                            {/* Right */}
                                            <div className="w-full md:w-1/2">
                                                <p className="flex justify-between items-center px-0">
                                                    <span
                                                        className={`${styles["blue-text"]}`}
                                                        style={{ width: "40%" }}
                                                    >
                                                        <strong>
                                                            Tên ngân hàng
                                                        </strong>
                                                    </span>
                                                    <input
                                                        style={{ width: "60%" }}
                                                        type="text"
                                                        name="bankname"
                                                        defaultValue="VietcomBank"
                                                    />
                                                </p>
                                                <p className="flex justify-between items-center px-0">
                                                    <span
                                                        className={`${styles["blue-text"]}`}
                                                        style={{ width: "40%" }}
                                                    >
                                                        <strong>
                                                            Số tài khoản
                                                        </strong>
                                                    </span>
                                                    <input
                                                        style={{ width: "60%" }}
                                                        type="text"
                                                        name="banknumber"
                                                        defaultValue="0091000349565"
                                                    />
                                                </p>
                                                <p className="flex justify-between items-center px-0">
                                                    <span
                                                        className={`${styles["blue-text"]}`}
                                                        style={{ width: "40%" }}
                                                    >
                                                        <strong>
                                                            Chủ tài khoản
                                                        </strong>
                                                    </span>
                                                    <input
                                                        style={{ width: "60%" }}
                                                        type="text"
                                                        name="bankowner"
                                                        defaultValue="Hồ Văn Vũ"
                                                    />
                                                </p>

                                                {/* Nút cập nhật + Modal */}
                                                <div className="text-center">
                                                    <button
                                                        type="button"
                                                        data-toggle="modal"
                                                        data-target="#modalauth"
                                                        className={
                                                            styles["main-btn"]
                                                        }
                                                    >
                                                        <strong>
                                                            Cập Nhật
                                                        </strong>
                                                    </button>

                                                    <div
                                                        id="modalauth"
                                                        className="modal"
                                                    >
                                                        <div className="modal-dialog">
                                                            <div
                                                                className={`modal-content ${styles["modal-center"]} ${styles["blue-bg"]} text-center`}
                                                            >
                                                                <h5
                                                                    className={`modal-title ${styles["gold-text"]} text-center pt-4`}
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
                                                                            styles[
                                                                                "bordered-btn"
                                                                            ]
                                                                        }
                                                                    >
                                                                        Xác nhận
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className={`${styles["bordered-btn"]} ml-2`}
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
                                                    </div>
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

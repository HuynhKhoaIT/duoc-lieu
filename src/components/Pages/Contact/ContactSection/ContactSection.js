import styles from "./ContactSection.module.scss";

export default function ContactSection() {
    return (
        <div className={`${styles["contact-from-section"]} py-[48px]`}>
            <div className="container">
                <div className="flex justify-center items-center">
                    <div className="w-full lg:w-8/12 px-0 lg:px-[15px]">
                        <div
                            className={`${styles["contact-form-wrap"]} ${styles["breadcrumb-bg"]}`}
                        >
                            <div className={styles["contact-form-box"]}>
                                <h4>
                                    <i className="fas fa-map ml-4"></i> Địa chỉ
                                    trụ sở chính
                                </h4>
                                <p>
                                    Số 215, ấp 10, Xã Vị Thẳng, Huyện Vị Thủy,
                                    Tỉnh Hậu Giang, Việt Nam
                                </p>
                            </div>
                            <div className={styles["contact-form-box"]}>
                                <h4>
                                    <i className="fas fa-address-book ml-4"></i>{" "}
                                    Điện thoại hỗ trợ
                                </h4>
                                <p>Hotline: 0931.003.004</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

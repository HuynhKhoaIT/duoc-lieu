import styles from "./FeatureSection.module.scss";

const features = [
    {
        icon: "fas fa-leaf",
        title: "Dược Liệu Thiên Nhiên",
        desc: "Sản phẩm được chiết suất hoàn toàn từ nguồn nguyên liệu tự nhiên",
    },
    {
        icon: "fas fa-briefcase-medical",
        title: "Bảo Vệ Sức Khỏe Cả Nhà",
        desc: "Không hóa chất độc hại tích lũy dần vào cơ thể",
    },
    {
        icon: "fas fa-money-bill-alt",
        title: "Giá Thành Hợp Túi Tiền",
        desc: "Do chủ động trong nguồn nguyên liệu và tự sản xuất.",
    },
    {
        icon: "fas fa-gift",
        title: "Chính Sách Ưu Đãi",
        desc: "Đảm bảo lợi ích tối đa cho khách hàng và đối tác",
    },
];

export default function FeatureSection() {
    return (
        <div className={`${styles["feature-bg"]} mt-[48px] mb-[48px]`}>
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap">
                    <div className="lg:w-7/12 w-full">
                        <div className={styles["featured-text"]}>
                            <h2 className="pb-3">
                                Tại sao chọn
                                <span className={styles["orange-text"]}>
                                    {" "}
                                    N22
                                </span>
                            </h2>

                            <div className="flex flex-wrap">
                                {features.map((item, index) => (
                                    <div
                                        key={index}
                                        className="w-full md:w-1/2 mb-5 md:mb-5 flex"
                                    >
                                        <div
                                            className={`${styles["list-box"]} flex`}
                                        >
                                            <div
                                                className={styles["list-icon"]}
                                            >
                                                <i className={item.icon}></i>
                                            </div>
                                            <div className={styles["content"]}>
                                                <h3>{item.title}</h3>
                                                <p>{item.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

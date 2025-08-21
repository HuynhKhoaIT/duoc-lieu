import styles from "./AboutSection.module.scss";

export default function AboutSection() {
    return (
        <div className={`${styles["abt-section"]} mb-[48px]`}>
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left side */}
                    <div
                        className={styles["abt-bg"]}
                    >
                        <a
                            href="https://www.youtube.com/watch?v=LYdT8bNDm24"
                            className={`${styles["video-play-btn"]} popup-youtube`}
                        >
                            <i className="fas fa-play"></i>
                        </a>
                    </div>

                    {/* Right side */}
                    <div className={styles["abt-text"]}>
                        <p className={styles["top-sub"]}>Từ năm 1999</p>
                        <h2>
                            Tâm huyết với{" "}
                            <span className={styles["orange-text"]}>N22</span>
                        </h2>
                        <p>
                            Rời thành thị về nông thôn khởi nghiệp từ bàn tay
                            trắng, chuyện tưởng đùa nhưng đó lại là con đường mà
                            nữ doanh nhân Đặng Thị Kim Ngọc ở xã Vị Thắng, huyện
                            Vị Thủy, tỉnh Hậu Giang chọn lựa sau hơn 20 năm bôn
                            ba đất khách. “Lửa thử vàng, gian nan thử sức” thành
                            quả sau 5 năm miệt mài, nghiên cứu người phụ nữ
                            “chân yếu, tay mềm” gầy dựng thành công sản phẩm dầu
                            gội đầu dược liệu N22 từ những nguyên liệu sẵn có
                            tại địa phương và vinh dự đạt chuẩn OCOP 4 sao trong
                            chương trình Quốc gia mỗi xã một sản phẩm (OCOP)
                            tỉnh Hậu Giang năm 2022.
                        </p>
                        <a
                            href="/about"
                            className={`boxed-btn mt-4`}
                        >
                            Xem thêm
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

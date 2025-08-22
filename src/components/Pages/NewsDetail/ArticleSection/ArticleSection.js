import Link from "next/link";

import styles from "./ArticleSection.module.scss";

export default function ArticleSection() {
    return (
        <div className="my-[48px]">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="lg:w-2/3">
                        <div className={styles.singleArticleSection}>
                            <div className={styles.singleArticleText}>
                                <div
                                    className={styles.singleArticleBg}
                                    style={{
                                        backgroundImage:
                                            "url(/images/news/n22news2.png)",
                                    }}
                                ></div>
                                <p className={styles.blogMeta}>
                                    <span className={styles.author}>
                                        <i className="fas fa-user"></i> Admin
                                    </span>
                                    <span className={styles.date}>
                                        <i className="fas fa-calendar"></i>{" "}
                                        05/04/2025
                                    </span>
                                </p>
                                <h2 className="text-2xl font-bold mb-4">
                                    Hành trình với N22
                                </h2>
                                <p>
                                    Gầy dựng thành công sản phẩm dầu gội đầu
                                    dược liệu N22 từ những nguyên liệu sẵn có
                                    tại địa phương
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/3">
                        <div className={styles.sidebarSection}>
                            <div className={styles.recentPosts}>
                                <h4 className="text-xl font-semibold mb-4">
                                    Bài viết gần đây
                                </h4>
                                <ul className="list-none">
                                    <li>
                                        <Link
                                            href="/posts/1"
                                            className="text-blue-600 hover:underline"
                                        >
                                            Khởi Nghiệp Với N22
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/posts/3"
                                            className="text-blue-600 hover:underline"
                                        >
                                            Tâm huyết với N22
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/posts/5"
                                            className="text-blue-600 hover:underline"
                                        >
                                            MỘT SỐ SỞ THÍCH VÀ THÓI QUEN TAI HẠI
                                            KH...
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/posts/12"
                                            className="text-blue-600 hover:underline"
                                        >
                                            CHƯƠNG TRÌNH SIÊU KHUYẾN MÃI CHÀO
                                            ĐẠI LỄ...
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

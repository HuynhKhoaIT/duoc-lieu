"use client";

import Link from "next/link";

import styles from "./LatestNews.module.scss"; 

const newsList = [
    {
        id: 1,
        title: "Khởi Nghiệp Với N22",
        img: "/images/news/n22news.png",
        date: "05/04/2025",
        excerpt: "Rời thành thị về nông thôn khởi nghiệp từ bàn tay trắng",
    },
    {
        id: 2,
        title: "Hành trình với N22",
        img: "/images/news/n22news2.png",
        date: "05/04/2025",
        excerpt:
            "Gầy dựng thành công sản phẩm dầu gội đầu dược liệu N22 từ những nguyê...",
    },
    {
        id: 3,
        title: "Tâm huyết với N22",
        img: "/images/news/n22THHG.png",
        date: "06/04/2025",
        excerpt: "“Lửa thử vàng, gian nan thử sức” thành quả sau 22 năm mi...",
    },
];

export default function LatestNews() {
    return (
        <div className={`py-8 ${styles.latestNews}`}>
            <div className="container mx-auto px-4">
                {/* Section Title */}
                <div className={`${styles.sectionTitle} mb-[48px]`}>
                    <h3>
                        <span >Bài Viết</span> Tham
                        Khảo
                    </h3>
                </div>

                {/* News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {newsList.map((news) => (
                        <div
                            key={news.id}
                            className={`${styles.singleNews} shadow-md`}
                        >
                            <Link href={`/posts/${news.id}`}>
                                <div
                                    className={`${styles.newsBg}`}
                                    style={{
                                        backgroundImage: `url(${news.img})`,
                                    }}
                                />
                            </Link>
                            <div className={`${styles.newsText} p-4`}>
                                <h3>
                                    <Link href={`/posts/${news.id}`}>
                                        {news.title}
                                    </Link>
                                </h3>
                                <p className={`${styles.blogMeta}`}>
                                    <span className="mr-3">
                                        <i className="fas fa-user"></i> Admin
                                    </span>
                                    <span>
                                        <i className="fas fa-calendar"></i>{" "}
                                        {news.date}
                                    </span>
                                </p>
                                <p className={styles.excerpt}>
                                    {news.excerpt}
                                </p>
                                <Link
                                    href={`/posts/${news.id}`}
                                    className={`read-more-btn hover:underline`}
                                >
                                    Đọc thêm{" "}
                                    <i className="fas fa-angle-right"></i>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

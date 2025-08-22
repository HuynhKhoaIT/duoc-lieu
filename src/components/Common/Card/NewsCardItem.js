import Link from "next/link";

import paths from "@/constants/paths";

import styles from "./NewsCardItem.module.scss";
export default function NewsCardItem({ news }) {
    return (
        <div key={news.id} className={`${styles.singleNews} shadow-md`}>
            <Link href={`${paths.news}/${news.id}`}>
                <div
                    className={`${styles.newsBg}`}
                    style={{
                        backgroundImage: `url(${news.img})`,
                    }}
                />
            </Link>
            <div className={`${styles.newsText} p-4`}>
                <h3>
                    <Link href={`${paths.news}/${news.id}`}>{news.title}</Link>
                </h3>
                <p className={`${styles.blogMeta}`}>
                    <span className="mr-3">
                        <i className="fas fa-user"></i> Admin
                    </span>
                    <span>
                        <i className="fas fa-calendar"></i> {news.date}
                    </span>
                </p>
                <p className={styles.excerpt}>{news.excerpt}</p>
                <Link
                    href={`${paths.news}/${news.id}`}
                    className={`read-more-btn hover:underline`}
                >
                    Đọc thêm <i className="fas fa-angle-right"></i>
                </Link>
            </div>
        </div>
    );
}

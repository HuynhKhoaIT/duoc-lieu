import Link from "next/link";

import paths from "@/constants/paths";
import { formatDateString, getPreviewFromHTML } from "@/utils";

import styles from "./NewsCardItem.module.scss";
export default function NewsCardItem({ news }) {
    return (
        <div key={news.id} className={`${styles.singleNews} shadow-md`}>
            <Link href={`${paths.news}/${news.slug}`}>
                <div
                    className={`${styles.newsBg}`}
                    style={{
                        backgroundImage: `url(${news.thumbnail})`,
                    }}
                />
            </Link>
            <div className={`${styles.newsText} p-4`}>
                <h3>
                    <Link href={`${paths.news}/${news.slug}`}>{news.title}</Link>
                </h3>
                <p className={`${styles.blogMeta}`}>
                    <span className="mr-3">
                        <i className="fas fa-user"></i> Admin
                    </span>
                    <span>
                        <i className="fas fa-calendar"></i>{" "}
                        {formatDateString(news.created_at)}
                    </span>
                </p>
                <p className={`${styles.excerpt} line-clamp-2`}>{getPreviewFromHTML(news.content,70)}</p>
                <Link
                    href={`${paths.news}/${news.slug}`}
                    className={`read-more-btn hover:underline`}
                >
                    Đọc thêm <i className="fas fa-angle-right"></i>
                </Link>
            </div>
        </div>
    );
}

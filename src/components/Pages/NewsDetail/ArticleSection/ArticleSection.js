import Link from "next/link";

import { formatDateString } from "@/utils";

import styles from "./ArticleSection.module.scss";

export default function ArticleSection({ dataDetail, newsList }) {
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
                                        backgroundImage: `url(${dataDetail?.thumbnail})`,
                                    }}
                                ></div>
                                <p className={styles.blogMeta}>
                                    <span className={styles.author}>
                                        <i className="fas fa-user"></i> Admin
                                    </span>
                                    <span className={styles.date}>
                                        <i className="fas fa-calendar"></i>{" "}
                                        {formatDateString(
                                            dataDetail?.created_at,
                                        )}
                                    </span>
                                </p>
                                <h2 className="text-2xl font-bold mb-4">
                                    {dataDetail?.title}
                                </h2>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: dataDetail?.content,
                                    }}
                                />
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
                                    {newsList?.data?.map((item, index) => (
                                        <li key={item.id}>
                                            <Link
                                                href="/posts/1"
                                                //max 2 line
                                                className="text-blue-600 hover:underline line-clamp-2"
                                            >
                                                {item.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

"use client";

import NewsCardItem from "@/components/Common/Card/NewsCardItem";

import styles from "./LatestNews.module.scss";

export default function LatestNews({ newsData }) {
    return (
        <div className={`py-8 ${styles.latestNews}`}>
            <div className="container mx-auto px-4">
                {/* Section Title */}
                <div className={`${styles.sectionTitle} mb-[48px]`}>
                    <h3>
                        <span>Bài Viết</span> Tham Khảo
                    </h3>
                </div>

                {/* News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {newsData?.data?.map((news, index) => {
                        if (index < 3) {
                            return <NewsCardItem key={news.id} news={news} />;
                        }
                    })}
                </div>
            </div>
        </div>
    );
}

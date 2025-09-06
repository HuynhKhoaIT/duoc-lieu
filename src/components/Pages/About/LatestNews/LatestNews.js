"use client";

import NewsCardItem from "@/components/Common/Card/NewsCardItem";

import styles from "./LatestNews.module.scss";

export default function LatestNews({ newsListData }) {
    return (
        <div className={`py-8 pt-0 ${styles.latestNews}`}>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {newsListData?.data?.map((news) => (
                        <NewsCardItem key={news.id} news={news} />
                    ))}
                </div>
            </div>
        </div>
    );
}

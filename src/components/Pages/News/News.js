import React from "react";

import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import NewsCardItem from "@/components/Common/Card/NewsCardItem";

export default function NewsPage({ data }) {
    return (
        <>
            <Breadcrumb title={"Bài viết"} />
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-[48px] mb-4">
                    {data?.data?.map((news) => (
                        <NewsCardItem key={news.id} news={news} />
                    ))}
                </div>
            </div>
        </>
    );
}

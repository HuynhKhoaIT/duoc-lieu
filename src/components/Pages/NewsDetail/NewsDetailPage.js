import { Suspense } from "react";

import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";

import ArticleSection from "./ArticleSection/ArticleSection";

export default function NewsDetailPage({ dataDetail, newsList, loading }) {
    return (
        <>
            <Breadcrumb title={"Bài viết chi tiết"} />
            <Suspense fallback={<>loading</>}>
                <ArticleSection
                    dataDetail={dataDetail}
                    loading={loading}
                    newsList={newsList}
                />
            </Suspense>
            <LogoCarousel />
        </>
    );
}

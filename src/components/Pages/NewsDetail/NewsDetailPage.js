import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";

import ArticleSection from "./ArticleSection/ArticleSection";

export default function NewsDetailPage({ dataDetail, newsList, loading }) {
    return (
        <>
            <Breadcrumb title={"Bài viết chi tiết"} />
            <ArticleSection
                dataDetail={dataDetail}
                loading={loading}
                newsList={newsList}
            />
        </>
    );
}

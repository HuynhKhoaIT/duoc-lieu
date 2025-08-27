import Layout from "@/components/layouts/Layout";
import NewsPage from "@/components/Pages/News/News";
import apiConfig from "@/constants/apiConfig";
import useListData from "@/hooks/useListData";

function News() {
    const {
        data: news,
        loading,
        error,
        refetch,
    } = useListData(apiConfig.news.getList);

    return (
        <NewsPage
            data={news}
            loading={loading}
            error={error}
            onReload={refetch}
        />
    );
}

News.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default News;

import Layout from "@/components/layouts/Layout";
import NewsPage from "@/components/Pages/News/News";

function News() {

    return (
        <NewsPage/>
    );
}

News.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default News;

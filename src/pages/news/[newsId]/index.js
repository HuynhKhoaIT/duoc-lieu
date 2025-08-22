import Layout from "@/components/layouts/Layout";
import NewsDetailPage from "@/components/Pages/NewsDetail/NewsDetailPage";

function NewsDetail() {

    return (
        <NewsDetailPage/>
    );
}

NewsDetail.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default NewsDetail;

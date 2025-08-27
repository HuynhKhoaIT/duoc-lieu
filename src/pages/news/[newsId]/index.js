import Layout from "@/components/layouts/Layout";
import NewsDetailPage from "@/components/Pages/NewsDetail/NewsDetailPage";
import apiConfig from "@/constants/apiConfig";

function NewsDetail({ news, newsList, error, errorList }) {
    return (
        <NewsDetailPage
            dataDetail={news}
            newsList={newsList}
            error={error}
            errorList={errorList}
        />
    );
}

// SSR
export async function getServerSideProps(context) {
    const { newsId } = context.params;

    let news = null;
    let newsList = [];
    let error = null;
    let errorList = null;

    try {
        const res = await fetch(apiConfig.news.getDetail.url.replace(":id", newsId));
        news = await res.json();
    } catch (err) {
        error = err.message;
    }

    try {
        const resList = await fetch(apiConfig.news.getList.url);
        newsList = await resList.json();
    } catch (err) {
        errorList = err.message;
    }

    return {
        props: {
            news: news?.data,
            newsList,
            error,
            errorList,
        },
    };
}

NewsDetail.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default NewsDetail;

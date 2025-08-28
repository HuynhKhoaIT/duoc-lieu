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

export async function getStaticProps({ params }) {
    try {
        const [res, resList] = await Promise.all([
            fetch(apiConfig.news.getDetail.url.replace(":id", params.newsId), {
                cache: "force-cache", // hoặc "no-store" nếu muốn luôn lấy mới
            }),
            fetch(apiConfig.news.getList.url, {
                cache: "force-cache",
            }),
        ]);

        const news = res.ok ? await res.json() : null;
        const newsList = resList.ok ? await resList.json() : [];

        return {
            props: {
                news: news?.data || null,
                newsList,
                error: res.ok ? null : `Error ${res.status}`,
                errorList: resList.ok ? null : `Error ${resList.status}`,
            },
            revalidate: 300, // sau 300s sẽ build lại
        };
    } catch (err) {
        return {
            props: {
                news: null,
                newsList: [],
                error: err.message,
                errorList: err.message,
            },
            revalidate: 60, // fallback nhanh hơn nếu lỗi
        };
    }
}

export async function getStaticPaths() {
    return { paths: [], fallback: "blocking" };
}

NewsDetail.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default NewsDetail;

import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import RenderContext from "@/components/context/RenderContext";
import Layout from "@/components/layouts/Layout";
import NewsDetailPage from "@/components/Pages/NewsDetail/NewsDetailPage";
import apiConfig from "@/constants/apiConfig";

function NewsDetail({ news, newsList, error, errorList, slideList }) {
    const metadata = {
        title: news?.title || "Tin tức",
        description: news?.description || news?.excerpt || "Chi tiết tin tức",
        image: news?.thumbnail || "/images/logo.png",
    };
    return (
        <RenderContext metadata={metadata}>
            <NewsDetailPage
                dataDetail={news}
                newsList={newsList}
                error={error}
                errorList={errorList}
            />
            <LogoCarousel slideList={slideList} />
        </RenderContext>
    );
}

export async function getStaticProps({ params }) {
    try {
        const [ res, resList, resSlide ] = await Promise.all([
            fetch(apiConfig.news.getDetail.url.replace(":id", params.newsId), {
                cache: "force-cache",
            }),
            fetch(apiConfig.news.getList.url, {
                cache: "force-cache",
            }),
            fetch(apiConfig.slide.getList.url, {
                cache: "force-cache",
            }),
        ]);

        const news = res.ok ? await res.json() : null;
        const newsList = resList.ok ? await resList.json() : [];
        const slideList = resSlide.ok ? await resSlide.json() : [];

        return {
            props: {
                news: news?.data || null,
                newsList,
                error: res.ok ? null : `Error ${res.status}`,
                errorList: resList.ok ? null : `Error ${resList.status}`,
                slideList,
                errorSlide: resSlide.ok ? null : `Error ${resSlide.status}`,
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
                slideList: [],
                errorSlide: err.message,
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

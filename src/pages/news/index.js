import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import RenderContext from "@/components/context/RenderContext";
import Layout from "@/components/layouts/Layout";
import NewsPage from "@/components/Pages/News/News";
import apiConfig from "@/constants/apiConfig";
function News({ newsList, slideList }) {
    return (
        <RenderContext>
            <NewsPage data={newsList} />
            <LogoCarousel slideList={slideList} />
        </RenderContext>
    );
}
export async function getStaticProps() {
    try {
        const [ resSlide, resList ] = await Promise.all([
            fetch(apiConfig.slide.getList.url, {
                cache: "force-cache",
            }),
            fetch(apiConfig.news.getList.url, {
                cache: "force-cache",
            }),
        ]);

        const newsList = resList.ok ? await resList.json() : [];
        const slideList = resSlide.ok ? await resSlide.json() : [];
        return {
            props: {
                newsList,
                errorList: resList.ok ? null : `Error ${resList.status}`,
                slideList,
                errorSlide: resSlide.ok ? null : `Error ${resSlide.status}`,
            },
            revalidate: 300,
        };
    } catch (err) {
        return {
            props: {
                newsList: [],
                errorList: err.message,
                slideList: [],
                errorSlide: err.message,
            },
            revalidate: 60,
        };
    }
}
News.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default News;

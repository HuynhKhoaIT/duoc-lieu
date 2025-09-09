import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import Layout from "@/components/layouts/Layout";
import AboutPage from "@/components/Pages/About/About";
import apiConfig from "@/constants/apiConfig";

function About({ newsList, slideList }) {
    return (
        <>
            <AboutPage newsListData={newsList} />
            <LogoCarousel slideList={slideList}/>
        </>
    );
}
export async function getStaticProps() {
    try {
        const [ resSlide, resNews ] = await Promise.all([
            fetch(apiConfig.slide.getList.url, {
                cache: "force-cache",
            }),
            fetch(apiConfig.news.getList.url, {
                cache: "force-cache",
            }),
        ]);
        const slideList = resSlide.ok ? await resSlide.json() : [];

        const newsList = resNews.ok ? await resNews.json() : [];

        return {
            props: {
                slideList,
                errorSlide: resSlide.ok ? null : `Error ${resSlide.status}`,
                newsList,
                errorList: resNews.ok ? null : `Error ${resNews.status}`,
            },
            revalidate: 300, // sau 300s sẽ build lại
        };
    } catch (err) {
        return {
            props: {
                newsList: [],
                errorList: err.message,
                slideList: [],
                errorSlide: err.message,
            },
            revalidate: 60, // fallback nhanh hơn nếu lỗi
        };
    }
}
About.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default About;

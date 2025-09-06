import Layout from "@/components/layouts/Layout";
import AboutPage from "@/components/Pages/About/About";
import apiConfig from "@/constants/apiConfig";

function About({ newsList }) {
    return <AboutPage newsListData={newsList} />;
}
export async function getStaticProps() {
    try {
        const resList = await fetch(apiConfig.news.getList.url, {
            cache: "force-cache",
        });

        const newsList = resList.ok ? await resList.json() : [];

        return {
            props: {
                newsList,
                errorList: resList.ok ? null : `Error ${resList.status}`,
            },
            revalidate: 300, // sau 300s sẽ build lại
        };
    } catch (err) {
        return {
            props: {
                newsList: [],
                errorList: err.message,
            },
            revalidate: 60, // fallback nhanh hơn nếu lỗi
        };
    }
}
About.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default About;

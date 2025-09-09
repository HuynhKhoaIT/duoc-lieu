import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import Layout from "@/components/layouts/Layout";
import HomePage from "@/components/Pages/Home/Home";
import apiConfig from "@/constants/apiConfig";
import useListData from "@/hooks/useListData";
function Homepage({ slideList }) {
    const {
        data: news,
        loading,
        error,
        refetch,
    } = useListData(apiConfig.news.getList);

    const {
        data: products,
        loading: loadingProducts,
        error: errorProducts,
        refetch: refetchProducts,
    } = useListData(apiConfig.products.getList);

    return (
        <>
            <HomePage newsData={news} productsData={products} />
            <LogoCarousel slideList={slideList} />
        </>
    );
}

export async function getStaticProps() {
    try {
        const resList = await fetch(apiConfig.slide.getList.url, {
            cache: "force-cache",
        });

        const slideList = resList.ok ? await resList.json() : [];

        return {
            props: {
                slideList,
                errorList: resList.ok ? null : `Error ${resList.status}`,
            },
            revalidate: 500,
        };
    } catch (err) {
        return {
            props: {
                slideList: [],
                errorList: err.message,
            },
            revalidate: 60,
        };
    }
}

Homepage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default Homepage;

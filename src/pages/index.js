import Layout from "@/components/layouts/Layout";
import HomePage from "@/components/Pages/Home/Home";
import apiConfig from "@/constants/apiConfig";
import useListData from "@/hooks/useListData";
function Homepage() {
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

    return <HomePage newsData={news} productsData={products} />;
}

Homepage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default Homepage;

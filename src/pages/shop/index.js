import Layout from "@/components/layouts/Layout";
import ShopPage from "@/components/Pages/Shop/ShopPage";
import apiConfig from "@/constants/apiConfig";
import useListData from "@/hooks/useListData";

function Shop() {
    const {
        data: products,
        loading: loadingProducts,
        error: errorProducts,
        refetch: refetchProducts,
    } = useListData(apiConfig.products.getList);

    return <ShopPage productsData={products} loading={loadingProducts} error={errorProducts} refetch={refetchProducts} />;
}

Shop.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default Shop;

import Layout from "@/components/layouts/Layout";
import ComboPage from "@/components/Pages/Combo/ComboPage";
import apiConfig from "@/constants/apiConfig";
import useListData from "@/hooks/useListData";

function About() {
    const {
        data: products,
        loading: loadingProducts,
        error: errorProducts,
        refetch: refetchProducts,
    } = useListData(apiConfig.products.getList);

    return (
        <ComboPage
            data={products}
            loading={loadingProducts}
            error={errorProducts}
            refetch={refetchProducts}
        />
    );
}

About.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default About;

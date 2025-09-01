import Layout from "@/components/layouts/Layout";
import ComboPage from "@/components/Pages/Combo/ComboPage";
import apiConfig from "@/constants/apiConfig";
import useListData from "@/hooks/useListData";

function Combo({ categories }) {
    const {
        data: products,
        loading: loadingProducts,
        error: errorProducts,
        refetch: refetchProducts,
    } = useListData(apiConfig.products.getList);

    return (
        <ComboPage
            categories={categories}
            data={products}
            loading={loadingProducts}
            error={errorProducts}
            refetch={refetchProducts}
        />
    );
}

export async function getStaticProps() {
    try {
        const res = await fetch(apiConfig.category.getList.url, {
            cache: "force-cache",
        });

        const categories = res.ok ? await res.json() : null;

        return {
            props: {
                categories: categories?.data || null,
                error: res.ok ? null : `Error ${res.status}`,
            },
            revalidate: 3600,
        };
    } catch (err) {
        return {
            props: {
                categories: null,
                error: err.message,
            },
            revalidate: 60,
        };
    }
}

Combo.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default Combo;

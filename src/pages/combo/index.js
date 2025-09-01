import Layout from "@/components/layouts/Layout";
import ComboPage from "@/components/Pages/Combo/ComboPage";
import apiConfig from "@/constants/apiConfig";

function Combo({ categories,products }) {
 
    return (
        <ComboPage
            categories={categories}
            data={products}
        />
    );
}

export async function getStaticProps() {
    try {
        const res = await fetch(apiConfig.category.getList.url, {
            cache: "force-cache",
        });
        const proRes = await fetch(apiConfig.products.getList.url, {
            cache: "force-cache",
        });

        const categories = res.ok ? await res.json() : null;
        const products = proRes.ok ? await proRes.json() : null;


        return {
            props: {
                categories: categories?.data || null,
                products: products?.data || null,
                error: res.ok ? null : `Error ${res.status}`,
                errorProducts: proRes.ok ? null : `Error ${proRes.status}`,
            },
            revalidate: 3600,
        };
    } catch (err) {
        return {
            props: {
                categories: null,
                products: null,
                error: err.message,
                errorProducts: err.message,
            },
            revalidate: 60,
        };
    }
}

Combo.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default Combo;

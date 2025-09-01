import Layout from "@/components/layouts/Layout";
import ShopPage from "@/components/Pages/Shop/ShopPage";
import apiConfig from "@/constants/apiConfig";

function Shop({ categories,products }) {

    return (
        <ShopPage
            categories={categories}
            productsData={products}
        />
    );
}

export async function getStaticProps() {
    try {
        const res = await fetch(apiConfig.category.getList.url, {
            cache: "force-cache",
        });

        const productsRes = await fetch(apiConfig.products.getList.url, {
            cache: "force-cache",
        });


        const categories = res.ok ? await res.json() : null;
        const products = productsRes.ok ? await productsRes.json() : null;


        return {
            props: {
                categories: categories?.data || null,
                products: products?.data || null,
                error: res.ok ? null : `Error ${res.status}`,
                errorProducts: productsRes.ok ? null : `Error ${productsRes.status}`,
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

Shop.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default Shop;

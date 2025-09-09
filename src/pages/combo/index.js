import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import Layout from "@/components/layouts/Layout";
import ComboPage from "@/components/Pages/Combo/ComboPage";
import apiConfig from "@/constants/apiConfig";

function Combo({ categories, products, slideList }) {
    return (
        <>
            <ComboPage categories={categories} data={products} />
            <LogoCarousel slideList={slideList} />
        </>
    );
}

export async function getStaticProps() {
    try {
        const [ res, productsRes, resSlide ] = await Promise.all([
            fetch(apiConfig.category.getList.url, { cache: "force-cache" }),
            fetch(apiConfig.products.getList.url, { cache: "force-cache" }),
            fetch(apiConfig.slide.getList.url, {
                cache: "force-cache",
            }),
        ]);

        const categories = res.ok ? await res.json() : null;
        const products = productsRes.ok ? await productsRes.json() : null;
        const slideList = resSlide.ok ? await resSlide.json() : null;

        return {
            props: {
                categories: categories?.data || null,
                products: products?.data || null,
                error: res.ok ? null : `Error ${res.status}`,
                errorProducts: productsRes.ok
                    ? null
                    : `Error ${productsRes.status}`,
                slideList,
                errorSlide: resSlide.ok ? null : `Error ${resSlide.status}`,
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
                slideList: [],
            },
            revalidate: 60,
        };
    }
}

Combo.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default Combo;

import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import RenderContext from "@/components/context/RenderContext";
import Layout from "@/components/layouts/Layout";
import ShopPage from "@/components/Pages/Shop/ShopPage";
import apiConfig from "@/constants/apiConfig";
import { useGlobalContext } from "@/contexts/GlobalContext";

function Shop({ categories, products, slideList }) {
    const { data } = useGlobalContext();
    return (
        <RenderContext>
            <ShopPage
                categories={categories}
                productsData={products}
                cartData={data}
            />
            <LogoCarousel slideList={slideList} />
        </RenderContext>
    );
}

export async function getStaticProps() {
    try {
        const [ res, productsRes, slideRes ] = await Promise.all([
            fetch(apiConfig.category.getList.url, {
                cache: "force-cache",
                
            }), 
            fetch(apiConfig.products.getList.url, { cache: "force-cache" }), 
            fetch(apiConfig.slide.getList.url, { cache: "force-cache" }),
        ]);

        const categories = res.ok ? await res.json() : null;
        const products = productsRes.ok ? await productsRes.json() : null;
        const slideList = slideRes.ok ? await slideRes.json() : null;

        return {
            props: {
                categories: categories?.data || null,
                products: products?.data || null,
                error: res.ok ? null : `Error ${res.status}`,
                errorProducts: productsRes.ok
                    ? null
                    : `Error ${productsRes.status}`,
                slideList,
                errorSlide: slideRes.ok ? null : `Error ${slideRes.status}`,
            },
            revalidate: 60,
        };
    } catch (err) {
        return {
            props: {
                categories: null,
                products: null,
                error: err.message,
                errorProducts: err.message,
                slideList: null,
                errorSlide: err.message,
            },
            revalidate: 60,
        };
    }
}

Shop.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default Shop;

import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import RenderContext from "@/components/context/RenderContext";
import Layout from "@/components/layouts/Layout";
import GiftPage from "@/components/Pages/Gift/GiftPage";
import apiConfig from "@/constants/apiConfig";

function GiftContainer({ products, slideList }) {
    return (
        <RenderContext>
            <Breadcrumb title={"Quà Tặng"} />
            <GiftPage  productsData={products} />
            <LogoCarousel slideList={slideList} />
        </RenderContext>
    );
}

export async function getStaticProps() {
    try {
        const [ productsRes, slideRes ] = await Promise.all([
            fetch(`${apiConfig.products.getList.url}?type=gift`, { next: { revalidate: 60 } }),
            fetch(apiConfig.slide.getList.url, {
                next: { revalidate: 600 },
            }),
        ]);

        const products = productsRes.ok ? await productsRes.json() : null;
        const slideList = slideRes.ok ? await slideRes.json() : null;

        return {
            props: {
                products: products?.data || null,
                errorProducts: productsRes.ok
                    ? null
                    : `Error ${productsRes.status}`,
                slideList,
                errorSlide: slideRes.ok ? null : `Error ${slideRes.status}`,
            },
            revalidate: 3600,
        };
    } catch (err) {
        return {
            props: {
                categories: null,
                errorProducts: err.message,
                slideList: null,
                errorSlide: err.message,
            },
            revalidate: 60,
        };
    }
}

GiftContainer.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default GiftContainer;

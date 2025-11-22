import useSWR from "swr";

import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import RenderContext from "@/components/context/RenderContext";
import Layout from "@/components/layouts/Layout";
import ProductOrderPage from "@/components/Pages/User/Order/ProductOrderPage";
import apiConfig from "@/constants/apiConfig";
import fetcherSWR from "@/services/fetcherSWR";
function OrderPage({ slideList }) {
    const { data: categoriesData } = useSWR(
        `/api/category?per_page=999`,
        fetcherSWR,
    );

    const { data: productsData } = useSWR(
        `/api/product?per_page=999`,
        fetcherSWR,
    );

    return (
        <RenderContext>
            <Breadcrumb title={"Đặt hàng"} />
            <ProductOrderPage
                categories={categoriesData?.data || []}
                productsData={productsData?.data || []}
            />
            <LogoCarousel slideList={slideList} />
        </RenderContext>
    );
}

export async function getStaticProps() {
    try {
        const [ resSlide ] = await Promise.all([
            fetch(apiConfig.slide.getList.url, {
                cache: "force-cache",
            }),
        ]);

        const slideList = resSlide.ok ? await resSlide.json() : null;

        return {
            props: {
                slideList,
                errorSlide: resSlide.ok ? null : `Error ${resSlide.status}`,
            },
            revalidate: 500,
        };
    } catch (err) {
        return {
            props: {
                slideList: [],
                errorSlide: err.message,
            },
            revalidate: 60,
        };
    }
}

OrderPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default OrderPage;

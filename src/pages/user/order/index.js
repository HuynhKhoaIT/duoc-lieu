import { Fragment } from "react";

import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import Layout from "@/components/layouts/Layout";
import ProductOrderPage from "@/components/Pages/User/Order/ProductOrderPage";
import apiConfig from "@/constants/apiConfig";
function OrderPage({ categories, products, slideList }) {
    return (
        <Fragment>
            <Breadcrumb title={"Đặt hàng"} />
            <ProductOrderPage categories={categories} productsData={products} />
            <LogoCarousel slideList={slideList} />
        </Fragment>
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

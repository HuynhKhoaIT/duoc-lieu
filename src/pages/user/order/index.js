import { Fragment } from "react";

import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import Layout from "@/components/layouts/Layout";
import ProductOrderPage from "@/components/Pages/User/Order/ProductOrderPage";
import apiConfig from "@/constants/apiConfig";
function OrderPage({ categories }) {
    return (
        <Fragment>
            <Breadcrumb title={"Đặt hàng"} />
            <ProductOrderPage categories={categories} />
            <LogoCarousel />
        </Fragment>
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

OrderPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default OrderPage;

import { Fragment } from "react";
import useSWR from "swr";

import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import RenderContext from "@/components/context/RenderContext";
import Layout from "@/components/layouts/Layout";
import CartPage from "@/components/Pages/User/Cart";
import apiConfig from "@/constants/apiConfig";
function Cart({ slideList }) {
    return (
        <RenderContext>
            <Breadcrumb title="Giỏ hàng" />
            <CartPage />
            <LogoCarousel slideList={slideList} />
        </RenderContext>
    );
}
export async function getStaticProps() {
    try {
        const resList = await fetch(apiConfig.slide.getList.url, {
            cache: "force-cache",
        });

        const slideList = resList.ok ? await resList.json() : [];

        return {
            props: {
                slideList,
                errorList: resList.ok ? null : `Error ${resList.status}`,
            },
            revalidate: 500,
        };
    } catch (err) {
        return {
            props: {
                slideList: [],
                errorList: err.message,
            },
            revalidate: 60,
        };
    }
}

Cart.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default Cart;

import { Fragment } from "react";
import useSWR from "swr";

import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import Layout from "@/components/layouts/Layout";
import CartPage from "@/components/Pages/User/Cart";
import apiConfig from "@/constants/apiConfig";

const fetcher = (url) => fetch(url).then((res) => res.json());

function Cart({ slideList }) {
    const { data, error, isLoading, mutate } = useSWR("/api/cart", fetcher);

    if (error) return <p>Lỗi tải giỏ hàng!</p>;

    return (
        <Fragment>
            <Breadcrumb title="Giỏ hàng" />
            <CartPage
                cartsData={data?.data || []}
                refetch={mutate}
                isLoading={isLoading}
            />
            <LogoCarousel slideList={slideList} />
        </Fragment>
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

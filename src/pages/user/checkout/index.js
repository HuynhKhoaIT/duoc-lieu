import { Fragment } from "react";
import useSWR from "swr";

import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import Layout from "@/components/layouts/Layout";
import CheckoutForm from "@/components/Pages/User/Checkout";
const fetcher = (url) => fetch(url).then((res) => res.json());

function CheckOutPage() {
    const {
        data: cartsData,
        error,
        isLoading,
        mutate,
    } = useSWR("/api/cart", fetcher);

    return (
        <Fragment>
            <Breadcrumb title={"Đặt hàng"} />
            <CheckoutForm cartsData={cartsData?.data} />
            <LogoCarousel />
        </Fragment>
    );
}

CheckOutPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default CheckOutPage;

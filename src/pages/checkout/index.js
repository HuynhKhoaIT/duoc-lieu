import { Fragment } from "react";

import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import Layout from "@/components/layouts/Layout";
import CheckoutForm from "@/components/Pages/User/Checkout";
import { storageKeys } from "@/constants";
import { getLocalData } from "@/utils/localStorage";

function CheckOutPage() {
    const cartsData = getLocalData(storageKeys.CART_DATA);

    return (
        <Fragment>
            <Breadcrumb title={"Đặt hàng"} />
            <CheckoutForm cartsData={cartsData} />
            <LogoCarousel />
        </Fragment>
    );
}

CheckOutPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default CheckOutPage;

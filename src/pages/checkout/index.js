import { Fragment } from "react";

import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import Layout from "@/components/layouts/Layout";
import CheckoutForm from "@/components/Pages/User/Checkout";

function CheckOutPage() {

    return (
        <Fragment>
            <Breadcrumb title={"Đặt hàng"} />
            <CheckoutForm />
            <LogoCarousel />
        </Fragment>
    );
}

CheckOutPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default CheckOutPage;

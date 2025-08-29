import { Fragment } from "react";

import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import Layout from "@/components/layouts/Layout";
import CheckoutForm from "@/components/Pages/User/Checkout";
import apiConfig from "@/constants/apiConfig";
import useListData from "@/hooks/useListData";
function CheckOutPage() {
    const {
        data: cartsData,
        loading: loadingCart,
        error: errorCart,
        refetch: refetchCart,
    } = useListData(apiConfig.carts.getList);

    return (
        <Fragment>
            <Breadcrumb title={"Đặt hàng"} />
            <CheckoutForm
                cartsData={cartsData?.data}
                loadingCart={loadingCart}
                errorCart={errorCart}
            />
            <LogoCarousel />
        </Fragment>
    );
}

CheckOutPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default CheckOutPage;

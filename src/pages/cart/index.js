import { Fragment } from "react";

import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import Layout from "@/components/layouts/Layout";
import CartPage from "@/components/Pages/User/Cart";
import { storageKeys } from "@/constants";
import { getLocalData } from "@/utils/localStorage";

function Cart() {
    const cartData = getLocalData(storageKeys.CART_DATA);

    return (
        <Fragment>
            <Breadcrumb title="Giỏ hàng" />
            <CartPage cartsData={cartData || []} />

            <LogoCarousel />
        </Fragment>
    );
}

Cart.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default Cart;

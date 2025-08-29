import { Fragment } from "react";

import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import Layout from "@/components/layouts/Layout";
import ProductOrderPage from "@/components/Pages/User/Order/ProductOrderPage";
import apiConfig from "@/constants/apiConfig";
import useListData from "@/hooks/useListData";
function OrderPage() {
    const {
        data: products,
        loading: loadingProducts,
        error: errorProducts,
        refetch: refetchProducts,
    } = useListData(apiConfig.products.getList);

    return (
        <Fragment>
            <Breadcrumb title={"Đặt hàng"} />
            <ProductOrderPage
                productsData={products}
            />
            <LogoCarousel />
        </Fragment>
    );
}

OrderPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default OrderPage;

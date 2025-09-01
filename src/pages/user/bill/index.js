import { Fragment } from "react";

import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import Layout from "@/components/layouts/Layout";
import BillTable from "@/components/Pages/User/Bill";
import apiConfig from "@/constants/apiConfig";
import useListData from "@/hooks/useListData";
function OrderPage() {
    const {
        data: ordersData,
        loading,
        errors,
        refetch,
    } = useListData(apiConfig.order.getList);

    return (
        <Fragment>
            <Breadcrumb title={"Đơn hàng"} />
            <BillTable ordersData={ordersData?.data} />
            <LogoCarousel />
        </Fragment>
    );
}

OrderPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default OrderPage;

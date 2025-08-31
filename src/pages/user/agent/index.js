import { Fragment } from "react";

import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import Layout from "@/components/layouts/Layout";
import AgentPage from "@/components/Pages/User/Agent/AgentPage";
import apiConfig from "@/constants/apiConfig";
import useListData from "@/hooks/useListData";
function OrderPage() {
    const { data, loading, error, refetch } = useListData(
        apiConfig.referrals.getList,
    );

    console.log("data",data);

    return (
        <Fragment>
            <Breadcrumb title={"Đại lý"} />
            <AgentPage usersData={data?.data}/>
            <LogoCarousel />
        </Fragment>
    );
}

OrderPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default OrderPage;

import { Fragment } from "react";

import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import Layout from "@/components/layouts/Layout";
import BillTable from "@/components/Pages/User/Bill";
import apiConfig from "@/constants/apiConfig";
import fetcher from "@/services/fetcher";

function OrderPage({ ordersData }) {
    return (
        <Fragment>
            <Breadcrumb title="Đơn hàng" />
            <BillTable ordersData={ordersData} />
            <LogoCarousel />
        </Fragment>
    );
}

export async function getServerSideProps(context) {
    const token = context.req.cookies.token;

    if (!token) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    try {
        const res = await fetcher(apiConfig.order.getList, {
            context: { token },
        });

        return {
            props: {
                ordersData: res.data?.data || [],
            },
        };
    } catch (error) {
        console.error("Error fetching orders:", error.message);

        return {
            props: {
                ordersData: [],
            },
        };
    }
}

OrderPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default OrderPage;

import { Fragment } from "react";

import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import Layout from "@/components/layouts/Layout";
import CheckoutForm from "@/components/Pages/User/Checkout";
import apiConfig from "@/constants/apiConfig";
import fetcher from "@/services/fetcher";
function CheckOutPage({cartsData}) {

    return (
        <Fragment>
            <Breadcrumb title={"Đặt hàng"} />
            <CheckoutForm
                cartsData={cartsData?.data}
            />
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
        const res = await fetcher(apiConfig.carts.getList, {
            context: { token },
        });

        return {
            props: {
                cartsData: res.data?.data || [],
            },
        };
    } catch (error) {
        console.error("Error fetching carts:", error.message);

        return {
            props: {
                cartsData: [],
            },
        };
    }
}
CheckOutPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default CheckOutPage;

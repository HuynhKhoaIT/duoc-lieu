import { Fragment } from "react";
import useSWR from "swr";

import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import Layout from "@/components/layouts/Layout";
import UserDashboardPage from "@/components/Pages/User";

const fetcher = (url) => fetch(url).then((res) => res.json());
function UserPage() {
    const { data, error, isLoading, mutate } = useSWR("/api/dashboard", fetcher);

    if (error) return <p>Lỗi tải giỏ hàng!</p>;

    return (
        <Fragment>
            <Breadcrumb title={"Tổng Quát"} />
            <UserDashboardPage dashboardData={data?.data} loading={isLoading} />
            <LogoCarousel />
        </Fragment>
    );
}

UserPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default UserPage;

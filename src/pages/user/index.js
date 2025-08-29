import { Fragment } from "react";

import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import Layout from "@/components/layouts/Layout";
import UserDashboardPage from "@/components/Pages/User";
function UserPage() {
    return (
        <Fragment>
            <Breadcrumb title={"Tổng Quát"} />
            <UserDashboardPage />
            <LogoCarousel />
        </Fragment>
    );
}

UserPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default UserPage;

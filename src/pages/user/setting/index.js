import { Fragment } from "react";

import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import Layout from "@/components/layouts/Layout";
import SettingForm from "@/components/Pages/User/Setting";
function SettingPage() {
    return (
        <Fragment>
            <Breadcrumb title={"Cài đặt"} />
            <SettingForm />
            <LogoCarousel />
        </Fragment>
    );
}

SettingPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default SettingPage;

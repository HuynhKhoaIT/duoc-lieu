import { Fragment } from "react";

import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import Layout from "@/components/layouts/Layout";
import PassAuthForm from "@/components/Pages/User/Passauth";
function PassAuthPage() {
    return (
        <Fragment>
            <Breadcrumb title={"Cài đặt"} />
            <PassAuthForm />
            <LogoCarousel />
        </Fragment>
    );
}

PassAuthPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default PassAuthPage;

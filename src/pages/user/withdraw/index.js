import { Fragment } from "react";

import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import Layout from "@/components/layouts/Layout";
import WithdrawForm from "@/components/Pages/User/Withdraw";

function WithDrawPage() {
    return (
        <Fragment>
            <Breadcrumb title={"Đặt Lênh Rút"} />
            <WithdrawForm />
            <LogoCarousel />
        </Fragment>
    );
}

WithDrawPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default WithDrawPage;

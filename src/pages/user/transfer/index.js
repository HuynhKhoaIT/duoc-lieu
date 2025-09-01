import { Fragment } from "react";

import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import Layout from "@/components/layouts/Layout";
import TransferForm from "@/components/Pages/User/Transfer";

function TransferPage() {
    return (
        <Fragment>
            <Breadcrumb title={"Chuyển Nội Bộ"} />
            <TransferForm />
            <LogoCarousel />
        </Fragment>
    );
}

TransferPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default TransferPage;

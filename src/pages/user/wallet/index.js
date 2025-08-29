import { Fragment } from "react";

import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import Layout from "@/components/layouts/Layout";
import WalletPage from "@/components/Pages/User/Wallet";
function UserWallet() {
    return (
        <Fragment>
            <Breadcrumb title={"Giao Dịch"} />
            <WalletPage />
            <LogoCarousel />
        </Fragment>
    );
}

UserWallet.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default UserWallet;

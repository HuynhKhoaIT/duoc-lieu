import { Fragment } from "react";
import useSWR from "swr";

import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import Layout from "@/components/layouts/Layout";
import WithdrawForm from "@/components/Pages/User/Withdraw";
const fetcher = (url) => fetch(url).then((res) => res.json());

function WithDrawPage() {
    const {
        data: balanceData,
        isLoading: balanceIsLoading,
        error: balanceError,
        mutate: balanceMutate,
    } = useSWR("/api/wallet/ballance", fetcher);

    return (
        <Fragment>
            <Breadcrumb title={"Đặt Lênh Rút"} />
            <WithdrawForm balanceData={balanceData} />
            <LogoCarousel />
        </Fragment>
    );
}

WithDrawPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default WithDrawPage;

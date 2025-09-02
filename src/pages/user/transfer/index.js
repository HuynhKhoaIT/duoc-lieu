import { Fragment } from "react";
import useSWR from "swr";

import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import Layout from "@/components/layouts/Layout";
import TransferForm from "@/components/Pages/User/Transfer";
const fetcher = (url) => fetch(url).then((res) => res.json());

function TransferPage() {
    const {
        data: balanceData,
        isLoading: balanceIsLoading,
        error: balanceError,
        mutate: balanceMutate,
    } = useSWR("/api/wallet/ballance", fetcher);

    return (
        <Fragment>
            <Breadcrumb title={"Chuyển Nội Bộ"} />
            <TransferForm balanceData={balanceData} />
            <LogoCarousel />
        </Fragment>
    );
}

TransferPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default TransferPage;

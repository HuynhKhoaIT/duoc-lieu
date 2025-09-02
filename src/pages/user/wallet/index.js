import { Fragment } from "react";
import useSWR from "swr";

import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import Layout from "@/components/layouts/Layout";
import WalletPage from "@/components/Pages/User/Wallet";
const fetcher = (url) => fetch(url).then((res) => res.json());
function UserWallet() {
    const { data:historyData, error, isLoading, mutate } = useSWR(
        "/api/wallet/history",
        fetcher,
    );
    const {
        data: balanceData,
        isLoading: balanceIsLoading,
        error: balanceError,
        mutate: balanceMutate,
    } = useSWR("/api/wallet/ballance", fetcher);

    return (
        <Fragment>
            <Breadcrumb title={"Giao Dịch"} />
            <WalletPage
                walletHistory={historyData?.data}
                balanceData={balanceData}
            />
            <LogoCarousel />
        </Fragment>
    );
}

UserWallet.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default UserWallet;

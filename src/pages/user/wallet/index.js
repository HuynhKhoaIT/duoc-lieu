import { Fragment, useState } from "react";
import useSWR from "swr";

import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import Layout from "@/components/layouts/Layout";
import WalletPage from "@/components/Pages/User/Wallet";

const fetcher = (url) => fetch(url).then((res) => res.json());

function UserWallet() {
    const [ currentPage, setCurrentPage ] = useState(1);

    // Fetch history data with pagination
    const {
        data: historyData,
        error,
        isLoading,
        mutate,
    } = useSWR(`/api/wallet/history?page=${currentPage}`, fetcher);

    // Fetch balance data
    const {
        data: balanceData,
        isLoading: balanceIsLoading,
        error: balanceError,
        mutate: balanceMutate,
    } = useSWR("/api/wallet/balance", fetcher);

    return (
        <Fragment>
            <Breadcrumb title="Giao Dịch" />
            <WalletPage
                walletHistory={historyData?.data}
                balanceData={balanceData}
                loading={isLoading}
                mutate={mutate}
                metaData={historyData?.meta}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage} 
            />
            <LogoCarousel />
        </Fragment>
    );
}

UserWallet.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default UserWallet;

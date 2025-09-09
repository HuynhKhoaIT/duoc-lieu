import { Fragment, useState } from "react";
import useSWR from "swr";

import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import RenderContext from "@/components/context/RenderContext";
import Layout from "@/components/layouts/Layout";
import WalletPage from "@/components/Pages/User/Wallet";
import apiConfig from "@/constants/apiConfig";

const fetcher = (url) => fetch(url).then((res) => res.json());

function UserWallet({ slideList }) {
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
        <RenderContext>
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
            <LogoCarousel slideList={slideList} />
        </RenderContext>
    );
}

export async function getStaticProps() {
    try {
        const resList = await fetch(apiConfig.slide.getList.url, {
            cache: "force-cache",
        });

        const slideList = resList.ok ? await resList.json() : [];

        return {
            props: {
                slideList,
                errorList: resList.ok ? null : `Error ${resList.status}`,
            },
            revalidate: 500,
        };
    } catch (err) {
        return {
            props: {
                slideList: [],
                errorList: err.message,
            },
            revalidate: 60,
        };
    }
}

UserWallet.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default UserWallet;

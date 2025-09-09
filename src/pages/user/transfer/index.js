import { Fragment } from "react";
import useSWR from "swr";

import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import Layout from "@/components/layouts/Layout";
import TransferForm from "@/components/Pages/User/Transfer";
import apiConfig from "@/constants/apiConfig";
const fetcher = (url) => fetch(url).then((res) => res.json());

function TransferPage({ slideList }) {
    const {
        data: balanceData,
        isLoading: balanceIsLoading,
        error: balanceError,
        mutate: balanceMutate,
    } = useSWR("/api/wallet/balance", fetcher);

    return (
        <Fragment>
            <Breadcrumb title={"Chuyển Nội Bộ"} />
            <TransferForm balanceData={balanceData} />
            <LogoCarousel slideList={slideList} />
        </Fragment>
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

TransferPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default TransferPage;

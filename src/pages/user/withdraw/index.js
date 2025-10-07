import { Fragment } from "react";
import useSWR from "swr";

import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import RenderContext from "@/components/context/RenderContext";
import Layout from "@/components/layouts/Layout";
import WithdrawForm from "@/components/Pages/User/Withdraw";
import apiConfig from "@/constants/apiConfig";
import fetcherSWR from "@/services/fetcherSWR";

function WithDrawPage({ slideList }) {
    const {
        data: balanceData,
        isLoading: balanceIsLoading,
        error: balanceError,
        mutate: balanceMutate,
    } = useSWR("/api/wallet/balance", fetcherSWR);

    return (
        <RenderContext>
            <Breadcrumb title={"Đặt Lênh Rút"} />
            <WithdrawForm balanceData={balanceData} />
            <LogoCarousel slideList={slideList} />
        </RenderContext>
    );
}
export async function getStaticProps() {
    try {
        const resList = await fetch(apiConfig.slide.getList.url, {
            next: { revalidate: 600 },
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

WithDrawPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default WithDrawPage;

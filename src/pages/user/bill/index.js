import { useState } from "react";
import useSWR from "swr";

import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import RenderContext from "@/components/context/RenderContext";
import Layout from "@/components/layouts/Layout";
import BillTable from "@/components/Pages/User/Bill";
import apiConfig from "@/constants/apiConfig";
import fetcherSWR from "@/services/fetcherSWR";

function BillPage({ slideList }) {
    const [ currentPage, setCurrentPage ] = useState(1);

    const { data, error, isLoading, mutate } = useSWR(
        `/api/order?page=${currentPage}`,
        fetcherSWR,
    );

    return (
        <RenderContext>
            <Breadcrumb title="Đơn hàng" />
            <BillTable
                ordersData={data?.data}
                mutate={mutate}
                metaData={data?.meta}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                loading={isLoading}
            />
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

BillPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default BillPage;

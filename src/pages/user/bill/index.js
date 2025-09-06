import { Fragment, useState } from "react";
import useSWR from "swr";

import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import Layout from "@/components/layouts/Layout";
import BillTable from "@/components/Pages/User/Bill";
const fetcher = (url) => fetch(url).then((res) => res.json());

function BillPage() {
    const [ currentPage, setCurrentPage ] = useState(1);

    const { data, error, isLoading, mutate } = useSWR(
        `/api/order?page=${currentPage}`,
        fetcher,
    );

    return (
        <Fragment>
            <Breadcrumb title="Đơn hàng" />
            <BillTable
                ordersData={data?.data}
                mutate={mutate}
                metaData={data?.meta}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                loading={isLoading}
            />
            <LogoCarousel />
        </Fragment>
    );
}

BillPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default BillPage;

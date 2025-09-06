import { Fragment } from "react";
import useSWR from "swr";

import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import Layout from "@/components/layouts/Layout";
import AgentPage from "@/components/Pages/User/Agent/AgentPage";
const fetcher = (url) => fetch(url).then((res) => res.json());

function Agent() {
    const { data, error, isLoading, mutate } = useSWR(`/api/referrals`, fetcher);
    return (
        <Fragment>
            <Breadcrumb title="Đại lý" />
            <AgentPage usersData={data?.data} isLoading={isLoading} error={error} />
            <LogoCarousel />
        </Fragment>
    );
}

Agent.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default Agent;

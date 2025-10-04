import useSWR from "swr";

import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import RenderContext from "@/components/context/RenderContext";
import Layout from "@/components/layouts/Layout";
import AgentPage from "@/components/Pages/User/Agent/AgentPage";
import apiConfig from "@/constants/apiConfig";
const fetcher = (url) => fetch(url).then((res) => res.json());

function Agent({ slideList }) {
    const { data, error, isLoading, mutate } = useSWR(
        `/api/referrals`,
        fetcher,
    );
    return (
        <RenderContext>
            <Breadcrumb title="Cộng tác viên" />
            <AgentPage
                usersData={data?.data}
                isLoading={isLoading}
                error={error}
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

Agent.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default Agent;

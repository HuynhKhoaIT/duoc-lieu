import { Fragment } from "react";

import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import Layout from "@/components/layouts/Layout";
import AgentPage from "@/components/Pages/User/Agent/AgentPage";
import apiConfig from "@/constants/apiConfig";
import fetcher from "@/services/fetcher";

function Agent({ usersData }) {
    return (
        <Fragment>
            <Breadcrumb title="Đại lý" />
            <AgentPage usersData={usersData} />
            <LogoCarousel />
        </Fragment>
    );
}

export async function getServerSideProps(context) {
    const token = context.req.cookies.token;

    if (!token) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    try {
        const res = await fetcher(apiConfig.referrals.getList, {
            context: { token },
        });

        return {
            props: {
                usersData: res.data?.data || [],
            },
        };
    } catch (error) {
        console.error("Error fetching referrals:", error.message);

        return {
            props: {
                usersData: [],
            },
        };
    }
}

Agent.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default Agent;

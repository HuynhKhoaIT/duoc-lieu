import { Fragment } from "react";
import useSWR from "swr";

import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import RenderContext from "@/components/context/RenderContext";
import Layout from "@/components/layouts/Layout";
import ProfileForm from "@/components/Pages/User/Profile";
import apiConfig from "@/constants/apiConfig";
import fetcherSWR from "@/services/fetcherSWR";

function ProfilePage({ slideList }) {
    const { data, error, isLoading, mutate } = useSWR(
        `/api/account/profile`,
        fetcherSWR,
    );

    return (
        <RenderContext>
            <Breadcrumb title="Thông tin" />
            <ProfileForm profileData={data?.data} isLoading={isLoading} />
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

ProfilePage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default ProfilePage;

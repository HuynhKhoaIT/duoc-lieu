import useSWR from "swr";

import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import RenderContext from "@/components/context/RenderContext";
import Layout from "@/components/layouts/Layout";
import UserDashboardPage from "@/components/Pages/User";
import apiConfig from "@/constants/apiConfig";

const fetcher = (url) => fetch(url).then((res) => res.json());
function UserPage({ slideList }) {
    const { data, error, isLoading, mutate } = useSWR(
        "/api/dashboard",
        fetcher,
    );

    if (error) return <p>Lỗi tải giỏ hàng!</p>;

    return (
        <RenderContext>
            <Breadcrumb title={"Tổng Quát"} />
            <UserDashboardPage dashboardData={data?.data} loading={isLoading} />
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

UserPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default UserPage;

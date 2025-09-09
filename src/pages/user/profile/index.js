import { Fragment } from "react";

import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import Layout from "@/components/layouts/Layout";
import ProfileForm from "@/components/Pages/User/Profile";
import apiConfig from "@/constants/apiConfig";
import fetcher from "@/services/fetcher";

function ProfilePage({ profile, slideList }) {
    return (
        <Fragment>
            <Breadcrumb title="Đặt hàng" />
            <ProfileForm profileData={profile} />
            <LogoCarousel slideList={slideList} />
        </Fragment>
    );
}

export async function getServerSideProps(context) {
    const token = context.req.cookies.token;

    try {
        const res = await fetcher(apiConfig.profile.getDetail, {
            context: { token },
        });

        return {
            props: {
                profile: res.data?.data || {},
                loading: false,
            },
        };
    } catch (error) {
        console.error("Error fetching profile:", error.message);

        if (error?.response?.status === 401) {
            return {
                redirect: {
                    destination: "/login",
                    permanent: false,
                },
            };
        }

        return {
            props: {
                profile: {},
                loading: false,
            },
        };
    }
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

import { Fragment, useEffect, useState } from "react";

import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import Layout from "@/components/layouts/Layout";
import ProfileForm from "@/components/Pages/User/Profile";
import apiConfig from "@/constants/apiConfig";
import fetcher from "@/services/fetcher";
function ProfilePage() {
    const [ loading, setLoading ] = useState(false);
    const [ profile, setProfile ] = useState({});
    const fetchProfile = async () => {
        try {
            setLoading(true);
            const res = await fetcher(apiConfig.profile.getDetail);
            console.log(res);
            if (res.status === 201 && res.data) {
                setProfile(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchProfile();
    }, []);
    return (
        <Fragment>
            <Breadcrumb title={"Đặt hàng"} />
            <ProfileForm profileData={profile} loadingProfile={loading} />
            <LogoCarousel />
        </Fragment>
    );
}



ProfilePage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default ProfilePage;

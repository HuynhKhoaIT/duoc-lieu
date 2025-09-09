import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import Layout from "@/components/layouts/Layout";
import LoginPage from "@/components/Pages/Login/Login";
import apiConfig from "@/constants/apiConfig";

function Login({ slideList }) {
    return (
        <>
            <LoginPage />
            <LogoCarousel slideList={slideList} />
        </>
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

Login.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default Login;

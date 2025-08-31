import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import RenderContext from "@/components/context/RenderContext";
import Layout from "@/components/layouts/Layout";
import RegisterForm from "@/components/Pages/Register/RegisterForm/RegisterForm";

function SigninPage() {
    return (
        <RenderContext>
            <Breadcrumb title="Đăng ký"/>
            <RegisterForm />
            <LogoCarousel/>
        </RenderContext>
    );
}

SigninPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default SigninPage;

import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";

import LoginForm from "./LoginForm/LoginForm";

export default function LoginPage() {
    return (
        <>
            <Breadcrumb title={"Đăng nhập"} />
            <LoginForm />
            <LogoCarousel />
        </>
    );
}

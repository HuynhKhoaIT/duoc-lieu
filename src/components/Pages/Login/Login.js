import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";

import LoginForm from "./LoginForm/LoginForm";

export default function LoginPage() {
    return (
        <>
            <Breadcrumb title={"Đăng nhập"} />
            <LoginForm />
        </>
    );
}

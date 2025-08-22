import Layout from "@/components/layouts/Layout";
import LoginPage from "@/components/Pages/Login/Login";

function Login() {

    return (
        <LoginPage/>
    );
}

Login.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default Login;

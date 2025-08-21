
import Layout from "@/components/layouts/Layout";
import HomePage from "@/components/Pages/Home/Home";
function Homepage() {
    return (
        <HomePage/>
    );
}

Homepage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default Homepage;

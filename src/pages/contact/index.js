import Layout from "@/components/layouts/Layout";
import AboutPage from "@/components/Pages/About/About";

function About() {

    return (
        <AboutPage/>
    );
}

About.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default About;

import Layout from "@/components/layouts/Layout";
import ComboPage from "@/components/Pages/Combo/ComboPage";

function About() {

    return (
        <ComboPage/>
    );
}

About.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default About;

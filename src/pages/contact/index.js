import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import RenderContext from "@/components/context/RenderContext";
import Layout from "@/components/layouts/Layout";
import ContactPage from "@/components/Pages/Contact/Contact";
import apiConfig from "@/constants/apiConfig";

function Contact({ slideList }) {
    return (
        <RenderContext>
            <ContactPage />
            <LogoCarousel slideList={slideList} />
        </RenderContext>
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

Contact.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default Contact;

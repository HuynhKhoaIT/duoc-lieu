import Layout from "@/components/layouts/Layout";
import ContactPage from "@/components/Pages/Contact/Contact";

function Contact() {

    return (
        <ContactPage/>
    );
}

Contact.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default Contact;

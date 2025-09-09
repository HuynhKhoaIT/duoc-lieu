import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";

import ContactSection from "./ContactSection/ContactSection";
import FindLocation from "./FindLocation/FindLocation";
import MapEmbed from "./MapEmbed/MapEmbed";

export default function ContactPage() {
    return (
        <>
            <Breadcrumb title={"Liên hệ"} />
            <ContactSection />
            <FindLocation />
            <MapEmbed />
        </>
    );
}

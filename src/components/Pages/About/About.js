import LogoCarousel from "../Home/LogoCarousel/LogoCarousel";

import Breadcrumb from "./Breadcrumb/Breadcrumb";
import FeatureSection from "./FeatureSection/FeatureSection";
import LatestNews from "./LatestNews/LatestNews";
import ShopBanner from "./ShopBanner/ShopBanner";

export default function AboutPage() {
    return (
        <>
            <Breadcrumb />
            <FeatureSection />
            <ShopBanner />
            <LatestNews />
            <LogoCarousel />
        </>
    );
}

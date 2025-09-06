import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";

import FeatureSection from "./FeatureSection/FeatureSection";
import LatestNews from "./LatestNews/LatestNews";
import ShopBanner from "./ShopBanner/ShopBanner";

export default function AboutPage({newsListData}) {
    return (
        <>
            <Breadcrumb title={"Giới thiệu"} />
            <FeatureSection />
            <ShopBanner />
            <LatestNews newsListData={newsListData}/>
            <LogoCarousel />
        </>
    );
}

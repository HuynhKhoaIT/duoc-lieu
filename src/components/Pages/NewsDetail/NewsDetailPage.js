import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";

import ArticleSection from "./ArticleSection/ArticleSection";

export default function NewsDetailPage() {
    return (
        <>
            <Breadcrumb title={"Bài viết chi tiết"} />
            <ArticleSection />
            <LogoCarousel />
        </>
    );
}

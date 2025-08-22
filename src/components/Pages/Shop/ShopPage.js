import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";

import ProductSection from "./ProductSection/ProductSection";

export default function ShopPage() {
    return (
        <>
            <Breadcrumb title={"Sản phẩm"} />
            <ProductSection />
            <LogoCarousel />
        </>
    );
}

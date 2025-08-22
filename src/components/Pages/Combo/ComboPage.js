import React from "react";

import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";

import ProductSection from "./ProductSection/ProductSection";

export default function ComboPage() {
    return (
        <>
            <Breadcrumb title={"Đặt hàng"} />
            <ProductSection />
            <LogoCarousel />
        </>
    );
}

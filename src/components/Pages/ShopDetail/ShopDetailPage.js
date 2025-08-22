import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";

import MoreProducts from "./MoreProducts/MoreProducts";
import ProductDetail from "./ProductDetail";

export default function ShopDetailPage() {
    return (
        <>
            <Breadcrumb title={"Sản phẩm"} />
            <ProductDetail />
            <MoreProducts />
            <LogoCarousel />
        </>
    );
}

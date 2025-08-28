import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";

import MoreProducts from "./MoreProducts/MoreProducts";
import ProductDetail from "./ProductDetail";

export default function ShopDetailPage({dataDetail}) {
    return (
        <>
            <Breadcrumb title={"Sản phẩm"} />
            <ProductDetail dataDetail={dataDetail}/>
            <MoreProducts />
            <LogoCarousel />
        </>
    );
}

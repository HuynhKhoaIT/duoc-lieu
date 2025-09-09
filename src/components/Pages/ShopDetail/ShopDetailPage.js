import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";

import MoreProducts from "./MoreProducts/MoreProducts";
import ProductDetail from "./ProductDetail";

export default function ShopDetailPage({ dataDetail, productsList, cartData }) {
    return (
        <>
            <Breadcrumb title={"Sản phẩm"} />
            <ProductDetail dataDetail={dataDetail} cartData={cartData} />
            <MoreProducts productsList={productsList} />
        </>
    );
}

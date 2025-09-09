import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";

import MoreProducts from "./MoreProducts/MoreProducts";
import ProductDetail from "./ProductDetail";

export default function ShopDetailPage({ dataDetail,productsList }) {
    return (
        <>
            <Breadcrumb title={"Sản phẩm"} />
            <ProductDetail dataDetail={dataDetail} />
            <MoreProducts productsList={productsList}/>
        </>
    );
}

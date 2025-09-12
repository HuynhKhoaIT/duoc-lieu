import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";

import ProductSection from "./ProductSection/ProductSection";

export default function ShopPage({ productsData, categories,cartData }) {
    return (
        <>
            <Breadcrumb title={"Sản phẩm"} />
            <ProductSection
                productsData={productsData}
                categories={categories}
                cartData={cartData}
            />
        </>
    );
}

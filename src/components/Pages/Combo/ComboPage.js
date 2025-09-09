import React from "react";

import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";

import ProductSection from "./ProductSection/ProductSection";

export default function ComboPage({ data, categories }) {
    return (
        <>
            <Breadcrumb title={"Đặt hàng"} />
            <ProductSection productsData={data} categories={categories} />
        </>
    );
}

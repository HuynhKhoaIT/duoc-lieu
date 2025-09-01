import { useEffect, useMemo, useState } from "react";

import ProductComboCard from "@/components/Common/Card/ProductComboCard";
import ProductFilters from "@/components/Common/Fillter/ProductFilters";
import apiConfig from "@/constants/apiConfig";
import useListData from "@/hooks/useListData";

import styles from "./ProductSection.module.scss";

export default function ProductOrderPage({categories}) {
    const { data: productsData } = useListData(apiConfig.products.getList);

    const [ activeFilter, setActiveFilter ] = useState(null);
    const products = useMemo(() => {
        if (!productsData?.data) return [];
        if (!activeFilter) return productsData?.data;
        return productsData?.data.filter((p) => {
            if (activeFilter === "all") {
                return true;
            }
            return p.categories?.[0]?.id === activeFilter;
        });
    }, [ activeFilter, productsData?.data ]);
    return (
        <div className={styles.productSection}>
            <div className="container mx-auto mt-5 mb-4">
                <div className="flex justify-center items-center">
                    <ProductFilters
                        onFilterChange={(filter) => {
                            setActiveFilter(filter);
                        }}
                        categories={categories}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products?.map((p) => (
                        <ProductComboCard key={p.id} p={p} />
                    ))}
                </div>
            </div>
        </div>
    );
}

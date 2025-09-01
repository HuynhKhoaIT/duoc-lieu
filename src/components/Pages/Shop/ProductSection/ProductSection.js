"use client";

import { useMemo, useState } from "react";

import ProductCardItem from "@/components/Common/Card/ProductCardItem";
import ProductFilters from "@/components/Common/Fillter/ProductFilters";

import styles from "./ProductSection.module.scss";

export default function ProductSection({ productsData, categories }) {
    const [ activeFilter, setActiveFilter ] = useState(null);
    const products = useMemo(() => {
        if (!productsData) return [];
        if (!activeFilter) return productsData;
        return productsData.filter((p) => {
            if (activeFilter === "all") {
                return true;
            }
            return p.categories?.[0]?.id === activeFilter;
        });
    }, [ activeFilter, productsData ]);

    return (
        <div className={styles.productSection}>
            <div className="container mx-auto mt-5 mb-4">
                <div className="flex justify-center items-center">
                    <ProductFilters
                        onFilterChange={(filter) => setActiveFilter(filter)}
                        categories={categories}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products?.map((p) => (
                        <ProductCardItem key={p.id} p={p} />
                    ))}
                </div>
            </div>
        </div>
    );
}

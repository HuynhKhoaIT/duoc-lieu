"use client";

import ProductCardItem from "@/components/Common/Card/ProductCardItem";
import ProductFilters from "@/components/Common/Fillter/ProductFilters";

import styles from "./ProductSection.module.scss";

export default function ProductSection({ productsData }) {
    return (
        <div className={styles.productSection}>
            <div className="container mx-auto mt-5 mb-4">
                <div className="flex justify-center items-center">
                    <ProductFilters
                        onFilterChange={(filter) =>
                            console.log("Selected:", filter)
                        }
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {productsData?.data?.map((p) => (
                        <ProductCardItem key={p.id} p={p} />
                    ))}
                </div>
            </div>
        </div>
    );
}

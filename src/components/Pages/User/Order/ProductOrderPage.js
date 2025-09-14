import { useMemo, useState } from "react";

import ProductComboCard from "@/components/Common/Card/ProductComboCard";
import ProductFilters from "@/components/Common/Fillter/ProductFilters";
import { useGlobalContext } from "@/contexts/GlobalContext";

import styles from "./ProductSection.module.scss";

export default function ProductOrderPage({ categories, productsData,cartData }) {
    const { data } = useGlobalContext();
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
    const numberCart = (id) => {
        return data?.find((item) => {
            return item?.product?.id == id;
        })?.quantity;
    };

    return (
        <div className={styles.productSection}>
            <div className="container mx-auto mt-[48px] mb-4">
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
                        <ProductComboCard key={p.id} p={p} quantity={numberCart(p.id)} cartData={cartData}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

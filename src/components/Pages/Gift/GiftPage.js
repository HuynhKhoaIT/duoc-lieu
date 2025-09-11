import ProductCardItem from "@/components/Common/Card/ProductCardItem";

import styles from "./Gift.module.scss";
export default function GiftPage({ productsData }) {
    return (
        <div className={styles.productSection}>
            <div className="container mx-auto mt-[48px] mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {productsData?.map((p) => (
                        <ProductCardItem key={p.id} p={p} />
                    ))}
                </div>
            </div>
        </div>
    );
}

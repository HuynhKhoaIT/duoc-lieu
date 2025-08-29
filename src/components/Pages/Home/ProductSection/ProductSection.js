import ProductCardItem from "@/components/Common/Card/ProductCardItem";

import styles from "./ProductSection.module.scss";

export default function ProductSection({productsData}) {
    return (
        <div className={styles.productSection}>
            <div className="container px-4 mx-auto">
                <div className="grid grid-cols-12">
                    <div className="col-span-12 lg:col-span-8 lg:col-start-3">
                        <div className={styles.sectionTitle}>
                            <h3>
                                <span className={styles.orangeText}>
                                    Sản phẩm
                                </span>{" "}
                                Tiêu biểu
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {productsData?.data?.map((p) => (
                        <ProductCardItem p={p} key={p.id} />
                    ))}
                </div>
            </div>
        </div>
    );
}

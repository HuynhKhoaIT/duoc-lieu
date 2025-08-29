import ProductComboCard from "@/components/Common/Card/ProductComboCard";

import styles from "./ProductSection.module.scss";

export default function ProductOrderPage({ productsData }) {
    return (
        <div className={styles.productSection}>
            <div className="container mx-auto mt-5 mb-4">
                <div className="flex justify-center items-center">
                    <div className="w-full">
                        <div className={styles.productFilters}>
                            <ul className="flex flex-wrap justify-center gap-2">
                                <li
                                    className={`${styles.active} btn-sm`}
                                    data-filter="*"
                                >
                                    Tất cả
                                </li>
                                <li className="btn-sm" data-filter=".pro1">
                                    Dầu Gội
                                </li>
                                <li className="btn-sm" data-filter=".pro2">
                                    Sữa Tắm
                                </li>
                                <li className="btn-sm" data-filter=".pro3">
                                    DDVS
                                </li>
                                <li className="btn-sm" data-filter=".pro4">
                                    Tinh Dầu
                                </li>
                                <li className="btn-sm" data-filter=".pro5">
                                    Tinh Chất
                                </li>
                                <li className="btn-sm" data-filter=".pro6">
                                    Serum
                                </li>
                                <li className="btn-sm" data-filter=".pro10">
                                    Rửa Chén
                                </li>
                                <li className="btn-sm" data-filter=".pro11">
                                    Rửa Tay
                                </li>
                                <li className="btn-sm" data-filter=".pro12">
                                    Nước Giặt
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Danh sách sản phẩm */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {productsData?.data?.map((p) => (
                        <ProductComboCard key={p.id} p={p} />
                    ))}
                </div>
            </div>
        </div>
    );
}

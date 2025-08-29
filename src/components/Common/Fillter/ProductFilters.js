import { useState } from "react";

import styles from "./ProductFilters.module.scss";

const categories = [
    { label: "Tất cả", value: "*", active: true },
    { label: "Dầu Gội", value: ".pro1" },
    { label: "Sữa Tắm", value: ".pro2" },
    { label: "DDVS", value: ".pro3" },
    { label: "Tinh Dầu", value: ".pro4" },
    { label: "Tinh Chất", value: ".pro5" },
    { label: "Serum", value: ".pro6" },
    { label: "Rửa Chén", value: ".pro10" },
    { label: "Rửa Tay", value: ".pro11" },
    { label: "Nước Giặt", value: ".pro12" },
];

export default function ProductFilters({ onFilterChange }) {
    const [ activeFilter, setActiveFilter ] = useState("*");

    const handleClick = (value) => {
        setActiveFilter(value);
        if (onFilterChange) onFilterChange(value);
    };

    return (
        <div className="w-full">
            <div className={styles.productFilters}>
                <ul className="flex flex-wrap justify-center gap-2">
                    {categories.map((item) => (
                        <li
                            key={item.value}
                            className={`btn-sm ${
                                activeFilter === item.value ? styles.active : ""
                            }`}
                            data-filter={item.value}
                            onClick={() => handleClick(item.value)}
                        >
                            {item.label}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

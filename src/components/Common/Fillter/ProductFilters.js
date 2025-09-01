import { useState } from "react";

import styles from "./ProductFilters.module.scss";

export default function ProductFilters({ onFilterChange, categories }) {
    const [ activeFilter, setActiveFilter ] = useState("all");

    const handleClick = (value) => {
        setActiveFilter(value);
        if (onFilterChange) onFilterChange(value);
    };

    return (
        <div className="w-full">
            <div className={styles.productFilters}>
                <ul className="flex flex-wrap justify-center gap-2">
                    <li
                        className={`btn-sm ${
                            activeFilter === "all" ? styles.active : ""
                        }`}
                        data-filter={"all"}
                        onClick={() => handleClick("all")}
                    >
                        Tất cả
                    </li>
                    {categories?.map((item) => (
                        <li
                            key={item.id}
                            className={`btn-sm ${
                                activeFilter === item.id ? styles.active : ""
                            }`}
                            data-filter={item.id}
                            onClick={() => handleClick(item.id)}
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

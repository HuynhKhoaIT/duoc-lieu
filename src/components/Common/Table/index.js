import { useMemo,useState } from "react";

import styles from "./Table.module.scss";

export default function TableBase({
    columns,
    data,
    nodata = "Không có dữ liệu",
    loading = false,
    currentPage = 1,
    totalPages = 1,
    onPageChange,
    maxVisiblePages = 5, // Số trang tối đa hiển thị
}) {
    const [ inputPage, setInputPage ] = useState("");

    // Tính toán các trang cần hiển thị
    const visiblePages = useMemo(() => {
        if (totalPages <= maxVisiblePages) {
            return Array.from({ length: totalPages }, (_, idx) => idx + 1);
        }

        const half = Math.floor(maxVisiblePages / 2);
        let start = Math.max(currentPage - half, 1);
        let end = Math.min(start + maxVisiblePages - 1, totalPages);

        // Điều chỉnh nếu gần cuối
        if (end - start + 1 < maxVisiblePages) {
            start = Math.max(end - maxVisiblePages + 1, 1);
        }

        const pages = [];
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    }, [ currentPage, totalPages, maxVisiblePages ]);

    const handlePageInput = (e) => {
        if (e.key === "Enter") {
            const page = parseInt(inputPage);
            if (page >= 1 && page <= totalPages) {
                onPageChange(page);
                setInputPage("");
            }
        }
    };

    return (
        <>
            <div className="overflow-x-auto">
                <table
                    className={`${styles.cartTableWrap} w-full text-left border border-gray-200`}
                >
                    <thead className="bg-[#efefef]">
                        <tr>
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    className="p-[15px] text-center"
                                >
                                    <strong
                                        style={{
                                            color: "#004c49",
                                            fontSize: "16px",
                                        }}
                                    >
                                        {col.label}
                                    </strong>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="text-center py-6"
                                >
                                    <span className="animate-pulse text-gray-500">
                                        Đang tải dữ liệu...
                                    </span>
                                </td>
                            </tr>
                        ) : data?.length > 0 ? (
                            data.map((row) => (
                                <tr
                                    key={row.id}
                                    className="border-b hover:bg-gray-50"
                                >
                                    {columns.map((col) => (
                                        <td
                                            key={col.key}
                                            className="py-4 text-center"
                                        >
                                            {row[col.key]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="text-center py-6"
                                >
                                    {nodata}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className={styles.paginationContainer}>
                    <nav className={styles.navigation}>
                        <ul className={styles.pagination}>
                            {/* First page button */}
                            {currentPage > 1 && (
                                <li className={styles.pageItem}>
                                    <span
                                        onClick={() => onPageChange(1)}
                                        className={styles.pageLink}
                                        title="Trang đầu"
                                    >
                                        «
                                    </span>
                                </li>
                            )}

                            {/* Prev button */}
                            <li
                                className={`${styles.pageItem} ${
                                    currentPage === 1 ? styles.disabled : ""
                                }`}
                            >
                                <span
                                    onClick={() =>
                                        currentPage > 1 &&
                                        onPageChange(currentPage - 1)
                                    }
                                    className={styles.pageLink}
                                    title="Trang trước"
                                >
                                    ‹
                                </span>
                            </li>

                            {/* First page with ellipsis */}
                            {visiblePages[0] > 1 && (
                                <>
                                    <li className={styles.pageItem}>
                                        <span
                                            onClick={() => onPageChange(1)}
                                            className={styles.pageLink}
                                        >
                                            1
                                        </span>
                                    </li>
                                    {visiblePages[0] > 2 && (
                                        <li
                                            className={`${styles.pageItem} ${styles.ellipsis}`}
                                        >
                                            <span className={styles.pageLink}>
                                                ...
                                            </span>
                                        </li>
                                    )}
                                </>
                            )}

                            {/* Page numbers */}
                            {visiblePages.map((page) => (
                                <li
                                    key={page}
                                    className={`${styles.pageItem} ${
                                        currentPage === page
                                            ? styles.active
                                            : ""
                                    }`}
                                >
                                    <span
                                        onClick={() => onPageChange(page)}
                                        className={styles.pageLink}
                                    >
                                        {page}
                                    </span>
                                </li>
                            ))}

                            {/* Last page with ellipsis */}
                            {visiblePages[visiblePages.length - 1] <
                                totalPages && (
                                <>
                                    {visiblePages[visiblePages.length - 1] <
                                        totalPages - 1 && (
                                        <li
                                            className={`${styles.pageItem} ${styles.ellipsis}`}
                                        >
                                            <span className={styles.pageLink}>
                                                ...
                                            </span>
                                        </li>
                                    )}
                                    <li className={styles.pageItem}>
                                        <span
                                            onClick={() =>
                                                onPageChange(totalPages)
                                            }
                                            className={styles.pageLink}
                                        >
                                            {totalPages}
                                        </span>
                                    </li>
                                </>
                            )}

                            {/* Next button */}
                            <li
                                className={`${styles.pageItem} ${
                                    currentPage === totalPages
                                        ? styles.disabled
                                        : ""
                                }`}
                            >
                                <span
                                    onClick={() =>
                                        currentPage < totalPages &&
                                        onPageChange(currentPage + 1)
                                    }
                                    className={styles.pageLink}
                                    title="Trang sau"
                                >
                                    ›
                                </span>
                            </li>

                            {/* Last page button */}
                            {currentPage < totalPages && (
                                <li className={styles.pageItem}>
                                    <span
                                        onClick={() => onPageChange(totalPages)}
                                        className={styles.pageLink}
                                        title="Trang cuối"
                                    >
                                        »
                                    </span>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            )}
        </>
    );
}

import styles from "./Table.module.scss";

export default function TableBase({
    columns,
    data,
    nodata = "Không có dữ liệu",
    loading = false,
    currentPage = 1,
    totalPages = 1,
    onPageChange,
}) {
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
                <nav className={styles.navigation}>
                    <ul className={styles.pagination}>
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
                            >
                                ‹
                            </span>
                        </li>

                        {/* Page numbers */}
                        {Array.from(
                            { length: totalPages },
                            (_, idx) => idx + 1,
                        ).map((page) => (
                            <li
                                key={page}
                                className={`${styles.pageItem} ${
                                    currentPage === page ? styles.active : ""
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
                            >
                                ›
                            </span>
                        </li>
                    </ul>
                </nav>
            )}
        </>
    );
}

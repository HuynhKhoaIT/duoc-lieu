import styles from "./Wallet.module.scss";

export default function WalletPage() {
    const columns = [
        { key: "id", label: "#" },
        { key: "amount", label: "Số tiền" },
        { key: "type", label: "Loại GD" },
        { key: "date", label: "Ngày GD" },
    ];

    const data = [
        {
            id: 1,
            amount: "2.500",
            type: "NPP - 078****378",
            date: "2025-08-28 20:30:38",
        },
        {
            id: 2,
            amount: "25.000",
            type: "ĐL - 078****378",
            date: "2025-08-28 20:30:38",
        },
        {
            id: 3,
            amount: "2.500",
            type: "NPP - 094****022",
            date: "2025-08-28 18:47:15",
        },
        {
            id: 4,
            amount: "2.500",
            type: "NPP - 039****369",
            date: "2025-08-28 18:29:19",
        },
        {
            id: 5,
            amount: "25.000",
            type: "ĐL - 039****369",
            date: "2025-08-28 18:29:19",
        },
        {
            id: 6,
            amount: "11.800",
            type: "NPP - 436****123",
            date: "2025-08-28 18:14:49",
        },
        {
            id: 7,
            amount: "29.500",
            type: "ĐL - 436****123",
            date: "2025-08-28 18:14:49",
        },
        {
            id: 8,
            amount: "300.000",
            type: "Chuyển đến 093****004",
            date: "2025-08-28 16:01:51",
        },
        {
            id: 9,
            amount: "5.000",
            type: "NPP - 038****544",
            date: "2025-08-28 14:56:25",
        },
    ];

    return (
        <div className="pt-[48px] pb-4">
            <div className="container">
                <div className="grid grid-cols-14">
                    <div className="lg:col-span-10 lg:col-start-3 col-start-0 col-span-14 ">
                        {/* Card số dư */}
                        <div className={`p-3 rounded-sm shadow blue-bg`}>
                            <div className="text-center">
                                <h5 className={`!mb-1 gold-text`}>Số dư</h5>
                                <h4 className="mb-1 text-light">278.634</h4>
                            </div>
                            <div className="flex justify-center items-center mt-2 space-x-3">
                                <a
                                    href="/user/transfer"
                                    className={"bordered-btn"}
                                >
                                    CHUYỂN
                                </a>
                                <a
                                    href="/user/withdraw"
                                    className={`bordered-btn text-center w-[100px]`}
                                >
                                    RÚT
                                </a>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className={`${styles.cartTableWrap} w-full text-left border border-gray-200`}>
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
                                    {data.map((row) => (
                                        <tr
                                            key={row.id}
                                            className="border-b hover:bg-gray-50"
                                        >
                                            {columns.map((col) => (
                                                <td
                                                    key={col.key}
                                                    className="py-4"
                                                >
                                                    {row[col.key]}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <nav className={styles.navigation}>
                            <ul className={`${styles.pagination}`}>
                                <li
                                    className={`${styles.pageItem} ${styles.disabled}`}
                                >
                                    <span className={styles.pageLink}>‹</span>
                                </li>
                                <li
                                    className={`${styles.pageItem} ${styles.active}`}
                                >
                                    <span className={styles.pageLink}>1</span>
                                </li>
                                <li className={`${styles.pageItem}`}>
                                    <a
                                        href="?page=2"
                                        className={styles.pageLink}
                                    >
                                        2
                                    </a>
                                </li>
                                <li className={`${styles.pageItem}`}>
                                    <a
                                        href="?page=3"
                                        className={styles.pageLink}
                                    >
                                        3
                                    </a>
                                </li>
                                <li className={`${styles.pageItem}`}>
                                    <a
                                        href="?page=2"
                                        className={styles.pageLink}
                                    >
                                        ›
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}

import styles from "./Table.module.scss";

export default function TableBase({
    columns,
    data,
    nodata = "Không có dữ liệu",
}) {
    return (
        <div className="overflow-x-auto">
            <table
                className={`${styles.cartTableWrap} w-full text-left border border-gray-200`}
            >
                <thead className="bg-[#efefef]">
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key} className="p-[15px] text-center">
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
                    {data?.map((row) => (
                        <tr key={row.id} className="border-b hover:bg-gray-50">
                            {columns.map((col) => (
                                <td key={col.key} className="py-4 text-center">
                                    {row[col.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {data?.length === 0 && <p className="text-center p-2 border">{nodata}</p>}
        </div>
    );
}

import { useRouter } from "next/router";
import { toast } from "sonner";

import TableBase from "@/components/Common/Table";
import { COMMISSION_TYPE, DEFAULT_FORMAT, WITHDRAW_TYPE } from "@/constants";
import paths from "@/constants/paths";
import { formatDateString } from "@/utils";

export default function WalletPage({ walletHistory, balanceData, loading }) {
    const { push } = useRouter();
    const columns = [
        { key: "id", label: "#" },
        { key: "amount", label: "Số tiền" },
        { key: "type", label: "Loại GD" },
        { key: "date", label: "Ngày GD" },
    ];

    // const data = walletHistory?.map((item, index) => ({
    //     id: index + 1,
    //     amount: (item.amount * 1).toLocaleString("vi-VN") || "0",
    //     type:
    //         item?.type === COMMISSION_TYPE
    //             ? `CTV-${item?.related_user?.username}`
    //             : item?.type === WITHDRAW_TYPE? "Tiền tự rút":`Tiền chuyển-${item?.related_user?.username}`,
    //     date: formatDateString(item.created_at,DEFAULT_FORMAT),
    // }));
    const data = walletHistory?.map((item, index) => {
        let typeLabel = "";

        switch (item?.type) {
            case "transfer_out":
                typeLabel = `Gửi từ ví - ${item?.sender?.username || "N/A"}`;
                break;
            case "transfer_in":
                typeLabel = `Nhận từ ví - ${item?.sender?.username || "N/A"}`;
                break;
            case "withdraw":
                typeLabel = "Rút tiền";
                break;
            case "commission":
                typeLabel = `CTV- ${item?.sender?.username || "N/A"}`;
                break;
            case "refund":
                typeLabel = "Hoàn tiền";
                break;
            case "deduct":
                typeLabel = "Mua hàng";
                break;
            default:
                typeLabel = "Khác";
                break;
        }

        return {
            id: index + 1,
            amount: (item.amount * 1).toLocaleString("vi-VN") || "0",
            type: typeLabel,
            date: formatDateString(item.created_at, DEFAULT_FORMAT),
        };
    });
    return (
        <div className="pt-[48px] pb-4">
            <div className="container">
                <div className="grid grid-cols-14">
                    <div className="lg:col-span-10 lg:col-start-3 col-start-0 col-span-14 ">
                        <div className={`p-3 rounded-sm shadow blue-bg`}>
                            <div className="text-center">
                                <h5 className={`!mb-1 gold-text`}>Số dư</h5>
                                <h4 className="mb-1 text-light">
                                    {balanceData?.balance
                                        ? (
                                            balanceData?.balance * 1
                                        ).toLocaleString("vi-VN")
                                        : "0"}
                                </h4>
                            </div>
                            <div className="flex justify-center items-center mt-2 space-x-3">
                                <button
                                    onClick={() => {
                                        if (balanceData?.balance > 0) {
                                            push(paths.transfer);
                                        } else {
                                            toast.error(
                                                "Số dư không đủ để chuyển!",
                                            );
                                        }
                                    }}
                                    className={"bordered-btn"}
                                >
                                    CHUYỂN
                                </button>
                                <button
                                    onClick={() => {
                                        if (balanceData?.balance > 0) {
                                            push(paths.withdraw);
                                        } else {
                                            toast.error(
                                                "Số dư không đủ để rút!",
                                            );
                                        }
                                    }}
                                    className={`bordered-btn text-center w-[100px]`}
                                >
                                    RÚT
                                </button>
                            </div>
                        </div>

                        <TableBase
                            columns={columns}
                            data={data}
                            loading={loading}
                        />
                        {/* Pagination */}
                        {/* <nav className={styles.navigation}>
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
                        </nav> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

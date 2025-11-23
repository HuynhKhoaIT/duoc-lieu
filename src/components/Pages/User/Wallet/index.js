import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";

import TableBase from "@/components/Common/Table";
import { DEFAULT_FORMAT } from "@/constants";
import paths from "@/constants/paths";
import { formatDateString } from "@/utils";

export default function WalletPage({
    walletHistory,
    balanceData,
    loading,
    mutate,
    metaData,
    currentPage,
    setCurrentPage,
}) {
    const { push } = useRouter();
    const [ totalPages, setTotalPages ] = useState(metaData?.last_page || 1);

    const columns = [
        { key: "id", label: "#" },
        { key: "amount", label: "Số tiền" },
        { key: "type", label: "Loại GD" },
        { key: "date", label: "Ngày GD" },
    ];

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
            case "agent_override":
                typeLabel = "Điểm thưởng hỗ trợ phí";
                break;
            default:
                typeLabel = "Khác";
                break;
        }
        return {
            id: index + 1 + (currentPage - 1) * metaData?.per_page, // đánh số đúng theo page
            amount: (item.amount * 1).toLocaleString("vi-VN") || "0",
            type: typeLabel,
            date: formatDateString(item.created_at, DEFAULT_FORMAT),
        };
    });

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        mutate();
    };

    useEffect(() => {
        setTotalPages(metaData?.last_page || 1);
    }, [ metaData ]);

    return (
        <div className="pt-[48px] pb-4">
            <div className="container">
                <div className="grid grid-cols-14">
                    <div className="lg:col-span-10 lg:col-start-3 col-start-0 col-span-14 ">
                        <div className="p-3 rounded-sm shadow blue-bg">
                            <div className="text-center">
                                <h5 className="!mb-1 gold-text">Số điểm</h5>
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
                                                "Số điểm không đủ để chuyển!",
                                            );
                                        }
                                    }}
                                    className="bordered-btn"
                                >
                                    CHUYỂN
                                </button>
                                <button
                                    onClick={() => {
                                        if (balanceData?.balance > 0) {
                                            push(paths.withdraw);
                                        } else {
                                            toast.error(
                                                "Số điểm không đủ để rút!",
                                            );
                                        }
                                    }}
                                    className="bordered-btn text-center w-[100px]"
                                >
                                    RÚT
                                </button>
                            </div>
                        </div>
                        <TableBase
                            columns={columns}
                            data={data}
                            loading={loading}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

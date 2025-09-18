import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

import FeedbackModal from "@/components/Common/Modal/FeedbackModal/FeedbackModal";
import TableBase from "@/components/Common/Table";
import { statusOrderOptions } from "@/constants";
import paths from "@/constants/paths";
import useAuth from "@/hooks/useAuth";
import { formatDateString } from "@/utils";

import ModalBillDetail from "./ModalBillDetail";

import styles from "./BillTable.module.scss";

export default function BillTable({
    ordersData,
    mutate,
    loading,
    metaData,
    currentPage,
    setCurrentPage,
}) {
    const [ isOpen, setIsOpen ] = useState(false);
    const { profile } = useAuth();
    const [ orderFeedback, setOrderFeedback ] = useState(null);
    const [ totalPages, setTotalPages ] = useState(metaData?.last_page || 1);

    const [ dataDetail, setDataDetail ] = useState(null);

    const columns = [
        { key: "id", label: "#" },
        { key: "order_code", label: "Mã ĐH" },
        { key: "created_at", label: "Ngày đặt" },
        { key: "total_amount", label: "Số tiền" },
        { key: "payment_method", label: "Thanh toán" },
        { key: "status", label: "Trạng thái" },
        { key: "action", label: "Phản hồi" },
    ];

    const data = ordersData?.map((order, index) => ({
        id: index + 1,
        order_code: order.order_code,
        created_at: formatDateString(order.created_at),
        total_amount: (
            <span
                onClick={() => setDataDetail(order)}
                className="gold-text cursor-pointer hover:!text-[#0056b3] hover:underline"
            >
                {(order.total_amount * 1).toLocaleString()}
            </span>
        ),
        payment_method:
            order.payment_method === "bank_transfer"
                ? "Chuyển khoản"
                : order.payment_method === "wallet"
                    ? "Tài khoản ví"
                    : "Phiếu mua hàng",
        status: statusOrderOptions[order.status],

        action:
            order?.feedbacks?.length > 0 &&
            order?.feedbacks[order?.feedbacks?.length - 1]?.user?.role ===
                "member" ? (
                    order.feedbacks[order?.feedbacks?.length - 1]?.content
                ) : (
                    <button
                        onClick={() => {
                            setOrderFeedback(order);
                            setIsOpen(true);
                        }}
                        type="button"
                        className="main-btn text-sm cursor-pointer"
                    >
                        <strong>Phản Hồi</strong>
                    </button>
                ),
    }));

    const handleFeedback = async ({ feedback }) => {
        try {
            const res = await fetch(`/api/order/${orderFeedback.id}/feedback`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: feedback }),
            });
            console.log(res);
            if (res.status == 200) {
                toast.success("Phản hồi thành công");
                setIsOpen(false);
                mutate();
            }
        } catch (error) {
            toast.error("Phản hồi thất bại");
        } finally {
            setOrderFeedback(null);
        }
    };

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        mutate();
    };

    useEffect(() => {
        setTotalPages(metaData?.last_page || 1);
    }, [ metaData ]);

    return (
        <div className={`${styles.contactForm} pt-[48px] pb-3`}>
            <div className="container">
                <div className="flex">
                    <div className="w-full lg:w-9/12 mx-auto">
                        <div className="flex">
                            <div className="w-full">
                                <div
                                    className={`blue-bg rounded-xl shadow p-6`}
                                >
                                    <div className="w-full">
                                        <h5
                                            className={`gold-text text-center mb-2`}
                                        >
                                            Tháng này
                                        </h5>
                                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <h5
                                                    className={`gold-text !mb-0`}
                                                >
                                                    Đại lý 1:
                                                </h5>
                                                <h4 className="mb-1 !text-white">
                                                    0
                                                </h4>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <h5
                                                    className={`gold-text !mb-0`}
                                                >
                                                    Tiêu dùng:
                                                </h5>
                                                <h4 className="mb-1 !text-white">
                                                    0
                                                </h4>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Nút */}
                                    <div className="flex justify-center items-center mt-4 gap-3">
                                        <Link
                                            href={`${paths.signin}/${profile?.phone_number}`}
                                            className={`bordered-btn text-center`}
                                            style={{ width: "115px" }}
                                        >
                                            Đăng ký
                                        </Link>
                                        <Link
                                            href={paths.order}
                                            className={"bordered-btn"}
                                        >
                                            Đặt Hàng
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bảng đơn hàng */}
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
            <FeedbackModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onSubmit={handleFeedback}
            />
            <ModalBillDetail
                isOpen={!!dataDetail}
                onClose={() => setDataDetail(null)}
                data={dataDetail}
            />
        </div>
    );
}

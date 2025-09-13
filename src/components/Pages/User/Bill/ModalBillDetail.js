import { useMemo } from "react";

import ModalBase from "@/components/Common/Modal/ModalBase";

export default function ModalBillDetail({ isOpen, onClose, data }) {
    const totalQuantity = useMemo(() => {
        return (
            data?.items?.reduce((total, item) => total + item.quantity, 0) || 0
        );
    }, [ data ]);

    return (
        <ModalBase isOpen={isOpen} onClose={onClose}>
            <div className="p-2 text-center flex flex-col items-center ">
                {/* Header */}
                <div className=" border-b border-gray-300 p-4">
                    <h5 className={`text-lg font-semibold`}>
                        ĐƠN HÀNG{" "}
                        <b className={"gold-text"}>{data?.order_code}</b>
                    </h5>
                </div>

                {/* Body */}
                <div className="mt-3 mb-3 ">
                    <table className={`w-full border-collapse`}>
                        <thead>
                            <tr className="bg-gray-100">
                                <th className={"blue-text p-3"}>
                                    <strong>#</strong>
                                </th>
                                <th className={"blue-text p-3"}>
                                    <strong>Sản phẩm</strong>
                                </th>
                                <th className={"blue-text p-3"}>
                                    <strong>SL</strong>
                                </th>
                                <th className={"blue-text p-3"}>
                                    <strong>Đơn giá</strong>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.items?.map((item, index) => (
                                <tr key={item.id}>
                                    <td className={"blue-text py-1"}>{index + 1}</td>
                                    <td className={"blue-text py-1"}>
                                        {item.product?.name}
                                    </td>
                                    <td className={"blue-text py-1"}>
                                        {item.quantity}
                                    </td>
                                    <td className={"blue-text py-1"}>
                                        {Number(item.price).toLocaleString(
                                            "vi-VN",
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="bg-gray-100">
                                <td
                                    className={`${"blue-text p-3"} text-right`}
                                    colSpan="2"
                                >
                                    <strong>Tổng</strong>
                                </td>
                                <td className={"blue-text p-3"}>
                                    <strong>{totalQuantity}</strong>
                                </td>
                                <td className={"blue-text p-3"}>
                                    <strong>
                                        {Number(
                                            data?.total_amount,
                                        ).toLocaleString("vi-VN")}
                                    </strong>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-300">
                    <button
                        type="button"
                        className="px-4 py-2 text-sm btn bordered-btn btn-sm"
                        onClick={onClose}
                    >
                        OK
                    </button>
                </div>
            </div>
        </ModalBase>
    );
}

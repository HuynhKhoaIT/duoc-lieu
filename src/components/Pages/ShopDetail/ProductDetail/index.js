import Image from "next/image";
import { CreditCard, Minus, Plus, ShoppingCart } from "lucide-react";

import useProductDetail from "@/hooks/useProductDetail";

import styles from "./ProductDetail.module.scss";
import { sanitizeHTML } from "@/utils/sanitizeHTML";

export default function ProductDetail({ dataDetail }) {
    const {
        quantity,
        increaseQuantity,
        decreaseQuantity,
        changeQuantity,
        addToCart,
        buyNow,
    } = useProductDetail();

    return (
        <div className="my-20">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-6 pt-5 pb-5">
                    {/* LEFT: Hình ảnh + số lượng + nút hành động */}
                    <div className="md:w-5/12">
                        <div className={styles.singleProductImg}>
                            <div className="w-full">
                                <Image
                                    src={dataDetail?.thumbnail}
                                    alt={dataDetail?.name}
                                    width={800}
                                    height={600}
                                    className="w-full h-auto rounded-md object-contain"
                                />
                            </div>

                            <h4 className="gold-bg text-center p-3 mb-4 text-blue-600 text-lg font-semibold">
                                {dataDetail?.name}
                            </h4>

                            {/* GIÁ + SỐ LƯỢNG */}
                            <div className="flex items-center justify-between px-3 py-2 mb-4">
                                {/* Giá sản phẩm */}
                                <div>
                                    {dataDetail?.price_wholesale ? (
                                        <div className="flex gap-2 items-center">
                                            <span className="text-[24px] font-bold text-[#008080]">
                                                {(
                                                    dataDetail.price_wholesale *
                                                    1
                                                ).toLocaleString("vi-VN")}{" "}
                                                ₫
                                            </span>
                                            <span className="text-[16px] text-gray-500 line-through">
                                                {(
                                                    dataDetail.price_retail * 1
                                                ).toLocaleString("vi-VN")}{" "}
                                                ₫
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="text-[24px] font-bold text-[#008080]">
                                            {(
                                                dataDetail.price_wholesale * 1
                                            ).toLocaleString("vi-VN")}{" "}
                                            ₫
                                        </span>
                                    )}
                                </div>

                                {/* Số lượng */}
                                <div className="flex items-center">
                                    <button
                                        onClick={decreaseQuantity}
                                        className="w-8 h-8 flex items-center justify-center border border-[#008080] rounded-l-md hover:bg-[goldenrod]/10 transition"
                                    >
                                        <Minus
                                            size={16}
                                            className="text-[#008080]"
                                        />
                                    </button>
                                    <input
                                        type="number"
                                        value={quantity}
                                        min={1}
                                        onChange={(e) =>
                                            changeQuantity(e.target.value)
                                        }
                                        className="w-8 h-8 text-center border-t border-b border-[#008080] focus:outline-none text-[#008080] font-medium 
                                        [&::-webkit-outer-spin-button]:appearance-none 
                                        [&::-webkit-inner-spin-button]:appearance-none 
                                        [-moz-appearance:textfield]"
                                    />
                                    <button
                                        onClick={increaseQuantity}
                                        className="w-8 h-8 flex items-center justify-center border border-[#008080] rounded-r-md hover:bg-[goldenrod]/10 transition"
                                    >
                                        <Plus
                                            size={16}
                                            className="text-[#008080]"
                                        />
                                    </button>
                                </div>
                            </div>

                            {/* NÚT HÀNH ĐỘNG */}
                            <div className="flex flex-col lg:flex-row justify-between gap-4">
                                <button
                                    onClick={() =>
                                        addToCart({
                                            item: dataDetail,
                                            qty: quantity,
                                        })
                                    }
                                    className="flex-1 read-more-btn !flex items-center justify-center gap-2"
                                >
                                    <ShoppingCart size={18} />
                                    Thêm vào giỏ hàng
                                </button>

                                <button
                                    onClick={() => buyNow(dataDetail)}
                                    className="flex-1 read-more-btn !flex items-center justify-center gap-2"
                                >
                                    <CreditCard size={18} />
                                    Mua ngay
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Thông tin sản phẩm */}
                    <div className="md:w-7/12">
                        <div className="p-3">
                            <Section
                                title="ĐẶC TÍNH"
                                content={dataDetail?.features}
                            />
                            <Section
                                title="QUY CÁCH"
                                content={dataDetail?.specifications}
                            />
                            <Section
                                title="CÔNG DỤNG"
                                content={dataDetail?.usage}
                            />
                            <Section
                                title="ĐẶC ĐIỂM NỔI BẬT"
                                content={dataDetail?.highlights}
                            />
                            <Section
                                title="HƯỚNG DẪN SỬ DỤNG"
                                content={dataDetail?.instructions}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/** Component hiển thị từng phần thông tin */
function Section({ title, content }) {
    return (
        <>
            <h5 className="blue-bg gold-text p-2 text-yellow-400 font-semibold flex items-center gap-2 mt-4">
                <i className="fas fa-check-double"></i> {title}
            </h5>
            <div
                dangerouslySetInnerHTML={{ __html: sanitizeHTML(content) }}
            />
        </>
    );
}

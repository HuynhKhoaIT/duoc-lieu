import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { CreditCard, Minus, Plus, Share2, ShoppingCart } from "lucide-react";

import ModalBase from "@/components/Common/Modal/ModalBase";
import ShareModal from "@/components/Common/ShareModal";
import { GIFT_TYPE } from "@/constants";
import paths from "@/constants/paths";
import useAuth from "@/hooks/useAuth";
import useProductDetail from "@/hooks/useProductDetail";
import { sanitizeHTML } from "@/utils/sanitizeHTML";

import styles from "./ProductDetail.module.scss";

export default function ProductDetail({ dataDetail, cartData }) {
    const { isAuthenticated, profile } = useAuth();
    const [ openModal, setOpen ] = useState(false);
    const { push, asPath } = useRouter();

    const {
        quantity,
        increaseQuantity,
        decreaseQuantity,
        changeQuantity,
        addToCart,
        buyNow,
    } = useProductDetail(cartData);

    const isHadToCar = useMemo(() => {
        if (dataDetail?.type === GIFT_TYPE) {
            return !!cartData?.find(
                (item) => item?.product?.id === dataDetail?.id,
            );
        }
        return false;
    }, [ cartData ]);

    const [ shareUrl, setShareUrl ] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined" && isAuthenticated) {
            setShareUrl(
                window.location.origin + asPath + `?referral=${profile?.phone_number}`,
            );
        }
    }, [ asPath,isAuthenticated ]);
    return (
        <div className="my-[48px]">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-6 pt-5 pb-5">
                    {/* LEFT: Hình ảnh + số lượng + nút hành động */}
                    <div className="md:w-5/12">
                        <div className={styles.singleProductImg}>
                            <div className="w-full relative">
                                <Image
                                    src={dataDetail?.thumbnail}
                                    alt={dataDetail?.name}
                                    width={800}
                                    height={600}
                                    className="w-full h-auto rounded-md object-contain"
                                />
                                {isAuthenticated && (
                                    <button
                                        onClick={() => setOpen(true)}
                                        className="absolute top-2 right-2 main-btn !flex items-center justify-center gap-2 hover:cursor-pointer"
                                    >
                                        <Share2 size={18} />
                                        Chia sẻ
                                    </button>
                                )}
                            </div>

                            <h4 className="gold-bg text-center p-3 mb-4 text-blue-600 text-lg font-semibold">
                                {dataDetail?.name}
                            </h4>

                            {/* GIÁ + SỐ LƯỢNG */}
                            {dataDetail?.type !== GIFT_TYPE && (
                                <div className="flex items-center justify-between px-3 py-2 mb-4">
                                    {/* Giá sản phẩm */}
                                    {isAuthenticated ? (
                                        <div>
                                            {dataDetail?.price_wholesale ? (
                                                <div className="flex gap-2 items-center">
                                                    <span className="text-[24px] font-bold text-[#004c49]">
                                                        {(
                                                            dataDetail.price_wholesale *
                                                            1
                                                        ).toLocaleString(
                                                            "vi-VN",
                                                        )}{" "}
                                                        ₫
                                                    </span>
                                                    <span className="text-[16px] text-gray-500 line-through">
                                                        {(
                                                            dataDetail.price_retail *
                                                            1
                                                        ).toLocaleString(
                                                            "vi-VN",
                                                        )}{" "}
                                                        ₫
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="text-[24px] font-bold text-[#004c49]">
                                                    {(
                                                        dataDetail.price_wholesale *
                                                        1
                                                    ).toLocaleString(
                                                        "vi-VN",
                                                    )}{" "}
                                                    ₫
                                                </span>
                                            )}
                                        </div>
                                    ) : (
                                        <span className="text-[24px] font-bold text-[#004c49]">
                                            {(
                                                dataDetail.price_retail * 1
                                            ).toLocaleString("vi-VN")}{" "}
                                            ₫
                                        </span>
                                    )}

                                    {/* Số lượng */}
                                    <div className="flex items-center">
                                        <button
                                            onClick={decreaseQuantity}
                                            className="w-8 h-8 flex items-center justify-center border border-[#004c49] rounded-l-md hover:bg-[goldenrod]/10 transition hover:cursor-pointer"
                                        >
                                            <Minus
                                                size={16}
                                                className="text-[#004c49]"
                                            />
                                        </button>
                                        <input
                                            type="number"
                                            value={quantity}
                                            min={1}
                                            onChange={(e) =>
                                                changeQuantity(e.target.value)
                                            }
                                            readOnly
                                            className="w-8 h-8 text-center border-t border-b border-[#004c49] focus:outline-none text-[#004c49] font-medium 
                                            [&::-webkit-outer-spin-button]:appearance-none 
                                            [&::-webkit-inner-spin-button]:appearance-none 
                                            [-moz-appearance:textfield]"
                                        />
                                        <button
                                            onClick={increaseQuantity}
                                            className="w-8 h-8 flex items-center justify-center border border-[#004c49] rounded-r-md hover:bg-[goldenrod]/10 transition hover:cursor-pointer"
                                        >
                                            <Plus
                                                size={16}
                                                className="text-[#004c49]"
                                            />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* NÚT HÀNH ĐỘNG */}
                            {isHadToCar ? (
                                <button
                                    onClick={() => push(paths.cart)}
                                    className="read-more-btn !flex items-center justify-center w-full gap-2 hover:cursor-pointer"
                                >
                                    <ShoppingCart size={18} />
                                    Đã có trong giỏ hàng
                                </button>
                            ) : (
                                <div className="flex flex-col lg:flex-row justify-between gap-4">
                                    <button
                                        onClick={() =>
                                            addToCart({
                                                item: dataDetail,
                                                qty: quantity,
                                            })
                                        }
                                        className="flex-1 read-more-btn !flex items-center justify-center gap-2 hover:cursor-pointer"
                                    >
                                        <ShoppingCart size={18} />
                                        Thêm vào giỏ hàng
                                    </button>

                                    <button
                                        onClick={() => buyNow(dataDetail)}
                                        className="flex-1 read-more-btn !flex items-center justify-center gap-2 hover:cursor-pointer"
                                    >
                                        <CreditCard size={18} />
                                        Mua ngay
                                    </button>
                                </div>
                            )}
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
                            <Section
                                title="Thành Phần"
                                content={dataDetail?.ingredients}
                            />
                            <Section
                                title="Cảnh báo an toàn"
                                content={dataDetail?.safety_warning}
                            />
                            <Section
                                title="Thông tin quan trọng cần lưu ý"
                                content={dataDetail?.important_info}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <ShareModal
                isOpen={openModal}
                onClose={() => setOpen(false)}
                shareUrl={shareUrl}
            />
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
            <div dangerouslySetInnerHTML={{ __html: sanitizeHTML(content) }} />
        </>
    );
}

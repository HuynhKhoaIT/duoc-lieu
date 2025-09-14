import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Share2 } from "lucide-react";

import paths from "@/constants/paths";
import { useGlobalContext } from "@/contexts/GlobalContext";
import useAuth from "@/hooks/useAuth";
import useCart from "@/hooks/useCart";

import ShareModal from "../ShareModal";

import styles from "./ProductComboCard.module.scss";

export default function ProductComboCard({ p, quantity }) {
    const { setCart, cart, setData, data } = useGlobalContext();
    const { asPath } = useRouter();

    const { isAuthenticated, profile } = useAuth();
    const [ openModal, setOpen ] = useState(false);
    const { addToCart } = useCart(data);
    const [ shareUrl, setShareUrl ] = useState("");

    return (
        <div
            className={`w-full hover:shadow-xl rounded-md text-center mb-1 p-2 ${styles.pro1}`}
        >
            <div
                className={styles.card}
                onClick={() =>
                    addToCart({
                        item: p,
                        qty: 1,
                    })
                }
            >
                <div>
                    <div className="relative w-full aspect-[3/3]">
                        <Image
                            src={p.thumbnail}
                            alt={p.slug}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                            quality={75}
                        />
                        <div className="absolute top-3 left-3 flex items-center justify-center  bg-white rounded-full w-10 h-10 shadow-md">
                            <i className="fas fa-shopping-cart text-[goldenrod] text-xl"></i>

                            {quantity > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[goldenrod] text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-md">
                                    {quantity}
                                </span>
                            )}
                        </div>
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                const referralParam = profile?.phone_number
                                    ? `?referral=${profile.phone_number}`
                                    : "";
                                setShareUrl(
                                    `${window.location.origin}${paths.shop}/${p.slug}${referralParam}`,
                                );

                                setOpen(true);
                            }}
                            className="absolute top-3 right-3 flex items-center justify-center bg-white rounded-full w-10 h-10 shadow-md hover:shadow-[goldenrod]"
                        >
                            <Share2 size={24} color="goldenrod" />
                        </div>
                    </div>
                    <h6 className={`gold-bg blue-text p-2 !mb-0`}>{p.name}</h6>

                    <div className={`p-2 blue-bg`}>
                        <div className="flex justify-between items-end px-1">
                            <h6 className={`gold-text !m-0 pr-2`}>Giá lẻ:</h6>
                            <h4 className={`gold-text !m-0 pr-2`}>
                                {(p?.price_retail * 1).toLocaleString("vi-VN")}
                            </h4>
                        </div>
                    </div>
                    <div className={`p-2 pt-0 blue-bg`}>
                        <div className="flex justify-between items-end px-1">
                            <div className="relative text-white inline-block">
                                <h6 className={`gold-text !m-0 pr-2`}>
                                    Giá CTV:
                                </h6>
                            </div>
                            <h4 className={`gold-text !m-0 pr-2`}>
                                {(p?.price_wholesale * 1).toLocaleString(
                                    "vi-VN",
                                )}
                            </h4>
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

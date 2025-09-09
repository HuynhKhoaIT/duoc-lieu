import Image from "next/image";
import { useRouter } from "next/router";

import paths from "@/constants/paths";
import { useGlobalContext } from "@/contexts/GlobalContext";
import useAuth from "@/hooks/useAuth";

import styles from "./ProductComboCard.module.scss";

export default function ProductComboCard({ p, quantity }) {
    const { setCart, cart, setData } = useGlobalContext();

    const { isAuthenticated } = useAuth();
    const { push } = useRouter();
    const handleAddToCart = async ({ item }) => {
        try {
            const res = await fetch("/api/cart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    product_id: item.id,
                    quantity: 1,
                }),
            });

            if (!res.ok) throw new Error("Thêm giỏ hàng thất bại");

            const data = await res.json();
            setData((prev) => {
                const existingItemIndex = prev.findIndex(
                    (cartItem) => cartItem.product?.id === data.data.product?.id,
                );

                if (existingItemIndex !== -1) {
                    return prev.map((cartItem, index) =>
                        index === existingItemIndex
                            ? {
                                ...cartItem,
                                quantity:
                                      cartItem.quantity + 1,
                            }
                            : cartItem,
                    );
                } else {
                    return [ ...prev, data.data ];
                }
            });
            setCart((prev) => prev + 1);
        } catch (error) {
            console.error("Lỗi khi thêm vào giỏ:", error);
        }
    };


    return (
        <div className={`w-full  text-center mb-1 p-2 ${styles.pro1}`}>
            <div
                className={styles.card}
                onClick={() => {
                    if (isAuthenticated) {
                        handleAddToCart({ item: p });
                    } else {
                        push(paths.login);
                    }
                }}
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
                    </div>

                    <div className={`p-2 blue-bg`}>
                        <div className="flex justify-between items-end px-1">
                            <div className="relative inline-block">
                                {/* Icon giỏ hàng */}
                                <i className="fas fa-shopping-cart text-[goldenrod] text-xl"></i>

                                {quantity > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-[goldenrod] text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-md">
                                        {quantity}
                                    </span>
                                )}
                            </div>
                            <h6 className={`gold-text !m-0 pr-2 line-through`}>
                                {(p?.price_retail * 1).toLocaleString("vi-VN")}
                            </h6>
                            <h4 className="!text-white p-0 m-0">
                                {(p?.price_wholesale * 1).toLocaleString(
                                    "vi-VN",
                                )}
                            </h4>
                        </div>
                    </div>
                    <h6 className={`gold-bg blue-text p-2`}>{p.name}</h6>
                </div>
            </div>
        </div>
    );
}

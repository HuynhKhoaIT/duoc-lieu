import Image from "next/image";
import { useRouter } from "next/router";

import paths from "@/constants/paths";
import { useGlobalContext } from "@/contexts/GlobalContext";
import useAuth from "@/hooks/useAuth";

import styles from "./ProductComboCard.module.scss";

export default function ProductComboCard({ p }) {
    const { setCart, cart } = useGlobalContext();

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
            console.log("data",data);
            // giả sử backend trả về tổng số lượng trong cart
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
                        />
                    </div>

                    <div className={`p-2 blue-bg`}>
                        <div className="flex justify-between items-end px-1">
                            <i className="fas mb-1 flex-1 fa-shopping-cart !text-left text-[goldenrod]">
                                <span
                                    className="pl-1 pr-1 pt-0 pb-0"
                                    style={{ marginLeft: "-5px" }}
                                />
                            </i>
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

import Image from "next/image";
import { useRouter } from "next/router";

import apiConfig from "@/constants/apiConfig";
import paths from "@/constants/paths";
import { useGlobalContext } from "@/contexts/GlobalContext";
import useAuth from "@/hooks/useAuth";
import fetcher from "@/services/fetcher";

import styles from "./ProductComboCard.module.scss";

export default function ProductComboCard({ p }) {
    const { setCart, cart } = useGlobalContext();

    const { isAuthenticated } = useAuth();
    const { push } = useRouter();
    const handleAddToCart = async ({ item }) => {
        try {
            const res = await fetcher(apiConfig.carts.create, {
                data: {
                    product_id: item.id,
                    quantity: 1,
                },
            });
            setCart(cart + 1);
        } catch (error) {
            console.log(error);
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
                    {/* <div
                        className="h-[220px] bg-cover bg-no-repeat bg-[center_top_70%]"
                        style={{
                            backgroundImage: `url(${p.thumbnail})`,
                        }}
                    /> */}
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
                                405.000
                            </h6>
                            <h4 className="!text-white p-0 m-0">300.000</h4>
                        </div>
                    </div>
                    <h6 className={`gold-bg blue-text p-2`}>{p.name}</h6>
                </div>
            </div>
        </div>
    );
}

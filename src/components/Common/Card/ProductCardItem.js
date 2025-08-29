import Image from "next/image";
import Link from "next/link";

import paths from "@/constants/paths";

import styles from "./ProductCardItem.module.scss";

export default function ProductCardItem({ p }) {
    return (
        <div key={p.id} className="text-center">
            <div className={styles.singleProductItem}>
                <Link href={`${paths.shop}/${p.slug}`}>
                    <div className="relative w-full aspect-[4/3]">
                        <Image
                            src={p.thumbnail}
                            alt={p.slug}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                    </div>
                </Link>
                <h6 className={`gold-bg blue-text p-2 !mb-0`}>{p.name}</h6>
                <div
                    className={`blue-bg p-3 m-0 flex justify-between align-end`}
                >
                    <Link href="/combo">
                        <button className={`bordered-btn  w-[110px]`}>
                            Đặt hàng
                        </button>
                    </Link>
                    <Link href={`${paths.shop}/${p.slug}`}>
                        <button className={`bordered-btn`}>Xem thêm</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

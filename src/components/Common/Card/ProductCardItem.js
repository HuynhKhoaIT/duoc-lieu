import styles from "./ProductCardItem.module.scss";

export default function ProductCardItem({p}) {
    return (
        <div key={p.id} className="text-center">
            <div className={styles.singleProductItem}>
                <a href={`/shop/${p.id}`}>
                    <img
                        src={p.img}
                        alt={p.name}
                        className={styles.productImage}
                    />
                </a>
                <h6 className={`gold-bg blue-text p-2 !mb-0`}>
                    {p.name}
                </h6>
                <div
                    className={`blue-bg p-3 m-0 flex justify-between align-end`}
                >
                    <a href="/combo">
                        <button
                            className={`bordered-btn  w-[110px]`}
                        >
                            Đặt hàng
                        </button>
                    </a>
                    <a href={`/shop/${p.id}`}>
                        <button
                            className={`bordered-btn`}
                        >
                            Xem thêm
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
}

import styles from "./ProductComboCard.module.scss";

export default function ProductComboCard({ p }) {
    console.log(p.img);
    return (
        <div className={`w-full  text-center mb-1 p-2 ${styles.pro1}`}>
            <div className={styles.card}>
                <a href="/user/order/3">
                    <div
                        className="h-[220px] bg-cover bg-no-repeat bg-[center_top_70%]"
                        style={{
                            backgroundImage: `url(${p.img})`,
                        }}
                    />

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
                </a>
            </div>
        </div>
    );
}

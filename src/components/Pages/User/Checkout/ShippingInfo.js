import styles from "./Checkout.module.scss";

export default function ShippingInfo({ open, toggle, profile }) {
    return (
        <div
            className={`${styles.card} ${styles.singleAccordion} mb-3 bg-white shadow-md rounded`}
        >
            <div className={styles.cardHeader}>
                <h5 className="mb-0">
                    <button
                        className="text-left w-full"
                        type="button"
                        onClick={() => toggle("shippingInfo")}
                    >
                        Thông Tin Giao Hàng
                    </button>
                </h5>
            </div>
            <div
                className={`${styles.collapse} ${open === "shippingInfo" ? styles.show : ""}`}
            >
                <div className="p-0">
                    <div className={styles.billingAddressForm}>
                        <p className="flex justify-between items-center pr-0 pl-0">
                            <span className="w-[30%]">Họ & tên</span>
                            <input
                                type="text"
                                className="w-[70%] h-[60px]"
                                name="name"
                                defaultValue={profile?.name}
                            />
                        </p>
                        <p className="flex justify-between items-center pr-0 pl-0">
                            <span className="w-[30%]">Điện thoại</span>
                            <input
                                type="text"
                                className="w-[70%] h-[60px]"
                                name="phone"
                                defaultValue={profile?.phone_number}
                            />
                        </p>
                        <p className="flex justify-between items-center pr-0 pl-0">
                            <span className="w-[30%]">Địa chỉ</span>
                            <input
                                type="text"
                                className="w-[70%] h-[60px]"
                                name="address"
                                defaultValue={profile?.address}
                            />
                        </p>
                        <p className="flex justify-between items-center pr-0 pl-0">
                            <span className="w-[30%]">Ghi chú</span>
                            <input
                                type="text"
                                className="w-[70%] h-[60px]"
                                name="note"
                            />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

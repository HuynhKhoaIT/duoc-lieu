import styles from "./WithdrawForm.module.scss";

export default function WithdrawForm() {
    return (
        <div className={`${styles.contactForm} blue-bg pb-[600px]`}>
            <div className="container mx-auto">
                <div className="flex justify-center">
                    <div className="w-full lg:w-9/12 sm:w-7/12">
                        <div className={styles.contactForm}>
                            <form
                                className="text-center"
                            >
                                <h5 className="gold-text">
                                    Số dư:{" "}
                                    <b className="text-light">119.000 </b>
                                </h5>

                                <p className="w-full flex justify-center items-center px-1">
                                    <input
                                        type="text"
                                        className={`${styles["input"]} mt-3 blue-text`}
                                        name="amount"
                                        placeholder="Bạn cần rút bao nhiêu?"
                                    />
                                </p>

                                <div className="text-center">
                                    <button
                                        type="button"
                                        data-toggle="modal"
                                        data-target="#modalauth"
                                        className={styles.boxedBtn}
                                    >
                                        <strong>Rút</strong>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

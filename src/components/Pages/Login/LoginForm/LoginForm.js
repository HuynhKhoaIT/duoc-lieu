import styles from "./LoginForm.module.scss";

export default function LoginForm() {
    return (
        <div className={`${styles.contactForm} blue-bg pb-[500px]`}>
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-row">
                    <div className="lg:w-9/12 sm:w-7/12 mx-auto">
                        <div className={styles.contactForm}>
                            <form
                                className="text-center flex justify-center items-center flex-col"
                                action="/login"
                                method="POST"
                            >
                                <input
                                    type="hidden"
                                    name="_token"
                                    value="ayf7YVbcLZhJkEAjHeybo17VgGrkAZFlhPXWgMGZ"
                                    autoComplete="off"
                                />

                                <p className="w-full flex justify-center items-center px-1">
                                    <input
                                        type="tel"
                                        placeholder="Số điện thoại"
                                        name="phone"
                                        className="mb-0"
                                    />
                                </p>

                                <p className="w-full flex justify-center items-center px-1">
                                    <input
                                        type="password"
                                        placeholder="Mật khẩu"
                                        name="password"
                                        autoComplete="off"
                                    />
                                </p>

                                <p className="w-1/2 flex justify-center items-center px-1">
                                    <span
                                        className={`${styles.captcha} flex justify-center items-center`}
                                        style={{
                                            width: "50%",
                                            background: "#daa520 ",
                                            height: "61px",
                                        }}
                                    >
                                        <img
                                            style={{
                                                padding: "0 3px",
                                            }}
                                            src="https://duoclieuxanh.net/captcha/math?h5xVb2EA"
                                        />
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="Xác minh"
                                        name="captcha"
                                        className="w-1/2"
                                        style={{ width: "50%" }}
                                    />
                                </p>

                                <div className={styles.searchBarTablecell}>
                                    <button type="submit">Đăng nhập</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

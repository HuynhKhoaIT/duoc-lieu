import styles from "./accordion.module.scss";

export default function GtablePage() {
    return (
        <div className="my-5">
            <div className="w-full flex flex-wrap mx-auto ">
                {/* Cột trái */}
                <div className="w-full lg:w-1/3 md:w-1/2 mx-auto px-4">
                    <div className={styles["checkout-accordion-wrap"]}>
                        <div className={`${styles["accordion"]}`} id="accordion1">
                            {/* Tài khoản */}
                            <div className={`${styles["single-accordion"]} ${styles.card}`}>
                                <div id="headingOne" className={styles.cardHeader}>
                                    <h5 className="mb-0">
                                        <button
                                            className={`${styles.btnLink} ${styles.collapsed} ${styles.btn}`}
                                            type="button"
                                            data-toggle="collapse"
                                            data-target="#collapseOne"
                                            aria-expanded="true"
                                            aria-controls="collapseOne"
                                        >
                                            Tài Khoản
                                        </button>
                                    </h5>
                                </div>
                                <div
                                    id="collapseOne"
                                    aria-labelledby="headingOne"
                                    data-parent="#accordion1"
                                >
                                    <div className={styles.cardBody}>
                                        <div
                                            className={`${styles.card}`}
                                        >
                                            <div className="text-center pt-1">
                                                <span className="text-white">
                                                    Kích hoạt | Tài khoản | Đã
                                                    nhận
                                                </span>
                                                <div className="mt-2">
                                                    <div className="text-center">
                                                        <span className="text-white">
                                                            Bạn chưa tham gia
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Đăng ký */}
                            <div className={`${styles["single-accordion"]} ${styles.card}`}>
                                <div id="headingTwo" className={styles.cardHeader}>
                                    <h5 className="mb-0">
                                        <button
                                            className={`${styles.btnLink} ${styles.collapsed}`}
                                            type="button"
                                            data-toggle="collapse"
                                            data-target="#collapseTwo"
                                            aria-expanded="false"
                                            aria-controls="collapseTwo"
                                        >
                                            Đăng Ký
                                        </button>
                                    </h5>
                                </div>
                                <div
                                    id="collapseTwo"
                                    className={styles.collapse}
                                    aria-labelledby="headingTwo"
                                    data-parent="#accordion1"
                                >
                                    <div className="p-0">
                                        <div
                                            className={`${styles.card}`}
                                        >
                                            <div className="p-4">
                                                <form
                                                    action="/user/register"
                                                    method="POST"
                                                >
                                                    <input
                                                        className={styles.formControl}
                                                        type="text"
                                                        name="username"
                                                        placeholder="Tài khoản"
                                                    />
                                                    <input
                                                        className={`${styles.formControl} mt-2`}
                                                        type="text"
                                                        name="affiliate"
                                                        placeholder="Tài khoản liên kết"
                                                    />
                                                    <button
                                                        type="submit"
                                                        className={`${styles.btn}  ${styles.btnBlock} mt-3 gold-bg `}
                                                    >
                                                        OK
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tiền thưởng */}
                            <div className={`${styles["single-accordion"]} ${styles.card}`}>
                                <div id="heading3" className={styles.cardHeader}>
                                    <h5 className="mb-0">
                                        <button
                                            className={`${styles.btnLink} ${styles.collapsed}`}
                                            type="button"
                                            data-toggle="collapse"
                                            data-target="#collapse3"
                                            aria-expanded="false"
                                            aria-controls="collapse3"
                                        >
                                            Tiền Thưởng
                                        </button>
                                    </h5>
                                </div>
                                <div
                                    id="collapse3"
                                    className={styles.collapse}
                                    aria-labelledby="heading3"
                                    data-parent="#accordion1"
                                >
                                    <div className="p-0">
                                        <div
                                            className={`${styles.card}`}
                                        >
                                            <div className="pb-0 p-4">
                                                <h6 className="text-light text-center">
                                                    Tổng thưởng:{" "}
                                                    <strong
                                                        className={
                                                            "gold-text"
                                                        }
                                                    >
                                                        0
                                                    </strong>
                                                </h6>
                                                <div className="overflow-x-auto">
                                                    <table className="w-full text-sm border-collapse">
                                                        <thead
                                                            className={
                                                                styles[
                                                                    "breadcrumb-bg"
                                                                ]
                                                            }
                                                        >
                                                            <tr
                                                                className={
                                                                    styles[
                                                                        "table-head-row"
                                                                    ]
                                                                }
                                                            >
                                                                <th className="blue-text p-0">
                                                                    <strong>#</strong>
                                                                </th>
                                                                <th className="blue-text p-0">
                                                                    <strong>Số tiền</strong>
                                                                </th>
                                                                <th className="blue-text p-0">
                                                                    <strong>Nhận từ</strong>
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr
                                                                className={
                                                                    styles[
                                                                        "table-body-row"
                                                                    ]
                                                                }
                                                            >
                                                                <td
                                                                    className="text-white text-center p-0"
                                                                    colSpan="3"
                                                                >
                                                                    Chưa nhận
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <nav className="pt-3 flex justify-center">
                                                    <ul className="flex list-none gap-2"></ul>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Phiếu mua hàng */}
                            <div className={`${styles["single-accordion"]} ${styles.card}`}>
                                <div id="heading4" className={styles.cardHeader}>
                                    <h5 className="mb-0">
                                        <button
                                            className={`${styles.btnLink} ${styles.collapsed}`}
                                            type="button"
                                            data-toggle="collapse"
                                            data-target="#collapse4"
                                            aria-expanded="false"
                                            aria-controls="collapse4"
                                        >
                                            Phiếu Mua Hàng
                                        </button>
                                    </h5>
                                </div>
                                <div
                                    id="collapse4"
                                    className={styles.collapse}
                                    aria-labelledby="heading4"
                                    data-parent="#accordion1"
                                >
                                    <div className="p-0">
                                        <div
                                            className={`${styles.card}`}
                                        >
                                            <div className="pb-0 p-4">
                                                <h6 className="text-white text-center">
                                                    Khả dụng:{" "}
                                                    <strong
                                                        className={
                                                            styles["gold-text"]
                                                        }
                                                    >
                                                        0
                                                    </strong>
                                                </h6>
                                                <div className="overflow-x-auto">
                                                    <table className="w-full text-sm border-collapse">
                                                        <thead
                                                            className={
                                                                styles[
                                                                    "breadcrumb-bg"
                                                                ]
                                                            }
                                                        >
                                                            <tr
                                                                className={
                                                                    styles[
                                                                        "table-head-row"
                                                                    ]
                                                                }
                                                            >
                                                                <th className="blue-text p-0">
                                                                    <strong>#</strong>
                                                                </th>
                                                                <th className="blue-text p-0">
                                                                    <strong>Mệnh giá</strong>
                                                                </th>
                                                                <th className="blue-text p-0">
                                                                    <strong>Nhận từ</strong>
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr
                                                                className={
                                                                    styles[
                                                                        "table-body-row"
                                                                    ]
                                                                }
                                                            >
                                                                <td
                                                                    className="text-white text-center p-0"
                                                                    colSpan="3"
                                                                >
                                                                    Chưa nhận
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <nav className="pt-3 flex justify-center">
                                                    <ul className="flex list-none gap-2"></ul>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cột phải */}
                <div className="w-full lg:w-2/3 md:w-full px-4">
                    <div className={styles["checkout-accordion-wrap"]}>
                        <div className="space-y-3" id="accordion2">
                            <div className={`${styles["single-accordion"]} ${styles.card}`}>
                                <div id="headingOne" className={styles.cardHeader}>
                                    <h5 className="mb-0">
                                        <button
                                            className={`${styles.btnLink} ${styles.collapsed}`}
                                            type="button"
                                            data-toggle="collapse"
                                            data-target="#collapse1"
                                            aria-expanded="true"
                                            aria-controls="collapse1"
                                        >
                                            Bảng Thưởng
                                        </button>
                                    </h5>
                                </div>
                                <div
                                    id="collapse1"
                                    className={styles.collapse}
                                    aria-labelledby="headingOne"
                                    data-parent="#accordion2"
                                >
                                    <div className="p-0">
                                        <div
                                            className={`${styles.card}`}
                                        >
                                            <div
                                                className={`${styles.card}`}
                                            >
                                                <div className="overflow-x-auto p-5">
                                                    <table className={`${styles.bgDanger} ${styles.table} ${styles.tableBordered} w-full`}>
                                                        <tbody>
                                                            <tr>
                                                                <th
                                                                    className="text-center text-light"
                                                                    colSpan="8"
                                                                >
                                                                    <strong>
                                                                        -
                                                                    </strong>
                                                                </th>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    className="text-center text-light"
                                                                    colSpan="4"
                                                                >
                                                                    <strong>
                                                                        -
                                                                    </strong>
                                                                </td>
                                                                <td
                                                                    className="text-center text-light" 
                                                                    colSpan="4"
                                                                >
                                                                    <strong>
                                                                        -
                                                                    </strong>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    className="text-center text-light"
                                                                    colSpan="2"
                                                                >
                                                                    <strong>
                                                                        -
                                                                    </strong>
                                                                </td>
                                                                <td
                                                                    className="text-center text-light"
                                                                    colSpan="2"
                                                                >
                                                                    <strong>
                                                                        -
                                                                    </strong>
                                                                </td>
                                                                <td
                                                                    className="text-center text-light"
                                                                    colSpan="2"
                                                                >
                                                                    <strong>
                                                                        -
                                                                    </strong>
                                                                </td>
                                                                <td
                                                                    className="text-center text-light"
                                                                    colSpan="2"
                                                                >
                                                                    <strong>
                                                                        -
                                                                    </strong>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                {Array(8)
                                                                    .fill(0)
                                                                    .map(
                                                                        (
                                                                            _,
                                                                            i,
                                                                        ) => (
                                                                            <td
                                                                                key={
                                                                                    i
                                                                                }
                                                                                className="text-center text-light"
                                                                            >
                                                                                <strong>
                                                                                    -
                                                                                </strong>
                                                                            </td>
                                                                        ),
                                                                    )}
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

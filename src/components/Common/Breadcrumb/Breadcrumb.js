import styles from "./Breadcrumb.module.scss";

export default function Breadcrumb({ title }) {
    return (
        <div className={`${styles.breadcrumbSection} ${styles.breadcrumbBg}`}>
            <div className="container mx-auto px-4">
                <div className="flex justify-center">
                    <div className="lg:w-2/3 text-center">
                        <div className={styles.breadcrumbText}>
                            <p>
                                Dược Liệu Xanh <br /> An lành cho Sức khỏe
                            </p>
                            <h1 className="capitalize">{title}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

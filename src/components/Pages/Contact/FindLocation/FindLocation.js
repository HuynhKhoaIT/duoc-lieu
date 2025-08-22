import styles from "./FindLocation.module.scss";

export default function FindLocation() {
    return (
        <div className={`${styles["find-location"]} blue-bg`}>
            <div className="container mx-auto px-4">
                <div className="flex justify-center">
                    <div className="text-center w-full">
                        <p>
                            <i className="fas fa-map-marker-alt mr-2"></i> Vị
                            Trí Trên Bản Đồ
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

import Image from "next/image";

import styles from "./ProductDetail.module.scss";

export default function ProductDetail({ dataDetail }) {
    return (
        <div className="my-20">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-6 pt-5 pb-5">
                    <div className="md:w-5/12">
                        <div className={styles.singleProductImg}>
                            <div className="w-full">
                                <Image
                                    src={dataDetail?.thumbnail}
                                    alt={dataDetail?.name}
                                    width={800}
                                    height={600}
                                    className="w-full h-auto rounded-lg object-contain"
                                />
                            </div>
                            <h4
                                className={`gold-bg text-center p-3 mb-4 text-blue-600 text-lg font-semibold`}
                            >
                                {dataDetail?.name}
                            </h4>
                        </div>
                    </div>
                    <div className="md:w-7/12">
                        <div className="p-3">
                            <h5
                                className={`blue-bg gold-text p-2 text-yellow-400 font-semibold flex items-center gap-2`}
                            >
                                <i className="fas fa-check-double"></i> ĐẶC TÍNH
                            </h5>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: dataDetail?.features,
                                }}
                            />

                            <h5
                                className={`blue-bg gold-text p-2 text-yellow-400 font-semibold flex items-center gap-2 mt-4`}
                            >
                                <i className="fas fa-check-double"></i> QUY CÁCH
                            </h5>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: dataDetail?.specifications,
                                }}
                            />

                            <h5
                                className={`blue-bg  gold-text p-2 text-yellow-400 font-semibold flex items-center gap-2 mt-4`}
                            >
                                <i className="fas fa-check-double"></i> CÔNG
                                DỤNG
                            </h5>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: dataDetail?.usage,
                                }}
                            />

                            <h5
                                className={`blue-bg gold-text p-2 text-yellow-400 font-semibold flex items-center gap-2 mt-4`}
                            >
                                <i className="fas fa-check-double"></i> ĐẶC ĐIỂM
                                NỔI BẬT
                            </h5>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: dataDetail?.highlights,
                                }}
                            />

                            <h5
                                className={`blue-bg gold-text p-2 text-yellow-400 font-semibold flex items-center gap-2 mt-4`}
                            >
                                <i className="fas fa-check-double"></i> HƯỚNG
                                DẪN SỬ DỤNG
                            </h5>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: dataDetail?.instructions,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

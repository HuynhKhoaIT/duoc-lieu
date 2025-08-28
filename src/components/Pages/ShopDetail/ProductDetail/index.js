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
                                    alt={dataDetail.name}
                                    width={800}
                                    height={600}
                                    className="w-full h-auto rounded-lg object-contain"
                                />
                            </div>
                            <h4
                                className={`gold-bg text-center p-3 mb-4 text-blue-600 text-lg font-semibold`}
                            >
                                {dataDetail.name}
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
                            <p className="mt-2">
                                Chiết xuất từ dược liệu thiên nhiên, an toàn,
                                hiệu quả
                                <br />
                                Kích mọc tóc cấp độ 1
                            </p>

                            <h5
                                className={`blue-bg gold-text p-2 text-yellow-400 font-semibold flex items-center gap-2 mt-4`}
                            >
                                <i className="fas fa-check-double"></i> QUY CÁCH
                            </h5>
                            <p className="mt-2">
                                * 1 chai gội tinh chất 250g
                                <br />* 1 chai tinh dầu dưỡng mềm tóc 15ml
                            </p>

                            <h5
                                className={`blue-bg  gold-text p-2 text-yellow-400 font-semibold flex items-center gap-2 mt-4`}
                            >
                                <i className="fas fa-check-double"></i> CÔNG
                                DỤNG
                            </h5>
                            <p className="mt-2">
                                Loại bỏ các tế bào chết và nấm nguyên nhân gây
                                ra gàu, ngăn ngừa gàu hiệu quả. Giúp cân bằng độ
                                ẩm cũng như da đầu nhờn dưỡng tóc suông và bóng
                                mượt tự nhiên. Giúp giảm rụng tóc và kích thích
                                tóc mọc dày hơn
                            </p>

                            <h5
                                className={`blue-bg gold-text p-2 text-yellow-400 font-semibold flex items-center gap-2 mt-4`}
                            >
                                <i className="fas fa-check-double"></i> ĐẶC ĐIỂM
                                NỔI BẬT
                            </h5>
                            <p className="mt-2">
                                - Với hàm lượng tinh chất Hà Thủ ô và các tinh
                                dược liệu kích mọc rất đậm đặc, nên khi sử dụng
                                ban đầu vừa xả tóc người dùng sẽ có cảm giác sợi
                                tóc cứng nhẹ, Nhưng hãy an tâm, vì khi lau tóc
                                ráo, tóc sẽ dịu lại. Trường hợp nếu muốn tóc mềm
                                ngay hãy kết hợp dùng tinh dầu dưỡng.
                                <br />- Lưu ý: dùng tinh dầu dưỡng với tỉ lệ ít
                                để tóc vừa đủ mượt. Khi chúng ta dùng với lượng
                                vừa đủ tóc mềm mượt mà không hề bị bết nhé.
                            </p>

                            <h5
                                className={`blue-bg gold-text p-2 text-yellow-400 font-semibold flex items-center gap-2 mt-4`}
                            >
                                <i className="fas fa-check-double"></i> HƯỚNG
                                DẪN SỬ DỤNG
                            </h5>
                            <p className="mt-2">
                                1/ Dầu gội: Làm ướt tóc và gội như dầu gội thông
                                thường.
                                <br />
                                - Gội 2 lần để tóc sạch sâu
                                <br />
                                - Càu kỹ cho bong gàu/ tế bào chết
                                <br />
                                - Lau tóc ráo nước và thoa tinh dầu
                                <br />
                                - Sấy hoặc chải tóc
                                <br />
                                2/ Dầu dưỡng: Dùng TỐT NHẤT lúc tóc vừa ráo
                                (hoặc lúc tóc đã khô)
                                <br />
                                - Lăn đầu bi 2 vòng tròn lên lòng bàn tay
                                <br />
                                - Xoa đều cho tinh dầu lan đều khắp lòng bàn tay
                                và các ngón tay, khi thấy không còn ván dầu nào
                                trên tay
                                <br />
                                - Vuốt vào đuôi tóc và đan tay vào đuôi tóc cho
                                tinh dầu đều khắp
                                <br />
                                - Chải tóc hoặc sấy tóc
                                <br />
                                (với tóc dài hoặc nhiều thì lặp lại 2,3,4 lần)
                                <br />
                                3/ Xịt kích mọc: Có thể dùng nhiều lần trong
                                ngày
                                <br />
                                - Sử dụng khi tóc khô
                                <br />
                                - Cầm chai xịt cách da đầu tầm 5-7cm.
                                <br />- Xịt lên vùng da đầu để dược liệu thấm
                                vào nang tóc và kích mầm tóc mọc lại
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

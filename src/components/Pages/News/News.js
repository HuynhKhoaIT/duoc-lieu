import React from "react";

import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import NewsCardItem from "@/components/Common/Card/NewsCardItem";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
const newsList = [
    {
        id: 1,
        title: "Khởi Nghiệp Với N22",
        img: "/images/news/n22news.png",
        date: "05/04/2025",
        excerpt: "Rời thành thị về nông thôn khởi nghiệp từ bàn tay trắng",
    },
    {
        id: 2,
        title: "Hành trình với N22",
        img: "/images/news/n22news2.png",
        date: "05/04/2025",
        excerpt:
            "Gầy dựng thành công sản phẩm dầu gội đầu dược liệu N22 từ những nguyê...",
    },
    {
        id: 3,
        title: "Tâm huyết với N22",
        img: "/images/news/n22THHG.png",
        date: "06/04/2025",
        excerpt: "“Lửa thử vàng, gian nan thử sức” thành quả sau 22 năm mi...",
    },
    {
        id: 4,
        title: "Tâm huyết với N22",
        img: "/images/news/n22THHG.png",
        date: "06/04/2025",
        excerpt: "“Lửa thử vàng, gian nan thử sức” thành quả sau 22 năm mi...",
    },
    {
        id: 5,
        title: "Tâm huyết với N22",
        img: "/images/news/n22THHG.png",
        date: "06/04/2025",
        excerpt: "“Lửa thử vàng, gian nan thử sức” thành quả sau 22 năm mi...",
    },
];
export default function NewsPage() {
    return (
        <>
            <Breadcrumb title={"Bài viết"} />
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-[48px] mb-4">
                    {newsList.map((news) => (
                        <NewsCardItem key={news.id} news={news} />
                    ))}
                </div>
            </div>
            <LogoCarousel />
        </>
    );
}

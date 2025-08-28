"use client";
import { useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

import apiConfig from "@/constants/apiConfig";
import useListData from "@/hooks/useListData";

import styles from "./LogoCarousel.module.scss";

export default function LogoCarousel() {
    const {
        data: slides,
        loading,
        error,
        refetch,
    } = useListData(apiConfig.slide.getList);

    const [ emblaRef, emblaApi ] = useEmblaCarousel(
        { loop: true, align: "start" },
        [ Autoplay({ delay: 2000, stopOnInteraction: false }) ],
    );

    useEffect(() => {
        if (emblaApi) {
            // optional: bạn có thể debug event
            // console.log(emblaApi.slideNodes());
        }
    }, [ emblaApi ]);

    return (
        <div className={`${styles.logoCarousel} py-10`}>
            <div className="container mx-auto px-4">
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex">
                        {slides?.data?.map((logo, i) => (
                            <div
                                key={logo.id}
                                className="flex-[0_0_50%] sm:flex-[0_0_33.333%] lg:flex-[0_0_25%] px-4"
                            >
                                <div
                                    className={`${styles.singleLogo} flex justify-center`}
                                >
                                    <img
                                        src={logo.image}
                                        alt={`logo-${logo.slug}`}
                                        className="max-h-64 object-contain"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

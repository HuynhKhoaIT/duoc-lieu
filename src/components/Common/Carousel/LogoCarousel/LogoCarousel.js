"use client";

import { useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

import styles from "./LogoCarousel.module.scss";

const logos = [
    "/images/slide/bangkhen9.jpg",
    "/images/slide/bangkhen8.jpg",
    "/images/slide/bangkhen7.jpg",
    "/images/slide/bangkhen6.jpg",
    "/images/slide/bangkhen5.jpg",
    "/images/slide/bangkhen4.jpg",
    "/images/slide/bangkhen3.jpg",
    "/images/slide/bangkhen2.png",
    "/images/slide/bangkhen.png",
];

export default function LogoCarousel() {
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
                        {logos.map((logo, i) => (
                            <div
                                key={i}
                                className="flex-[0_0_50%] sm:flex-[0_0_33.333%] lg:flex-[0_0_25%] px-4"
                            >
                                <div
                                    className={`${styles.singleLogo} flex justify-center`}
                                >
                                    <img
                                        src={logo}
                                        alt={`logo-${i}`}
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

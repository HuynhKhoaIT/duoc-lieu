"use client";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

import styles from "./LogoCarousel.module.scss";

export default function LogoCarousel({ slideList }) {
    const [ emblaRef ] = useEmblaCarousel({ loop: true, align: "start" }, [
        Autoplay({ delay: 2000, stopOnInteraction: false }),
    ]);

    return (
        <div className={`${styles.logoCarousel} py-10`}>
            <div className="container mx-auto px-4">
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex">
                        {slideList?.data?.map((logo) => (
                            <div
                                key={logo.id}
                                className="flex-[0_0_50%] sm:flex-[0_0_33.333%] lg:flex-[0_0_25%] px-4"
                            >
                                <div
                                    className={`${styles.singleLogo} flex justify-center`}
                                >
                                    <div className="relative w-full max-w-[200px] h-[250px]">
                                        <Image
                                            src={logo.image}
                                            alt={`logo-${logo.slug}`}
                                            fill
                                            className="object-contain"
                                            sizes="(max-width: 640px) 50vw,
                                                   (max-width: 1024px) 33vw,
                                                   25vw"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

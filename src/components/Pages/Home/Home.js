import React from "react";

import AboutSection from "./AboutSection/AboutSection";
import Hero from "./Hero/Hero";
import LatestNews from "./LatestNews/LatestNews";
import ListSection from "./ListSection/ListSection";
import LogoCarousel from "./LogoCarousel/LogoCarousel";
import ProductSection from "./ProductSection/ProductSection";
import ShopBanner from "./ShopBanner/ShopBanner";

import styles from "./Home.module.scss";

export default function HomePage() {
    return (
        <div className={styles.homeWrapper}>
            <Hero />
            <ListSection />
            <ProductSection />
            <ShopBanner />
            <AboutSection />
            <LatestNews />
            <LogoCarousel />
        </div>
    );
}

import { useEffect, useState } from 'react';

import IconArrow from '@/assets/icons/icon-arrow-bar-to-top.svg';

import styles from './ButtonBackToTop.module.scss';
export default function ButtonBackToTop() {
    const [ isVisible, setIsVisible ] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div onClick={scrollToTop} className={styles.backToTop}>
            <IconArrow width={20} color="rgb(120, 120, 120)" />
        </div>
    );
}

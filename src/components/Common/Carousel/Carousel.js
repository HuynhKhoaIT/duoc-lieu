import { forwardRef, useEffect, useRef } from 'react';
import classNames from 'classnames';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';

import createCtx from '@/utils/create-ctx';

import styles from './Carousel.module.scss';

const [ CarouselProvider, useCarouselRef ] = createCtx('Carousel');

function Carousel({
    options,
    children,
    onInit,
    onChange,
    onScroll,
    onSettle,
    onResize,
    className,
    slidesToScroll = 1,
    slidesToShow,
    slideSpacing = '1rem',
    loop = true,
    dragFree = false,
    autoplay = true,
    breakpoints = {},
    watchDrag = true,
    active = true,
    startIndex = 0,
    ...props
}) {
    const autoplayPlugin = useRef(
        autoplay &&
            Autoplay({ delay: 10000, stopOnInteraction: false, ...autoplay }),
    );
    const [ ref, api ] = useEmblaCarousel(
        {
            loop,
            active,
            slidesToScroll,
            breakpoints,
            dragFree,
            watchDrag,
            startIndex,
            ...props,
        },
        [ autoplayPlugin.current ].filter(Boolean),
    );

    useEffect(() => {
        if (!api) return;

        const withAutoplayReset =
            (fn) =>
                (...args) => {
                    autoplay && autoplayPlugin?.current?.reset?.();
                    return fn(...args);
                };

        api.scrollTo = withAutoplayReset(api.scrollTo);
        api.scrollNext = withAutoplayReset(api.scrollNext);
        api.canScrollPrev = withAutoplayReset(api.canScrollPrev);

        onInit?.(api, autoplayPlugin.current);

        onInit && api.on('reInit', onInit);
        onChange && api.on('select', onChange);
        onScroll && api.on('scroll', onScroll);
        onSettle && api.on('settle', onSettle);
        onResize && api.on('resize', onResize);

        return () => {
            onInit && api.off('reInit', onInit);
            onChange && api.off('select', onChange);
            onScroll && api.off('scroll', onScroll);
            onSettle && api.off('settle', onSettle);
            onResize && api.off('resize', onResize);
        };
    }, [ api, autoplayPlugin, autoplay, onInit, onChange, onScroll, onSettle ]);

    useEffect(() => {
        if (!api) return;

        const handleDisableDrag = () => {
            const disableDraggable =
                api.internalEngine().scrollSnaps.length <= 1;
            const draggable = api.internalEngine().options.watchDrag === true;

            if (draggable && disableDraggable) {
                api.reInit({ watchDrag: false });
            } else if (!draggable && !disableDraggable) {
                api.reInit({ watchDrag: true });
            }
        };
        handleDisableDrag();

        api.on('resize', handleDisableDrag);
        api.on('slidesChanged', handleDisableDrag);

        return () => {
            api.off('resize', handleDisableDrag);
        };
    }, [ api ]);

    return (
        <div
            {...props}
            style={{
                '--slice-size': `${isNaN(parseInt(slidesToShow)) ? 'auto' : (1 / slidesToShow) * 100 + '%'}`,
                '--slide-spacing': slideSpacing,
            }}
            data-slides-to-show={slidesToShow}
            className={classNames(styles.root, className)}
        >
            <CarouselProvider carouselRef={ref}>{children}</CarouselProvider>
        </div>
    );
}

function Viewport({ children, className, ...props }) {
    const { carouselRef } = useCarouselRef();

    return (
        <div
            {...props}
            ref={carouselRef}
            className={classNames(classNames(styles.viewport, className))}
        >
            {children}
        </div>
    );
}

function Container({ children, className, ...props }) {
    return (
        <div {...props} className={classNames(styles.container, className)}>
            {children}
        </div>
    );
}

function Thumbs({ children, className, ...props }) {
    return (
        <div
            {...props}
            className={classNames(classNames(styles.thumbs, className))}
        >
            {children}
        </div>
    );
}

const Slide = forwardRef(({ children, className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            {...props}
            className={classNames(styles.slide, className)}
        >
            {children}
        </div>
    );
});

Slide.displayName = 'Slide';

Carousel.Viewport = Viewport;
Carousel.Container = Container;
Carousel.Slide = Slide;
Carousel.Thumbs = Thumbs;

export default Carousel;

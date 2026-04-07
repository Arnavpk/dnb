"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getStrapiMedia } from "@/lib/strapi";

// ─── Fallback slides — used when Strapi has no slides yet ─────────────────────
const FALLBACK_SLIDES = [
    {
        id: 1,
        href: "/book/power-card/",
        alt: "Recharge 999 Offer",
        desktopImage: "https://daveandbustersindia.com/wp-content/uploads/2025/11/Recharge999.jpg",
        mobileImage: "https://daveandbustersindia.com/wp-content/uploads/2025/11/Reacharge999-mob.jpg",
        ctaLabel: null,
        _isFallback: true,
    },
    {
        id: 2,
        href: "/book/power-card/",
        alt: "Wednesday Offer",
        desktopImage: "https://daveandbustersindia.com/wp-content/uploads/2025/03/Wednesday-Offer-Desk.jpg",
        mobileImage: "https://daveandbustersindia.com/wp-content/uploads/2025/03/Wednesday-Offer-Mob.jpg",
        ctaLabel: null,
        _isFallback: true,
    },
    {
        id: 3,
        href: "/book/power-card/",
        alt: "Happy Hours Banner",
        desktopImage: "https://daveandbustersindia.com/wp-content/uploads/2026/01/Happy-Hours-Banner-Dekstop-Size.jpg",
        mobileImage: "https://daveandbustersindia.com/wp-content/uploads/2026/01/Happy-Hours-Banner-Phone-Size.jpg",
        ctaLabel: null,
        _isFallback: true,
    },
    {
        id: 4,
        href: "/book/power-card/",
        alt: "Eat Drink Play Combo",
        desktopImage: "https://daveandbustersindia.com/wp-content/uploads/2025/07/Eat-Drink-Play-Combo-Banner.jpg",
        mobileImage: "https://daveandbustersindia.com/wp-content/uploads/2025/07/Eat-Drink-Play-Combo-Banner-Phone-Size.jpg",
        ctaLabel: null,
        _isFallback: true,
    },
    {
        id: 5,
        href: "/book/power-card/",
        alt: "Power Card Offer",
        desktopImage: "https://daveandbustersindia.com/wp-content/uploads/2024/12/1440x480_1.png",
        mobileImage: "https://daveandbustersindia.com/wp-content/uploads/2024/12/430x720_1.png",
        ctaLabel: null,
        _isFallback: true,
    },
    {
        id: 6,
        href: "/book/power-card/",
        alt: "America's Biggest Hub in India",
        desktopImage: "https://daveandbustersindia.com/wp-content/uploads/2025/01/Americas-Biggest-Hub-in-India-banner.png",
        mobileImage: "https://daveandbustersindia.com/wp-content/uploads/2025/01/America-Biggest-hub-in-India.png",
        ctaLabel: null,
        _isFallback: true,
    },
    {
        id: 7,
        href: "/book/power-card/",
        alt: "Special Offer",
        desktopImage: "https://daveandbustersindia.com/wp-content/uploads/2024/12/1440x480_3.png",
        mobileImage: "https://daveandbustersindia.com/wp-content/uploads/2024/12/430x720_3.png",
        ctaLabel: null,
        _isFallback: true,
    },
];

// ─── Static config ────────────────────────────────────────────────────────────
const AUTOPLAY_DELAY = 4000;
const TRANSITION_SPEED = 700;

// Transparent 1×1 pixel placeholder — shown when Strapi image not uploaded yet
const PLACEHOLDER = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

// ─── Normalize a Strapi slide OR fallback into a unified shape ────────────────
// Strapi carousel-slide schema:
//   { title, subtitle, desktop_image(media), mobile_image(media), cta_text, cta_link }
// Maps to: { id, desktopImage, mobileImage, href, alt, ctaLabel }
function normalizeSlide(slide, index) {
    // Already a fallback slide — pass through unchanged
    if (slide._isFallback) return slide;

    // desktop_image — single media field (required in schema)
    const desktopImage = getStrapiMedia(slide.desktop_image) ?? PLACEHOLDER;

    // mobile_image — single media field (optional)
    // Falls back to desktop image if not uploaded in Strapi
    const mobileImage = getStrapiMedia(slide.mobile_image) ?? desktopImage;

    return {
        id: slide.id ?? index,
        href: slide.cta_link ?? "#",
        alt: slide.title ?? slide.subtitle ?? `Slide ${index + 1}`,
        desktopImage,
        mobileImage,
        ctaLabel: slide.cta_text ?? null,
    };
}

// ─── HeroSlider ───────────────────────────────────────────────────────────────
// Props:
//   slides — Strapi carousel-slide[] from getCarouselSection() in page.js
//            Falls back to FALLBACK_SLIDES if Strapi has no slides yet
export default function HeroSlider({ slides: strapiSlides = [] }) {
    // Use Strapi slides if available, otherwise fall back to hardcoded set
    const rawSlides = strapiSlides.length > 0 ? strapiSlides : FALLBACK_SLIDES;
    const slides = rawSlides.map(normalizeSlide);
    const total = slides.length;

    const [current, setCurrent] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const timerRef = useRef(null);

    const goTo = useCallback(
        (index) => {
            if (isTransitioning) return;
            setIsTransitioning(true);
            setCurrent((index + total) % total);
            setTimeout(() => setIsTransitioning(false), TRANSITION_SPEED);
        },
        [isTransitioning, total]
    );

    const next = useCallback(() => goTo(current + 1), [current, goTo]);
    const prev = useCallback(() => goTo(current - 1), [current, goTo]);

    // Autoplay
    useEffect(() => {
        if (isPaused) return;
        timerRef.current = setInterval(next, AUTOPLAY_DELAY);
        return () => clearInterval(timerRef.current);
    }, [next, isPaused]);

    // Keyboard navigation
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [next, prev]);

    return (
        <section
            className="relative w-full overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            aria-label="Hero Slideshow"
        >
            {/* ── Slides ─────────────────────────────────────────────────── */}
            <div className="relative w-full">
                {slides.map((slide, index) => {
                    const isActive = index === current;
                    return (
                        <div
                            key={slide.id}
                            className={`w-full transition-opacity ease-in-out ${isActive ? "opacity-100 relative" : "opacity-0 absolute inset-0"
                                }`}
                            style={{ transitionDuration: `${TRANSITION_SPEED}ms` }}
                            role="group"
                            aria-label={`Slide ${index + 1} of ${total}`}
                            aria-hidden={!isActive}
                        >
                            <Link href={slide.href} className="block relative w-full">
                                <picture>
                                    {/* Mobile image — upload mobile_image in Strapi for this source */}
                                    <source srcSet={slide.mobileImage} media="(max-width: 767px)" />
                                    {/* Desktop image — always required in Strapi */}
                                    <img
                                        src={slide.desktopImage}
                                        alt={slide.alt}
                                        className="w-full md:max-h-[520px] md:object-cover"
                                        loading={index === 0 ? "eager" : "lazy"}
                                        draggable={false}
                                    />
                                </picture>

                                {/* Gradient overlay */}
                                <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        background:
                                            "linear-gradient(to right, rgba(13,27,64,0.55) 0%, rgba(0,0,0,0.08) 60%, transparent 100%)",
                                    }}
                                />

                                {/* Optional CTA button — only shown if cta_text is set in Strapi */}
                                {slide.ctaLabel && (
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="container mx-auto px-4 xl:px-8">
                                            <div className="xl:w-1/2">
                                                <span className="inline-block mt-4 px-6 py-3 rounded-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-sm uppercase tracking-widest transition-colors">
                                                    {slide.ctaLabel}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </Link>
                        </div>
                    );
                })}
            </div>

            {/* ── Navigation ─────────────────────────────────────────────── */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4">
                <button
                    onClick={prev}
                    aria-label="Previous slide"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-black hover:bg-yellow-400 transition shadow-md"
                >
                    <ChevronLeft size={18} strokeWidth={2.5} />
                </button>

                <div className="flex items-center gap-2">
                    {slides.map((slide, index) => (
                        <button
                            key={slide.id}
                            onClick={() => goTo(index)}
                            aria-label={`Go to slide ${index + 1}`}
                            className={`transition-all duration-300 rounded-full ${index === current
                                    ? "w-8 h-2.5 bg-yellow-400"
                                    : "w-2.5 h-2.5 bg-white/70"
                                }`}
                        />
                    ))}
                </div>

                <button
                    onClick={next}
                    aria-label="Next slide"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-black hover:bg-yellow-400 transition shadow-md"
                >
                    <ChevronRight size={18} strokeWidth={2.5} />
                </button>
            </div>
        </section>
    );
}
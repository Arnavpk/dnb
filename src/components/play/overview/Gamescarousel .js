"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    slides: [
        {
            id: "nba",
            image: {
                src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/NBA.jpg",
                alt: "Person playing an NBA Superstars basketball arcade game at Dave & Buster's.",
            },
            title: "NBA Superstars",
            description:
                "Step onto the court with NBA Superstars! This high-energy, 3-on-3 basketball game features an impressive roster of 120 NBA players, including legends like LeBron James and Stephen Curry.",
        },
        {
            id: "halo",
            image: {
                src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/Halo.jpg",
                alt: "Young man with glasses playing a light gun arcade game at Dave & Buster's.",
            },
            title: "Halo",
            description:
                "Set in the timeframe of Halo: Combat Evolved, this arcade experience hot-drops Fireteam Raven onto Alpha Halo. Fight alongside the Master Chief to prevent the Covenant from taking control. 4-Player action only adds to the fun!",
        },
        {
            id: "godzilla-vr",
            image: {
                src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/virtual-reality.jpg",
                alt: "Woman smiling while playing a VR racing game at Dave & Buster's, surrounded by neon lights",
            },
            title: "Godzilla VR",
            description:
                "Strap on your headset and step into Godzilla VR for an adrenaline-fueled adventure! With stunning 360° visuals and fully immersive sound, this experience puts you right in the heart of the chaos.",
        },
    ],
    // Desktop: 3 slides visible. Tablet/mobile: 1 slide.
    desktopVisible: 3,
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function GamesCarousel() {
    const [current, setCurrent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const total = content.slides.length;
    const timerRef = useRef(null);

    // On desktop (3 visible), disable looping navigation beyond bounds
    const [visibleCount, setVisibleCount] = useState(1);

    useEffect(() => {
        const update = () => {
            setVisibleCount(window.innerWidth >= 992 ? 3 : 1);
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    const maxIndex = Math.max(0, total - visibleCount);

    const next = useCallback(() => {
        setCurrent((c) => (c >= maxIndex ? 0 : c + 1));
    }, [maxIndex]);

    const prev = useCallback(() => {
        setCurrent((c) => (c <= 0 ? maxIndex : c - 1));
    }, [maxIndex]);

    // Keyboard navigation
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [next, prev]);

    return (
        <section
            className="pt-4 pb-0"
        // style={{
        //     background:
        //         "linear-gradient(135deg, #0d1b40 0%, #1a2f6e 60%, #0d1b40 100%)",
        // }}
        >
            <div className="container mx-auto px-4 xl:px-8">
                {/* ── Carousel track wrapper ───────────────────────────────────── */}
                <div
                    className="relative"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Overflow clip */}
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{
                                transform: `translateX(calc(-${current} * (100% / ${visibleCount}) - ${current} * (${visibleCount > 1 ? "20px" : "0px"})))`,
                            }}
                        >
                            {content.slides.map((slide) => (
                                <div
                                    key={slide.id}
                                    className="shrink-0 px-3"
                                    style={{ width: `calc(100% / ${visibleCount})` }}
                                    role="group"
                                    aria-label={slide.title}
                                >
                                    {/* Card */}
                                    <div className="flex flex-col h-full">
                                        {/* Image */}
                                        <div className="rounded-3xl overflow-hidden">
                                            <img
                                                src={slide.image.src}
                                                alt={slide.image.alt}
                                                className="w-full h-56 sm:h-64 object-cover transition-transform duration-500 hover:scale-105"
                                                loading="lazy"
                                                draggable={false}
                                            />
                                        </div>

                                        {/* Text area */}
                                        <div className="p-5 text-center">
                                            <h4 className="text-[#15189a] font-bold text-lg leading-snug">
                                                {slide.title}
                                            </h4>
                                            <p className="mt-2 text-black text-sm leading-relaxed">
                                                {slide.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Prev / Next buttons ──────────────────────────────────────── */}
                    <button
                        onClick={prev}
                        aria-label="Previous slide"
                        className="absolute left-0 top-1/3 -translate-y-1/2 -translate-x-3
                       flex items-center justify-center w-9 h-9 rounded-full
                       bg-[#15189a] border border-white text-white
                       transition-colors shadow-md z-10"
                    >
                        <ChevronLeft size={16} strokeWidth={2.5} />
                    </button>

                    <button
                        onClick={next}
                        aria-label="Next slide"
                        className="absolute right-0 top-1/3 -translate-y-1/2 translate-x-3
                       flex items-center justify-center w-9 h-9 rounded-full
                       bg-[#15189a] border border-white text-white
                       transition-colors shadow-md z-10"
                    >
                        <ChevronRight size={16} strokeWidth={2.5} />
                    </button>
                </div>

                {/* ── Dot pagination (mobile only) ─────────────────────────────── */}
                <div className="flex lg:hidden justify-center gap-2 mt-5">
                    {content.slides.map((slide, i) => (
                        <button
                            key={slide.id}
                            onClick={() => setCurrent(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            className={`rounded-full transition-all duration-300 ${i === current
                                ? "w-6 h-2.5 bg-yellow-400"
                                : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    heading: "CORE GAMES",
    subheading:
        "No matter who's ready for fun, there's something for everyone. Whether it's the classics or the newest arcade games in our collection, everyone in your group will have a blast!",
    slides: [
        {
            id: "nba",
            image: {
                src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/NBA.jpg",
                alt: "Person playing an NBA Superstars basketball arcade game at Dave & Buster's.",
            },
            title: "NBA Super Stars",
            description: null,
        },
        {
            id: "halo",
            image: {
                src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/Halo.jpg",
                alt: "Young man with glasses playing a light gun arcade game at Dave & Buster's.",
            },
            title: "Halo",
            description: null,
        },
        {
            id: "godzilla-vr",
            image: {
                src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/virtual-reality.jpg",
                alt: "Woman smiling while playing a VR racing game at Dave & Buster's, surrounded by neon lights",
            },
            title: "Godzilla VR",
            description: null,
        },
    ],
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CoreGames() {
    const [current, setCurrent] = useState(0);
    const [visibleCount, setVisibleCount] = useState(1);
    const total = content.slides.length;

    useEffect(() => {
        const update = () =>
            setVisibleCount(window.innerWidth >= 992 ? 3 : 1);
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    const maxIndex = Math.max(0, total - visibleCount);

    const next = useCallback(
        () => setCurrent((c) => (c >= maxIndex ? 0 : c + 1)),
        [maxIndex]
    );
    const prev = useCallback(
        () => setCurrent((c) => (c <= 0 ? maxIndex : c - 1)),
        [maxIndex]
    );

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [next, prev]);

    return (
        <section className="bg-[#f5f5f5] mx-0 lg:mx-5 pt-8 pb-10 mb-10 rounded-2xl">
            {/* ── Section header ───────────────────────────────────────────────── */}
            <div className="container mx-auto px-4 xl:px-8 mb-6">
                <div className="text-center">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-[#ff6f00] uppercase tracking-tight mb-3">
                        {content.heading}
                    </h1>
                    <p className="text-black text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
                        {content.subheading}
                    </p>
                </div>
            </div>

            {/* ── Carousel ─────────────────────────────────────────────────────── */}
            <div className="container mx-auto px-4 xl:px-8">
                <div className="relative">
                    {/* Track */}
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{
                                transform: `translateX(calc(-${current} * (100% / ${visibleCount}) - ${current * (visibleCount > 1 ? 20 : 0)
                                    }px))`,
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
                                    <div className="flex flex-col h-full">
                                        {/* Image */}
                                        <div className="rounded-3xl overflow-hidden shadow-md">
                                            <img
                                                src={slide.image.src}
                                                alt={slide.image.alt}
                                                className="w-full h-56 sm:h-64 object-cover transition-transform duration-500 hover:scale-105"
                                                loading="lazy"
                                                draggable={false}
                                            />
                                        </div>

                                        {/* Title */}
                                        <div className="p-5 text-center">
                                            <h4 className="text-[#15189a] font-bold text-lg leading-snug">
                                                {slide.title}
                                            </h4>
                                            {slide.description && (
                                                <p className="mt-2 text-gray-500 text-sm leading-relaxed">
                                                    {slide.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Prev / Next */}
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

                {/* Dot pagination — mobile only */}
                <div className="flex lg:hidden justify-center gap-2 mt-5">
                    {content.slides.map((slide, i) => (
                        <button
                            key={slide.id}
                            onClick={() => setCurrent(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            className={`rounded-full transition-all duration-300 ${i === current
                                ? "w-6 h-2.5 bg-[#15189a]"
                                : "w-2.5 h-2.5 bg-gray-400"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
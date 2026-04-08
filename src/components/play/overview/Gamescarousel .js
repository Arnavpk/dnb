"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getStrapiMedia } from "@/lib/strapi";

const FALLBACK_SLIDES = [
    {
        id: "nba",
        imageSrc: "https://daveandbustersindia.com/wp-content/uploads/2025/04/NBA.jpg",
        imageAlt: "NBA Superstars",
        title: "NBA Superstars",
        description: "Step onto the court with NBA Superstars! High-energy 3-on-3 basketball featuring 120 NBA players.",
    },
    {
        id: "halo",
        imageSrc: "https://daveandbustersindia.com/wp-content/uploads/2025/04/Halo.jpg",
        imageAlt: "Halo Arcade",
        title: "Halo",
        description: "Fight alongside the Master Chief to prevent the Covenant from taking control. 4-Player action!",
    },
    {
        id: "godzilla-vr",
        imageSrc: "https://daveandbustersindia.com/wp-content/uploads/2025/04/virtual-reality.jpg",
        imageAlt: "Godzilla VR",
        title: "Godzilla VR",
        description: "Strap on your headset for an adrenaline-fueled adventure with stunning 360° visuals.",
    },
];

// Normalize Strapi shared.carousel → slides shape
// carousel-slide: { title, subtitle(used as description), desktop_image }
function normalizeSlides(strapiSection) {
    if (!strapiSection?.slides?.length) return FALLBACK_SLIDES;
    return strapiSection.slides.map((slide, index) => ({
        id: slide.id ?? index,
        imageSrc: slide.desktop_image ? getStrapiMedia(slide.desktop_image) ?? "" : "",
        imageAlt: slide.title ?? "",
        title: slide.title ?? "",
        // subtitle field used as description for game cards
        description: slide.subtitle ?? "",
    }));
}

// Props:
//   section — shared.carousel from getCarouselSection(sections)
export default function GamesCarousel({ section }) {
    const slides = normalizeSlides(section);
    const [current, setCurrent] = useState(0);
    const [visibleCount, setVisibleCount] = useState(1);
    const total = slides.length;

    useEffect(() => {
        const update = () => setVisibleCount(window.innerWidth >= 992 ? 3 : 1);
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    const maxIndex = Math.max(0, total - visibleCount);
    const next = useCallback(() => setCurrent((c) => (c >= maxIndex ? 0 : c + 1)), [maxIndex]);
    const prev = useCallback(() => setCurrent((c) => (c <= 0 ? maxIndex : c - 1)), [maxIndex]);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [next, prev]);

    return (
        <section className="pt-4 pb-0">
            <div className="container mx-auto px-4 xl:px-8">
                <div className="relative" >
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{
                                transform: `translateX(calc(-${current} * (100% / ${visibleCount}) - ${current} * (${visibleCount > 1 ? "20px" : "0px"})))`,
                            }}
                        >
                            {slides.map((slide) => (
                                <div
                                    key={slide.id}
                                    className="shrink-0 px-3"
                                    style={{ width: `calc(100% / ${visibleCount})` }}
                                    role="group"
                                    aria-label={slide.title}
                                >
                                    <div className="flex flex-col h-full">
                                        <div className="rounded-3xl overflow-hidden">
                                            {slide.imageSrc ? (
                                                <img
                                                    src={slide.imageSrc} alt={slide.imageAlt}
                                                    className="w-full h-56 sm:h-64 object-cover transition-transform duration-500 hover:scale-105"
                                                    loading="lazy" draggable={false}
                                                />
                                            ) : (
                                                <div className="w-full h-56 sm:h-64 bg-gray-200" />
                                            )}
                                        </div>
                                        <div className="p-5 text-center">
                                            <h4 className="text-[#15189a] font-bold text-lg leading-snug">{slide.title}</h4>
                                            <p className="mt-2 text-black text-sm leading-relaxed">{slide.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button onClick={prev} aria-label="Previous slide"
                        className="absolute left-0 top-1/3 -translate-y-1/2 -translate-x-3 flex items-center justify-center w-9 h-9 rounded-full bg-[#15189a] border border-white text-white transition-colors shadow-md z-10">
                        <ChevronLeft size={16} strokeWidth={2.5} />
                    </button>
                    <button onClick={next} aria-label="Next slide"
                        className="absolute right-0 top-1/3 -translate-y-1/2 translate-x-3 flex items-center justify-center w-9 h-9 rounded-full bg-[#15189a] border border-white text-white transition-colors shadow-md z-10">
                        <ChevronRight size={16} strokeWidth={2.5} />
                    </button>
                </div>

                <div className="flex lg:hidden justify-center gap-2 mt-5">
                    {slides.map((slide, i) => (
                        <button key={slide.id} onClick={() => setCurrent(i)} aria-label={`Go to slide ${i + 1}`}
                            className={`rounded-full transition-all duration-300 ${i === current ? "w-6 h-2.5 bg-yellow-400" : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
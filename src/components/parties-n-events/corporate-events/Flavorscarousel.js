"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getStrapiMedia } from "@/lib/strapi";

export default function FlavorsCarousel({ section }) {
    const heading = section?.title ?? "Flavors You Won't Forget";
    const subheading = section?.subtitle ?? "Enjoy mouthwatering food, signature drinks, and a massive selection of epic games, all under one roof.";
    const slides = section?.slides ?? [];

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

    if (!slides.length) return null;

    return (
        <section className="bg-[#f7f7f7] mx-0 lg:mx-5 pt-6 pb-6 rounded-2xl">
            <div className="container mx-auto px-4 xl:px-8 mb-6">
                <div className="text-center">
                    <h3 className="text-3xl md:text-4xl font-extrabold text-[#ff6f00] uppercase tracking-tight mb-3 font-din">
                        {heading}
                    </h3>
                    <p className="text-black text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
                        {subheading}
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 xl:px-8">
                <div className="relative">
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{
                                transform: `translateX(calc(-${current} * (100% / ${visibleCount}) - ${current * (visibleCount > 1 ? 20 : 0)}px))`,
                            }}
                        >
                            {slides.map((slide, index) => {
                                const image = getStrapiMedia(slide.desktop_image) ?? getStrapiMedia(slide.image);
                                return (
                                    <div
                                        key={slide.id ?? index}
                                        className="shrink-0 px-3"
                                        style={{ width: `calc(100% / ${visibleCount})` }}
                                        role="group"
                                        aria-label={slide.title}
                                    >
                                        <div className="flex flex-col h-full">
                                            <div className="rounded-[24px] overflow-hidden shadow-md">
                                                <img
                                                    src={image}
                                                    alt={slide.title}
                                                    className="w-full h-56 sm:h-64 object-cover transition-transform duration-500 hover:scale-105"
                                                    loading="lazy"
                                                    draggable={false}
                                                />
                                            </div>
                                            <div className="p-5 text-center">
                                                <h4 className="text-[#15189a] font-bold text-lg leading-snug font-din">
                                                    {slide.title}
                                                </h4>
                                                {slide.subtitle && (
                                                    <p className="mt-2 text-black text-sm leading-relaxed">
                                                        {slide.subtitle}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
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
                        <button key={slide.id ?? i} onClick={() => setCurrent(i)} aria-label={`Go to slide ${i + 1}`}
                            className={`rounded-full transition-all duration-300 ${i === current ? "w-6 h-2.5 bg-[#ff6f00]" : "w-2.5 h-2.5 bg-[#a8a8a8] hover:bg-[#717580]"}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
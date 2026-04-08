"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getStrapiMedia, blocksToText } from "@/lib/strapi";

const FALLBACK = {
    headline: "Your Pool Game, Upgraded",
    body: "Meet Immersive Pool, where the classic pool table game gets a modern tech glow-up. Step into augmented reality magic with ultra-bright visuals and immersive sound effects.",
    imageSrc: "https://daveandbustersindia.com/wp-content/uploads/2025/04/pool.jpg",
    imageAlt: "Glowing pool table at Dave & Buster's",
    ctaLabel: "Start Your Planning",
    ctaHref: "/book/game-bookings",
    imageLeft: false,
};

// Props:
//   section — shared.text-image-section from getTextImageSections(sections)[0]
export default function PoolPromo({ section }) {
    const headline = section?.title || FALLBACK.headline;
    const body = section?.description ? blocksToText(section.description) : FALLBACK.body;
    const imageSrc = section?.image ? getStrapiMedia(section.image) ?? FALLBACK.imageSrc : FALLBACK.imageSrc;
    const imageAlt = section?.title || FALLBACK.imageAlt;
    const ctaLabel = section?.cta_text || FALLBACK.ctaLabel;
    const ctaHref = section?.cta_link || FALLBACK.ctaHref;
    const imageLeft = section?.image_position === "left";

    return (
        <section className="py-16 md:py-20">
            <div className="container mx-auto px-4 xl:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    {/* Image */}
                    <div className={`order-1 ${imageLeft ? "lg:order-1" : "lg:order-2"}`}>
                        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                            {imageSrc ? (
                                <img src={imageSrc} alt={imageAlt}
                                    className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                                    loading="lazy" draggable={false} />
                            ) : (
                                <div className="w-full aspect-[4/3] bg-gray-200 rounded-3xl" />
                            )}
                        </div>
                    </div>

                    {/* Text */}
                    <div className={`order-2 ${imageLeft ? "lg:order-2" : "lg:order-1"}`}>
                        <h3 className="text-2xl md:text-3xl font-extrabold text-[#15189a] uppercase leading-tight">
                            {headline}
                        </h3>
                        <div className="mt-4 space-y-3">
                            {body.split("\n\n").map((para, i) => (
                                <p key={i} className="text-black text-sm md:text-base leading-relaxed">{para}</p>
                            ))}
                        </div>
                        {ctaLabel && (
                            <div className="flex flex-wrap gap-3 mt-6">
                                <Link href={ctaHref}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-bold uppercase tracking-wide transition-colors"
                                    style={{ background: "linear-gradient(180deg, #040651, #15189a)" }}>
                                    {ctaLabel}
                                    <ArrowRight size={14} strokeWidth={2.5} />
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
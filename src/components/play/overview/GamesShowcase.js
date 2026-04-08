"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getStrapiMedia, blocksToText } from "@/lib/strapi";

const FALLBACK_ROWS = [
    {
        id: "arcade", imageLeft: true,
        headline: "ARCADE",
        body: "It's hard to beat the thrill of joystick flicking. Our arcade is packed with classic and modern arcade games.",
        imageSrc: "https://daveandbustersindia.com/wp-content/uploads/2025/04/arcade.jpg",
        imageAlt: "Arcade games at Dave & Buster's",
        ctaLabel: "Book Now", ctaHref: "/book/power-card/",
    },
    {
        id: "vr", imageLeft: false,
        headline: "VIRTUAL REALITY GAMES",
        body: "In virtual reality games, you're the hero. And everyone in that world is counting on you.",
        imageSrc: "https://daveandbustersindia.com/wp-content/uploads/2025/04/virtual-reality.jpg",
        imageAlt: "VR games at Dave & Buster's",
        ctaLabel: "Book Now", ctaHref: "/book/power-card/",
    },
    {
        id: "darts", imageLeft: true,
        headline: "HI-TECH DARTS",
        body: "Time to take your best shot! Hi-Tech Darts brings competition, strategy, and fun all in one.",
        imageSrc: "https://daveandbustersindia.com/wp-content/uploads/2025/04/DARTS.jpg",
        imageAlt: "Darts at Dave & Buster's",
        ctaLabel: "Book Now", ctaHref: "/book/game-bookings",
    },
    {
        id: "bowling", imageLeft: false,
        headline: "NITRO BOWLING",
        body: "Step into the future with Nitro Bowling. Watch your lanes come alive with mesmerizing visuals.",
        imageSrc: "https://daveandbustersindia.com/wp-content/uploads/2025/04/Bowling.jpg",
        imageAlt: "Bowling at Dave & Buster's",
        ctaLabel: "Book Now", ctaHref: "/book/game-bookings",
    },
    {
        id: "pool", imageLeft: true,
        headline: "IMMERSIVE POOL",
        body: "Meet Immersive Pool: where classic pool gets a tech glow-up with augmented reality magic.",
        imageSrc: "https://daveandbustersindia.com/wp-content/uploads/2025/04/pool.jpg",
        imageAlt: "Pool at Dave & Buster's",
        ctaLabel: "Book Now", ctaHref: "/book/game-bookings",
    },
];

// Normalize Strapi shared.text-image-section → row shape
function normalizeRow(section, index) {
    if (section._isFallback) return section;
    return {
        id: section.id ?? index,
        imageLeft: section.image_position === "left",
        headline: section.title ?? "",
        body: section.description ? blocksToText(section.description) : "",
        imageSrc: section.image ? getStrapiMedia(section.image) ?? "" : "",
        imageAlt: section.title ?? "",
        ctaLabel: section.cta_text ?? null,
        ctaHref: section.cta_link ?? "#",
    };
}

function GameRow({ row, isLast }) {
    const imageContent = (
        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            {row.imageSrc ? (
                <img
                    src={row.imageSrc} alt={row.imageAlt}
                    className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy" draggable={false}
                />
            ) : (
                <div className="w-full aspect-[4/3] bg-gray-200 rounded-3xl" />
            )}
        </div>
    );

    const textContent = (
        <div className="flex flex-col justify-center h-full">
            <h3 className="text-2xl md:text-3xl font-extrabold text-[#15189a] uppercase leading-tight">
                {row.headline}
            </h3>
            <p className="mt-4 text-black text-sm md:text-base leading-relaxed">
                {row.body}
            </p>
            {row.ctaLabel && row.ctaHref && (
                <div className="flex flex-wrap gap-3 mt-6">
                    <Link
                        href={row.ctaHref}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-bold uppercase tracking-wide transition-colors"
                        style={{ background: "linear-gradient(180deg, #040651, #15189a)" }}
                    >
                        {row.ctaLabel}
                        <ArrowRight size={14} strokeWidth={2.5} />
                    </Link>
                </div>
            )}
        </div>
    );

    return (
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${isLast ? "" : "mb-16 sm:mb-14"}`}>
            <div className={`order-1 ${row.imageLeft ? "lg:order-1" : "lg:order-2"}`}>{imageContent}</div>
            <div className={`order-2 ${row.imageLeft ? "lg:order-2" : "lg:order-1"}`}>{textContent}</div>
        </div>
    );
}

// Props:
//   rows — shared.text-image-section[] from getTextImageSections(sections)
export default function GamesShowcase({ rows: strapiRows = [] }) {
    const rawRows = strapiRows.length > 0 ? strapiRows : FALLBACK_ROWS;
    const rows = rawRows.map(normalizeRow);

    return (
        <section className="py-16 md:py-20">
            <div className="container mx-auto px-4 xl:px-8">
                {rows.map((row, index) => (
                    <GameRow key={row.id} row={row} isLast={index === rows.length - 1} />
                ))}
            </div>
        </section>
    );
}
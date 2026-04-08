"use client";

import { getStrapiMedia, blocksToText } from "@/lib/strapi";

function HistoryRow({ row, isLast }) {
    const imageLeft = row.image_position === "left";
    return (
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${isLast ? "" : "mb-16 sm:mb-14"}`}>
            <div className={`order-1 ${imageLeft ? "lg:order-1" : "lg:order-2"}`}>
                <div className="relative overflow-hidden rounded-[24px] shadow-2xl">
                    <img
                        src={row.image}
                        alt={row.title}
                        className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                        draggable={false}
                    />
                </div>
            </div>
            <div className={`order-2 ${imageLeft ? "lg:order-2" : "lg:order-1"}`}>
                <h3 className="text-2xl md:text-3xl font-extrabold text-[#15189a] uppercase leading-tight font-din">
                    {row.title}
                </h3>
                <p className="mt-4 text-black text-sm md:text-base leading-relaxed">
                    {row.body}
                </p>
            </div>
        </div>
    );
}

export default function HistoryTimeline({ sections = [] }) {
    const rows = sections.map((s) => ({
        title: s.title ?? "",
        body: blocksToText(s.description),
        image: getStrapiMedia(s.image) ?? "",
        image_position: s.image_position ?? "right",
    }));

    if (!rows.length) return null;

    return (
        <section className="py-16 md:py-20">
            <div className="container mx-auto px-4 xl:px-8">
                {rows.map((row, index) => (
                    <HistoryRow
                        key={index}
                        row={row}
                        isLast={index === rows.length - 1}
                    />
                ))}
            </div>
        </section>
    );
}
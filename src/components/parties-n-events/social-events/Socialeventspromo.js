"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getStrapiMedia, blocksToText } from "@/lib/strapi";

const FALLBACK_ROWS = [
    {
        id: 0, imageLeft: true,
        headline: "Laugh-out-loud events!",
        body: "We are one of the most exciting party places in Bangalore. Whether you are planning a massive group party or intimate social gatherings, we have the perfect space and a chef-crafted menu to match.",
        imageSrc: "https://daveandbustersindia.com/wp-content/uploads/2025/04/Laugh-out-loud-events-1.jpg",
        imageAlt: "Friends celebrating at Dave & Buster's",
        ctaLabel: "Get Event Guide", ctaHref: "/bangalore/bookings/",
    },
    {
        id: 1, imageLeft: false,
        headline: "NO HANGRY HANGS HERE",
        body: "Friends don't let friends get hangry. Keep the BFF energy alive and order our tasty Party Platters for everyone to enjoy.",
        imageSrc: "https://daveandbustersindia.com/wp-content/uploads/2025/04/NO-HANGRY-HANGS-1.jpg",
        imageAlt: "Friends enjoying food at Dave & Buster's",
        ctaLabel: "View Our Platter Menu", ctaHref: "/menus/DNB_Food_Menus.pdf",
    },
];

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

function SocialRow({ row, isLast }) {
    return (
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${isLast ? "" : "mb-16 sm:mb-14"}`}>
            <div className={`order-1 ${row.imageLeft ? "lg:order-1" : "lg:order-2"}`}>
                <div className="relative overflow-hidden rounded-[24px] shadow-2xl">
                    {row.imageSrc ? (
                        <img src={row.imageSrc} alt={row.imageAlt}
                            className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                            loading="lazy" draggable={false} />
                    ) : (
                        <div className="w-full aspect-[4/3] bg-gray-200 rounded-3xl" />
                    )}
                </div>
            </div>
            <div className={`order-2 ${row.imageLeft ? "lg:order-2" : "lg:order-1"}`}>
                <h3 className="text-2xl md:text-3xl font-extrabold text-[#15189a] uppercase leading-tight">
                    {row.headline}
                </h3>
                <p className="mt-4 text-black text-sm md:text-base leading-relaxed">{row.body}</p>
                {row.ctaLabel && (
                    <div className="flex flex-wrap gap-3 mt-6">
                        <Link href={row.ctaHref}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-bold uppercase tracking-wide transition-all duration-300"
                            style={{ background: "linear-gradient(to bottom, #15189a, #040651)" }}
                            onMouseEnter={(e) => e.currentTarget.style.background = "linear-gradient(to bottom, #040651, #15189a)"}
                            onMouseLeave={(e) => e.currentTarget.style.background = "linear-gradient(to bottom, #15189a, #040651)"}
                        >
                            {row.ctaLabel}
                            <ArrowRight size={14} strokeWidth={2.5} />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

// Props:
//   rows — shared.text-image-section[] from getTextImageSections(sections)
export default function SocialEventsPromo({ rows: strapiRows = [] }) {
    const rawRows = strapiRows.length > 0 ? strapiRows : FALLBACK_ROWS;
    const rows = rawRows.map(normalizeRow);

    return (
        <section className="py-16 md:py-20">
            <div className="container mx-auto px-4 xl:px-8">
                {rows.map((row, index) => (
                    <SocialRow key={row.id} row={row} isLast={index === rows.length - 1} />
                ))}
            </div>
        </section>
    );
}
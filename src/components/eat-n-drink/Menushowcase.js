"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getStrapiMedia, blocksToText } from "@/lib/strapi";

// ─── Fallback rows — used when Strapi has no text-image-sections yet ──────────
const FALLBACK_ROWS = [
    {
        id: "food",
        imageLeft: false,
        headline: "Taste that delivers",
        body: "With our Dave & Buster's food menu, every season brings a new reason to celebrate. Whether you're in the mood for juicy burgers, sizzling wings, or loaded vegetarian delights, our chefs ensure every dish bursts with flavor and creativity.",
        footnote: "*Menu may vary by location.",
        imageSrc: "https://daveandbustersindia.com/wp-content/uploads/2025/07/Food-1.jpg",
        imageAlt: "Crispy chicken burger with fresh veggies and a side of golden fries",
        ctaLabel: "View PDF of Our Food Menu",
        ctaHref: "https://daveandbustersindia.com/menus/DNB_Food_Menus.pdf",
    },
    {
        id: "drinks",
        imageLeft: true,
        headline: "Quench Your Thirst",
        body: "The Dave & Buster's drink menu features a lineup of classic cocktails and signature blends that you won't find anywhere else.",
        footnote: null,
        imageSrc: "https://daveandbustersindia.com/wp-content/uploads/2025/07/Drink-1.jpg",
        imageAlt: "Colorful layered cocktail garnished with an orange slice and mint sprig.",
        ctaLabel: "View PDF of Our Drink Menu",
        ctaHref: "https://daveandbustersindia.com/menus/DNB_Bar.pdf",
    },
    {
        id: "kids",
        imageLeft: false,
        headline: "Kids Menu",
        body: "Tiny bites, big smiles! Our Kids' Menu turns every meal into a mini celebration with favorites that combine fun and flavor in every bite.",
        footnote: null,
        imageSrc: "https://daveandbustersindia.com/wp-content/uploads/2025/04/burger.jpg",
        imageAlt: "Delicious cheeseburger with a Dave & Buster's flag, served with a side of fries.",
        ctaLabel: "View PDF of Our Kids Menu",
        ctaHref: "https://daveandbustersindia.com/menus/KIDS_MENU.pdf",
    },
];

// ─── Normalize a Strapi text-image-section → unified row shape ────────────────
// Strapi schema: { title, description(blocks), image(media), image_position, cta_text, cta_link }
function normalizeRow(section, index) {
    if (section._isFallback) return section;

    return {
        id: section.id ?? index,
        imageLeft: section.image_position === "left",
        headline: section.title ?? "",
        // ✅ Guard: description may be null if not filled in Strapi yet
        body: section.description ? blocksToText(section.description) : "",
        footnote: null,
        imageSrc: getStrapiMedia(section.image) ?? "",
        imageAlt: section.title ?? "",
        ctaLabel: section.cta_text ?? null,
        // ✅ Guard: cta_link null check
        ctaHref: section.cta_link ?? "#",
    };
}

// ─── Single alternating row ───────────────────────────────────────────────────
function MenuRow({ row, isLast }) {
    const imageContent = (
        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            {row.imageSrc ? (
                <img
                    src={row.imageSrc}
                    alt={row.imageAlt}
                    className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                    draggable={false}
                />
            ) : (
                // Placeholder when image not yet uploaded in Strapi
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
            {row.footnote && (
                <p className="mt-2 text-gray-400 text-xs italic">{row.footnote}</p>
            )}
            {row.ctaLabel && row.ctaHref && (
                <div className="mt-6">
                    <Link
                        href={row.ctaHref}
                        target="_blank"
                        rel="noopener noreferrer"
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
        <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${isLast ? "" : "mb-16 sm:mb-14"
                }`}
        >
            {/* Mobile: image first, then text. Desktop: honour image_position from Strapi */}
            <div className={`order-1 ${row.imageLeft ? "lg:order-1" : "lg:order-2"}`}>
                {imageContent}
            </div>
            <div className={`order-2 ${row.imageLeft ? "lg:order-2" : "lg:order-1"}`}>
                {textContent}
            </div>
        </div>
    );
}

// ─── MenuShowcase ─────────────────────────────────────────────────────────────
// Props:
//   rows — Strapi text-image-section[] from getTextImageSections() in page.js
//          Each row's image_position ("left"/"right") controls layout
//          Falls back to FALLBACK_ROWS if Strapi has no sections yet
export default function MenuShowcase({ rows: strapiRows = [] }) {
    const rawRows = strapiRows.length > 0 ? strapiRows : FALLBACK_ROWS;
    const rows = rawRows.map(normalizeRow);

    return (
        <section className="py-16 md:py-20">
            <div className="container mx-auto px-4 xl:px-8">
                {rows.map((row, index) => (
                    <MenuRow
                        key={row.id}
                        row={row}
                        isLast={index === rows.length - 1}
                    />
                ))}
            </div>
        </section>
    );
}
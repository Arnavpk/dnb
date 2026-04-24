"use client";

import Link from "next/link";
import { getStrapiMedia } from "@/lib/strapi";

// ─── Fallback content — used when Strapi has no text-image sections yet ───────
const FALLBACK_ROWS = [
    {
        id: "unseated",
        headline: "Don't Leave Yourself Unseated",
        body: "Whether you're at the bar or the back booth, you'll enjoy a best-in-class dining experience. It's no secret that the service is top tier. Our hosts are happy to accommodate the whole crew or a party of one. Make the decision to skip the line & book your table, today!",
        image: {
            src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/Dont-Leave-Yourself-Unseated.jpg",
            alt: "Group of friends toasting with various drinks at Dave & Buster's.",
        },
    },
    {
        id: "power-card",
        headline: "Get Powered Up Before You Play!",
        body: "Grab your rechargeable Card at the store and top it up to jump straight into the action with 75+ arcade and VR games. Reload anytime at the front desk and let the games begin!",
        image: {
            src: "https://daveandbustersindia.com/wp-content/uploads/2024/10/DB-PresidentsDay-Web-EnhancedPowerCard-540x380-1.jpg",
            alt: "Get Powered Up Before You Play",
        },
    },
];

// ─── Strapi Blocks renderer (plain paragraphs only) ───────────────────────────
// description is a rich text (blocks) field in Strapi.
// This handles the common case: paragraph nodes with text children.
// Extend if you add bold/italic/lists in Strapi later.
function renderBlocks(blocks = []) {
    if (!blocks?.length) return null;
    return blocks.map((block, i) => {
        if (block.type === "paragraph") {
            const text = block.children?.map((c) => c.text).join("") ?? "";
            return (
                <p key={i} className="mt-4 text-black text-sm md:text-base leading-relaxed">
                    {text}
                </p>
            );
        }
        // Add heading, list, etc. here if needed in future
        return null;
    });
}

// ─── Normalize Strapi text-image-section → unified shape ─────────────────────
// Strapi shared.text-image-section schema: { title, description(blocks), image(media[]) }
// imageLeft is auto-alternated by index — no Strapi field needed
function normalizeRow(section, index) {
    return {
        id: section.id ?? `row-${index}`,
        headline: section.title ?? "",
        // Keep raw blocks for renderBlocks(); fall back to plain string for FALLBACK
        blocks: section.description ?? null,
        image: {
            src: getStrapiMedia(section.image) ?? "",
            alt: section.title ?? `Section ${index + 1}`,
        },
        imageLeft: index % 2 === 0, // even = image left, odd = image right
    };
}

// ─── Single alternating row ───────────────────────────────────────────────────
function ImageTextRow({ row, isLast, isFallback }) {
    const textContent = (
        <div className="flex flex-col justify-center h-full">
            <h3 className="text-[30px] md:text-[45px] font-extrabold text-[#15179a] uppercase leading-tight"
                style={{ fontFamily: '"DINBuster", sans-serif' }}>
                {row.headline}
            </h3>
            {/* Fallback rows use a plain string; Strapi rows use blocks */}
            {isFallback ? (
                <p className="mt-4 text-black text-sm md:text-base leading-relaxed">
                    {row.body}
                </p>
            ) : (
                renderBlocks(row.blocks)
            )}
        </div>
    );

    const imageContent = (
        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            <img
                src={row.image.src}
                alt={row.image.alt}
                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
                draggable={false}
            />
        </div>
    );

    return (
        <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${isLast ? "" : "mb-16 sm:mb-14"
                }`}
        >
            {/* Mobile: image always first. Desktop: honour imageLeft via order. */}
            <div className={`order-1 ${row.imageLeft ? "lg:order-1" : "lg:order-2"}`}>
                {imageContent}
            </div>
            <div className={`order-2 ${row.imageLeft ? "lg:order-2" : "lg:order-1"}`}>
                {textContent}
            </div>
        </div>
    );
}

// ─── ImageTextSection ─────────────────────────────────────────────────────────
// Props:
//   rows — Strapi shared.text-image-section[] from getTextImageSections() in page.js
//          Falls back to FALLBACK_ROWS if Strapi has no sections yet
export default function ImageTextSection({ rows: strapiRows = [] }) {
    const isFallback = !strapiRows.length;
    const rows = isFallback
        ? FALLBACK_ROWS
        : strapiRows.map(normalizeRow);

    return (
        <section className="py-16 md:py-20">
            <div className="container mx-auto px-4 xl:px-8">
                {rows.map((row, index) => (
                    <ImageTextRow
                        key={row.id}
                        row={row}
                        isLast={index === rows.length - 1}
                        isFallback={isFallback}
                    />
                ))}
            </div>
        </section>
    );
}
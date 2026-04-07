"use client";

import Link from "next/link";
import { getStrapiMedia } from "@/lib/strapi";

// ─── Fallback content — used when Strapi has no banner data yet ───────────────
const FALLBACK = {
    href: "/",
    image: {
        src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/DNB-Bangalore.jpg",
        alt: "Eat Drink Play & Watch",
    },
};

// ─── Normalize Strapi banner section → unified shape ─────────────────────────
// Strapi shared.banner schema: { image(media), link, title, subtitle }
function normalizeBanner(section) {
    if (!section) return FALLBACK;

    return {
        href: section.link ?? FALLBACK.href,
        image: {
            src: getStrapiMedia(section.image) ?? FALLBACK.image.src,
            alt: section.title ?? section.subtitle ?? FALLBACK.image.alt,
        },
    };
}

// ─── FullWidthBanner ──────────────────────────────────────────────────────────
// Props:
//   section — Strapi shared.banner from getBannerSection() in page.js
//             Falls back to FALLBACK if Strapi has no banner yet
export default function FullWidthBanner({ section = null }) {
    const { href, image } = normalizeBanner(section);

    return (
        <section className="w-full p-0 block">
            <Link href={href} className="block w-full">
                <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto object-cover block"
                    loading="lazy"
                    draggable={false}
                />
            </Link>
        </section>
    );
}
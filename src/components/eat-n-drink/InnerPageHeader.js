"use client";

import { getStrapiMedia } from "@/lib/strapi";

// ─── Normalize Strapi hero section → unified shape ────────────────────────────
// Strapi shared.hero-section schema: { title, subtitle, background_image(media[]) }
function normalizeHeroSection(section, cityName) {
    if (!section) return {
        title: `Eat & Drink at Dave & Buster's ${cityName}`,
        description: `Discover an experience where gaming meets gourmet at Dave & Buster's ${cityName}.`,
        backgroundImageDesktop: "",
    };

    return {
        title: section.title ?? `Eat & Drink at Dave & Buster's ${cityName}`,
        description: section.subtitle ?? `Discover an experience where gaming meets gourmet at Dave & Buster's ${cityName}.`,
        backgroundImageDesktop: getStrapiMedia(section.background_image) ?? "",
    };
}

// ─── InnerPageHeader ──────────────────────────────────────────────────────────
// Props:
//   section  — Strapi shared.hero-section from getHeroSection() in page.js
//   location — location slug from params (e.g. "bangalore", "mumbai")
export default function InnerPageHeader({ section = null, location = "" }) {
    const cityName = location.charAt(0).toUpperCase() + location.slice(1);
    const { title, description, backgroundImageDesktop } = normalizeHeroSection(section, cityName);
    const hasBg = !!backgroundImageDesktop;

    return (
        <section
            className="relative bg-[#15189a] text-white overflow-hidden"
            style={hasBg ? { backgroundImage: `url('${backgroundImageDesktop}')` } : {}}
        >
            {/* Background image overlay (when image present) */}
            {hasBg && (
                <div className="absolute inset-0 bg-black/50 pointer-events-none" />
            )}

            {/* Content */}
            <div className="relative z-10 max-w-screen-xl mx-auto px-6 py-16 md:py-24 lg:py-28">
                <div className="flex flex-col items-center text-center gap-5">
                    <h1
                        className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight max-w-3xl uppercase"
                        style={{ fontFamily: '"Libre Franklin", sans-serif' }}
                    >
                        {title}
                    </h1>

                    {description && (
                        <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl">
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
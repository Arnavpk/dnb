"use client";

import Link from "next/link";
import { getStrapiMedia } from "@/lib/strapi";

const FALLBACK = {
    heading: "FUN TARGET: ACQUIRED",
    body: "Welcome to our all new Hi-Tech Darts Bay redefining the game we all know and love in an AWESOME way. Whether you're a fierce competitor or just wanna chill with your crew, you'll find our Social Bays hit the target on everything you need!\n\nMust be 18+ to play.",
    ctaLabel: "Start Planning Now",
    ctaHref: "/book/game-bookings",
    // desktopSrc: "https://daveandbustersindia.com/wp-content/uploads/2025/04/Arcade-Games-Desk.jpg",
    // mobileSrc: "https://daveandbustersindia.com/wp-content/uploads/2025/04/arcade-1.jpg",
};

// Props:
//   section — shared.hero-with-cta from getHeroWithCtaSection(sections)
//             title           → heading
//             subtitle        → body text
//             backgroundimage[0] → desktop image
//             backgroundimage[1] → mobile image
//             cta_text        → button label
//             cta_link        → button href
export default function DartsInnerHero({ section }) {
    const heading = section?.title || FALLBACK.heading;
    const body = section?.subtitle || FALLBACK.body;
    const images = section?.backgroundimage ?? [];
    const desktopSrc = images[0] ? getStrapiMedia(images[0]) : FALLBACK.desktopSrc;
    const mobileSrc = images[1] ? getStrapiMedia(images[1]) : FALLBACK.mobileSrc;
    const ctaLabel = section?.cta_text || FALLBACK.ctaLabel;
    const ctaHref = section?.cta_link || FALLBACK.ctaHref;

    return (
        <section className="relative w-full h-[600px] md:h-screen overflow-hidden">
            <picture>
                <source media="(max-width: 991px)" srcSet={mobileSrc} />
                <img
                    src={desktopSrc}
                    alt={heading}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    loading="eager"
                    draggable={false}
                />
            </picture>

            <div className="absolute inset-0 pointer-events-none" />

            <div className="relative z-10 container mx-auto px-4 xl:px-8">
                <div className="relative w-full md:w-1/2" style={{ minHeight: "clamp(420px, 70vh, 580px)" }}>
                    <div
                        className="absolute bottom-16 left-0 right-0 md:right-auto flex flex-col gap-4 rounded-3xl px-6 py-9 text-white"
                        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                    >
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
                            {heading}
                        </h1>

                        {body && (
                            <div className="text-sm md:text-base text-white/85 leading-relaxed">
                                {body.split("\n\n").map((para, i) => (
                                    <p key={i} className={i > 0 ? "mt-3" : ""}>{para}</p>
                                ))}
                            </div>
                        )}

                        {ctaLabel && (
                            <div className="mt-1">
                                <Link
                                    href={ctaHref}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-black text-sm font-semibold uppercase tracking-wide transition-colors"
                                    style={{ background: "linear-gradient(180deg, #ff6f00, #FFBA00)" }}
                                >
                                    {ctaLabel}
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
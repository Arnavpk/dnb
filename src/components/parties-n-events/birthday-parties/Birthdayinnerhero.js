"use client";

import Link from "next/link";
import { getStrapiMedia } from "@/lib/strapi";

const FALLBACK = {
    heading: "MAXIMUM FUN, MINIMUM EFFORT!",
    ctaLabel: "Book Now",
    ctaHref: "/bangalore/bookings/",
    desktopSrc: "https://daveandbustersindia.com/wp-content/uploads/2025/04/banner-1.jpg",
    mobileSrc: "https://daveandbustersindia.com/wp-content/uploads/2025/04/mobile-banner-1.jpg",
};

// Props:
//   section — shared.hero-with-cta from getHeroWithCtaSection(sections)
//             title               → heading
//             subtitle            → body text (optional)
//             backgroundimage[0]  → desktop image
//             backgroundimage[1]  → mobile image
//             cta_text            → button label
//             cta_link            → button href
export default function BirthdayInnerHero({ section }) {
    const heading = section?.title || FALLBACK.heading;
    const body = section?.subtitle ?? null;
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
                    src={desktopSrc} alt={heading}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    loading="eager" draggable={false}
                />
            </picture>

            <div className="absolute inset-0 pointer-events-none" />

            <div className="relative z-10 container mx-auto px-4 xl:px-8">
                <div className="relative w-full md:w-1/2" style={{ minHeight: "clamp(420px, 70vh, 580px)" }}>
                    <div
                        className="absolute bottom-16 left-0 right-0 md:right-auto flex flex-col gap-5 rounded-[25px] px-6 py-9 text-white"
                        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                    >
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase leading-tight tracking-tight">
                            {heading}
                        </h1>

                        {body && (
                            <p className="text-sm md:text-base text-white/85 leading-relaxed">{body}</p>
                        )}

                        {ctaLabel && (
                            <div>
                                <Link
                                    href={ctaHref}
                                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-black font-semibold text-sm uppercase tracking-wide transition-all duration-300 self-start"
                                    style={{ background: "linear-gradient(to bottom, #ff6f00, #FFBA00)" }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = "linear-gradient(to bottom, #040651, #15189a)"}
                                    onMouseLeave={(e) => e.currentTarget.style.background = "linear-gradient(to bottom, #ff6f00, #FFBA00)"}
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
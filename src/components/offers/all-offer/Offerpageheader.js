"use client";

import Link from "next/link";
import { getStrapiMedia } from "@/lib/strapi";

const FALLBACK = {
    heading: "IRRESISTIBLE DAVE & BUSTER'S BANGALORE OFFERS YOU JUST CAN'T SAY NO TO!",
    subheading: "Get It Before Everyone Else Does",
    ctaLabel: "GRAB THE OFFER NOW",
    ctaHref: "/bangalore/contact-us/",
    urgency: "Hurry! Offers end on 31st March",
};

// Props:
//   section — shared.hero-with-cta from getHeroWithCtaSection(sections)
//             title               → heading
//             subtitle            → subheading
//             backgroundimage[0]  → desktop image (optional)
//             backgroundimage[1]  → mobile image (optional)
//             cta_text            → button label
//             cta_link            → button href
export default function OffersPageHeader({ section }) {
    const heading = section?.title || FALLBACK.heading;
    const subheading = section?.subtitle || FALLBACK.subheading;
    const images = section?.backgroundimage ?? [];
    const desktopSrc = images[0] ? getStrapiMedia(images[0]) : null;
    const mobileSrc = images[1] ? getStrapiMedia(images[1]) : null;
    const ctaLabel = section?.cta_text || FALLBACK.ctaLabel;
    const ctaHref = section?.cta_link || FALLBACK.ctaHref;

    return (
        <section
            className="relative w-full h-full overflow-hidden text-white"
            style={desktopSrc ? {} : { background: "#15189a" }}
        >
            {desktopSrc && (
                <>
                    <picture>
                        <source media="(max-width: 991px)" srcSet={mobileSrc ?? desktopSrc} />
                        <img src={desktopSrc} alt={heading}
                            className="absolute inset-0 w-full h-full object-cover object-center"
                            loading="eager" draggable={false} />
                    </picture>
                    <div className="absolute inset-0 pointer-events-none"
                        style={{ background: "rgba(21,24,154,0.6)" }} />
                </>
            )}

            <div className="relative z-10 container mx-auto px-4 xl:px-8">
                <div className="flex justify-center items-center min-h-[360px] sm:min-h-[420px] md:min-h-[480px] py-20">
                    <div className="w-full md:w-10/12 text-center mt-6">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-[60px] font-extrabold leading-tight tracking-tight">
                            {heading}
                        </h1>
                        <h2 className="mt-4 text-base sm:text-lg md:text-xl font-bold text-white/85">
                            {subheading}
                        </h2>
                        <div className="mt-6 flex flex-col items-center gap-4">
                            <Link href={ctaHref} target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-white font-semibold text-sm uppercase tracking-wide transition-all duration-300"
                                style={{ background: "linear-gradient(to bottom, #ff6f00, #FFBA00)" }}>
                                {ctaLabel}
                            </Link>
                            <span className="inline-block text-white font-semibold text-sm px-4 py-2 rounded">
                                {FALLBACK.urgency}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
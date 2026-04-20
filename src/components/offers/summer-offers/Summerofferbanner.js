"use client";

import Link from "next/link";
import { getStrapiMedia } from "@/lib/strapi";

const FALLBACK = {
    heading: "SUMMER EXCLUSIVE OFFER",
    body: "This summer, keep things simple - more games, more time, more fun.",
    ctaLabel: "Book Now",
    desktopSrc: "https://daveandbustersindia.com/wp-content/uploads/2025/04/DNB-Bangalore.jpg",
    mobileSrc: "https://daveandbustersindia.com/wp-content/uploads/2025/04/banner_mobile.jpg",
};

// Props:
//   section  — shared.hero-with-cta from getHeroWithCtaSection(sections)
//              title               → heading
//              subtitle            → body text
//              backgroundimage[0]  → desktop image
//              backgroundimage[1]  → mobile image
//              cta_text            → button label
//              cta_link            → ignored (we use location-based link)
//   location — location slug string
export default function SummerOfferBanner({ section, location = "bangalore" }) {
    const heading = section?.title || FALLBACK.heading;
    const body = section?.subtitle || FALLBACK.body;
    const images = section?.backgroundimage ?? [];
    const desktopSrc = images[0] ? getStrapiMedia(images[0]) : FALLBACK.desktopSrc;
    const mobileSrc = images[1] ? getStrapiMedia(images[1]) : FALLBACK.mobileSrc;
    const ctaLabel = section?.cta_text || FALLBACK.ctaLabel;
    const ctaHref = `/${location}/bookings/`;

    return (
        <>
            {/* Banner image + CTA button */}
            <section className="relative w-screen h-[700px] md:h-[500px] overflow-hidden">
                <picture>
                    <source media="(max-width: 991px)" srcSet={mobileSrc} />
                    <img src={desktopSrc} alt={heading}
                        className="absolute inset-0 w-full h-full object-cover object-center"
                        loading="eager" draggable={false} />
                </picture>
                <div className="absolute bottom-8 left-0 right-0 flex justify-center z-10">
                    <Link href={ctaHref}
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wide text-black transition-all duration-300"
                        style={{ background: "linear-gradient(to bottom, #ff6f00, #FFBA00)" }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "linear-gradient(to bottom, #ff6f00, #FFBA00)"; }}
                    >
                        {ctaLabel}
                    </Link>
                </div>
            </section>

            {/* Heading + body below banner */}
            <section className="py-10 md:py-14 bg-white">
                <div className="container mx-auto px-4 xl:px-8">
                    <div className="flex justify-center">
                        <div className="w-full md:w-10/12 text-center">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase leading-tight tracking-tight text-[#15189a] mb-4">
                                {heading}
                            </h1>
                            <p className="text-sm md:text-base text-black leading-relaxed">{body}</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
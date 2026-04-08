"use client";

import { getStrapiMedia } from "@/lib/strapi";

const FALLBACK = {
    heading: "IMMERSIVE POOL EXPERIENCE",
    // desktopSrc: "https://daveandbustersindia.com/wp-content/uploads/2025/04/Pool-Banner-Desk.jpg",
    // mobileSrc: "https://daveandbustersindia.com/wp-content/uploads/2025/04/Pool-Banner-Mob.jpg",
};

// Props:
//   section — shared.hero-section from getHeroSection(sections)
//             title               → heading
//             background_image[0] → desktop image
//             background_image[1] → mobile image
export default function PoolInnerHero({ section }) {
    const heading = section?.title || FALLBACK.heading;
    const images = section?.background_image ?? [];
    const desktopSrc = images[0] ? getStrapiMedia(images[0]) : FALLBACK.desktopSrc;
    const mobileSrc = images[1] ? getStrapiMedia(images[1]) : FALLBACK.mobileSrc;

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
                        className="absolute bottom-16 left-0 right-0 md:right-auto flex flex-col gap-4 rounded-3xl px-6 py-9 text-white"
                        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                    >
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
                            {heading}
                        </h1>
                    </div>
                </div>
            </div>
        </section>
    );
}
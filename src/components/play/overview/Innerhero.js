"use client";

import { getStrapiMedia } from "@/lib/strapi";

const FALLBACK = {
    heading: "EVERYONE WINS AT THE ULTIMATE GAMING ZONE IN BANGALORE",
    desktopSrc: "https://daveandbustersindia.com/wp-content/uploads/2025/04/corporate-people_banner.jpg",
    mobileSrc: "https://daveandbustersindia.com/wp-content/uploads/2025/04/Play-Overview-Mob.jpg",
};

// Props:
//   section — shared.hero-section from getHeroSection(sections)
//             title → heading
//             background_image[0] → desktop image
//             background_image[1] → mobile image
export default function InnerHero({ section }) {
    const heading = section?.title || FALLBACK.heading;
    const images = section?.background_image ?? [];
    const desktopSrc = images[0] ? getStrapiMedia(images[0]) : FALLBACK.desktopSrc;
    const mobileSrc = images[1] ? getStrapiMedia(images[1]) : FALLBACK.mobileSrc;

    return (
        <section className="relative w-full h-[500px] md:h-screen overflow-hidden">
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
                <div className="flex items-center min-h-[320px] sm:min-h-[380px] md:min-h-[440px] lg:min-h-[480px]">
                    <div className="w-full md:w-1/2 bg-[#00000080] rounded-[25px] pt-9 pr-6 pb-9 pl-6">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-extrabold text-white uppercase leading-tight tracking-tight">
                            {heading}
                        </h1>
                    </div>
                </div>
            </div>
        </section>
    );
}
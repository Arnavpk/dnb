"use client";

import { getStrapiMedia } from "@/lib/strapi";

const FALLBACK = {
    heading: "Game Your Way",
    subheading: "Picture yourself leading a campaign with Master Chief or lining up a shot on an advanced pool table game. From arcade classics to VR thrills and an interactive pool table, there's a battle station waiting for every kind of player.",
    imgs: [
        { src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/pool.jpg", alt: "Immersive pool table" },
        { src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/Pool-Gallery.jpg", alt: "Pool gallery" },
        { src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/Pool-Image.jpg", alt: "Pool experience" },
        { src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/Pool-Game.jpg", alt: "Pool game" },
        { src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/Pool-Playing.jpg", alt: "Playing pool" },
    ],
};

// Normalize shared.arcade-images → gallery shape
// arcade-images: { title, subtitle(new field), img1..img5 }
function normalizeGallery(section) {
    if (!section) return FALLBACK;

    const imgs = ["img1", "img2", "img3", "img4", "img5"].map((key, i) => ({
        src: section[key] ? getStrapiMedia(section[key]) ?? "" : "",
        alt: section.title ?? FALLBACK.imgs[i]?.alt ?? "",
    }));

    return {
        heading: section.title || FALLBACK.heading,
        subheading: section.subtitle || FALLBACK.subheading,
        imgs: imgs.some((img) => img.src) ? imgs : FALLBACK.imgs,
    };
}

// Props:
//   section — shared.arcade-images from getArcadeImagesSection(sections)
//             title    → heading
//             subtitle → subheading (add this field to arcade-images schema)
//             img1..img5 → gallery images
export default function PoolGallery({ section }) {
    const { heading, subheading, imgs } = normalizeGallery(section);

    return (
        <section className="pb-8 pt-8">
            <div className="container mx-auto px-4 xl:px-8">
                <div className="mb-6">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#ff6f00] uppercase tracking-tight">
                        {heading}
                    </h2>
                    {subheading && (
                        <p className="mt-3 text-black text-sm md:text-base leading-relaxed max-w-3xl">
                            {subheading}
                        </p>
                    )}
                </div>

                <div className="grid gap-3 md:gap-4" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
                    <div className="overflow-hidden rounded-2xl" style={{ gridColumn: "1 / 3", gridRow: "1 / 3" }}>
                        {imgs[0]?.src ? <img src={imgs[0].src} alt={imgs[0].alt} className="w-full h-full object-cover min-h-[200px] md:min-h-[320px] transition-transform duration-500 hover:scale-105" loading="lazy" draggable={false} /> : <div className="w-full min-h-[320px] bg-gray-200" />}
                    </div>
                    <div className="overflow-hidden rounded-2xl" style={{ gridColumn: "3", gridRow: "1" }}>
                        {imgs[1]?.src ? <img src={imgs[1].src} alt={imgs[1].alt} className="w-full h-full object-cover min-h-[140px] md:min-h-[155px] transition-transform duration-500 hover:scale-105" loading="lazy" draggable={false} /> : <div className="w-full min-h-[155px] bg-gray-200" />}
                    </div>
                    <div className="overflow-hidden rounded-2xl" style={{ gridColumn: "3", gridRow: "2" }}>
                        {imgs[2]?.src ? <img src={imgs[2].src} alt={imgs[2].alt} className="w-full h-full object-cover min-h-[140px] md:min-h-[155px] transition-transform duration-500 hover:scale-105" loading="lazy" draggable={false} /> : <div className="w-full min-h-[155px] bg-gray-200" />}
                    </div>
                    <div className="overflow-hidden rounded-2xl" style={{ gridColumn: "1 / 3", gridRow: "3" }}>
                        {imgs[3]?.src ? <img src={imgs[3].src} alt={imgs[3].alt} className="w-full h-full object-cover min-h-[140px] md:min-h-[180px] transition-transform duration-500 hover:scale-105" loading="lazy" draggable={false} /> : <div className="w-full min-h-[180px] bg-gray-200" />}
                    </div>
                    <div className="overflow-hidden rounded-2xl" style={{ gridColumn: "3", gridRow: "3" }}>
                        {imgs[4]?.src ? <img src={imgs[4].src} alt={imgs[4].alt} className="w-full h-full object-cover min-h-[140px] md:min-h-[180px] transition-transform duration-500 hover:scale-105" loading="lazy" draggable={false} /> : <div className="w-full min-h-[180px] bg-gray-200" />}
                    </div>
                </div>
            </div>
        </section>
    );
}
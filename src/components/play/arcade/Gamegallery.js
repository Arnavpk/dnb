"use client";

import { getStrapiMedia } from "@/lib/strapi";

const FALLBACK = {
    heading: "Game Your Way",
    imgs: [
        { src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/Halo.jpg", alt: "Halo arcade game" },
        { src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/image7-1.jpg", alt: "Games at Dave & Buster's" },
        { src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/image5-1.jpg", alt: "Games at Dave & Buster's" },
        { src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/image6-1.jpg", alt: "Games at Dave & Buster's" },
        { src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/images2-1.jpg", alt: "Games at Dave & Buster's" },
    ],
};

// Normalize shared.arcade-images → imgs array
// arcade-images: { title, img1(media[]), img2(media[]), img3(media[]), img4(media[]), img5(media[]) }
function normalizeImages(section) {
    if (!section) return { heading: FALLBACK.heading, imgs: FALLBACK.imgs };

    const imgs = ["img1", "img2", "img3", "img4", "img5"].map((key, i) => ({
        src: section[key] ? getStrapiMedia(section[key]) ?? "" : "",
        alt: section.title ?? FALLBACK.imgs[i]?.alt ?? "",
    }));

    const hasImages = imgs.some((img) => img.src);

    return {
        heading: section.title || FALLBACK.heading,
        imgs: hasImages ? imgs : FALLBACK.imgs,
    };
}

// Props:
//   section — shared.arcade-images from getArcadeImagesSection(sections)
export default function GameGallery({ section }) {
    const { heading, imgs } = normalizeImages(section);

    return (
        <section className="pb-8 pt-8">
            <div className="container mx-auto px-4 xl:px-8">
                <div className="mb-6">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#ff6f00] uppercase tracking-tight">
                        {heading}
                    </h2>
                </div>

                <div className="grid gap-3 md:gap-4" style={{ gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "auto" }}>
                    {/* Image 1 — large, spans 2 rows */}
                    <div className="overflow-hidden rounded-2xl" style={{ gridColumn: "1 / 3", gridRow: "1 / 3" }}>
                        {imgs[0]?.src ? (
                            <img src={imgs[0].src} alt={imgs[0].alt}
                                className="w-full h-full object-cover min-h-[200px] md:min-h-[320px] transition-transform duration-500 hover:scale-105"
                                loading="lazy" draggable={false} />
                        ) : <div className="w-full min-h-[320px] bg-gray-200" />}
                    </div>

                    {/* Image 2 — top right */}
                    <div className="overflow-hidden rounded-2xl" style={{ gridColumn: "3", gridRow: "1" }}>
                        {imgs[1]?.src ? (
                            <img src={imgs[1].src} alt={imgs[1].alt}
                                className="w-full h-full object-cover min-h-[140px] md:min-h-[155px] transition-transform duration-500 hover:scale-105"
                                loading="lazy" draggable={false} />
                        ) : <div className="w-full min-h-[155px] bg-gray-200" />}
                    </div>

                    {/* Image 3 — bottom right */}
                    <div className="overflow-hidden rounded-2xl" style={{ gridColumn: "3", gridRow: "2" }}>
                        {imgs[2]?.src ? (
                            <img src={imgs[2].src} alt={imgs[2].alt}
                                className="w-full h-full object-cover min-h-[140px] md:min-h-[155px] transition-transform duration-500 hover:scale-105"
                                loading="lazy" draggable={false} />
                        ) : <div className="w-full min-h-[155px] bg-gray-200" />}
                    </div>

                    {/* Image 4 — bottom left */}
                    <div className="overflow-hidden rounded-2xl" style={{ gridColumn: "1 / 3", gridRow: "3" }}>
                        {imgs[3]?.src ? (
                            <img src={imgs[3].src} alt={imgs[3].alt}
                                className="w-full h-full object-cover min-h-[140px] md:min-h-[180px] transition-transform duration-500 hover:scale-105"
                                loading="lazy" draggable={false} />
                        ) : <div className="w-full min-h-[180px] bg-gray-200" />}
                    </div>

                    {/* Image 5 — bottom right */}
                    <div className="overflow-hidden rounded-2xl" style={{ gridColumn: "3", gridRow: "3" }}>
                        {imgs[4]?.src ? (
                            <img src={imgs[4].src} alt={imgs[4].alt}
                                className="w-full h-full object-cover min-h-[140px] md:min-h-[180px] transition-transform duration-500 hover:scale-105"
                                loading="lazy" draggable={false} />
                        ) : <div className="w-full min-h-[180px] bg-gray-200" />}
                    </div>
                </div>
            </div>
        </section>
    );
}
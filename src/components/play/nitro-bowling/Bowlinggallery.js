"use client";

import { getStrapiMedia } from "@/lib/strapi";

const FALLBACK = {
    heading: "Dave & Buster's Nitro Bowling Gallery",
    imgs: [
        // { src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/Bowlling-Gallery-2.jpg", alt: "Nitro Bowling at Dave & Buster's" },
        // { src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/Bowlling-Gallery-3.jpg", alt: "Nitro Bowling at Dave & Buster's" },
        // { src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/Bowling-Gallery-1.jpg", alt: "Nitro Bowling at Dave & Buster's" },
        // { src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/Bowlling-Gallery-4.jpg", alt: "Nitro Bowling at Dave & Buster's" },
        // { src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/bowling-gallary-img-1.jpg", alt: "Nitro Bowling at Dave & Buster's" },
    ],
};

// Normalize shared.arcade-images → gallery shape
// arcade-images: { title, img1..img5 }
function normalizeGallery(section) {
    if (!section) return FALLBACK;

    const imgs = ["img1", "img2", "img3", "img4", "img5"].map((key, i) => ({
        src: section[key] ? getStrapiMedia(section[key]) ?? "" : "",
        alt: section.title ?? FALLBACK.imgs[i]?.alt ?? "",
    }));

    return {
        heading: section.title || FALLBACK.heading,
        imgs: imgs.some((img) => img.src) ? imgs : FALLBACK.imgs,
    };
}

// Props:
//   section — shared.arcade-images from getArcadeImagesSection(sections)
export default function BowlingGallery({ section }) {
    const { heading, imgs } = normalizeGallery(section);

    return (
        <section className="pb-8 pt-8">
            <div className="container mx-auto px-4 xl:px-8">
                <div className="mb-6">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#ff6f00] uppercase tracking-tight">
                        {heading}
                    </h2>
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
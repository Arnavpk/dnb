"use client";

import Link from "next/link";
import { getStrapiMedia } from "@/lib/strapi";

const FALLBACK = {
    heading: "Watch Sports at Dave & Buster's – The Ultimate Game Day Destination",
    body: "If you are looking for the best sports bar in Bangalore, Dave & Buster's in Koramangala is the place to be. Catch every moment of cricket, F1, football, UFC, basketball, hockey, and global tournaments on 25+ mega 4K screens.",
    images: [
        // { src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/EAT.jpg", alt: "Eat at Dave & Buster's", href: "/bangalore/eat-drink/" },
        // { src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/Drink-1.jpg", alt: "Drink at Dave & Buster's", href: "/bangalore/eat-drink/" },
        // { src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/PLAY.jpg", alt: "Play at Dave & Buster's", href: "/bangalore/play/" },
    ],
};

// Normalize shared.watch-bottam → section shape
// watch-bottam: { title, description, img1(media[]), img2(media[]), img3(media[]) }
function normalizeSection(section) {
    if (!section) return FALLBACK;

    const images = ["img1", "img2", "img3"].map((key, i) => ({
        src: section[key] ? getStrapiMedia(section[key]) ?? "" : "",
        alt: section.title ?? FALLBACK.images[i]?.alt ?? "",
        href: FALLBACK.images[i]?.href ?? "#",
    }));

    return {
        heading: section.title || FALLBACK.heading,
        body: section.description || FALLBACK.body,
        images: images.some((img) => img.src) ? images : FALLBACK.images,
    };
}

// Props:
//   section — shared.watch-bottam from getWatchBottomSection(sections)
export default function WatchSportsSection({ section }) {
    const { heading, body, images } = normalizeSection(section);
    const validImages = images.filter((img) => img.src);

    return (
        <section className="bg-[#15189a] pb-8 pt-8">
            {/* Text block */}
            <div className="container mx-auto px-4 xl:px-8 mb-10 mt-12 sm:mt-10">
                <div className="flex justify-center">
                    <div className="w-full md:w-10/12 text-center">
                        <h2 className="text-2xl md:text-3xl xl:text-4xl font-extrabold text-white uppercase leading-tight mb-4">
                            {heading}
                        </h2>
                        <p className="text-white/75 text-sm md:text-base leading-relaxed">
                            {body}
                        </p>
                    </div>
                </div>
            </div>

            {/* Image columns */}
            <div className="w-full px-0">
                <div className="flex justify-center">
                    {validImages.map((img, i) => (
                        <div key={i} className="w-1/3 px-1 md:px-3">
                            <Link href={img.href} className="block overflow-hidden">
                                <img
                                    src={img.src} alt={img.alt}
                                    className="w-full h-auto object-cover transition-transform duration-500"
                                    loading="lazy" draggable={false}
                                />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
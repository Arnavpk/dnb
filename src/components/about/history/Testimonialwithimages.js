"use client";

import { Quote } from "lucide-react";
import { getStrapiMedia, getStrapiMediaAll } from "@/lib/strapi";

export default function TestimonialWithImages({ quoteSection, imagesSection }) {
    const title = quoteSection?.title ?? "I Love this place";
    const body = quoteSection?.body ?? "The food is amazing and they have so many games to offer.";

    // arcade-images has img1..img5 — we use img1 as main, img2+img3 as secondary
    const mainImage = getStrapiMedia(imagesSection?.img1) ?? "";
    const secondary = [
        getStrapiMedia(imagesSection?.img2) ?? "https://daveandbustersindia.com/wp-content/uploads/2025/04/arcade-game.jpg",
        getStrapiMedia(imagesSection?.img3) ?? "https://daveandbustersindia.com/wp-content/uploads/2025/04/image7-1.jpg",
    ];

    return (
        <section className="bg-[#15189a] py-14 md:py-16">
            <div className="container mx-auto px-4 xl:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

                    {/* Left: quote */}
                    <div className="mb-0">
                        <div className="flex items-start gap-6">
                            <Quote size={56} className="shrink-0 text-white opacity-90" strokeWidth={1.5} />
                            <blockquote className="text-white">
                                <h4 className="text-xl md:text-2xl font-bold font-din mb-3">
                                    {title}
                                </h4>
                                <p className="text-sm md:text-base text-white/85 leading-relaxed">
                                    {body}
                                </p>
                            </blockquote>
                        </div>
                    </div>

                    {/* Right: image grid */}
                    <div>
                        <div className="overflow-hidden rounded-[24px] mb-5 shadow-lg">
                            <img
                                src={mainImage}
                                alt={title}
                                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                                loading="lazy"
                                draggable={false}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                            {secondary.map((src, i) => (
                                <div key={i} className="overflow-hidden rounded-[24px] shadow-lg">
                                    <img
                                        src={src}
                                        alt={`Gallery image ${i + 2}`}
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                        loading="lazy"
                                        draggable={false}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
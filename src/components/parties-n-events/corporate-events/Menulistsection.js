"use client";

import { getStrapiMedia, blocksToText } from "@/lib/strapi";

export default function MenuListSection({ section }) {
    const imageLeft = section?.image_position === "left" ?? true;
    const image = getStrapiMedia(section?.image) ?? "https://daveandbustersindia.com/wp-content/uploads/2025/04/NO-HANGRY-HANGS-1.jpg";
    const bodyText = blocksToText(section?.description) ?? "";

    // Parse "Label : body" lines from the description blocks
    const lines = bodyText.split("\n").filter(Boolean);

    return (
        <section className="py-16 md:py-20 bg-[#ff6f00]">
            <div className="container mx-auto px-4 xl:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    <div className={`order-1 ${imageLeft ? "lg:order-1" : "lg:order-2"}`}>
                        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                            <img
                                src={image}
                                alt={section?.title ?? "Menu highlights"}
                                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                                loading="lazy"
                                draggable={false}
                            />
                        </div>
                    </div>
                    <div className={`order-2 ${imageLeft ? "lg:order-2" : "lg:order-1"}`}>
                        <div className="space-y-4">
                            {lines.map((line, index) => {
                                const colonIdx = line.indexOf(":");
                                if (colonIdx !== -1) {
                                    const label = line.slice(0, colonIdx).trim();
                                    const body = line.slice(colonIdx + 1).trim();
                                    return (
                                        <p key={index} className="text-black text-sm md:text-base leading-relaxed">
                                            <strong className="font-extrabold text-black">{label} :&nbsp;</strong>
                                            {body}
                                        </p>
                                    );
                                }
                                return (
                                    <p key={index} className="text-black text-sm md:text-base leading-relaxed">{line}</p>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
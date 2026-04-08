"use client";

import Link from "next/link";
import { getStrapiMedia } from "@/lib/strapi";

export default function PartiesInnerHero({ section }) {
    const heading = section?.title ?? "NEXT LEVEL PARTIES AWAIT";
    const body = section?.subtitle ?? "Make your party epic with just a few clicks of the mouse. We'll bring the food, serve the drinks and even clean up afterward. All you need to do is pick your plan and invite the lucky guests.";
    const desktopImage = getStrapiMedia(section?.background_image) ?? "https://daveandbustersindia.com/wp-content/uploads/2025/04/DNB-Bangalore.jpg";
    const mobileImage = desktopImage;

    return (
        <section className="relative w-full h-[600px] md:h-screen overflow-hidden">
            <picture>
                <source media="(max-width: 991px)" srcSet={mobileImage} />
                <img
                    src={desktopImage}
                    alt={heading}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    loading="eager"
                    draggable={false}
                />
            </picture>

            <div className="absolute inset-0 pointer-events-none" />

            <div className="relative z-10 container mx-auto px-4 xl:px-8">
                <div
                    className="relative w-full md:w-1/2"
                    style={{ minHeight: "clamp(420px, 70vh, 580px)" }}
                >
                    <div
                        className="absolute bottom-16 left-0 right-0 md:right-auto
                           flex flex-col gap-4 rounded-3xl px-6 py-9 text-white"
                        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                    >
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase leading-tight tracking-tight">
                            {heading}
                        </h1>

                        {body && (
                            <p className="text-sm md:text-base text-white/85 leading-relaxed">
                                {body}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
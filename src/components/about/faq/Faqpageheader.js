"use client";

import { getStrapiMedia } from "@/lib/strapi";

export default function FAQPageHeader({ section }) {
    const heading = section?.title ?? "FREQUENTLY ASKED QUESTIONS";
    const subheading = section?.subtitle ?? "Everything You Need to Know About Dave & Buster's";
    const desktopImage = getStrapiMedia(section?.background_image) ?? "";
    const hasBackground = !!desktopImage;

    return (
        <section
            className="relative w-full overflow-hidden text-white"
            style={{ background: "#15189a" }}
        >
            {hasBackground && (
                <>
                    <picture>
                        <source media="(max-width: 991px)" srcSet={desktopImage} />
                        <img
                            src={desktopImage}
                            alt={heading}
                            className="absolute inset-0 w-full h-full object-cover object-center"
                            loading="eager"
                            draggable={false}
                        />
                    </picture>
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: "rgba(21,24,154,0.6)" }}
                    />
                </>
            )}

            <div className="relative z-10 container mx-auto px-4 xl:px-8">
                <div className="flex justify-center items-center min-h-[300px] sm:min-h-[360px] md:min-h-[400px] py-16 text-center mt-6">
                    <div className="w-full">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-extrabold leading-tight tracking-tight font-din">
                            {heading}
                        </h1>
                        <h2 className="mt-4 text-base sm:text-lg md:text-xl font-medium text-white/85 font-libre">
                            {subheading}
                        </h2>
                    </div>
                </div>
            </div>
        </section>
    );
}
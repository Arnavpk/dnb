"use client";

import { getStrapiMedia } from "@/lib/strapi";

export default function CorporatePageHeader({ section }) {
    const heading = section?.title ?? "Corporate events in Bangalore don't have to be awkward";
    const subheading = section?.subtitle ?? "At Dave & Buster's, we're flipping the script";
    const desktopImage = getStrapiMedia(section?.background_image) ?? "https://daveandbustersindia.com/wp-content/uploads/2025/06/Corporate-Desk.webp";
    const mobileImage = desktopImage;

    return (
        <section className="relative w-full overflow-hidden">
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
                <div className="flex justify-center items-center min-h-[360px] sm:min-h-[420px] md:min-h-[480px] py-20 text-center">
                    <div className="w-full md:w-10/12 text-white mt-6">
                        <h1 className="text-2xl uppercase sm:text-3xl md:text-4xl xl:text-5xl font-extrabold leading-tight tracking-tight">
                            {heading}
                        </h1>
                        {subheading && (
                            <h2 className="mt-4 text-base sm:text-lg md:text-xl font-bold text-white/85">
                                {subheading}
                            </h2>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
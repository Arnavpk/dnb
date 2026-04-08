"use client";

import { getStrapiMedia } from "@/lib/strapi";

const FALLBACK = {
    heading: "Contact Us",
    subheading: "QUESTIONS?  COMPLIMENTS?  OPPORTUNITIES?",
    description: "We would love to hear from you. Whether you have a question about our games, food, or events, want to plan an unforgettable party, or simply want to share your feedback, the Dave & Buster's India team is always here to help.\n\nHave thoughts, ideas, or just want to say hello?\n\nFor general inquiries, please fill out the form below, or you can call us directly.",
    desktopSrc: "https://daveandbustersindia.com/wp-content/uploads/2025/07/Contact-Us_Desktop.jpg",
    mobileSrc: "https://daveandbustersindia.com/wp-content/uploads/2025/07/Contact-Us_Mobile.jpg",
};

// Props:
//   section — shared.hero-section from getHeroSection(sections)
//             title               → heading
//             subtitle            → subheading
//             background_image[0] → desktop image
//             background_image[1] → mobile image
export default function ContactPageHeader({ section }) {
    const heading = section?.title || FALLBACK.heading;
    const subheading = section?.subtitle || FALLBACK.subheading;
    const images = section?.background_image ?? [];
    const desktopSrc = images[0] ? getStrapiMedia(images[0]) : FALLBACK.desktopSrc;
    const mobileSrc = images[1] ? getStrapiMedia(images[1]) : FALLBACK.mobileSrc;

    // description stored in subtitle — but subtitle is already subheading
    // Use FALLBACK description since hero-section has no description field
    const description = FALLBACK.description;

    return (
        <section className="relative w-full overflow-hidden text-white">
            <picture>
                <source media="(max-width: 991px)" srcSet={mobileSrc} />
                <img src={desktopSrc} alt={heading}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    loading="eager" draggable={false} />
            </picture>

            <div className="absolute inset-0 pointer-events-none" />

            <div className="relative z-10 container mx-auto px-4 xl:px-8">
                <div className="flex justify-center items-start py-16 md:py-20 text-center">
                    <div className="w-full mt-6">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
                            {heading}
                        </h1>
                        <h3 className="mt-4 text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-widest text-white">
                            {subheading}
                        </h3>
                        <div className="mt-6 max-w-3xl mx-auto text-left md:text-center space-y-3">
                            {description.split("\n\n").map((para, i) => (
                                <p key={i} className="text-white text-sm md:text-base leading-relaxed">{para}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
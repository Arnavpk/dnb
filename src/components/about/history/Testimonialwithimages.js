"use client";

import { Quote } from "lucide-react";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    testimonial: {
        title: "I Love this place",
        body: "The food is amazing and they have so many games to offer, and finally a place where you actually get something worth for your tickets, really nice rewards.",
    },
    images: {
        // Top image — full width on the right column
        main: {
            src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/burger.jpg",
            alt: "Delicious cheeseburger with a Dave & Buster's flag, served with a side of fries.",
        },
        // Two half-width images below the main
        secondary: [
            {
                id: "arcade",
                src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/arcade-game.jpg",
                alt: "Group of friends having fun and cheering while playing a dart game at Dave & Buster's, surrounded by vibrant arcade lights and retro game machines.",
            },
            {
                id: "floor",
                src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/image7-1.jpg",
                alt: "Vibrant and spacious arcade floor at Dave & Buster's, with numerous colorful games and neon lights.",
            },
        ],
    },
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function TestimonialWithImages() {
    return (
        // bg-primary-color: #15189a
        <section className="bg-[#15189a] py-14 md:py-16">
            <div className="container mx-auto px-4 xl:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

                    {/* ── Left: blockquote ─────────────────────────────────────────── */}
                    <div className="mb-0">
                        {/* blockquote-style-01: large quote icon floated left */}
                        <div className="flex items-start gap-6">
                            {/* fa-quote-right icon-double-large → large Lucide Quote icon */}
                            <Quote
                                size={56}
                                className="shrink-0 text-white opacity-90"
                                strokeWidth={1.5}
                            />
                            <blockquote className="text-white">
                                <h4 className="text-xl md:text-2xl font-bold font-din mb-3">
                                    {content.testimonial.title}
                                </h4>
                                <p className="text-sm md:text-base text-white/85 leading-relaxed">
                                    {content.testimonial.body}
                                </p>
                            </blockquote>
                        </div>
                    </div>

                    {/* ── Right: image grid ─────────────────────────────────────────── */}
                    <div>
                        {/* Top image — full width, border-radius-24px */}
                        <div className="overflow-hidden rounded-[24px] mb-5 shadow-lg">
                            <img
                                src={content.images.main.src}
                                alt={content.images.main.alt}
                                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                                loading="lazy"
                                draggable={false}
                            />
                        </div>

                        {/* Two half-width images side by side */}
                        <div className="grid grid-cols-2 gap-5">
                            {content.images.secondary.map((img) => (
                                <div
                                    key={img.id}
                                    className="overflow-hidden rounded-[24px] shadow-lg"
                                >
                                    <img
                                        src={img.src}
                                        alt={img.alt}
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
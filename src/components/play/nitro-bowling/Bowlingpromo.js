"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    imageLeft: false,
    headline: "Introducing Nitro Lightning Bowling - First Time in India!",
    paragraphs: [
        "Step into the future of bowling in Bangalore with Spark®️, where cutting-edge technology meets pure fun! Watch your lanes come alive with mesmerizing visuals, turning every roll into an epic experience. With Nitro Lightning Bowling, get ready for electrifying action, high-energy excitement, and a game-changing way to bowl like never before!",
        "Tomorrow's innovation is here to blow your mind today!",
        "Dave & Buster's Nitro Bowling Gallery",
    ],
    image: {
        src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/Bowling.jpg",
        alt: "Person bowling on an interactive lane at Dave & Buster's, with a glowing ball and digital graphics",
    },
    ctas: [
        { label: "Book Now", href: "/book/game-bookings" },
    ],
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function BowlingPromo() {
    return (
        <section
            className="py-16 md:py-20"
        // style={{
        //     background:
        //         "linear-gradient(135deg, #0d1b40 0%, #1a2f6e 60%, #0d1b40 100%)",
        // }}
        >
            <div className="container mx-auto px-4 xl:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                    {/* Image — top on mobile, honours imageLeft on desktop */}
                    <div className={`order-1 ${content.imageLeft ? "lg:order-1" : "lg:order-2"}`}>
                        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                            <img
                                src={content.image.src}
                                alt={content.image.alt}
                                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                                loading="lazy"
                                draggable={false}
                            />
                        </div>
                    </div>

                    {/* Text */}
                    <div className={`order-2 ${content.imageLeft ? "lg:order-2" : "lg:order-1"}`}>
                        <h3 className="text-2xl md:text-3xl font-extrabold text-[#15189a] uppercase leading-tight">
                            {content.headline}
                        </h3>

                        <div className="mt-4 space-y-3">
                            {content.paragraphs.map((para, i) => (
                                <p key={i} className="text-black text-sm md:text-base leading-relaxed">
                                    {para}
                                </p>
                            ))}
                        </div>

                        {content.ctas.length > 0 && (
                            <div className="flex flex-wrap gap-3 mt-6">
                                {content.ctas.map((cta) => (
                                    <Link
                                        key={cta.label}
                                        href={cta.href}
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-bold uppercase tracking-wide transition-colors"
                                        style={{ background: "linear-gradient(180deg, #040651, #15189a)" }}
                                    >
                                        {cta.label}
                                        <ArrowRight size={14} strokeWidth={2.5} />
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
}
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    imageLeft: false,
    headline: "Aim for Excitement",
    paragraphs: [
        "Discover the thrilling world of darts at Dave & Buster's! Whether you're a casual thrower or chasing a bullseye, every game is a blend of skill, challenge, and pure fun. Experience dynamic environments, lively competition, and a social atmosphere that makes every round unforgettable.\nStep up to the line and let every throw spark friendly rivalry, cheers, and memorable moments.\nFrom parties to casual hangs, our dart boards are the perfect choice for group events and celebrations.",
        "Ready, Set, Throw!",
    ],
    image: {
        src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/DARTS.jpg",
        alt: "Man aiming a dart at an electronic dartboard at Dave & Buster's Mumbai.",
    },
    ctas: [
        { label: "Book Now", href: "/book/game-bookings" },
    ],
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function DartsPromo() {
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

                        {/* Multiple paragraphs — each entry in the array is a <p> block */}
                        <div className="mt-4 space-y-3">
                            {content.paragraphs.map((para, i) => (
                                <p key={i} className="text-black text-sm md:text-base leading-relaxed">
                                    {/* Honour \n line breaks within a paragraph */}
                                    {para.split("\n").map((line, j, arr) => (
                                        <span key={j}>
                                            {line}
                                            {j < arr.length - 1 && <br />}
                                        </span>
                                    ))}
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
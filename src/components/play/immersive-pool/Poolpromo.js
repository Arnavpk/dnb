"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    imageLeft: false,
    headline: "Your Pool Game, Upgraded",
    // Rich text paragraphs — each paragraph is an array of { text, bold } segments
    paragraphs: [
        [
            { text: "Meet ", bold: false },
            { text: "Immersive Pool", bold: true },
            { text: ", where the classic ", bold: false },
            { text: "pool table game", bold: true },
            { text: " gets a modern tech glow-up. Step into augmented reality magic with ultra-bright visuals, a precision 3D sensor, and immersive sound effects. This next-generation ", bold: false },
            { text: "interactive pool table", bold: true },
            { text: " transforms every shot into a visual experience. The modern pool table game just became more exciting.", bold: false },
        ],
        [
            { text: "Experience a glowing pool table with a cosmic, galaxy-themed projection at ", bold: false },
            { text: "Dave & Buster's Bangalore", bold: true },
            { text: ". Set inside a neon-lit entertainment space, this is one of the most engaging ", bold: false },
            { text: "pool table Bangalore", bold: true },
            { text: " experiences available today.", bold: false },
        ],
    ],
    image: {
        src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/pool.jpg",
        alt: "Glowing pool table with a cosmic galaxy-themed projection at Dave & Buster's, featuring billiard balls set for a game in a neon-lit entertainment space.",
    },
    ctas: [
        { label: "Start Your Planning", href: "/book/game-bookings" },
    ],
};

// ─── Rich paragraph renderer ──────────────────────────────────────────────────
function RichParagraph({ segments }) {
    return (
        <p className="text-black text-sm md:text-base leading-relaxed">
            {segments.map((seg, i) =>
                seg.bold ? (
                    <strong key={i} className="text-black font-bold">{seg.text}</strong>
                ) : (
                    <span key={i}>{seg.text}</span>
                )
            )}
        </p>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PoolPromo() {
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
                                <RichParagraph key={i} segments={para} />
                            ))}
                        </div>

                        {content.ctas.length > 0 && (
                            <div className="flex flex-wrap gap-3 mt-6">
                                {content.ctas.map((cta) => (
                                    <Link
                                        key={cta.label}
                                        href={cta.href}
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#15189a] text-white text-sm font-bold uppercase tracking-wide transition-colors"
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
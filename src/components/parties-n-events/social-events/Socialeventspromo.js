"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    rows: [
        {
            id: "laugh",
            imageLeft: true,
            headline: "Laugh-out-loud events!",
            // Rich text: array of { text, bold } segments
            paragraphs: [
                [
                    { text: "We are one of the most exciting ", bold: false },
                    { text: "party places in Bangalore", bold: true },
                    { text: ". Whether you are planning a massive ", bold: false },
                    { text: "group party", bold: true },
                    { text: " or intimate ", bold: false },
                    { text: "social gatherings", bold: true },
                    { text: ", we have the perfect space and a chef-crafted menu to match. Check out our event guide for more!", bold: false },
                ],
            ],
            image: {
                src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/Laugh-out-loud-events-1.jpg",
                alt: "A diverse group of four young friends dancing and celebrating with their arms raised in the air inside the neon-lit entertainment area of Dave & Buster's.",
            },
            ctas: [{ label: "Get Event Guide", href: "/bangalore/bookings/" }],
        },
        {
            id: "hangry",
            imageLeft: false,
            headline: "NO HANGRY HANGS HERE",
            paragraphs: [
                [
                    { text: "Friends don't let friends get hangry. Keep the BFF energy alive and order our tasty Party Platters for everyone to enjoy.", bold: false },
                ],
            ],
            image: {
                src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/NO-HANGRY-HANGS-1.jpg",
                alt: "A group of friends enjoying food and drinks at Dave & Buster's, smiling and raising their glasses in a lively, neon-lit atmosphere.",
            },
            ctas: [{ label: "View Our Platter Menu", href: "/menus/DNB_Food_Menus.pdf", external: true }],
        },
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

// ─── Gradient CTA button — btn-primary with hover: #040651 → #15189a ─────────
function GradientButton({ label, href, external = false }) {
    const base = "linear-gradient(to bottom, #15189a, #040651)";
    return (
        <Link
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                 text-white text-sm font-bold uppercase tracking-wide transition-all duration-300"
            style={{ background: base }}
            onMouseEnter={(e) => (e.currentTarget.style.background = hover)}
            onMouseLeave={(e) => (e.currentTarget.style.background = base)}
        >
            {label}
            <ArrowRight size={14} strokeWidth={2.5} />
        </Link>
    );
}

// ─── Single alternating row ───────────────────────────────────────────────────
function SocialRow({ row, isLast }) {
    return (
        <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${isLast ? "" : "mb-16 sm:mb-14"
                }`}
        >
            {/* Image */}
            <div className={`order-1 ${row.imageLeft ? "lg:order-1" : "lg:order-2"}`}>
                <div className="relative overflow-hidden rounded-[24px] shadow-2xl">
                    <img
                        src={row.image.src}
                        alt={row.image.alt}
                        className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                        draggable={false}
                    />
                </div>
            </div>

            {/* Text */}
            <div className={`order-2 ${row.imageLeft ? "lg:order-2" : "lg:order-1"}`}>
                <h3 className="text-2xl md:text-3xl font-extrabold text-[#15189a] uppercase leading-tight font-din">
                    {row.headline}
                </h3>
                <div className="mt-4 space-y-3">
                    {row.paragraphs.map((para, i) => (
                        <RichParagraph key={i} segments={para} />
                    ))}
                </div>
                {row.ctas.length > 0 && (
                    <div className="flex flex-wrap gap-3 mt-6">
                        {row.ctas.map((cta) => (
                            <GradientButton
                                key={cta.label}
                                label={cta.label}
                                href={cta.href}
                                external={cta.external}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function SocialEventsPromo() {
    return (
        <section
            className="py-16 md:py-20"
        // style={{ background: "linear-gradient(135deg, #15189a 0%, #0d1440 60%, #15189a 100%)" }}
        >
            <div className="container mx-auto px-4 xl:px-8">
                {content.rows.map((row, index) => (
                    <SocialRow
                        key={row.id}
                        row={row}
                        isLast={index === content.rows.length - 1}
                    />
                ))}
            </div>
        </section>
    );
}
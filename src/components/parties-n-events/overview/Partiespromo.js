"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    rows: [
        {
            id: "celebrate",
            imageLeft: false,
            headline: "Ready to Celebrate?",
            body: "We looove options! Take your pick from can't-miss promos for your next event at Dave & Buster's. No matter which one you're picking, get you some of those BIG TIME savings!",
            image: {
                src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/FOMO.jpg",
                alt: "Young man riding an arcade motorcycle game at Dave & Buster's with promo text overlay",
            },
            ctas: [{ label: "Contact a Planner", href: "/bangalore/bookings/" }],
        },
        {
            id: "laugh",
            imageLeft: true,
            headline: "Laugh-out-loud events!",
            body: "We have a space for every group, size, and event type. And a chef-crafted menu to satisfy your tastebuds. Check out our event guide for more!",
            image: {
                src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/Laugh-out-loud.jpg",
                alt: "Female team leader giving a presentation to colleagues during a corporate meeting in a well-lit office setting",
            },
            ctas: [{ label: "Get Event Guide", href: "/bangalore/bookings/" }],
        },
    ],
};

// ─── Gradient CTA button
// btn-primary hover: linear-gradient(#040651 → #15189a)
// Handled via onMouseEnter/Leave since Tailwind can't express arbitrary gradient hovers
function GradientButton({ label, href }) {
    const base = "linear-gradient(to bottom, #040651, #15189a)";
    const hover = "linear-gradient(to bottom, #040651, #15189a)";

    return (
        <Link
            href={href}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                 text-white text-sm font-bold uppercase tracking-wide
                 transition-all duration-300"
            style={{ background: base }}
            onMouseEnter={(e) => (e.currentTarget.style.background = hover)}
            onMouseLeave={(e) => (e.currentTarget.style.background = base)}
        >
            {label}
            {/* <ArrowRight size={14} strokeWidth={2.5} /> */}
        </Link>
    );
}

// ─── Single row ───────────────────────────────────────────────────────────────
function PartyRow({ row, isLast }) {
    return (
        <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${isLast ? "" : "mb-16 sm:mb-14"
                }`}
        >
            {/* Image — top on mobile, honours imageLeft on desktop */}
            <div className={`order-1 ${row.imageLeft ? "lg:order-1" : "lg:order-2"}`}>
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
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
                <h3 className="text-2xl md:text-3xl font-extrabold text-[#15189a] uppercase leading-tight">
                    {row.headline}
                </h3>
                <p className="mt-4 text-black text-sm md:text-base leading-relaxed">
                    {row.body}
                </p>
                {row.ctas.length > 0 && (
                    <div className="flex flex-wrap gap-3 mt-6">
                        {row.ctas.map((cta) => (
                            <GradientButton key={cta.label} label={cta.label} href={cta.href} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PartiesPromo() {
    return (
        <section
            className="py-16 md:py-20"
        // style={{
        //     background:
        //         "linear-gradient(135deg, #0d1b40 0%, #1a2f6e 60%, #0d1b40 100%)",
        // }}
        >
            <div className="container mx-auto px-4 xl:px-8">
                {content.rows.map((row, index) => (
                    <PartyRow
                        key={row.id}
                        row={row}
                        isLast={index === content.rows.length - 1}
                    />
                ))}
            </div>
        </section>
    );
}
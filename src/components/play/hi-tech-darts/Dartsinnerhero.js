"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    heading: "FUN TARGET: ACQUIRED",
    body: "Welcome to our all new Hi-Tech Darts Bay redefining the game we all know and love in an AWESOME way. Whether you're a fierce competitor or just wanna chill with your crew, you'll find our Social Bays hit the target on everything you need!\n\nMust be 18+ to play.",
    cta: {
        label: "Start Planning Now",
        href: "/book/game-bookings",
    },
    images: {
        desktop:
            "https://daveandbustersindia.com/wp-content/uploads/2025/04/Arcade-Games-Desk.jpg",
        mobile:
            "https://daveandbustersindia.com/wp-content/uploads/2025/04/arcade-1.jpg",
    },
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function DartsInnerHero() {
    return (
        <section className="relative w-full h-[600px] md:h-screen overflow-hidden">
            {/* ── Responsive background image ─────────────────────────────────── */}
            <picture>
                <source media="(max-width: 991px)" srcSet={content.images.mobile} />
                <img
                    src={content.images.desktop}
                    alt={content.heading}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    loading="eager"
                    draggable={false}
                />
            </picture>

            {/* ── Full overlay for depth ───────────────────────────────────────── */}
            <div
                className="absolute inset-0 pointer-events-none"
            // style={{
            //     background:
            //         "linear-gradient(to right, rgba(13,27,64,0.55) 0%, rgba(13,27,64,0.2) 70%, transparent 100%)",
            // }}
            />

            {/* ── Content ──────────────────────────────────────────────────────── */}
            <div className="relative z-10 container mx-auto px-4 xl:px-8">
                {/*
          Min height gives the section its visual mass.
          The card is pinned to the bottom-left via absolute positioning
          inside a relatively-positioned full-height container —
          matching the original's `position: absolute; bottom: 100px; left: 0`.
        */}
                <div
                    className="relative w-full md:w-1/2"
                    style={{ minHeight: "clamp(420px, 70vh, 580px)" }}
                >
                    {/* Semi-transparent content card — matches original .is-content-area */}
                    <div
                        className="absolute bottom-16 left-0 right-0 md:right-auto flex flex-col gap-4
                       rounded-3xl px-6 py-9 text-white"
                        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                    >
                        {/* Heading */}
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
                            {content.heading}
                        </h1>

                        {/* Body — preserve double line break as paragraph spacing */}
                        <div className="text-sm md:text-base text-white/85 leading-relaxed">
                            {content.body.split("\n\n").map((para, i) => (
                                <p key={i} className={i > 0 ? "mt-3" : ""}>
                                    {para}
                                </p>
                            ))}
                        </div>

                        {/* CTA */}
                        {content.cta && (
                            <div className="mt-1">
                                <Link
                                    href={content.cta.href}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                              text-black
                             text-sm font-semibold uppercase tracking-wide transition-colors"
                                    style={{
                                        background: "linear-gradient(180deg, #ff6f00, #FFBA00)",
                                    }}
                                >
                                    {content.cta.label}
                                    {/* <ArrowRight size={14} strokeWidth={2.5} /> */}
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
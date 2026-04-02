"use client";

import Link from "next/link";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    heading: "NEXT LEVEL PARTIES AWAIT",
    body: "Make your party epic with just a few clicks of the mouse. We'll bring the food, serve the drinks and even clean up afterward. All you need to do is pick your plan and invite the lucky guests.",
    cta: {
        label: "Start Planning",
        href: "/bangalore/bookings/",
    },
    images: {
        desktop:
            "https://daveandbustersindia.com/wp-content/uploads/2025/04/DNB-Bangalore.jpg",
        mobile:
            "https://daveandbustersindia.com/wp-content/uploads/2025/04/banner_mobile.jpg",
    },
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PartiesInnerHero() {
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

            {/* ── Gradient overlay ─────────────────────────────────────────────── */}
            <div
                className="absolute inset-0 pointer-events-none"
            // style={{
            //     background:
            //         "linear-gradient(to right, rgba(13,27,64,0.55) 0%, rgba(13,27,64,0.2) 70%, transparent 100%)",
            // }}
            />

            {/* ── Content ──────────────────────────────────────────────────────── */}
            <div className="relative z-10 container mx-auto px-4 xl:px-8">
                <div
                    className="relative w-full md:w-1/2"
                    style={{ minHeight: "clamp(420px, 70vh, 580px)" }}
                >
                    {/* Semi-transparent card — position: absolute; bottom: 100px; left: 0 */}
                    <div
                        className="absolute bottom-16 left-0 right-0 md:right-auto
                       flex flex-col gap-4 rounded-3xl px-6 py-9 text-white"
                        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                    >
                        {/* Heading */}
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase leading-tight tracking-tight">
                            {content.heading}
                        </h1>

                        {/* Body */}
                        {content.body && (
                            <p className="text-sm md:text-base text-white/85 leading-relaxed">
                                {content.body}
                            </p>
                        )}

                        {/* CTA — btn-secondary with orange→yellow gradient on hover */}
                        {content.cta && (
                            <div className="mt-1">
                                <Link
                                    href={content.cta.href}
                                    className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                             font-semibold text-sm tracking-wide transition-all duration-300
                             text-black"
                                    style={{
                                        background: "linear-gradient(to bottom, #ff6f00, #FFBA00)",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background =
                                            "linear-gradient(to bottom, #e66400, #e6a800)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background =
                                            "linear-gradient(to bottom, #ff6f00, #FFBA00)";
                                    }}
                                >
                                    {content.cta.label}
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
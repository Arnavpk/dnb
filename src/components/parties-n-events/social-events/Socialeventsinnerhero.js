"use client";

import Link from "next/link";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    heading: "The Hub for Social Events in Bangalore",
    body: null,
    cta: {
        label: "Book Now",
        href: "/bangalore/bookings/",
    },
    images: {
        desktop:
            "https://daveandbustersindia.com/wp-content/uploads/2025/04/banner-2.jpg",
        mobile:
            "https://daveandbustersindia.com/wp-content/uploads/2025/04/Mobile-banner-1-1.jpg",
    },
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function SocialEventsInnerHero() {
    return (
        <section className="relative w-screen h-[600px] md:h-screen overflow-hidden">
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
                    {/* Semi-transparent card
              background-color: rgba(0,0,0,0.5)
              border-radius: 25px | padding: 36px 24px
              position: absolute | bottom: 100px | left: 0 */}
                    <div
                        className="absolute bottom-16 left-0 right-0 md:right-auto
                       flex flex-col gap-5 rounded-[25px] px-6 py-9 text-white"
                        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                    >
                        {/* Heading */}
                        <h1 className="text-2xl sm:text-3xl md:text-4xl uppercase font-extrabold leading-tight tracking-tight font-din">
                            {content.heading}
                        </h1>

                        {/* Optional body */}
                        {content.body && (
                            <p className="text-sm md:text-base text-white/85 leading-relaxed">
                                {content.body}
                            </p>
                        )}

                        {/* btn-secondary: --secondary-color (#ff6f00) → --yellow (#FFBA00) */}
                        {content.cta && (
                            <div>
                                <Link
                                    href={content.cta.href}
                                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full
                             text-black font-semibold text-sm uppercase tracking-wide
                             transition-all duration-300 self-start"
                                    style={{
                                        background: "linear-gradient(to bottom, #ff6f00, #FFBA00)",
                                    }}
                                // onMouseEnter={(e) =>
                                // (e.currentTarget.style.background =
                                //     "linear-gradient(to bottom, #040651, #15189a)")
                                // }
                                // onMouseLeave={(e) =>
                                // (e.currentTarget.style.background =
                                //     "linear-gradient(to bottom, #ff6f00, #FFBA00)")
                                // }
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
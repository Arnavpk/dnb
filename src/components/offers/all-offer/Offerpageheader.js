"use client";

import Link from "next/link";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    heading: "IRRESISTIBLE DAVE & BUSTER'S BANGALORE OFFERS YOU JUST CAN'T SAY NO TO!",
    subheading: "Get It Before Everyone Else Does",
    cta: {
        label: "GRAB THE OFFER NOW",
        href: "/bangalore/contact-us/",
    },
    urgencyBadge: {
        prefix: "Hurry! Offers end on 31",
        superscript: "st",
        suffix: " March",
    },
    // Background images — empty in source, set when assets are available
    images: {
        desktop: "",
        mobile: "",
    },
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function OffersPageHeader() {
    const hasBackground = !!content.images.desktop;

    return (
        <section
            className="relative w-full h-full overflow-hidden text-white"
            style={
                hasBackground
                    ? {}
                    : { background: "#15189a" }
            }
        >
            {/* ── Background image (only rendered when src is set) ─────────────── */}
            {hasBackground && (
                <>
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
                    {/* Overlay */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: "rgba(21,24,154,0.6)" }}
                    />
                </>
            )}

            {/* ── Content ──────────────────────────────────────────────────────── */}
            <div className="relative z-10 container mx-auto px-4 xl:px-8">
                <div className="flex justify-center items-center min-h-[360px] sm:min-h-[420px] md:min-h-[480px] py-20">
                    <div className="w-full md:w-10/12 text-center mt-6">

                        {/* H1 — page-header-title */}
                        <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-[60px] font-extrabold leading-tight tracking-tight font-din">
                            {content.heading}
                        </h1>

                        {/* H2 — page-header-sub-heading, primary-font → font-libre */}
                        <h2 className="mt-4 text-base sm:text-lg md:text-xl font-bold text-white/85 font-libre">
                            {content.subheading}
                        </h2>

                        {/* CTA + urgency badge — page-header-description */}
                        <div className="mt-6 flex flex-col items-center gap-4">
                            {/* btn-secondary: #ff6f00 → #FFBA00 gradient */}
                            <Link
                                href={content.cta.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-7 py-3 rounded-full
                           text-white font-semibold text-sm uppercase tracking-wide
                           transition-all duration-300"
                                style={{ background: "linear-gradient(to bottom, #ff6f00, #FFBA00)" }}
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

                            {/* Urgency badge — bg-white-color, p-10px, width: fit-content, centered */}
                            <span className="inline-block text-white font-semibold text-sm px-4 py-2 rounded">
                                {content.urgencyBadge.prefix}
                                <sup className="text-xs">{content.urgencyBadge.superscript}</sup>
                                {content.urgencyBadge.suffix}
                            </span>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
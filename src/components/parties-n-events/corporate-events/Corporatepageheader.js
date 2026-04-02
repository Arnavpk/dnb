"use client";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    heading: "Corporate events in Bangalore don't have to be awkward",
    subheading: "At Dave & Buster's, we're flipping the script",
    images: {
        desktop:
            "https://daveandbustersindia.com/wp-content/uploads/2025/06/Corporate-Desk.webp",
        mobile:
            "https://daveandbustersindia.com/wp-content/uploads/2025/06/Corporate-Mob.webp",
    },
};

// ─── Main Component ───────────────────────────────────────────────────────────
// This variant differs from the left-aligned card InnerHero:
//   - Text is CENTER-aligned (col-md-12 text-center in source)
//   - No semi-transparent card overlay
//   - Has both H1 + H2 subheading stacked
//   - Full-section padding instead of absolute-positioned card
export default function CorporatePageHeader() {
    return (
        <section className="relative w-full overflow-hidden">
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

            {/* ── Overlay — flat navy tint for centered legibility ─────────────── */}
            <div
                className="absolute inset-0 pointer-events-none"
            // style={{ background: "rgba(13,27,64,0.55)" }}
            />

            {/* ── Content ──────────────────────────────────────────────────────── */}
            {/* py-20 matches the original's section padding-top/bottom: 90px */}
            <div className="relative z-10 container mx-auto px-4 xl:px-8">
                <div className="flex justify-center items-center min-h-[360px] sm:min-h-[420px] md:min-h-[480px] py-20 text-center">
                    <div className="w-full md:w-10/12 text-white mt-6">
                        <h1 className="text-2xl uppercase sm:text-3xl md:text-4xl xl:text-5xl font-extrabold leading-tight tracking-tight">
                            {content.heading}
                        </h1>
                        {content.subheading && (
                            <h2 className="mt-4 text-base sm:text-lg md:text-xl font-bold text-white/85">
                                {content.subheading}
                            </h2>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
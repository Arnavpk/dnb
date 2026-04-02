"use client";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    heading: "FREQUENTLY ASKED QUESTIONS",
    subheading: "Everything You Need to Know About Dave & Buster's",
    // Background images — empty in source, set when assets are available
    images: {
        desktop: "",
        mobile: "",
    },
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function FAQPageHeader() {
    const hasBackground = !!content.images.desktop;

    return (
        <section
            className="relative w-full overflow-hidden text-white"
            style={
                { background: "#15189a" }

            }
        >
            {/* ── Background image — renders only when src is set ──────────────── */}
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
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: "rgba(21,24,154,0.6)" }}
                    />
                </>
            )}

            {/* ── Content ──────────────────────────────────────────────────────── */}
            <div className="relative z-10 container mx-auto px-4 xl:px-8">
                <div className="flex justify-center items-center min-h-[300px] sm:min-h-[360px] md:min-h-[400px] py-16 text-center mt-6">
                    <div className="w-full">
                        {/* H1 — page-header-title, font-din */}
                        <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-extrabold leading-tight tracking-tight font-din">
                            {content.heading}
                        </h1>

                        {/* H2 — page-header-sub-heading, primary-font → font-libre */}
                        <h2 className="mt-4 text-base sm:text-lg md:text-xl font-medium text-white/85 font-libre">
                            {content.subheading}
                        </h2>
                    </div>
                </div>
            </div>
        </section>
    );
}
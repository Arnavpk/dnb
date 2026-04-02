"use client";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    // H1 uses text-secondary-color (#ff6f00) with a line break mid-text
    headingLine1: "BEERS. BITES.",
    headingLine2: "BIG WINS.",
    // H2 has an inline secondary-color span on "DELHI!"
    subheadingPrefix: "America's favourite entertainment hub is coming to ",
    subheadingHighlight: "DELHI!",
    images: {
        desktop:
            "https://daveandbustersindia.com/wp-content/uploads/2025/04/beers-bites-bg.png",
        // Same image for both breakpoints in the source
        mobile:
            "https://daveandbustersindia.com/wp-content/uploads/2025/04/beers-bites-bg.png",
    },
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function DelhiComingSoonHeader() {
    return (
        <section className="relative pt-[130px] w-screen overflow-hidden text-white">
            {/* ── Background image ─────────────────────────────────────────────── */}
            <picture>
                <source media="(max-width: 991px)" srcSet={content.images.mobile} />
                <img
                    src={content.images.desktop}
                    alt="Delhi Coming Soon"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    loading="eager"
                    draggable={false}
                />
            </picture>

            {/* ── Dark overlay ─────────────────────────────────────────────────── */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "rgba(21,24,154,0.55)" }}
            />

            {/* ── Content — centered, mt-0 mb-0 pb-0 matching source ──────────── */}
            <div className="relative z-10 container mx-auto px-4 xl:px-8">
                <div className="flex justify-center items-center min-h-[360px] sm:min-h-[420px] md:min-h-[480px] py-16 text-center">
                    <div className="w-full mt-0 mb-0">

                        {/* H1 — text-secondary-color: #ff6f00, page-header-title, line break */}
                        <h1
                            className="text-4xl sm:text-5xl md:text-6xl xl:text-[100px] font-extrabold leading-tight tracking-tight font-din"
                            style={{ color: "#ff6f00" }}
                        >
                            {content.headingLine1}
                            <br />
                            {content.headingLine2}
                        </h1>

                        {/* H2 — primary-font (font-libre), with inline orange span */}
                        <h2 className="mt-4 text-base sm:text-lg md:text-xl font-medium text-white/90 font-libre">
                            {content.subheadingPrefix}
                            <span style={{ color: "#ff6f00" }} className="font-bold">
                                {content.subheadingHighlight}
                            </span>
                        </h2>

                    </div>
                </div>
            </div>
        </section>
    );
}
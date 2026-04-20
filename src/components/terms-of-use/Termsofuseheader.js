"use client";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    heading: "Dave & Buster's Terms of Use",
    subheading: "PLEASE READ THESE TERMS AND CONDITIONS CAREFULLY",
    images: {
        desktop: "",
        mobile: "",
    },
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function TermsOfUseHeader() {
    const hasBackground = !!content.images.desktop;

    return (
        <section
            className="relative w-full overflow-hidden text-white"
            style={
                !hasBackground
                    ? { background: "#15189a" }
                    : {}
            }
        >
            {/* Background image — only when src is set */}
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

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 xl:px-8">
                <div className="flex justify-center items-start py-14 md:py-16 text-center">
                    <div className="w-full mt-6">

                        {/* H1 — page-header-title, font-din */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight font-din mb-4">
                            {content.heading}
                        </h1>

                        {/* H2 — page-header-sub-heading, primary-font → font-libre */}
                        <h2 className="text-sm sm:text-base md:text-lg font-semibold text-white/85 font-libre tracking-widest uppercase">
                            {content.subheading}
                        </h2>

                    </div>
                </div>
            </div>
        </section>
    );
}
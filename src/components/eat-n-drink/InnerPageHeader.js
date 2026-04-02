"use client";

// ─────────────────────────────────────────────
// CMS-ready content object — swap with Strapi
// ─────────────────────────────────────────────
const content = {
    title: "Eat & Drink at Dave & Buster's Bangalore",
    description:
        "Discover an experience where gaming meets gourmet at Dave & Buster's Bangalore.",
    // Set these to your actual image URLs from Strapi/CDN
    backgroundImageDesktop: "",
    backgroundImageMobile: "",
};

// ─────────────────────────────────────────────
// Inner Page Header Component
// ─────────────────────────────────────────────
export default function InnerPageHeader() {
    const hasBg = !!content.backgroundImageDesktop;

    return (
        <section
            className="relative bg-[#15189a] text-white overflow-hidden"
        // style={
        //     hasBg
        //         ? { backgroundImage: `url('${content.backgroundImageDesktop}')` }
        //         : {}
        // }
        >
            {/* Background image overlay (when image present) */}
            {/* {hasBg && (
                <div className="absolute inset-0 bg-black/50 pointer-events-none" />
            )} */}

            {/* Content */}
            <div className="relative z-10 max-w-screen-xl mx-auto px-6 py-16 md:py-24 lg:py-28">
                <div className="flex flex-col items-center text-center gap-5">
                    <h1
                        className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight max-w-3xl uppercase"
                        style={{ fontFamily: '"Libre Franklin", sans-serif' }}
                    >
                        {content.title}
                    </h1>

                    {content.description && (
                        <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl">
                            {content.description}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
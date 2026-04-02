"use client";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    heading: "THE STORY OF DAVE & BUSTER'S",
    body: null,  // Set a string to enable body paragraph
    cta: null,   // Set { label, href } to enable CTA button
    images: {
        desktop:
            "https://daveandbustersindia.com/wp-content/uploads/2025/04/Corporate-event-desk.jpg",
        mobile:
            "https://daveandbustersindia.com/wp-content/uploads/2025/04/Mobile-banner.jpg",
    },
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function HistoryInnerHero() {
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
                    {/* Semi-transparent card
              background-color: rgba(0,0,0,0.5)
              border-radius: 25px | padding: 36px 24px
              position: absolute | bottom: 100px | left: 0 */}
                    <div
                        className="absolute bottom-16 left-0 right-0 md:right-auto
                       flex flex-col gap-4 rounded-[25px] px-6 py-9 text-white"
                        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                    >
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase leading-tight tracking-tight font-din">
                            {content.heading}
                        </h1>

                        {content.body && (
                            <p className="text-sm md:text-base text-white/85 leading-relaxed">
                                {content.body}
                            </p>
                        )}

                        {content.cta && (
                            <div className="mt-1">
                                <a
                                    href={content.cta.href}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                             bg-yellow-500 hover:bg-yellow-400 text-black
                             text-sm font-bold uppercase tracking-wide transition-colors"
                                >
                                    {content.cta.label}
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
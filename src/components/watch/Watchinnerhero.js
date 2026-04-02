"use client";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    heading: "GAME NIGHT HITS DIFFERENT ON THE BIG SCREEN.",
    images: {
        desktop:
            "https://daveandbustersindia.com/wp-content/uploads/2025/04/Watch-at-DNB-Desk.png",
        mobile:
            "https://daveandbustersindia.com/wp-content/uploads/2025/04/Watch-at-DNB-Mob.png",
    },
};

// ─── Watch Inner Hero ─────────────────────────────────────────────────────────
export default function WatchInnerHero() {
    return (
        <section className="relative w-full h-[600px] md:h-screen overflow-hidden">
            {/* ── Responsive background image ─────────────────────────────────── */}
            <picture>
                <source media="(max-width: 991px)" srcSet={content.images.mobile} />
                <img
                    src={content.images.desktop}
                    alt={content.heading}
                    className="absolute inset-0 w-full h-screen object-cover object-center"
                    loading="eager"
                    draggable={false}
                />
            </picture>

            {/* ── Gradient overlay ─────────────────────────────────────────────── */}
            <div
                className="absolute inset-0 pointer-events-none"
            // style={{
            //     background:
            //         "linear-gradient(to right, rgba(13,27,64,0.75) 0%, rgba(13,27,64,0.35) 60%, transparent 100%)",
            // }}
            />

            {/* ── Content ──────────────────────────────────────────────────────── */}
            <div className="relative z-10 container mx-auto px-4 xl:px-8">
                <div className="flex items-center min-h-[320px] sm:min-h-[380px] md:min-h-[440px] lg:min-h-[480px]">
                    <div className="w-full md:w-1/2 bg-[#00000080] rounded-[25px] pt-9 pr-6 pb-9 pl-6">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-extrabold text-white leading-tight tracking-tight">
                            {content.heading}
                        </h1>
                    </div>
                </div>
            </div>
        </section>
    );
}
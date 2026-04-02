"use client";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    heading: "Any reason's a good reason to celebrate at Dave & Buster's",
    body: null, // No sub-heading in this variant
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function SocialEventsIntro() {
    return (
        <section
            className="pb-0 pt-6"
        // style={{ background: "linear-gradient(135deg, #15189a 0%, #0d1440 60%, #15189a 100%)" }}
        >
            <div className="container mx-auto px-4 xl:px-8">
                <div className="flex justify-center">
                    {/* col-md-10 → md:w-10/12 */}
                    <div className="w-full md:w-10/12 text-center">
                        {/* alt-font + text-primary-color on dark bg → #FFBA00 (--yellow) for contrast */}
                        <h2 className="text-2xl md:text-3xl xl:text-4xl font-extrabold text-[#15189a] uppercase tracking-tight font-din mb-2">
                            {content.heading}
                        </h2>
                        {content.body && (
                            <p className="mt-3 text-white/80 text-sm md:text-base leading-relaxed">
                                {content.body}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
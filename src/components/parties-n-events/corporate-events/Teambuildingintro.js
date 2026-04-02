"use client";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    heading: "This is NOT your average team-building",
    body: "At Dave & Buster's, the games do the bonding for you, from nostalgic arcade hits to new-age thrills. Whether it's the intern battling the CEO in Mario Kart or the finance squad going head-to-head in Asphalt, laughter (and maybe a little trash talk) is guaranteed.",
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function TeamBuildingIntro() {
    return (
        <section
            className="pt-6 pb-6"
        // style={{ background: "linear-gradient(135deg, #15189a 0%, #0d1440 60%, #15189a 100%)" }}
        >
            <div className="container mx-auto px-4 xl:px-8">
                <div className="flex justify-center">
                    {/* col-md-10 → md:w-10/12 */}
                    <div className="w-full md:w-10/12 text-center">
                        {/* alt-font → font-din | text-primary-color → text-[#15189a] but on dark bg → text-white */}
                        <h2 className="text-2xl md:text-3xl xl:text-4xl font-extrabold text-[#15189a] uppercase tracking-tight mb-3 font-din">
                            {content.heading}
                        </h2>
                        <p className="text-black text-sm md:text-base leading-relaxed">
                            {content.body}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
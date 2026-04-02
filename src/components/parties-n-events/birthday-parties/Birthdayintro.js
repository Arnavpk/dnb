"use client";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    heading: "Where Birthdays Go Big",
    body: "Gaming, grub, and good times come together for the ultimate birthday celebration in Bangalore. Plan your arcade birthday party at Dave & Buster's in Koramangala, where flashing lights, buzzing machines, and high-score chases turn every moment into a memory. As a top choice for a birthday party in Koramangala and one of the most exciting birthday party places in Bangalore, this is where every birthday party in Bangalore levels up from ordinary to unforgettable.",
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function BirthdayIntro() {
    return (
        <section
            className="pb-6 pt-0"
        // style={{ background: "linear-gradient(135deg, #15189a 0%, #0d1440 60%, #15189a 100%)" }}
        >
            <div className="container mx-auto px-4 xl:px-8">
                <div className="flex justify-center">
                    {/* col-md-10 → md:w-10/12 */}
                    <div className="w-full md:w-10/12 text-center">
                        {/* alt-font + text-secondary-color (#ff6f00) + uppercase */}
                        <h2 className="text-2xl md:text-3xl xl:text-4xl font-extrabold text-[#ff6f00] uppercase tracking-tight mb-3 font-din">
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
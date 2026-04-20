"use client";

import Link from "next/link";

const FALLBACK_TERMS = [
    "Unlimited gameplay duration will begin from the first game tap.",
    "A 60-second interval between consecutive taps is applicable.",
    "The offer is valid only on the same day and cannot be carried forward.",
    "Unlimited gameplay is time-bound only and cannot be paused, extended, or resumed once started.",
    "Gameplay duration cannot be split across multiple users or cards.",
    "Any remaining chip balance can be utilized on a later date.",
    "Time-based unlimited gameplay cannot be carried forward.",
    "A pre-set number of tickets will be credited as per the package.",
    "No tickets will be generated from games during the unlimited gameplay period.",
    "All regular arcade games are included under unlimited gameplay.",
    "VR games and merchandiser/crane games are excluded.",
    "For excluded games, chips will be deducted as per standard game pricing.",
    "Management reserves the right to modify or withdraw the offer at any time without prior notice.",
];

export default function SummerTerms({ section, location = "bangalore" }) {
    const hasStrapi = !!section?.body;

    const termsList = hasStrapi
        ? section.body
            .replace(/<[^>]+>/g, "")
            .split("\n")
            .map((line) => line.replace(/^[\-•]\s*/, "").trim())
            .filter((line) => line.length > 0)
        : FALLBACK_TERMS;

    return (
        <section className="py-12 md:py-16 bg-white">
            <div className="container mx-auto px-4 xl:px-8">
                <div className="flex justify-center">
                    {/* Increased width to accommodate single-line text better */}
                    <div className="w-full lg:w-10/12">

                        <div className="rounded-2xl border-[4px] border-[#ff6f00] px-8 py-8 overflow-x-auto">
                            <h2 className="text-xl md:text-2xl font-extrabold text-[#15189a] uppercase tracking-tight mb-6 text-center">
                                Terms & Conditions
                            </h2>

                            <ul className="space-y-3 min-w-max">
                                {termsList.map((term, i) => (
                                    <li
                                        key={i}
                                        className="flex items-center gap-3 text-sm md:text-base text-black whitespace-nowrap"
                                    >
                                        <span className="shrink-0 w-2 h-2 rounded-full bg-[#ff6f00]" />
                                        {term}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-10 text-center flex flex-col items-center gap-4">
                            <p className="text-black text-sm md:text-base font-semibold">
                                This is a limited period offer, and you don't want to miss it.
                            </p>
                            <Link href={`/${location}/bookings/`}
                                className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wide text-black transition-all duration-300"
                                style={{ background: "linear-gradient(to bottom, #ff6f00, #FFBA00)" }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = "linear-gradient(to bottom, #e66400, #e6a800)"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = "linear-gradient(to bottom, #ff6f00, #FFBA00)"; }}
                            >
                                Book Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
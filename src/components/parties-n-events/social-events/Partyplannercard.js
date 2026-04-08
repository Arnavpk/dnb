"use client";

import Link from "next/link";

const FALLBACK = {
    heading: "NEED A PARTY PLANNER?",
    body: "Our experts are here to help. We specialize in hosting the best social events in Bangalore, from Team Outings to Graduations. Let us help you customize your next group party!",
    ctaLabel: "Contact Us",
    ctaHref: "/bangalore/bookings/",
};

// Props:
//   section — shared.banner from getBannerSection(sections)
//             title    → card heading
//             subtitle → body text
//             link     → CTA href
//             cta_text → CTA label
export default function PartyPlannerCard({ section }) {
    const heading = section?.title || FALLBACK.heading;
    const body = section?.subtitle || FALLBACK.body;
    const ctaHref = section?.link || FALLBACK.ctaHref;
    const ctaLabel = section?.cta_text || FALLBACK.ctaLabel;

    return (
        <section className="pt-0 pb-10">
            <div className="container mx-auto px-4 xl:px-8">
                <div className="flex justify-center">
                    <div className="w-full sm:w-10/12 md:w-5/12 lg:w-4/12">
                        <div className="flex flex-col h-full bg-[#15189a] rounded-2xl overflow-hidden border border-white/20 shadow-xl">
                            <div className="px-5 pt-5 pb-5 text-center text-white flex-1">
                                <h4 className="text-lg font-extrabold text-[#ff6f00] uppercase mb-4">
                                    {heading}
                                </h4>
                                <p className="text-sm text-white/85 leading-relaxed">{body}</p>
                            </div>
                            <div className="pb-6 text-center mt-auto">
                                <Link href={ctaHref}
                                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-[#ff6f00] text-white font-bold text-sm uppercase tracking-wide transition-colors duration-300">
                                    {ctaLabel}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
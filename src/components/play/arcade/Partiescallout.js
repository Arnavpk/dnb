"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const FALLBACK = {
    heading: "FOR PARTIES AND EVENTS",
    body: "Experience the ultimate arcade games in Bangalore at Dave & Buster's! Where every visit becomes an unforgettable gaming adventure!",
    ctaLabel: "Contact a planner",
    ctaHref: "/bangalore/bookings/",
};

// Props:
//   section — shared.banner from getBannerSection(sections)
//             title    → heading
//             subtitle → body text
//             link     → CTA href
//             cta_text → CTA button label
export default function PartiesCallout({ section }) {
    const heading = section?.title || FALLBACK.heading;
    const body = section?.subtitle ?? null;  // ← no fallback, show nothing if empty
    const ctaHref = section?.link || FALLBACK.ctaHref;
    const ctaLabel = section?.cta_text || FALLBACK.ctaLabel;

    return (
        <section className="py-10">
            <div className="container mx-auto px-4 xl:px-8">
                <div
                    className="border-none rounded-3xl px-8 py-12 lg:px-12 flex justify-center"
                    style={{ background: "linear-gradient(to bottom, #ff6f00, #ff00bd)" }}
                >
                    <div className="w-full lg:w-8/12 text-center text-white flex flex-col items-center gap-5">
                        <h3 className="text-2xl md:text-3xl font-extrabold text-white uppercase leading-tight">
                            {heading}
                        </h3>
                        <Link
                            href={ctaHref}
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white text-sm font-bold uppercase tracking-wide transition-colors"
                            style={{ background: "linear-gradient(180deg, #040651, #15189a)" }}
                        >
                            {ctaLabel}
                            <ArrowRight size={14} strokeWidth={2.5} />
                        </Link>

                        {/* Only renders if Strapi has subtitle filled in */}
                        {body && (
                            <p className="text-lg md:text-xl text-white leading-relaxed mt-1 mb-0">
                                {body}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
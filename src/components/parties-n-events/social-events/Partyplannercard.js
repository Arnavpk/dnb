"use client";

import Link from "next/link";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    heading: "NEED A PARTY PLANNER?",
    body: "Our experts are here to help. We specialize in hosting the best social events in Bangalore, from Team Outings to Graduations. Let us help you customize your next group party!",
    cta: {
        label: "Contact Us",
        href: "/bangalore/bookings/",
    },
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PartyPlannerCard() {
    return (
        <section
            className="pt-0 pb-10"
        // style={{ background: "linear-gradient(135deg, #15189a 0%, #0d1440 60%, #15189a 100%)" }}
        >
            <div className="container mx-auto px-4 xl:px-8">
                <div className="flex justify-center">
                    {/* col-md-4 → max-w-sm centered */}
                    <div className="w-full sm:w-10/12 md:w-5/12 lg:w-4/12">
                        {/* bg-primary-color: #15189a card with border for definition on dark bg */}
                        <div className="flex flex-col h-full bg-[#15189a] rounded-2xl overflow-hidden border border-white/20 shadow-xl">
                            {/* Body */}
                            <div className="px-5 pt-5 pb-5 text-center text-white flex-1">
                                {/* text-secondary-color: #ff6f00 | alt-font → font-din */}
                                <h4 className="text-lg font-extrabold text-[#ff6f00] uppercase mb-4 font-din">
                                    {content.heading}
                                </h4>
                                <p className="text-sm text-white/85 leading-relaxed">
                                    {content.body}
                                </p>
                            </div>

                            {/* CTA — btn-secondary-outline: outlined style using secondary color */}
                            <div className="pb-6 text-center mt-auto">
                                <Link
                                    href={content.cta.href}
                                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full
                             border-2 border-[#ff6f00] text-white font-bold text-sm uppercase
                             tracking-wide
                             transition-colors duration-300"
                                // style={{ border: "linear-gradient(180deg, #ff6f00, #FFBA00)" }}
                                >
                                    {content.cta.label}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
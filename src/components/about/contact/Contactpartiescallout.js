"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    heading: "FOR PARTIES AND EVENTS",
    body: null, // No body text in this variant
    cta: {
        label: "Contact as planner",
        href: "/bangalore/bookings/",
    },
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function SocialPartiesCallout() {
    return (
        <section
            className="pt-0 pb-20"
        // style={{ background: "linear-gradient(135deg, #15189a 0%, #0d1440 60%, #15189a 100%)" }}
        >
            <div className="container mx-auto px-4 xl:px-8">
                {/* reserve-table-box:
            background: linear-gradient(--secondary-color #ff6f00 → --pink #ff00bd)
            border + border-radius-24px + p-50px */}
                <div
                    className="rounded-[24px] px-8 py-12 lg:px-12 flex justify-center"
                    style={{
                        background: "linear-gradient(to bottom, #ff6f00, #ff00bd)",
                    }}
                >
                    <div className="w-full lg:w-8/12 text-center text-white flex flex-col items-center gap-5">

                        {/* Heading */}
                        <h3 className="text-2xl md:text-3xl font-extrabold text-white uppercase leading-tight font-din">
                            {content.heading}
                        </h3>

                        {/* btn-primary: #15189a → #040651 gradient */}
                        <Link
                            href={content.cta.href}
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full
                         text-white font-bold text-sm uppercase tracking-wide
                         transition-all duration-300"
                            style={{ background: "linear-gradient(to bottom, #040651, #15189a)" }}
                        // onMouseEnter={(e) =>
                        // (e.currentTarget.style.background =
                        //     "linear-gradient(to bottom, #040651, #15189a)")
                        // }
                        // onMouseLeave={(e) =>
                        // (e.currentTarget.style.background =
                        //     "linear-gradient(to bottom, #15189a, #040651)")
                        // }
                        >
                            {content.cta.label}
                            <ArrowRight size={14} strokeWidth={2.5} />
                        </Link>

                        {/* Optional body */}
                        {content.body && (
                            <p className="text-lg md:text-xl text-white/90 leading-relaxed mt-1 mb-0">
                                {content.body}
                            </p>
                        )}

                    </div>
                </div>
            </div>
        </section>
    );
}
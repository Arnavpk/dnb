"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    heading: "FOR PARTIES AND EVENTS",
    body: "Planning a celebration or group outing? From birthdays to corporate events, Dave & Buster's delivers high-energy entertainment, iconic games, and one of the most exciting pool table Bangalore attractions for unforgettable moments.",
    cta: {
        label: "Contact a planner",
        href: "/bangalore/bookings/",
    },
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PoolPartiesCallout() {
    return (
        <section
            className="py-10"
        // style={{
        //     background:
        //         "linear-gradient(135deg, #0d1b40 0%, #1a2f6e 60%, #0d1b40 100%)",
        // }}
        >
            <div className="container mx-auto px-4 xl:px-8">
                {/* Orange → pink gradient box — matches .reserve-table-box */}
                <div
                    className="rounded-3xl px-8 py-12 lg:px-12 flex justify-center"
                    style={{ background: "linear-gradient(to bottom, #ff6f00, #ff00bd)" }}
                >
                    <div className="w-full lg:w-8/12 text-center text-white flex flex-col items-center gap-5">
                        <h3 className="text-2xl md:text-3xl font-extrabold text-white uppercase leading-tight">
                            {content.heading}
                        </h3>

                        <Link
                            href={content.cta.href}
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full
                         text-white
                         text-sm font-semibold tracking-wide transition-colors"
                            style={{ background: "linear-gradient(180deg, #040651, #15189a)" }}
                        >
                            {content.cta.label}
                            {/* <ArrowRight size={14} strokeWidth={2.5} /> */}
                        </Link>

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
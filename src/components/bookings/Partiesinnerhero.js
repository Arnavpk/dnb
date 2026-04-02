"use client";

import Link from "next/link";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    heading: "Plan Your Party at Dave & Buster's Bangalore",
    subheading: "Complete the form below to get the party started!",
    body: "Must be 18+ to book an event. Select your favorite Dave & Buster's location in the form below, for event planner contact information.",
    phone: {
        display: "+91 8069088400",
        href: "tel:8069088400",
    },
};

// ─── Main Component ───────────────────────────────────────────────────────────
// bg-blue-light-gradient: dark navy top-left → royal blue mid → bright aqua bottom-right
// Matches the live screenshot exactly — deep blue top fading to cyan/aqua at bottom
export default function PartiesInnerHero() {
    return (
        <section
            className="pb-15 pt-16 md:pt-20"
            style={{
                background: "linear-gradient(to bottom, #15189a, #22d8ff)",
            }}
        >
            <div className="mx-auto px-[15px]" style={{ maxWidth: "88%" }}>
                {/* col-md-8 → w-8/12 on desktop, full width on mobile */}
                <div className="w-full md:w-8/12">

                    {/* H1 — very large, bold, white, uppercase, DINBuster font */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold text-white uppercase leading-[1.05] tracking-tight font-din">
                        {content.heading}
                    </h1>

                    {/* H2 — h4 size, yellow/amber, uppercase, bold — matches "COMPLETE THE FORM..." in screenshot */}
                    <h2 className="mt-6 text-sm md:text-base font-extrabold text-white uppercase tracking-wide font-din">
                        {content.subheading}
                    </h2>

                    {/* Body paragraph + phone link */}
                    <p className="mt-3 text-black text-sm md:text-base leading-relaxed">
                        {content.body}
                        <br />
                        For enquiries/bookings please call us on{" "}
                        {/* Phone link — matches the bright blue link color in screenshot */}
                        <Link
                            href={content.phone.href}
                            className="font-bold text-[#15189a] hover:underline underline-offset-2 transition-colors"
                        >
                            {content.phone.display}
                        </Link>
                    </p>

                </div>
            </div>
        </section>
    );
}
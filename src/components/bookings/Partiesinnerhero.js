"use client";

import Link from "next/link";

const FALLBACK = {
    heading: "Plan Your Party at Dave & Buster's Bangalore",
    subheading: "Complete the form below to get the party started!",
    body: "Must be 18+ to book an event. Select your favorite Dave & Buster's location in the form below, for event planner contact information.",
    phoneDisplay: "+91 8069088400",
    phoneHref: "tel:8069088400",
};

// Props:
//   section  — shared.quote from getQuoteSection(sections)
//              title → heading
//              body  → subheading text
//   location — location object from Strapi with phone_general field
export default function PartiesInnerHero({ section, location }) {
    const heading = section?.title || FALLBACK.heading;
    const subheading = section?.body || FALLBACK.subheading;
    const phoneDisplay = location?.phone_group || FALLBACK.phoneDisplay;
    const phoneHref = phoneDisplay
        ? `tel:${phoneDisplay.replace(/\D/g, "")}`
        : FALLBACK.phoneHref;

    return (
        <section
            className="pb-15 pt-16 md:pt-20"
            style={{ background: "linear-gradient(to bottom, #15189a, #22d8ff)" }}
        >
            <div className="mx-auto px-[15px]" style={{ maxWidth: "88%" }}>
                <div className="w-full md:w-8/12">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold text-white uppercase leading-[1.05] tracking-tight">
                        {heading}
                    </h1>
                    <h2 className="mt-6 text-sm md:text-base font-extrabold text-white uppercase tracking-wide">
                        {subheading}
                    </h2>
                    <p className="mt-3 text-black text-sm md:text-base leading-relaxed">
                        {FALLBACK.body}
                        <br />
                        For enquiries/bookings please call us on{" "}
                        <Link href={phoneHref}
                            className="font-bold text-[#15189a] hover:underline underline-offset-2 transition-colors">
                            {phoneDisplay}
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}
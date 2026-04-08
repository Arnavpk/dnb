"use client";

import Link from "next/link";

const FALLBACK = {
    heading: "Have thoughts, ideas, or just want to say hey?",
    phoneDisplay: "+91 90280 43567",
    phoneHref: "tel:9028043567",
};

// Props:
//   section  — shared.quote from getQuoteSection(sections)
//              title → heading
//              body  → intro text (optional)
//   location — location object from Strapi with phone_group field
export default function ContactIntro({ section, location }) {
    const heading = section?.title || FALLBACK.heading;
    const phoneDisplay = location?.phone_group || FALLBACK.phoneDisplay;
    const phoneHref = phoneDisplay ? `tel:${phoneDisplay.replace(/\D/g, "")}` : FALLBACK.phoneHref;

    return (
        <section className="pt-10 pb-0">
            <div className="container mx-auto px-4 xl:px-8">
                <div className="flex justify-center">
                    <div className="w-full md:w-10/12 text-center">
                        <h2 className="text-2xl md:text-3xl xl:text-4xl font-extrabold text-[#15189a] uppercase tracking-tight mb-3">
                            {heading}
                        </h2>
                        <p className="text-black text-sm md:text-base leading-relaxed">
                            For general inquiries, please fill out the form below or you can call us at{" "}
                            <Link href={phoneHref}
                                className="text-[#15189a] font-bold hover:underline underline-offset-2 transition-colors">
                                {phoneDisplay}
                            </Link>
                            , Monday-Sunday from 12PM-12AM IST.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
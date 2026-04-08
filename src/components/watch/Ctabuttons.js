"use client";

import Link from "next/link";

const FALLBACK = {
    contactLabel: "Contact Us",
    contactHref: "/bangalore/contact-us/",
    callLabel: "Call Now",
    callHref: "tel:8069088400",
};

// Props:
//   section — shared.banner from getBannerSection(sections)
//             cta_text → contact button label
//             link     → contact button href
//             subtitle → call number (e.g. "8069088400")
//             title    → call button label (e.g. "Call Now")
export default function CtaButtons({ section }) {
    const contactLabel = section?.cta_text || FALLBACK.contactLabel;
    const contactHref = section?.link || FALLBACK.contactHref;
    const callLabel = section?.title || FALLBACK.callLabel;
    // subtitle stores the phone number — prefix tel: if not already present
    const rawCall = section?.subtitle || FALLBACK.callHref;
    const callHref = rawCall.startsWith("tel:") ? rawCall : `tel:${rawCall}`;

    const buttons = [
        { id: "contact", label: contactLabel, href: contactHref },
        { id: "call", label: callLabel, href: callHref },
    ];

    return (
        <div className="bg-[#15189a]">
            <div className="container mx-auto px-4 xl:px-8 py-8">
                <div className="flex justify-center">
                    <div className="w-full md:w-6/12 flex flex-wrap justify-center gap-4">
                        {buttons.map((btn) => (
                            <Link
                                key={btn.id}
                                href={btn.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-white text-sm tracking-wide transition-colors"
                                style={{ background: "linear-gradient(180deg, #040651, #15189a)" }}
                            >
                                {btn.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
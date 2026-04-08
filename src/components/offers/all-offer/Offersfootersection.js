"use client";

import Link from "next/link";

const FALLBACK = {
    contactLabel: "Contact Us",
    contactHref: "/bangalore/about/contact/",
    callLabel: "Call Now",
    callHref: "tel:8069088400",
    termsHeading: "Terms & Conditions:",
    termsItems: [
        "HALF-PRICE WEDNESDAYS: This offer is valid exclusively on all standard arcade and VR games every Wednesday.",
        "AGE RESTRICTIONS: Alcohol will only be served to individuals who are 21 years or older, and a government-issued ID is mandatory for age verification.",
    ],
};

// Props:
//   section — shared.banner from getBannerSection(sections)
//             cta_text → contact button label
//             link     → contact button href
//             title    → call button label
//             subtitle → call number
//   richText — shared.rich-text from getRichTextSection(sections)
//             body → terms & conditions text
export default function OffersFooterSection({ section, richText }) {
    const contactLabel = section?.cta_text || FALLBACK.contactLabel;
    const contactHref = section?.link || FALLBACK.contactHref;
    const callLabel = section?.title || FALLBACK.callLabel;
    const rawCall = section?.subtitle || FALLBACK.callHref;
    const callHref = rawCall.startsWith("tel:") ? rawCall : `tel:${rawCall}`;

    const buttons = [
        { id: "contact", label: contactLabel, href: contactHref },
        { id: "call", label: callLabel, href: callHref },
    ];

    return (
        <section className="py-10 md:py-12">
            {/* CTA buttons */}
            <div className="container mx-auto px-4 xl:px-8 mb-10">
                <div className="flex justify-center">
                    <div className="flex flex-wrap justify-center gap-4 w-full md:w-6/12">
                        {buttons.map((btn) => (
                            <Link key={btn.id} href={btn.href}
                                target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-white font-bold text-sm uppercase tracking-wide transition-all duration-300"
                                style={{ background: "linear-gradient(to bottom, #15189a, #040651)" }}>
                                {btn.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Terms */}
            <div className="container mx-auto px-4 xl:px-8">
                <div className="w-full">
                    <h5 className="text-black font-bold text-sm uppercase mb-3">
                        {FALLBACK.termsHeading}
                    </h5>
                    {richText?.body ? (
                        <div className="prose prose-sm max-w-none text-black"
                            dangerouslySetInnerHTML={{ __html: richText.body }} />
                    ) : (
                        <ul className="space-y-2 list-none ps-0">
                            {FALLBACK.termsItems.map((item, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#ff6f00] shrink-0" />
                                    <span className="text-black text-sm leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </section>
    );
}
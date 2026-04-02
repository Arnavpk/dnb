"use client";

import Link from "next/link";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    ctas: [
        {
            id: "contact",
            label: "Contact Us",
            href: "/bangalore/about/contact/",
            external: true,
        },
        {
            id: "call",
            label: "Call Now",
            href: "tel:8069088400",
            external: true,
        },
    ],
    terms: {
        heading: "Terms & Conditions:",
        items: [
            "HALF-PRICE WEDNESDAYS: This offer is valid exclusively on all standard arcade and VR games every Wednesday.",
            "AGE RESTRICTIONS: Alcohol will only be served to individuals who are 21 years or older, and a government-issued ID is mandatory for age verification.",
        ],
    },
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function OffersFooterSection() {
    return (
        <section
            className="py-10 md:py-12"
        // style={{ background: "linear-gradient(135deg, #15189a 0%, #0d1440 60%, #15189a 100%)" }}
        >
            {/* ── CTA buttons ───────────────────────────────────────────────── */}
            <div className="container mx-auto px-4 xl:px-8 mb-10">
                <div className="flex justify-center">
                    <div className="flex flex-wrap justify-center gap-4 w-full md:w-6/12">
                        {content.ctas.map((btn) => (
                            <Link
                                key={btn.id}
                                href={btn.href}
                                target={btn.external ? "_blank" : undefined}
                                rel={btn.external ? "noopener noreferrer" : undefined}
                                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full
                           text-white font-bold text-sm uppercase tracking-wide
                           transition-all duration-300"
                                style={{ background: "linear-gradient(to bottom, #15189a, #040651)" }}
                            // onMouseEnter={(e) =>
                            // (e.currentTarget.style.background =
                            //     "linear-gradient(to bottom, #040651, #15189a)")
                            // }
                            // onMouseLeave={(e) =>
                            // (e.currentTarget.style.background =
                            //     "linear-gradient(to bottom, #15189a, #040651)")
                            // }
                            >
                                {btn.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Terms & Conditions ────────────────────────────────────────── */}
            <div className="container mx-auto px-4 xl:px-8">
                <div className="w-full">
                    <h5 className="text-black font-bold text-sm uppercase mb-3">
                        {content.terms.heading}
                    </h5>
                    <ul className="space-y-2 list-none ps-0">
                        {content.terms.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#ff6f00] shrink-0" />
                                <span className="text-black text-sm leading-relaxed">
                                    {item}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
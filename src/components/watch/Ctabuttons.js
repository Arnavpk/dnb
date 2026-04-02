"use client";

import Link from "next/link";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    buttons: [
        {
            id: "contact",
            label: "Contact Us",
            href: "/bangalore/contact-us/",
            external: true,
        },
        {
            id: "call",
            label: "Call Now",
            href: "tel:8069088400",
            external: true,
        },
    ],
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CtaButtons() {
    return (
        <div className="bg-[#15189a]">
            <div className="container mx-auto px-4 xl:px-8 py-8">
                <div className="flex justify-center">
                    <div className="w-full md:w-6/12 flex flex-wrap justify-center gap-4">
                        {content.buttons.map((btn) => (
                            <Link
                                key={btn.id}
                                href={btn.href}
                                target={btn.external ? "_blank" : undefined}
                                rel={btn.external ? "noopener noreferrer" : undefined}
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
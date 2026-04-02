"use client";

import Link from "next/link";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    guestRelations: {
        heading: "GUEST RELATIONS",
        phones: [
            { label: "For Group Booking", display: "+91 90280 43567", href: "tel:9028043567" },
            { label: "For General Enquiry", display: "+91 80 6908 8400", href: "tel:8069088400" },
        ],
        hours: {
            label: "BUSINESS HOURS :",
            value: "Monday-Sunday 12pm-12am IST",
        },
    },
    address: {
        heading: "ADDRESS :",
        lines: [
            { text: "Dave & Buster's Bangalore", sup: null },
            { text: "1", sup: "st", suffix: " Floor, Mantri Avenue" },
            { text: "KHB Games Village, Koramangala, Bangalore, Karnataka 560047", sup: null },
        ],
    },
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ContactInfo() {
    return (
        // bg-primary-color: #15189a
        <section className="bg-[#15189a] text-white py-12 md:py-16">
            <div className="container mx-auto px-4 xl:px-8">
                {/* Two columns — col-md-5 + offset-md-2 → gap between them */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">

                    {/* ── Guest Relations ─────────────────────────────────────────── */}
                    <div>
                        {/* fs-20: text-[20px] */}
                        <p className="text-[20px] font-semibold mb-1 text-white">
                            {content.guestRelations.heading}
                        </p>

                        <div className="mt-4 space-y-2">
                            {content.guestRelations.phones.map((phone) => (
                                <p key={phone.href} className="text-sm md:text-base text-white/85">
                                    {phone.label} —{" "}
                                    <Link
                                        href={phone.href}
                                        className="text-[#ff6f00] font-semibold hover:underline underline-offset-2 transition-colors"
                                    >
                                        {phone.display}
                                    </Link>
                                </p>
                            ))}

                            <p className="text-sm md:text-base font-semibold text-white pt-1">
                                {content.guestRelations.hours.label}
                            </p>
                            <p className="text-sm md:text-base text-white/85">
                                {content.guestRelations.hours.value}
                            </p>
                        </div>
                    </div>

                    {/* ── Address ─────────────────────────────────────────────────── */}
                    <div>
                        <p className="text-[20px] font-semibold mb-1 text-white">
                            {content.address.heading}
                        </p>

                        <div className="mt-4">
                            <address className="not-italic text-sm md:text-base text-white/85 leading-relaxed">
                                {content.address.lines.map((line, i) => (
                                    <span key={i}>
                                        {line.text}
                                        {line.sup && <sup className="text-xs">{line.sup}</sup>}
                                        {line.suffix && line.suffix}
                                        <br />
                                    </span>
                                ))}
                            </address>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
"use client";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    heading: "TERMS & CONDITIONS",
    items: [
        "The birthday person receives one complimentary game of bowling.",
        "Up to four accompanying guests get a 10% bowling discount.",
        "Offer is valid only through online bookings.",
        "The validity window is five days around your birthday.",
        "The birthday guest must show a valid government ID for verification.",
        "Each guest can avail the birthday offer once per year.",
        "Applicable only to bowling. Food, drinks, and arcade games are billed separately.",
        "The offer cannot be transferred, combined with others, or redeemed for cash.",
        "Dave & Buster's reserves the right to cancel misuse or fraudulent claims.",
        "Not valid on major public holidays like Diwali or Christmas.",
    ],
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function TermsConditions() {
    return (
        // bg-white section
        <section className="bg-white py-10 md:py-14">
            <div className="container mx-auto px-4 xl:px-8">
                {/* .terms-container:
            border: 4px solid #f97316 (≈ --secondary-color #ff6f00)
            border-radius: 25px
            box-shadow: 0 10px 30px rgba(0,0,0,0.1)
            padding: 20px */}
                <div
                    className="mx-auto max-w-3xl rounded-[25px] p-5 md:p-8"
                    style={{
                        border: "4px solid #ff6f00",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                    }}
                >
                    {/* Heading — text-primary-color: #15189a */}
                    <h3 className="text-center text-xl md:text-2xl font-extrabold text-[#15189a] uppercase font-din mb-6">
                        {content.heading}
                    </h3>

                    {/* Terms list — gap: 20px between items, no bullet markers (list-style: none) */}
                    <ul className="flex flex-col gap-5 list-none ps-0 ms-0">
                        {content.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                                {/* Custom bullet — secondary orange dot */}
                                <span className="mt-1.5 w-2 h-2 rounded-full bg-[#ff6f00] shrink-0" />
                                <span className="text-[#232323] text-sm md:text-base leading-relaxed">
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
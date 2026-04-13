"use client";

import Link from "next/link";

// ─── CMS-ready content ────────────────────────────────────────────────────────
const content = {
    banner: {
        image: {
            desktop: "https://daveandbustersindia.com/wp-content/uploads/2025/04/DNB-Bangalore.jpg",
            mobile: "https://daveandbustersindia.com/wp-content/uploads/2025/04/banner_mobile.jpg",
        },
    },
    intro: {
        heading: "SUMMER EXCLUSION OFFER",
        body: "This summer, keep things simple — more games, more time, more fun. With our Summer Exclusion Offer, you get unlimited access to 75/60+ arcade & VR games, so you can play what you want, as much as you want.",
    },
    packages: [
        {
            id: "2hr",
            duration: "2 Hours",
            price: "₹2,999",
            chips: "3000 Chips",
            chipsLabel: "Game Credits Loaded",
            play: "2 Hrs Play",
            playLabel: "Unlimited Games",
            tickets: "300 Tickets",
            ticketsLabel: "Redeem for Prizes",
            bestValue: false,
        },
        {
            id: "3hr",
            duration: "3 Hours",
            price: "₹4,999",
            chips: "5000 Chips",
            chipsLabel: "Game Credits Loaded",
            play: "3 Hrs Play",
            playLabel: "Unlimited Games",
            tickets: "500 Tickets",
            ticketsLabel: "Redeem for Prizes",
            bestValue: true,
        },
    ],
    terms: [
        "Unlimited gameplay duration will begin from the first game tap.",
        "A 60-second interval between consecutive taps is applicable.",
        "The offer is valid only on the same day and cannot be carried forward.",
        "Unlimited gameplay is time-bound only and cannot be paused, extended, or resumed once started.",
        "Gameplay duration cannot be split across multiple users or cards.",
        "Any remaining chip balance can be utilized on a later date. Time-based unlimited gameplay cannot be carried forward.",
        "A pre-set number of tickets will be credited as per the package. No tickets will be generated from games during the unlimited gameplay period.",
        "All regular arcade games are included under unlimited gameplay. VR games and merchandiser/crane games are excluded. For excluded games, chips will be deducted as per standard game pricing.",
        "Management reserves the right to modify or withdraw the offer at any time without prior notice.",
    ],
    limitedNote: "This is a limited period offer, and you don't want to miss it.",
    bookingHref: (location) => `/${location}/bookings/`,
};

// ─── Package Card ─────────────────────────────────────────────────────────────
function PackageCard({ pkg }) {
    return (
        <div className={`relative rounded-3xl border-4 p-8 flex flex-col gap-5 bg-white shadow-xl
            ${pkg.bestValue ? "border-[#ff6f00]" : "border-[#15189a]/30"}`}>

            {pkg.bestValue && (
                <div className="absolute -top-4 right-5">
                    <span className="bg-[#ff6f00] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide">
                        Best Value
                    </span>
                </div>
            )}

            {/* Duration + Price */}
            <div className="border-b border-gray-200 pb-5">
                <p className="text-[#15189a] font-bold text-xl">{pkg.duration}</p>
                <p className="text-[#ff6f00] font-extrabold text-5xl mt-2">{pkg.price}</p>
            </div>

            {/* Features */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <span className="text-3xl">🎮</span>
                    <div>
                        <p className="font-extrabold text-[#15189a] text-xl leading-tight">{pkg.chips}</p>
                        <p className="text-sm text-gray-500">{pkg.chipsLabel}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-3xl">🕹️</span>
                    <div>
                        <p className="font-extrabold text-[#15189a] text-xl leading-tight">{pkg.play}</p>
                        <p className="text-sm text-gray-500">{pkg.playLabel}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-3xl">🎟️</span>
                    <div>
                        <p className="font-extrabold text-[#15189a] text-xl leading-tight">{pkg.tickets}</p>
                        <p className="text-sm text-gray-500">{pkg.ticketsLabel}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Book Now Button (reused) ─────────────────────────────────────────────────
function BookNowButton({ href }) {
    return (
        <Link
            href={href}
            className="inline-flex items-center gap-2 px-10 py-3.5 rounded-full font-bold text-sm uppercase tracking-wide text-black transition-all duration-300"
            style={{ background: "linear-gradient(to bottom, #ff6f00, #FFBA00)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "linear-gradient(to bottom, #e66400, #e6a800)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "linear-gradient(to bottom, #ff6f00, #FFBA00)"; }}
        >
            Book Now
        </Link>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function SummerOfferPage({ location = "bangalore" }) {
    const bookingHref = content.bookingHref(location);

    return (
        <>
            {/* ── 1. Banner — image only, Book Now button ────────────────── */}
            <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
                <picture>
                    <source media="(max-width: 991px)" srcSet={content.banner.image.mobile} />
                    <img
                        src={content.banner.image.desktop}
                        alt="Summer Exclusion Offer"
                        className="absolute inset-0 w-full h-full object-cover object-center"
                        loading="eager"
                        draggable={false}
                    />
                </picture>

                {/* Subtle overlay for button readability */}
                <div className="absolute inset-0 bg-black/20 pointer-events-none" />

                {/* Book Now only — centred on the banner */}
                <div className="relative z-10 flex items-end justify-center h-full pb-12">
                    <BookNowButton href={bookingHref} />
                </div>
            </section>

            {/* ── 2. Heading + Body below the banner ────────────────────── */}
            <section
                className="py-14 md:py-16"
                style={{ background: "linear-gradient(135deg, #1a2f9e 0%, #0d1b64 100%)" }}
            >
                <div className="container mx-auto px-4 xl:px-8 text-center">
                    <h1 className="text-3xl md:text-4xl xl:text-5xl font-extrabold text-white uppercase tracking-tight font-din mb-5">
                        {content.intro.heading}
                    </h1>
                    <p className="text-white/85 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                        {content.intro.body}
                    </p>
                </div>
            </section>

            {/* ── 3. Packages ───────────────────────────────────────────── */}
            <section
                className="py-16 md:py-20"
                style={{ background: "linear-gradient(135deg, #1a2f9e 0%, #0d1b64 100%)" }}
            >
                <div className="container mx-auto px-4 xl:px-8">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white uppercase tracking-tight font-din text-center mb-10">
                        Unlimited Arcade Games
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
                        {content.packages.map((pkg) => (
                            <PackageCard key={pkg.id} pkg={pkg} />
                        ))}
                    </div>

                    <div className="flex justify-center mt-12">
                        <BookNowButton href={bookingHref} />
                    </div>
                </div>
            </section>

            {/* ── 4. Terms & Conditions ─────────────────────────────────── */}
            <section className="py-12 md:py-16 bg-white">
                <div className="container mx-auto px-4 xl:px-8">
                    <div className="flex justify-center">
                        {/* Orange border card — matches screenshot */}
                        <div className="w-full max-w-3xl border-2 border-[#ff6f00] rounded-2xl p-8 md:p-10">

                            <h2 className="text-xl md:text-2xl font-extrabold text-[#15189a] uppercase tracking-tight font-din text-center mb-6">
                                Terms &amp; Conditions
                            </h2>

                            {/* All terms flat — orange bullet, single line style, no sub-terms */}
                            <ul className="space-y-3">
                                {content.terms.map((term, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm md:text-base text-[#232323] leading-relaxed">
                                        {/* Orange bullet — no blue */}
                                        <span className="mt-[7px] shrink-0 w-2 h-2 rounded-full bg-[#ff6f00]" />
                                        {term}
                                    </li>
                                ))}
                            </ul>

                        </div>
                    </div>

                    {/* Limited period note + Book Now BELOW T&C */}
                    <div className="flex flex-col items-center gap-5 mt-10">
                        <p className="text-[#232323] text-sm md:text-base font-semibold text-center">
                            {content.limitedNote}
                        </p>
                        <BookNowButton href={bookingHref} />
                    </div>
                </div>
            </section>
        </>
    );
}
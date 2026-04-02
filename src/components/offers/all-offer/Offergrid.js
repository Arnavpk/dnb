"use client";

import Link from "next/link";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    offers: [
        {
            id: "wednesday",
            image: {
                src: "https://daveandbustersindia.com/wp-content/uploads/2025/02/Half-Price-Wednesday.jpg",
                alt: "Half Priced Wednesdays offer on arcade & VR games",
            },
            title: "Half-Priced Wednesdays",
            body: "Hey gamers! Wednesday offers in Bangalore just got twice the fun for half the price. Get 75+ arcade and VR games at flat 50% off only at Dave & Buster's Koramangala, because midweek blues deserve a power-up.",
            cta: null,
        },
        {
            id: "happy-hours",
            image: {
                src: "https://daveandbustersindia.com/wp-content/uploads/2026/03/Happy-Hours_NEW-Desktop-Size-1-1.jpg",
                alt: "Happy Hours offer at Dave & Buster's Bangalore",
            },
            title: "HAPPY HOURS",
            body: "Why stop at one when you can have two? Enjoy our happy hours Bangalore special with 1+1 drink offers Monday to Thursday, 12 PM - 7 PM. Double the drinks, double the fun. For 21+ only because some perks come with age!",
            cta: null,
        },
        {
            id: "combo",
            image: {
                src: "https://daveandbustersindia.com/wp-content/uploads/2025/07/Eat-Drink-Play-Combo-Offer-Banner-1.jpg",
                alt: "Dave & Buster's promotional graphic for the Eat, Drink & Play Combo deal.",
            },
            title: "EAT DRINK PLAY COMBO",
            body: "Why choose, when you can have it all? Eat, Drink & Play all at just ₹1799! Perfect drink combos included in this Dave & Buster's Bangalore offers package.",
            cta: null,
        },
        {
            id: "bowling",
            image: {
                src: "https://daveandbustersindia.com/wp-content/uploads/2026/03/Weekday-Offer-Bangalore-Offer-Size.jpg",
                alt: "Weekday Bowling Offer at Dave & Buster's Bangalore",
            },
            title: "Weekday Bowling Offer",
            body: "Roll into the best bowling experience at half the price!",
            cta: null,
        },
        {
            id: "birthday",
            image: {
                src: "https://daveandbustersindia.com/wp-content/uploads/2025/09/Birthday-Strike-Offer-Size.jpg",
                alt: "Advertisement for Dave & Buster's birthday offer, including free bowling and a discount for friends.",
            },
            title: "Birthday Offer",
            body: "Celebrate your birthday with a free game of bowling! Plus, bring up to 4 friends and they'll enjoy 10% off too.",
            cta: {
                label: "Book Now",
                href: "/bangalore/offers/birthday-offer/",
                external: false,
            },
        },
    ],
};

// ─── Offer Card ───────────────────────────────────────────────────────────────
function OfferCard({ offer }) {
    return (
        <div className="flex flex-col overflow-hidden rounded-2xl shadow-lg h-full">
            {/* Image */}
            <div className="relative overflow-hidden">
                <img
                    src={offer.image.src}
                    alt={offer.image.alt}
                    className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                    draggable={false}
                />
            </div>

            {/* Body — bg-primary-color: #15189a */}
            <div className="bg-[#15189a] flex flex-col flex-1 px-5 pt-5 pb-5 text-center text-white">
                {/* title — alt-font + text-secondary-color: #ff6f00 */}
                <h4 className="text-lg font-extrabold text-[#ff6f00] uppercase mb-3 font-din">
                    {offer.title}
                </h4>
                <p className="text-sm text-white/85 leading-relaxed flex-1">
                    {offer.body}
                </p>

                {/* Optional CTA — btn-secondary-outline */}
                {offer.cta && (
                    <div className="mt-5 pb-1">
                        <Link
                            href={offer.cta.href}
                            target={offer.cta.external ? "_blank" : undefined}
                            rel={offer.cta.external ? "noopener noreferrer" : undefined}
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full
                         border-2 border-[#ff6f00] text-white font-bold text-sm uppercase
                         tracking-wide
                         transition-colors duration-300"
                        >
                            {offer.cta.label}
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function OffersGrid() {
    return (
        <section
            className="py-12 md:py-16"
        // style={{ background: "linear-gradient(135deg, #15189a 0%, #0d1440 60%, #15189a 100%)" }}
        >
            <div className="container mx-auto px-4 xl:px-8">
                {/* col-md-4 → 3-col on md+, 2-col on sm, 1-col on mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-7">
                    {content.offers.map((offer) => (
                        <OfferCard key={offer.id} offer={offer} />
                    ))}
                </div>
            </div>
        </section>
    );
}
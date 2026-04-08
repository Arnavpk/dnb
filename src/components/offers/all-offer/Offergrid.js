"use client";

import Link from "next/link";
import { getStrapiMedia } from "@/lib/strapi";

const FALLBACK_OFFERS = [
    {
        id: "wednesday",
        imageSrc: "https://daveandbustersindia.com/wp-content/uploads/2025/02/Half-Price-Wednesday.jpg",
        imageAlt: "Half Priced Wednesdays",
        title: "Half-Priced Wednesdays",
        body: "Hey gamers! Wednesday offers in Bangalore just got twice the fun for half the price. Get 75+ arcade and VR games at flat 50% off.",
        ctaLabel: null, ctaHref: null,
    },
    {
        id: "happy-hours",
        imageSrc: "https://daveandbustersindia.com/wp-content/uploads/2026/03/Happy-Hours_NEW-Desktop-Size-1-1.jpg",
        imageAlt: "Happy Hours",
        title: "HAPPY HOURS",
        body: "Enjoy our happy hours Bangalore special with 1+1 drink offers Monday to Thursday, 12 PM - 7 PM. For 21+ only.",
        ctaLabel: null, ctaHref: null,
    },
    {
        id: "combo",
        imageSrc: "https://daveandbustersindia.com/wp-content/uploads/2025/07/Eat-Drink-Play-Combo-Offer-Banner-1.jpg",
        imageAlt: "Eat Drink Play Combo",
        title: "EAT DRINK PLAY COMBO",
        body: "Why choose, when you can have it all? Eat, Drink & Play all at just ₹1799!",
        ctaLabel: null, ctaHref: null,
    },
    {
        id: "bowling",
        imageSrc: "https://daveandbustersindia.com/wp-content/uploads/2026/03/Weekday-Offer-Bangalore-Offer-Size.jpg",
        imageAlt: "Weekday Bowling Offer",
        title: "Weekday Bowling Offer",
        body: "Roll into the best bowling experience at half the price!",
        ctaLabel: null, ctaHref: null,
    },
    {
        id: "birthday",
        imageSrc: "https://daveandbustersindia.com/wp-content/uploads/2025/09/Birthday-Strike-Offer-Size.jpg",
        imageAlt: "Birthday Offer",
        title: "Birthday Offer",
        body: "Celebrate your birthday with a free game of bowling! Plus, bring up to 4 friends and they'll enjoy 10% off too.",
        ctaLabel: "Book Now", ctaHref: "/bangalore/offers/birthday-offer/",
    },
];

// Normalize shared.footer-data-right[] → offer cards
// footer-data-right: { image, image_title, image_description, cta_text, cta_link }
function normalizeOffers(strapiCards) {
    if (!strapiCards?.length) return FALLBACK_OFFERS;
    return strapiCards.map((card, i) => ({
        id: card.id ?? i,
        imageSrc: card.image ? getStrapiMedia(card.image) ?? "" : "",
        imageAlt: card.image_title ?? "",
        title: card.image_title ?? "",
        body: card.image_description ?? "",
        ctaLabel: card.cta_text ?? null,
        ctaHref: card.cta_link ?? null,
    }));
}

function OfferCard({ offer }) {
    return (
        <div className="flex flex-col overflow-hidden rounded-2xl shadow-lg h-full">
            <div className="relative overflow-hidden">
                {offer.imageSrc ? (
                    <img src={offer.imageSrc} alt={offer.imageAlt}
                        className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy" draggable={false} />
                ) : (
                    <div className="w-full aspect-video bg-gray-200" />
                )}
            </div>
            <div className="bg-[#15189a] flex flex-col flex-1 px-5 pt-5 pb-5 text-center text-white">
                <h4 className="text-lg font-extrabold text-[#ff6f00] uppercase mb-3">{offer.title}</h4>
                <p className="text-sm text-white/85 leading-relaxed flex-1">{offer.body}</p>
                {offer.ctaLabel && offer.ctaHref && (
                    <div className="mt-5 pb-1">
                        <Link href={offer.ctaHref}
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-[#ff6f00] text-white font-bold text-sm uppercase tracking-wide transition-colors duration-300">
                            {offer.ctaLabel}
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

// Props:
//   cards — shared.footer-data-right[] from getFooterDataRightSections(sections)
export default function OffersGrid({ cards: strapiCards = [] }) {
    const offers = normalizeOffers(strapiCards);

    return (
        <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 xl:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-7">
                    {offers.map((offer) => (
                        <OfferCard key={offer.id} offer={offer} />
                    ))}
                </div>
            </div>
        </section>
    );
}
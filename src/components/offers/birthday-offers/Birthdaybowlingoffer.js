"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { getStrapiMedia } from "@/lib/strapi";

const FALLBACK = {
    heading: "Get Free Bowling at Dave & Buster's Bangalore",
    subheading: "Celebrate your special day with one of the best birthday offers Bangalore has to offer. Enjoy an unbeatable free bowling experience, delicious food, exciting arcade games, and fun times with friends and family.",
    footnote: "Limited time offer – Book online to secure your celebration!",
    ctaLabel: "BOOK YOUR BIRTHDAY BOWLING",
    cards: [
        {
            id: "play-free",
            iconSrc: "https://daveandbustersindia.com/wp-content/uploads/2025/09/play-free.png",
            iconAlt: "Gift box icon",
            titleColor: "#ff6f00",
            title: "YOU PLAY FREE",
            body: "The birthday guest gets one complete game of free bowling to make the celebration extra special.",
        },
        {
            id: "squad-off",
            iconSrc: "https://daveandbustersindia.com/wp-content/uploads/2025/09/squad-off.png",
            iconAlt: "Group icon",
            titleColor: "#15189a",
            title: "Your Squad Gets 10% Off",
            body: "Bring up to four friends and treat them to a bowling discount. They'll get 10% off when they join your birthday celebration.",
        },
    ],
};

// Normalize shared.step-section → cards shape
// step-item: { step_number, title, description, image(media[]) }
function normalizeCards(section) {
    if (!section?.steps?.length) return {
        heading: FALLBACK.heading,
        subheading: FALLBACK.subheading,
        footnote: FALLBACK.footnote,
        ctaLabel: FALLBACK.ctaLabel,
        cards: FALLBACK.cards,
    };

    return {
        heading: section.title || FALLBACK.heading,
        subheading: section.subtitle || FALLBACK.subheading,
        footnote: FALLBACK.footnote,
        ctaLabel: FALLBACK.ctaLabel,
        cards: section.steps.map((step, i) => ({
            id: step.id ?? i,
            iconSrc: step.image ? getStrapiMedia(step.image) ?? "" : FALLBACK.cards[i]?.iconSrc ?? "",
            iconAlt: step.title ?? "",
            titleColor: i === 0 ? "#ff6f00" : "#15189a",
            title: step.title ?? "",
            body: step.description ?? "",
        })),
    };
}

// Props:
//   section — shared.step-section from getStepSection(sections)
export default function BirthdayBowlingOffer({ section }) {
    const [modalOpen, setModalOpen] = useState(false);
    const { heading, subheading, footnote, ctaLabel, cards } = normalizeCards(section);

    return (
        <>
            <section className="py-14 md:py-16 bg-[#15189a]">
                <div className="container mx-auto px-4 xl:px-8">
                    <div className="flex justify-center">
                        <div className="w-full md:w-10/12 text-center">
                            <h1 className="text-2xl uppercase md:text-3xl xl:text-4xl font-extrabold text-white leading-tight">
                                {heading}
                            </h1>
                            <hr className="my-4 border-0 mx-auto" style={{ borderTop: "2px solid #ff6f00", opacity: 1, width: "20%" }} />
                            <p className="text-white text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
                                {subheading}
                            </p>

                            {/* Cards */}
                            <div className="flex flex-col sm:flex-row justify-center gap-6 mt-10">
                                {cards.map((card) => (
                                    <div key={card.id}
                                        className="flex flex-col items-center bg-white rounded-3xl shadow-xl p-6 sm:p-8 w-full sm:w-1/2 max-w-sm mx-auto sm:mx-0">
                                        <div className="w-20 h-20 mb-4 flex items-center justify-center">
                                            {card.iconSrc ? (
                                                <img src={card.iconSrc} alt={card.iconAlt}
                                                    className="w-full h-full object-contain" loading="lazy" draggable={false} />
                                            ) : (
                                                <div className="w-full h-full bg-gray-200 rounded-full" />
                                            )}
                                        </div>
                                        <h3 className="text-lg font-extrabold uppercase mb-3" style={{ color: card.titleColor }}>
                                            {card.title}
                                        </h3>
                                        <p className="text-black text-sm leading-relaxed text-center">{card.body}</p>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <div className="mt-8">
                                <button
                                    onClick={() => setModalOpen(true)}
                                    className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-white font-bold text-sm uppercase tracking-wide transition-all duration-300"
                                    style={{ background: "linear-gradient(to bottom, #ff6f00, #FFBA00)" }}
                                >
                                    {ctaLabel}
                                </button>
                            </div>
                            <p className="mt-5 text-white text-sm">{footnote}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-[300] flex items-center justify-center p-4"
                    role="dialog" aria-modal="true">
                    <div className="absolute inset-0 bg-black/70" onClick={() => setModalOpen(false)} />
                    <div className="relative z-10 w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">
                        <button onClick={() => setModalOpen(false)}
                            className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 transition-colors"
                            aria-label="Close modal">
                            <X size={16} strokeWidth={2.5} />
                        </button>
                        <div className="p-8">
                            <h3 className="text-xl font-extrabold text-[#15189a] uppercase mb-4">
                                Book Your Birthday Bowling
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Fill in your details to book your birthday bowling experience at Dave & Buster's Bangalore.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
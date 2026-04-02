"use client";

import { useState } from "react";
import { X } from "lucide-react";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    heading: "Get Free Bowling at Dave & Buster's Bangalore",
    subheading:
        "Celebrate your special day with one of the best birthday offers Bangalore has to offer. Enjoy an unbeatable free bowling experience, delicious food, exciting arcade games, and fun times with friends and family.",
    cards: [
        {
            id: "play-free",
            icon: {
                src: "https://daveandbustersindia.com/wp-content/uploads/2025/09/play-free.png",
                alt: "Gift box icon representing the birthday offer at Dave & Buster's.",
            },
            // text-secondary-color: #ff6f00
            titleColor: "#ff6f00",
            title: "YOU PLAY FREE",
            body: "The birthday guest gets one complete game of free bowling to make the celebration extra special. It's the perfect way to kick off your birthday party in Bangalore.",
        },
        {
            id: "squad-off",
            icon: {
                src: "https://daveandbustersindia.com/wp-content/uploads/2025/09/squad-off.png",
                alt: "Blue group icon for birthday party packages and group bookings at Dave & Buster's",
            },
            // text-primary-color: #15189a — on white card this is fine
            titleColor: "#15189a",
            title: "Your Squad Gets 10% Off",
            body: "Bring up to four friends and treat them to a bowling discount. They'll get 10% off when they join your birthday celebration at Dave & Buster's.",
        },
    ],
    cta: {
        label: "BOOK YOUR BIRTHDAY BOWLING",
        modalTitle: "Book Your Birthday Bowling",
    },
    footnote: "Limited time offer – Book online to secure your celebration!",
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function BirthdayBowlingOffer() {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            {/* ── Section — bg-primary-color: #15189a ──────────────────────── */}
            <section className="py-14 md:py-16 bg-[#15189a]">
                <div className="container mx-auto px-4 xl:px-8">
                    <div className="flex justify-center">
                        <div className="w-full md:w-10/12 text-center">

                            {/* Heading + divider */}
                            <h1 className="text-2xl uppercase md:text-3xl xl:text-4xl font-extrabold text-white font-din leading-tight">
                                {content.heading}
                            </h1>
                            {/* hr: text-secondary-color, width 20%, centered */}
                            <hr
                                className="my-4 border-0 mx-auto"
                                style={{
                                    borderTop: "2px solid #ff6f00",
                                    opacity: 1,
                                    width: "20%",
                                }}
                            />

                            {/* Subheading */}
                            <p className="text-white text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
                                {content.subheading}
                            </p>

                            {/* ── Offer cards ─────────────────────────────────────── */}
                            <div className="flex flex-col sm:flex-row justify-center gap-6 mt-10">
                                {content.cards.map((card) => (
                                    <div
                                        key={card.id}
                                        className="flex flex-col items-center bg-white rounded-3xl shadow-xl p-6 sm:p-8 w-full sm:w-1/2 max-w-sm mx-auto sm:mx-0"
                                    >
                                        {/* Icon */}
                                        <div className="w-20 h-20 mb-4 flex items-center justify-center">
                                            <img
                                                src={card.icon.src}
                                                alt={card.icon.alt}
                                                className="w-full h-full object-contain"
                                                loading="lazy"
                                                draggable={false}
                                            />
                                        </div>

                                        {/* Title */}
                                        <h3
                                            className="text-lg font-extrabold uppercase font-din mb-3"
                                            style={{ color: card.titleColor }}
                                        >
                                            {card.title}
                                        </h3>

                                        {/* Body */}
                                        <p className="text-black text-sm leading-relaxed text-center">
                                            {card.body}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* ── CTA button ──────────────────────────────────────── */}
                            {/* btn-secondary: #ff6f00 → #FFBA00 gradient */}
                            <div className="mt-8">
                                <button
                                    onClick={() => setModalOpen(true)}
                                    className="inline-flex items-center gap-2 px-7 py-3 rounded-full
                             text-white font-bold text-sm uppercase tracking-wide
                             transition-all duration-300"
                                    style={{
                                        background: "linear-gradient(to bottom, #ff6f00, #FFBA00)",
                                    }}
                                // onMouseEnter={(e) =>
                                // (e.currentTarget.style.background =
                                //     "linear-gradient(to bottom, #040651, #15189a)")
                                // }
                                // onMouseLeave={(e) =>
                                // (e.currentTarget.style.background =
                                //     "linear-gradient(to bottom, #ff6f00, #FFBA00)")
                                // }
                                >
                                    {content.cta.label}
                                </button>
                            </div>

                            {/* Footnote */}
                            <p className="mt-5 text-white text-sm">
                                {content.footnote}
                            </p>

                        </div>
                    </div>
                </div>
            </section>

            {/* ── Modal ─────────────────────────────────────────────────────── */}
            {modalOpen && (
                <div
                    className="fixed inset-0 z-[300] flex items-center justify-center p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-label={content.cta.modalTitle}
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/70"
                        onClick={() => setModalOpen(false)}
                    />

                    {/* Panel */}
                    <div className="relative z-10 w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">
                        <button
                            onClick={() => setModalOpen(false)}
                            className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 transition-colors"
                            aria-label="Close modal"
                        >
                            <X size={16} strokeWidth={2.5} />
                        </button>
                        <div className="p-8">
                            <h3 className="text-xl font-extrabold text-[#15189a] uppercase font-din mb-4">
                                {content.cta.modalTitle}
                            </h3>
                            <p className="text-white text-sm leading-relaxed">
                                Fill in your details to book your birthday bowling experience at Dave & Buster's Bangalore.
                            </p>
                            {/* Drop <CorporateEventForm /> or a dedicated birthday booking form here */}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
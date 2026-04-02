"use client";

import { useState } from "react";
import { X } from "lucide-react";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    slide: {
        desktopImage:
            "https://daveandbustersindia.com/wp-content/uploads/2025/09/Birthday-banner_Desk.jpg",
        mobileImage:
            "https://daveandbustersindia.com/wp-content/uploads/2025/09/Birthday-banner_Mob.jpg",
        alt: "Birthday Offer at Dave & Buster's",
    },
    // Modal content — populate from Strapi
    modal: {
        title: "Birthday Offer",
        body: null, // Set string or JSX to populate modal body
    },
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function BirthdayOfferBanner() {
    const [modalOpen, setModalOpen] = useState(false);
    const { slide, modal } = content;

    return (
        <>
            {/* ── Banner ────────────────────────────────────────────────────── */}
            <div className="relative w-full overflow-hidden cursor-pointer group">
                <button
                    onClick={() => setModalOpen(true)}
                    className="block w-full text-left focus:outline-none"
                    aria-haspopup="dialog"
                    aria-label={`Open ${modal.title}`}
                >
                    {/* Responsive image — mobile ≤767px, desktop above */}
                    <picture>
                        <source media="(max-width: 767px)" srcSet={slide.mobileImage} />
                        <img
                            src={slide.desktopImage}
                            alt={slide.alt}
                            className="w-full h-auto object-cover block transition-transform duration-500 group-hover:scale-[1.01]"
                            loading="lazy"
                            draggable={false}
                        />
                    </picture>

                    {/* Gradient overlay — bg-gradient-sherpa-blue-black */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                    // style={{
                    //     background:
                    //         "linear-gradient(to right, rgba(13,27,64,0.5) 0%, rgba(0,0,0,0.08) 60%, transparent 100%)",
                    // }}
                    />
                </button>
            </div>

            {/* ── Modal ─────────────────────────────────────────────────────── */}
            {modalOpen && (
                <div
                    className="fixed inset-0 z-[300] flex items-center justify-center p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-label={modal.title}
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/70"
                        onClick={() => setModalOpen(false)}
                    />

                    {/* Modal panel */}
                    <div className="relative z-10 w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">
                        {/* Close button */}
                        <button
                            onClick={() => setModalOpen(false)}
                            className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 transition-colors z-10"
                            aria-label="Close modal"
                        >
                            <X size={16} strokeWidth={2.5} />
                        </button>

                        {/* Modal content */}
                        <div className="p-8">
                            <h3 className="text-xl font-extrabold text-[#15189a] uppercase font-din mb-4">
                                {modal.title}
                            </h3>
                            {modal.body ? (
                                <div className="text-[#232323] text-sm leading-relaxed">
                                    {modal.body}
                                </div>
                            ) : (
                                <p className="text-[#717580] text-sm">
                                    Content coming soon. Check back for the latest birthday offers!
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { getStrapiMedia } from "@/lib/strapi";

const FALLBACK = {
    desktopSrc: "https://daveandbustersindia.com/wp-content/uploads/2025/09/Birthday-banner_Desk.jpg",
    mobileSrc: "https://daveandbustersindia.com/wp-content/uploads/2025/09/Birthday-banner_Mob.jpg",
    alt: "Birthday Offer at Dave & Buster's",
    modalTitle: "Birthday Offer",
};

// Props:
//   section — shared.slider from getSliderSection(sections)
//             files[0] → desktop image
//             files[1] → mobile image
export default function BirthdayOfferBanner({ section }) {
    const [modalOpen, setModalOpen] = useState(false);

    const files = section?.files ?? [];
    const desktopSrc = files[0] ? getStrapiMedia(files[0]) : FALLBACK.desktopSrc;
    const mobileSrc = files[1] ? getStrapiMedia(files[1]) : FALLBACK.mobileSrc;
    const modalTitle = FALLBACK.modalTitle;

    return (
        <>
            {/* Banner */}
            <div className="relative w-full overflow-hidden cursor-pointer group">
                <button
                    onClick={() => setModalOpen(true)}
                    className="block w-full text-left focus:outline-none"
                    aria-haspopup="dialog"
                    aria-label={`Open ${modalTitle}`}
                >
                    <picture>
                        <source media="(max-width: 767px)" srcSet={mobileSrc} />
                        <img
                            src={desktopSrc}
                            alt={FALLBACK.alt}
                            className="w-full h-auto object-cover block transition-transform duration-500 group-hover:scale-[1.01]"
                            loading="lazy"
                            draggable={false}
                        />
                    </picture>
                    <div className="absolute inset-0 pointer-events-none" />
                </button>
            </div>

            {/* Modal */}
            {modalOpen && (
                <div
                    className="fixed inset-0 z-[300] flex items-center justify-center p-4"
                    role="dialog" aria-modal="true" aria-label={modalTitle}
                >
                    <div className="absolute inset-0 bg-black/70" onClick={() => setModalOpen(false)} />
                    <div className="relative z-10 w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">
                        <button
                            onClick={() => setModalOpen(false)}
                            className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 transition-colors"
                            aria-label="Close modal"
                        >
                            <X size={16} strokeWidth={2.5} />
                        </button>
                        <div className="p-8">
                            <h3 className="text-xl font-extrabold text-[#15189a] uppercase mb-4">
                                {modalTitle}
                            </h3>
                            <p className="text-gray-500 text-sm">
                                Content coming soon. Check back for the latest birthday offers!
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
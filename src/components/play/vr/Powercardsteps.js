"use client";

import { useState } from "react";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    heading: "How to Use Your Rechargeable Card",
    learnMore: null, // No CTA link in this variant — set to { label, href } to enable
    steps: [
        {
            id: "charge",
            number: 1,
            title: "CHARGE",
            description:
                "Get your Rechargeable Card at the Dave & Buster's Bangalore and top it up in no time. Stay charged and ready for the fun!",
            image: {
                src: "https://daveandbustersindia.com/wp-content/uploads/2024/10/WatchOverview_Charge_Updated_539.jpg",
                alt: "Charge your Power Card at Dave & Buster's",
            },
        },
        {
            id: "play",
            number: 2,
            title: "PLAY",
            description:
                "Use your Rechargeable Card to activate any arcade or VR games in Bangalore instantly. Just tap, play, and let the fun begin!",
            image: {
                src: "https://daveandbustersindia.com/wp-content/uploads/2024/10/TopGunMaverick02-desktop-supporting.jpg",
                alt: "Play games at Dave & Buster's with your Power Card",
            },
        },
        {
            id: "win",
            number: 3,
            title: "WIN",
            description:
                "Many games offer opportunities to win tickets. Tickets can be redeemed in the WIN! store for prizes.",
            image: {
                src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/win.jpg",
                alt: "Win prizes at Dave & Buster's",
            },
        },
    ],
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PowerCardSteps() {
    const [activeStep, setActiveStep] = useState(content.steps[0].id);

    return (
        <section
            className="py-14 md:py-16"
            style={{
                background: "linear-gradient(135deg, #f5c400 0%, #f0b800 100%)",
            }}
        >
            <div className="container mx-auto px-4 xl:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                    {/* ── Left: active image panel ─────────────────────────────────── */}
                    <div className="relative overflow-hidden rounded-3xl shadow-2xl order-2 lg:order-1">
                        {content.steps.map((step) => (
                            <div
                                key={step.id}
                                className={`transition-opacity duration-500 ${step.id === activeStep
                                    ? "opacity-100 relative"
                                    : "opacity-0 absolute inset-0"
                                    }`}
                                aria-hidden={step.id !== activeStep}
                            >
                                <img
                                    src={step.image.src}
                                    alt={step.image.alt}
                                    className="w-full h-auto object-cover"
                                    loading={step.number === 1 ? "eager" : "lazy"}
                                    draggable={false}
                                />
                            </div>
                        ))}
                    </div>

                    {/* ── Right: vertical stepper ───────────────────────────────────── */}
                    <div className="order-1 lg:order-2 flex flex-col">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0d1b40] uppercase tracking-tight mb-8">
                            {content.heading}
                        </h2>

                        <ul className="flex flex-col gap-0" role="tablist">
                            {content.steps.map((step, index) => {
                                const isActive = step.id === activeStep;
                                const isLast = index === content.steps.length - 1;

                                return (
                                    <li key={step.id} role="presentation">
                                        <button
                                            role="tab"
                                            aria-selected={isActive}
                                            onClick={() => setActiveStep(step.id)}
                                            className="w-full text-left flex flex-row items-start gap-0 group"
                                        >
                                            {/* Number circle + connector line */}
                                            <div className="flex flex-col items-center shrink-0 pr-4">
                                                <div
                                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-extrabold border-2 transition-colors duration-300 ${isActive
                                                        ? "bg-[#0d1b40] text-yellow-400 border-[#0d1b40]"
                                                        : "bg-transparent text-[#0d1b40] border-[#0d1b40]"
                                                        }`}
                                                >
                                                    {step.number}
                                                </div>
                                                {!isLast && (
                                                    <div className="w-0.5 flex-1 min-h-[2rem] bg-[#0d1b40]/30 my-1" />
                                                )}
                                            </div>

                                            {/* Step content */}
                                            <div className={`flex flex-col ${isLast ? "pb-0" : "pb-8"}`}>
                                                <h3
                                                    className={`text-lg font-extrabold uppercase leading-tight transition-colors duration-300 ${isActive
                                                        ? "text-[#0d1b40]"
                                                        : "text-black"
                                                        }`}
                                                >
                                                    {step.title}
                                                </h3>
                                                <span
                                                    className={`mt-1 text-sm leading-relaxed transition-colors duration-300 ${isActive
                                                        ? "text-black"
                                                        : "text-black"
                                                        }`}
                                                >
                                                    {step.description}
                                                </span>
                                            </div>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>

                        {/* Optional CTA link */}
                        {content.learnMore && (
                            <div className="mt-6">
                                <a
                                    href={content.learnMore.href}
                                    className="inline-flex items-center gap-2 text-[#0d1b40] font-bold text-base uppercase tracking-wide hover:underline underline-offset-4 transition-all"
                                >
                                    {content.learnMore.label}
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
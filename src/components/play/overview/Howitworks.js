"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    heading: "HOW IT WORKS",
    learnMore: {
        label: "Learn More",
        href: "/bangalore/bookings/",
    },
    steps: [
        {
            id: "charge",
            number: 1,
            title: "CHARGE",
            description:
                "Get your rechargeable Card at the D&B store and top it up in no time.",
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
                "Use your Card to activate any arcade or VR game instantly.",
            image: {
                src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/DARTS.jpg",
                alt: "Play games at Dave & Buster's",
            },
        },
        {
            id: "win",
            number: 3,
            title: "WIN!",
            description:
                "Many games offer opportunities to win tickets. Redeem them for prizes or store them.",
            image: {
                src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/win.jpg",
                alt: "Win prizes at Dave & Buster's",
            },
        },
    ],
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function HowItWorks() {
    const [activeStep, setActiveStep] = useState(content.steps[0].id);

    const activeImage = content.steps.find((s) => s.id === activeStep)?.image;

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

                    {/* ── Right: vertical stepper tabs ─────────────────────────────── */}
                    <div className="order-1 lg:order-2 flex flex-col">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-[#15189a] uppercase tracking-tight mb-8">
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
                                            aria-controls={`panel-${step.id}`}
                                            onClick={() => setActiveStep(step.id)}
                                            className="w-full text-left flex flex-row items-start gap-0 group"
                                        >
                                            {/* Step indicator column: number circle + connector line */}
                                            <div className="flex flex-col items-center shrink-0 pr-4">
                                                <div
                                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-extrabold border-2 transition-colors duration-300 ${isActive
                                                        ? "bg-[#15189a] text-yellow-400 border-[#15189a]"
                                                        : "bg-transparent text-[#15189a] border-[#15189a]"
                                                        }`}
                                                >
                                                    {step.number}
                                                </div>
                                                {/* Connector line — hidden after last item */}
                                                {!isLast && (
                                                    <div className="w-0.5 flex-1 min-h-[2rem] bg-[#0d1b40]/30 my-1" />
                                                )}
                                            </div>

                                            {/* Step content */}
                                            <div className={`flex flex-col pb-8 ${isLast ? "pb-0" : ""}`}>
                                                <h3
                                                    className={`text-lg font-extrabold uppercase leading-tight transition-colors duration-300 ${isActive
                                                        ? "text-[#15189a]"
                                                        : "text-[#15189a]"
                                                        }`}
                                                >
                                                    {step.title}
                                                </h3>
                                                <span
                                                    className={`mt-1 text-sm leading-relaxed transition-colors duration-300 ${isActive
                                                        ? "text-[#15189a]"
                                                        : "text-[#15189a]"
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

                        {/* Learn More link */}
                        <div className="mt-6">
                            <Link
                                href={content.learnMore.href}
                                className="inline-flex items-center gap-2 text-[#0d1b40] font-bold text-base uppercase tracking-wide hover:underline underline-offset-4 transition-all"
                            >
                                {content.learnMore.label}
                                <ArrowRight size={16} strokeWidth={2.5} />
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
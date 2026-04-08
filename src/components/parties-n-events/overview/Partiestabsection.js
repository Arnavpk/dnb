"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getStrapiMedia } from "@/lib/strapi";

function GradientButton({ label, href }) {
    const base = "linear-gradient(to bottom, #040651, #15189a)";
    return (
        <Link
            href={href}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                 text-white text-sm font-bold uppercase tracking-wide transition-all duration-300"
            style={{ background: base }}
            onMouseEnter={(e) => (e.currentTarget.style.background = base)}
            onMouseLeave={(e) => (e.currentTarget.style.background = base)}
        >
            {label}
            <ArrowRight size={14} strokeWidth={2.5} />
        </Link>
    );
}

export default function PartiesTabSection({ section }) {
    const tabs = section?.tabs ?? [];
    const [activeTab, setActiveTab] = useState(0);
    const activeData = tabs[activeTab];

    if (!tabs.length) return null;

    return (
        <section className="pt-6 pb-5">
            <div className="container mx-auto px-4 xl:px-8">
                {/* Tab navigation */}
                <ul
                    className="flex flex-wrap justify-center gap-x-1 gap-y-2 border-b border-[#15189a] mb-10 md:mb-12"
                    role="tablist"
                >
                    {tabs.map((tab, index) => {
                        const isActive = index === activeTab;
                        return (
                            <li key={tab.id ?? index} role="presentation">
                                <button
                                    role="tab"
                                    aria-selected={isActive}
                                    aria-controls={`panel-${index}`}
                                    onClick={() => setActiveTab(index)}
                                    className={`relative px-5 py-3 text-sm font-bold uppercase tracking-wide transition-colors
                                        ${isActive
                                            ? "text-[#15189a] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#15189a]"
                                            : "text-[#15189a]"
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            </li>
                        );
                    })}
                </ul>

                {/* Tab panels */}
                {tabs.map((tab, index) => {
                    const image = getStrapiMedia(tab.tab_card?.[0]?.image);
                    const cta_text = tab.tab_card?.[0]?.cta_text;
                    const cta_link = tab.tab_card?.[0]?.cta_link ?? "#";
                    const imageLeft = index % 2 !== 0; // alternate, or adjust to your data

                    return (
                        <div
                            key={tab.id ?? index}
                            id={`panel-${index}`}
                            role="tabpanel"
                            aria-hidden={index !== activeTab}
                            className={`transition-opacity duration-300 ${index === activeTab ? "opacity-100 block" : "opacity-0 hidden"}`}
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                                {image && (
                                    <div className={`order-1 ${imageLeft ? "lg:order-1" : "lg:order-2"}`}>
                                        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                                            <img
                                                src={image}
                                                alt={tab.heading ?? tab.label}
                                                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                                                loading="lazy"
                                                draggable={false}
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className={`order-2 ${imageLeft ? "lg:order-2" : "lg:order-1"}`}>
                                    <h3 className="text-2xl md:text-3xl font-extrabold text-[#15189a] uppercase leading-tight">
                                        {tab.heading}
                                    </h3>
                                    <p className="mt-4 text-black text-sm md:text-base leading-relaxed">
                                        {tab.description}
                                    </p>
                                    {cta_text && (
                                        <div className="mt-6">
                                            <GradientButton label={cta_text} href={cta_link} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
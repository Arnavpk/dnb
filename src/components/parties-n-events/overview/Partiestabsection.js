"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    tabs: [
        {
            id: "birthday",
            label: "BIRTHDAY PARTY",
            imageLeft: false,
            headline: "It's Party Time",
            body: "Celebrate your birthday with a party like no other! Dive into 75+ arcade games, experience the thrill of VR, and challenge your friends to Nitro Bowling, Hi-tech darts, and Immersive pool. Nonstop fun, epic memories, and the best way to level up your special day!",
            image: {
                src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/KIDS-arcade.jpg",
                alt: "Children Play Games",
            },
            cta: { label: "Learn More", href: "/bangalore/bookings/" },
        },
        {
            id: "corporate",
            label: "CORPORATE EVENTS",
            imageLeft: true,
            headline: "WORK HARD, PLAY HARD!",
            body: "Take your corporate event to the next level with 75+ arcade games, thrilling VR experiences, Nitro Bowling, Hi-tech darts, Immersive pool, and more that'll keep the whole team engaged. Work hard, play harder, and make it an event to remember!",
            image: {
                src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/WORK-HARD-PLAY-HARD.jpg",
                alt: "Play Bowling Game",
            },
            cta: { label: "Learn More", href: "/bangalore/bookings/" },
        },
        {
            id: "team",
            label: "TEAM BUILDING",
            imageLeft: true,
            headline: "IN IT TO WIN IT",
            body: "Does your team have what it takes to WIN? Treat your group to an exciting afternoon of challenges that build skills such as strategy, leadership, teamwork and problem solving.",
            image: {
                src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/IN-IT-TO-WIN-IT.jpg",
                alt: "Friends having fun over drinks and nachos at Dave & Buster's bar and arcade venue",
            },
            cta: { label: "Learn More", href: "/bangalore/bookings/" },
        },
    ],
};

// ─── Gradient CTA — matches btn-primary hover: #040651 → #15189a ─────────────
function GradientButton({ label, href }) {
    const base = "linear-gradient(to bottom, #040651, #15189a)";
    const hover = "linear-gradient(to bottom, #040651, #15189a)";
    return (
        <Link
            href={href}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                 text-white text-sm font-bold uppercase tracking-wide transition-all duration-300"
            style={{ background: base }}
            onMouseEnter={(e) => (e.currentTarget.style.background = hover)}
            onMouseLeave={(e) => (e.currentTarget.style.background = base)}
        >
            {label}
            <ArrowRight size={14} strokeWidth={2.5} />
        </Link>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PartiesTabSection() {
    const [activeTab, setActiveTab] = useState(content.tabs[0].id);
    const activeData = content.tabs.find((t) => t.id === activeTab);

    return (
        <section
            className="pt-6 pb-5"
        // style={{
        //     background:
        //         "linear-gradient(135deg, #0d1b40 0%, #1a2f6e 60%, #0d1b40 100%)",
        // }}
        >
            <div className="container mx-auto px-4 xl:px-8">
                {/* ── Tab navigation ───────────────────────────────────────────── */}
                <ul
                    className="flex flex-wrap justify-center gap-x-1 gap-y-2 border-b border-[#15189a] mb-10 md:mb-12"
                    role="tablist"
                >
                    {content.tabs.map((tab) => {
                        const isActive = tab.id === activeTab;
                        return (
                            <li key={tab.id} role="presentation">
                                <button
                                    role="tab"
                                    aria-selected={isActive}
                                    aria-controls={`panel-${tab.id}`}
                                    onClick={() => setActiveTab(tab.id)}
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

                {/* ── Tab panels ───────────────────────────────────────────────── */}
                {content.tabs.map((tab) => (
                    <div
                        key={tab.id}
                        id={`panel-${tab.id}`}
                        role="tabpanel"
                        aria-hidden={tab.id !== activeTab}
                        className={`transition-opacity duration-300 ${tab.id === activeTab ? "opacity-100 block" : "opacity-0 hidden"
                            }`}
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                            {/* Image */}
                            <div className={`order-1 ${tab.imageLeft ? "lg:order-1" : "lg:order-2"}`}>
                                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                                    <img
                                        src={tab.image.src}
                                        alt={tab.image.alt}
                                        className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                                        loading="lazy"
                                        draggable={false}
                                    />
                                </div>
                            </div>

                            {/* Text */}
                            <div className={`order-2 ${tab.imageLeft ? "lg:order-2" : "lg:order-1"}`}>
                                <h3 className="text-2xl md:text-3xl font-extrabold text-[#15189a] uppercase leading-tight">
                                    {tab.headline}
                                </h3>
                                <p className="mt-4 text-black text-sm md:text-base leading-relaxed">
                                    {tab.body}
                                </p>
                                {tab.cta && (
                                    <div className="mt-6">
                                        <GradientButton label={tab.cta.label} href={tab.cta.href} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getStrapiMedia } from "@/lib/strapi";

// ─── Fallback content — used when Strapi has no tab section data yet ──────────
const FALLBACK = {
    heading: "HOW DO YOU D&B?",
    subheading: "Why choose when you can have it all in one place",
    tabs: [
        {
            id: "eat-drink",
            label: "Eat & Drink",
            headline: "LEGENDARY FOOD & DRINKS",
            description:
                "Looking for an incredible bar and amazing restaurant near you? Look no further than Dave & Buster's. We have amazing games and award-winning food and drinks. Come check us out!",
            cards: [
                {
                    id: "food",
                    image: "https://daveandbustersindia.com/wp-content/uploads/2025/07/Food-1.jpg",
                    title: "Award-Winning Food",
                    body: "Our seasonal food menu keeps fresh eats on the table for you and awards coming to us.",
                    cta: { label: "See Food Menu", href: "/menus/DNB_Food_Menus.pdf" },
                },
                {
                    id: "drinks",
                    image: "https://daveandbustersindia.com/wp-content/uploads/2025/07/Drink-1.jpg",
                    title: "Drinks",
                    body: "Our drink menu features both classic cocktails and specialty drinks you won't find anywhere else.",
                    cta: { label: "See Drink Menu", href: "/menus/DNB_Bar.pdf" },
                },
            ],
        },
        {
            id: "play",
            label: "Play Games",
            headline: "WE TAKE GAMEPLAY SERIOUSLY",
            description:
                "Whether you want to 'play the hits' or check out the latest in VR, our gameplay selections are second to none. Arcade, air hockey or bowling, Dave & Buster's has it all.",
            cards: [
                {
                    id: "games",
                    image: "https://daveandbustersindia.com/wp-content/uploads/2025/04/virtual-reality.jpg",
                    title: "Find New Games",
                    body: "Ready for some new challenges? See the latest and greatest games in the Dave & Buster's lineup.",
                    cta: { label: "View Games", href: "/bangalore/play/" },
                },
            ],
        },
        {
            id: "watch",
            label: "Watch Sports",
            headline: "CELEBRATE YOUR FANHOOD",
            description:
                "The next best thing to being at the stadium is cheering on your favorite team while noshing on tasty gameday favorites. Grab a seat at your nearest Dave & Buster's restaurant for great views and great food.",
            cards: [
                {
                    id: "sports",
                    image: "https://daveandbustersindia.com/wp-content/uploads/2025/04/watch.jpg",
                    title: "Leave Your Tastebuds Feeling Victorious",
                    body: "Our menu is full of everything you crave for gameday.",
                    cta: { label: "See Food Menu", href: "/menus/DNB_Food_Menus.pdf" },
                },
            ],
        },
        {
            id: "parties",
            label: "Parties",
            headline: "PARTY PLANNING MADE SIMPLE",
            description:
                "Let us do the cooking (and the dishes) while you simply have a great time. Let Dave & Buster's take care of your next party for you.",
            cards: [
                {
                    id: "birthday",
                    image: "https://daveandbustersindia.com/wp-content/uploads/2025/04/Dont-Leave-Yourself-Unseated.jpg",
                    title: "Birthday Parties",
                    body: "What's a big day celebration without food, drinks, and games? Not a party we'd like to go to. Check out the available Birthday Specials.",
                    cta: { label: "Learn More", href: "/book/game-bookings" },
                },
                {
                    id: "corporate",
                    image: "https://daveandbustersindia.com/wp-content/uploads/2025/04/Corporate-meet.jpg",
                    title: "Corporate Events",
                    body: "Skip the average venue and throw an epic event. Every Dave & Buster's has private rooms complete with everything you need to host the perfect meeting.",
                    cta: { label: "Learn More", href: "/bangalore/parties/corporate-events/" },
                },
            ],
        },
    ],
};

// ─── Normalize Strapi tab section → unified shape ─────────────────────────────
// Strapi shared.tab-section schema:
//   { title, subtitle, tabs: tab-item[] }
// Strapi shared.tab-item schema:
//   { label, heading, description, tab_card: tab-card[] }
// Strapi shared.tab-card schema:
//   { title, description, image(media[]), cta_text, cta_link }
function normalizeTabSection(section) {
    if (!section?.tabs?.length) return FALLBACK;

    return {
        heading: section.title ?? FALLBACK.heading,
        subheading: section.subtitle ?? FALLBACK.subheading,
        tabs: section.tabs.map((tab, tabIndex) => ({
            id: tab.id ?? `tab-${tabIndex}`,
            label: tab.label ?? `Tab ${tabIndex + 1}`,
            headline: tab.heading ?? "",
            description: tab.description ?? "",
            cards: (tab.tab_card ?? []).map((card, cardIndex) => ({
                id: card.id ?? `card-${tabIndex}-${cardIndex}`,
                image: getStrapiMedia(card.image) ?? "",
                title: card.title ?? "",
                body: card.description ?? "",
                cta: {
                    label: card.cta_text ?? "Learn More",
                    href: card.cta_link ?? "#",
                },
            })),
        })),
    };
}

// ─── Card sub-component ───────────────────────────────────────────────────────
function TabCard({ card }) {
    return (
        <div className="flex flex-col h-full">
            <div className="relative overflow-hidden rounded-3xl">
                <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                    draggable={false}
                />
            </div>
            <div className="pt-4 pb-6 px-0 flex flex-col flex-1">
                <h4 className="text-lg font-bold text-[#15189a]">{card.title}</h4>
                <p className="mt-3 text-[#15189a] text-sm leading-relaxed flex-1">
                    {card.body}
                </p>
                <Link
                    href={card.cta.href}
                    className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-[50px] text-white text-sm font-bold uppercase tracking-wide transition-all self-start"
                    style={{ background: "linear-gradient(180deg, #040651, #15189a)" }}
                >
                    {card.cta.label}
                    <ArrowRight size={14} strokeWidth={2.5} />
                </Link>
            </div>
        </div>
    );
}

// ─── HowDoYouDnB ─────────────────────────────────────────────────────────────
// Props:
//   section — Strapi shared.tab-section from getTabSection() in page.js
//             Falls back to FALLBACK if Strapi has no tab section yet
export default function HowDoYouDnB({ section = null }) {
    const { heading, subheading, tabs } = normalizeTabSection(section);
    const [activeTab, setActiveTab] = useState(tabs[0].id);

    return (
        <section
            className="py-16 lg:pt-14"
            style={{ background: "linear-gradient(to bottom, #ff6f00, #FFBA00)" }}
        >
            <div className="container mx-auto px-4 xl:px-8">

                {/* Section Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-[#15189a] tracking-tight uppercase font-din"
                        style={{ fontFamily: '"DINBuster", sans-serif' }}>
                        {heading}
                    </h1>
                    <h2 className="mt-2 text-base md:text-lg font-medium text-[#15189a]">
                        {subheading}
                    </h2>
                </div>

                {/* Tab Bar */}
                <div className="mb-10 sm:mb-9">
                    <ul
                        className="flex flex-wrap justify-center border-b border-[#15189a]/20 gap-x-1 gap-y-2"
                        role="tablist"
                    >
                        {tabs.map((tab) => {
                            const isActive = tab.id === activeTab;
                            return (
                                <li key={tab.id} role="presentation">
                                    <button
                                        role="tab"
                                        aria-selected={isActive}
                                        aria-controls={`panel-${tab.id}`}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`relative px-5 py-3 text-sm font-semibold uppercase tracking-wide transition-colors
                                            ${isActive
                                                ? "text-[#15189a] font-extrabold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#15189a]"
                                                : "text-[#15189a]"
                                            }`}
                                    >
                                        {tab.label}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Tab Content */}
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        id={`panel-${tab.id}`}
                        role="tabpanel"
                        aria-hidden={tab.id !== activeTab}
                        className={`transition-opacity duration-300 ${tab.id === activeTab ? "opacity-100 block" : "opacity-0 hidden"}`}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                            {/* Headline + description */}
                            <div className="flex flex-col justify-center md:col-span-1">
                                <h3 className="text-2xl md:text-3xl font-extrabold text-[#15189a] uppercase leading-tight font-din"
                                    style={{ fontFamily: '"DINBuster", sans-serif' }}>
                                    {tab.headline}
                                </h3>
                                <p className="mt-4 text-[#15189a] text-sm leading-relaxed md:w-[95%]">
                                    {tab.description}
                                </p>
                            </div>

                            {/* Cards */}
                            {tab.cards.map((card) => (
                                <div key={card.id} className="w-full">
                                    <TabCard card={card} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    tabLabel: "Frequently Asked Questions",
    faqs: [
        {
            id: 1,
            question: "What is Dave & Buster's?",
            answer:
                "Dave & Buster's is a global entertainment destination that combines a high-energy arcade, a full-service restaurant, and a premium sports bar. It is designed for adults, families, friends, and corporate groups looking for games, food, and social experiences in one place.",
        },
        {
            id: 2,
            question: "Is Dave & Buster's a restaurant, bar, or arcade?",
            answer:
                "Dave & Buster's is all three. It offers state-of-the-art arcade games, a diverse food menu, and a fully stocked bar serving cocktails, mocktails, and beverages.",
        },
        {
            id: 3,
            question: "Is there a Dave & Buster's in India?",
            answer:
                "Yes. Dave & Buster's has an official outlet in India located in Bangalore, making it one of the most exciting entertainment zones in the city.",
        },
        {
            id: 4,
            question: "Where is Dave & Buster's located in Bangalore?",
            answer:
                "Dave & Buster's Bangalore is located on the 1st Floor, Mantri Avenue, Koramangala, Bangalore, one of the city's most popular lifestyle and nightlife hubs.",
        },
        {
            id: 5,
            question: "What are the timings of Dave & Buster's Bangalore?",
            answer:
                "Dave & Buster's is open every day of the week from 12:00 PM to 12:00 AM.",
        },
        {
            id: 6,
            question: "Is Dave & Buster's just for kids?",
            answer:
                "No, Dave & Buster's isn't just for kids. It's for everyone! While kids are absolutely welcome, it's also a favorite spot for adults, working professionals, and groups looking for a fun indoor gaming and dining experience. Whether you're planning a family outing, a friends' night out, or a team hangout, there's something for all ages to enjoy.",
        },
        {
            id: 7,
            question: "Does Dave & Buster's serve alcohol?",
            answer:
                "Yes. Dave & Buster's has a full-service bar offering cocktails, beers, spirits, and non-alcoholic beverages.",
        },
        {
            id: 8,
            question: "What games can you play at Dave & Buster's?",
            answer:
                "You can play racing games, shooting games, VR experiences, sports simulators, classic arcade games, and large-format multiplayer games.",
        },
        {
            id: 9,
            question: "How much does a Dave & Buster's Rechargeable Card cost?",
            answer:
                "The Rechargeable Power Card is available at different price points, allowing guests to load credits based on how much they want to play.",
        },
        {
            id: 10,
            question: "Does Dave & Buster's have rooms for events?",
            answer:
                "Yes. Dave & Buster's offers dedicated spaces for private events, team outings, birthday parties, and corporate gatherings.",
        },
        {
            id: 11,
            question: "What events can you host at Dave & Buster's?",
            answer:
                "You can host birthdays, corporate parties, team-building events, product launches, and casual get-togethers.",
        },
        {
            id: 12,
            question: "What drinks are on the menu?",
            answer:
                "The menu includes signature cocktails, classic mixed drinks, beers, mocktails, and soft beverages.",
        },
        {
            id: 13,
            question: "What food is popular at Dave & Buster's?",
            answer:
                "Popular items include burgers, flatbreads, appetizers, shareable platters, and comfort food designed for group dining.",
        },
        {
            id: 14,
            question: "Does Dave & Buster's serve vegetarian and non-vegetarian food?",
            answer: "Yes. The menu includes both vegetarian and non-vegetarian options.",
        },
        {
            id: 15,
            question: "Does Dave & Buster's have any official merchandise?",
            answer: "Yes. Dave & Buster's offers official merchandise at the outlets.",
        },
        {
            id: 16,
            question: "Where can I find the best gaming mall in Bangalore?",
            answer:
                "Dave & Buster's Bangalore is widely regarded as one of the best gaming and entertainment destinations in the city.",
        },
        {
            id: 17,
            question: "Which game stands out the most in Bangalore?",
            answer:
                "Large-format multiplayer games and immersive VR experiences are among the most popular attractions.",
        },
        {
            id: 18,
            question: "Name a few prominent games in Bangalore.",
            answer:
                "Racing simulators, shooting games, VR arenas, and classic arcade machines are customer favorites.",
        },
        {
            id: 19,
            question: "Where do you think the best place to get games is?",
            answer:
                "In Koramangala, there's Dave and Buster's which offers over the top arcade games like VW Plush Crane, Rabbids Hollywood, Cruisin Blast, Mega Shot, A9 Premium, NBA All Stars, Jurassic Park Theatre etc.",
        },
        {
            id: 20,
            question: "Which is a good play zone in Bangalore for adults?",
            answer:
                "Dave & Buster's Bangalore is one of the top play zones for adults looking for indoor entertainment.",
        },
        {
            id: 21,
            question: "Which is an arcade in Bangalore?",
            answer:
                "Dave & Buster's is a leading arcade in Bangalore with premium games and experiences.",
        },
        {
            id: 22,
            question: "Which is a good play arena in Bangalore?",
            answer:
                "Dave & Buster's Bangalore stands out as a complete play arena combining games, food, and social entertainment.",
        },
        {
            id: 23,
            question: "Which is the most Fun Entertainment Zone in Bangalore?",
            answer:
                "Many visitors consider Dave & Buster's Bangalore to be one of the most fun entertainment zones due to its scale and variety.",
        },
        {
            id: 24,
            question: "Where can we play indoor games in Bangalore?",
            answer:
                "You can enjoy a wide range of indoor games at Dave & Buster's Bangalore.",
        },
        {
            id: 25,
            question: "Which are the best gaming locations in Koramangala?",
            answer:
                "Dave & Buster's is among the top gaming and entertainment destinations in Koramangala.",
        },
        {
            id: 26,
            question: "When does Dave & Buster's close?",
            answer: "Dave & Buster's closes at 12:00 AM (midnight).",
        },
        {
            id: 27,
            question: "What is there to do at Dave & Buster's Bangalore?",
            answer:
                "At Dave & Buster's Bangalore, you can:\n1. Play cutting-edge arcade and VR games\n2. Enjoy competitive multiplayer and redemption games\n3. Watch live sports on large screens\n4. Dine with friends or family\n5. Celebrate birthdays, team outings, and corporate events",
        },
    ],
};

// ─── Single accordion item ────────────────────────────────────────────────────
function AccordionItem({ faq, isOpen, onToggle }) {
    return (
        <div className="border-b border-[#e4e4e4]">
            {/* Header */}
            <button
                onClick={onToggle}
                className="w-full flex items-start gap-3 py-4 text-left group"
                aria-expanded={isOpen}
            >
                {/* +/- icon — matches feather icon-feather-plus / icon-feather-minus */}
                <span className="shrink-0 mt-0.5 text-[#15189a]">
                    {isOpen ? <Minus size={18} strokeWidth={2} /> : <Plus size={18} strokeWidth={2} />}
                </span>
                {/* Question — fw-500 fs-18, text-dark-gray: #232323 */}
                <span
                    className={`text-base md:text-[18px] font-medium leading-snug transition-colors ${isOpen ? "text-[#15189a]" : "text-[#232323]]"
                        }`}
                >
                    {faq.question}
                </span>
            </button>

            {/* Body — collapsible */}
            {isOpen && (
                <div className="pb-4 pl-7 border-b border-[#eaeaeb]">
                    {/* Handle \n line breaks in answer text */}
                    {faq.answer.split("\n").map((line, i) => (
                        <p key={i} className={`text-sm md:text-base text-black leading-relaxed ${i > 0 ? "mt-1" : ""}`}>
                            {line}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function FAQAccordion() {
    // First item open by default — matches source's "active-accordion"
    const [openId, setOpenId] = useState(1);

    const toggle = (id) => setOpenId(openId === id ? null : id);

    return (
        <section
            className="relative py-12 md:py-16"
        // style={{ background: "linear-gradient(135deg, #15189a 0%, #0d1440 60%, #15189a 100%)" }}
        >
            <div className="container mx-auto px-4 xl:px-8">

                {/* Tab label — single tab, alt-font fs-18 centered */}
                <div className="flex justify-center mb-8">
                    <div className="text-center">
                        <span className="text-lg font-bold text-[#15189a] font-din border-b-2 border-[#ff6f00] pb-2">
                            {content.tabLabel}
                        </span>
                    </div>
                </div>

                {/* Accordion — col-md-6 col-lg-6 centered → max-w-2xl */}
                <div className="flex justify-center">
                    <div className="w-full md:w-8/12 lg:w-6/12 bg-white rounded-2xl px-6 py-2 shadow-xl">
                        {content.faqs.map((faq) => (
                            <AccordionItem
                                key={faq.id}
                                faq={faq}
                                isOpen={openId === faq.id}
                                onToggle={() => toggle(faq.id)}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
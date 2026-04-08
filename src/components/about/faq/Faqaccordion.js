"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

function AccordionItem({ faq, isOpen, onToggle }) {
    return (
        <div className="border-b border-[#e4e4e4]">
            <button
                onClick={onToggle}
                className="w-full flex items-start gap-3 py-4 text-left group"
                aria-expanded={isOpen}
            >
                <span className="shrink-0 mt-0.5 text-[#15189a]">
                    {isOpen ? <Minus size={18} strokeWidth={2} /> : <Plus size={18} strokeWidth={2} />}
                </span>
                <span
                    className={`text-base md:text-[18px] font-medium leading-snug transition-colors ${isOpen ? "text-[#15189a]" : "text-[#232323]"
                        }`}
                >
                    {faq.question}
                </span>
            </button>

            {isOpen && (
                <div className="pb-4 pl-7 border-b border-[#eaeaeb]">
                    {faq.answer.split("\n").map((line, i) => (
                        <p
                            key={i}
                            className={`text-sm md:text-base text-black leading-relaxed ${i > 0 ? "mt-1" : ""}`}
                        >
                            {line}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function FAQAccordion({ section }) {
    const tabLabel = section?.tab_label ?? "Frequently Asked Questions";
    const faqs = section?.faqs ?? [];
    const [openId, setOpenId] = useState(faqs[0]?.id ?? null);

    const toggle = (id) => setOpenId(openId === id ? null : id);

    if (!faqs.length) return null;

    return (
        <section className="relative py-12 md:py-16">
            <div className="container mx-auto px-4 xl:px-8">

                <div className="flex justify-center mb-8">
                    <div className="text-center">
                        <span className="text-lg font-bold text-[#15189a] font-din border-b-2 border-[#ff6f00] pb-2">
                            {tabLabel}
                        </span>
                    </div>
                </div>

                <div className="flex justify-center">
                    <div className="w-full md:w-8/12 lg:w-6/12 bg-white rounded-2xl px-6 py-2 shadow-xl">
                        {faqs.map((faq) => (
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
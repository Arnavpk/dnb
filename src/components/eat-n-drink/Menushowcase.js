"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    rows: [
        {
            id: "food",
            imageLeft: false,
            headline: "Taste that delivers",
            body: "With our Dave & Buster's food menu, every season brings a new reason to celebrate. Whether you're in the mood for juicy burgers, sizzling wings, or loaded vegetarian delights, our chefs ensure every dish bursts with flavor and creativity.",
            footnote: "*Menu may vary by location.",
            image: {
                src: "https://daveandbustersindia.com/wp-content/uploads/2025/07/Food-1.jpg",
                alt: "Crispy chicken burger with fresh veggies and a side of golden fries at Dave & Buster's",
            },
            ctas: [
                { label: "View PDF of Our Food Menu", href: "https://daveandbustersindia.com/menus/DNB_Food_Menus.pdf" },
            ],
        },
        {
            id: "drinks",
            imageLeft: true,
            headline: "Quench Your Thirst",
            body: "The Dave & Buster's drink menu features a lineup of classic cocktails and signature blends that you won't find anywhere else. Try bold favorites like the Madbull LIIT or the adventurous WTF: What The Fish!, with each one as exciting as the arcade floor.",
            footnote: null,
            image: {
                src: "https://daveandbustersindia.com/wp-content/uploads/2025/07/Drink-1.jpg",
                alt: "Colorful layered cocktail garnished with an orange slice and mint sprig.",
            },
            ctas: [
                { label: "View PDF of Our Drink Menu", href: "https://daveandbustersindia.com/menus/DNB_Bar.pdf" },
            ],
        },
        {
            id: "kids",
            imageLeft: false,
            headline: "Kids Menu",
            body: "Tiny bites, big smiles! Our Kids' Menu turns every meal into a mini celebration with favorites that combine fun and flavor in every bite.",
            footnote: null,
            image: {
                src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/burger.jpg",
                alt: "Delicious cheeseburger with a Dave & Buster's flag, served with a side of fries.",
            },
            ctas: [
                { label: "View PDF of Our Kids Menu", href: "https://daveandbustersindia.com/menus/KIDS_MENU.pdf" },
            ],
        },
    ],
};

// ─── Single alternating row ───────────────────────────────────────────────────
function MenuRow({ row, isLast }) {
    const textContent = (
        <div className="flex flex-col justify-center h-full">
            <h3 className="text-2xl md:text-3xl font-extrabold text-[#15189a] uppercase leading-tight">
                {row.headline}
            </h3>
            <p className="mt-4 text-black text-sm md:text-base leading-relaxed">
                {row.body}
            </p>
            {row.footnote && (
                <p className="mt-2 text-white/50 text-xs italic">{row.footnote}</p>
            )}
            {row.ctas.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-6">
                    {row.ctas.map((cta) => (
                        <Link
                            key={cta.label}
                            href={cta.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-bold uppercase tracking-wide transition-colors"
                            style={{ background: "linear-gradient(180deg, #040651, #15189a)" }}
                        >
                            {cta.label}
                            <ArrowRight size={14} strokeWidth={2.5} />
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );

    const imageContent = (
        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            <img
                src={row.image.src}
                alt={row.image.alt}
                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
                draggable={false}
            />
        </div>
    );

    return (
        <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${isLast ? "" : "mb-16 sm:mb-14"
                }`}
        >
            {/* Mobile: image first, then text. Desktop: honour imageLeft flag. */}
            <div className={`order-1 ${row.imageLeft ? "lg:order-1" : "lg:order-2"}`}>
                {imageContent}
            </div>
            <div className={`order-2 ${row.imageLeft ? "lg:order-2" : "lg:order-1"}`}>
                {textContent}
            </div>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function MenuShowcase() {
    return (
        <section
            className="py-16 md:py-20"
        // style={{
        //     background:
        //         "linear-gradient(135deg, #0d1b40 0%, #1a2f6e 60%, #0d1b40 100%)",
        // }}
        >
            <div className="container mx-auto px-4 xl:px-8">
                {content.rows.map((row, index) => (
                    <MenuRow
                        key={row.id}
                        row={row}
                        isLast={index === content.rows.length - 1}
                    />
                ))}
            </div>
        </section>
    );
}
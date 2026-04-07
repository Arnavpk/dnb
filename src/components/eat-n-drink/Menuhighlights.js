"use client";

import { getStrapiMedia, blocksToText } from "@/lib/strapi";

// ─── Hardcoded highlights bullets — not in Strapi schema ─────────────────────
const HIGHLIGHTS = [
    "House-made sauces",
    "Gluten-Friendly and Vegetarian Options",
];

// ─── Fallback left column ─────────────────────────────────────────────────────
const FALLBACK_DATA = {
    headline: "Legends Aren't Born, They're Made By Our Chefs",
    body: "At Dave & Buster's, food and drinks share the spotlight with our games. From handcrafted burgers and house-made sauces to signature cocktails, every plate and pour reflects care, creativity, and a dash of boldness.",
};

// ─── Fallback cards ───────────────────────────────────────────────────────────
const FALLBACK_CARDS = [
    {
        id: "liit",
        imageSrc: "https://daveandbustersindia.com/wp-content/uploads/2025/07/LIT-1.jpg",
        imageAlt: "Madbull LIIT",
        title: "Madbull LIIT",
        description: "Four spirits, blue curaçao, and Red Bull for a kick of energy.",
        _isFallback: true,
    },
    {
        id: "wtf",
        imageSrc: "https://daveandbustersindia.com/wp-content/uploads/2025/04/wht-the-fish.jpg",
        imageAlt: "WTF: What The Fish!",
        title: "WTF: What The Fish!",
        description: "Coconut rum meets citrus — unexpected, fun, and refreshing.",
        _isFallback: true,
    },
    {
        id: "wings",
        imageSrc: "https://daveandbustersindia.com/wp-content/uploads/2025/04/Wings.jpg",
        imageAlt: "Wings (Boneless/Bone-in)",
        title: "Wings (Boneless/Bone-in)",
        description: "Tossed in flavorful sauces and served with crunchy crudités.",
        _isFallback: true,
    },
    {
        id: "burger",
        imageSrc: "https://daveandbustersindia.com/wp-content/uploads/2025/07/Burger-1.jpg",
        imageAlt: "Loaded Veg Burger",
        title: "Loaded Veg Burger",
        description: "A fiery double-patty delight stacked high with chipotle mayo.",
        _isFallback: true,
    },
];

// ─── Normalize Strapi footer-data → left column shape ─────────────────────────
// Strapi shared.footer-data: { title, description(blocks) }
function normalizeData(data) {
    if (!data) return FALLBACK_DATA;
    return {
        headline: data.title ?? FALLBACK_DATA.headline,
        // ✅ Guard: description may be null if not yet filled in Strapi
        body: (data.description ? blocksToText(data.description) : "") || FALLBACK_DATA.body,
    };
}

// ─── Normalize Strapi footer-data-right[] → card shape ────────────────────────
// Strapi shared.footer-data-right: { image(media), image_title, image_description(string) }
function normalizeCards(strapiCards) {
    if (!strapiCards || strapiCards.length === 0) return FALLBACK_CARDS;
    return strapiCards.map((card, index) => ({
        id: card.id ?? index,
        // ✅ Guard: image may be null if not uploaded yet
        imageSrc: card.image ? getStrapiMedia(card.image) ?? "" : "",
        imageAlt: card.image_title ?? "",
        title: card.image_title ?? "",
        description: card.image_description ?? "",
    }));
}

// ─── Menu Card ────────────────────────────────────────────────────────────────
function MenuCard({ card }) {
    return (
        <div className="rounded-3xl overflow-hidden border-0 flex flex-col">
            {/* Image */}
            <div className="overflow-hidden">
                {card.imageSrc ? (
                    <img
                        src={card.imageSrc}
                        alt={card.imageAlt}
                        className="w-full h-48 sm:h-52 object-cover transition-transform duration-500"
                        loading="lazy"
                        draggable={false}
                    />
                ) : (
                    // Placeholder when image not yet uploaded in Strapi
                    <div className="w-full h-48 sm:h-52 bg-gray-200" />
                )}
            </div>
            {/* Card body */}
            <div
                className="flex-1 px-5 pt-6 pb-5"
                style={{ background: "linear-gradient(180deg, #ff6f00, #FFBA00)" }}
            >
                <h4 className="text-black font-bold text-base leading-snug">
                    {card.title}
                </h4>
                <p className="mt-2 text-black text-sm leading-relaxed">
                    {card.description}
                </p>
            </div>
        </div>
    );
}

// ─── MenuHighlights ───────────────────────────────────────────────────────────
// Props:
//   data  — Strapi shared.footer-data from getFooterDataSection() in page.js
//           title → headline, description(blocks) → body text
//   cards — Strapi shared.footer-data-right[] from getFooterDataRightSections()
//           Each card: image_title → title, image_description → description, image → card image
//           Falls back to FALLBACK_CARDS if Strapi has no cards yet
export default function MenuHighlights({ data = null, cards: strapiCards = [] }) {
    const { headline, body } = normalizeData(data);
    const cards = normalizeCards(strapiCards.length > 0 ? strapiCards : null);

    return (
        <section className="py-16 md:py-20">
            <div className="container mx-auto px-4 xl:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

                    {/* ── Left: headline + body + hardcoded bullets ─────────── */}
                    <div className="flex flex-col justify-center">
                        <h2 className="text-2xl md:text-3xl xl:text-4xl font-extrabold text-[#15189a] uppercase leading-tight">
                            {headline}
                        </h2>
                        <div className="mt-5 text-[#15189a] text-sm md:text-base leading-relaxed">
                            <p>{body}</p>
                        </div>
                        {HIGHLIGHTS.length > 0 && (
                            <ul className="mt-6 space-y-2">
                                {HIGHLIGHTS.map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-start gap-2 text-[#15189a] text-sm"
                                    >
                                        <span className="mt-1 w-2 h-2 rounded-full bg-yellow-400 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* ── Right: 2-col staggered card grid ─────────────────── */}
                    <div className="grid grid-cols-2 gap-4 sm:gap-5">
                        {/* Column A — cards 0 & 2, offset down */}
                        <div className="flex flex-col gap-4 sm:gap-5 lg:mt-8">
                            {[cards[0], cards[2]].filter(Boolean).map((card) => (
                                <MenuCard key={card.id} card={card} />
                            ))}
                        </div>
                        {/* Column B — cards 1 & 3, no offset */}
                        <div className="flex flex-col gap-4 sm:gap-5">
                            {[cards[1], cards[3]].filter(Boolean).map((card) => (
                                <MenuCard key={card.id} card={card} />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
"use client";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    eyebrow: null,
    headline: "Legends Aren't Born, They're Made By Our Chefs",
    body: "At Dave & Buster's, food and drinks share the spotlight with our games. From handcrafted burgers and house-made sauces to signature cocktails, every plate and pour reflects care, creativity, and a dash of boldness. Whether you're here for lunch, dinner, or late-night treats, eat and drink Bangalore style with a fresh twist at our Koramangala location.",
    highlights: [
        "House-made sauces",
        "Gluten-Friendly and Vegetarian Options",
    ],
    cards: [
        {
            id: "liit",
            image: {
                src: "https://daveandbustersindia.com/wp-content/uploads/2025/07/LIT-1.jpg",
                alt: "Madbull LIIT",
            },
            title: "Madbull LIIT",
            description:
                "Four spirits, blue curaçao, and Red Bull for a kick of energy.",
        },
        {
            id: "wtf",
            image: {
                src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/wht-the-fish.jpg",
                alt: "WTF: What The Fish!",
            },
            title: "WTF: What The Fish!",
            description:
                "Coconut rum meets citrus — unexpected, fun, and refreshing.",
        },
        {
            id: "wings",
            image: {
                src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/Wings.jpg",
                alt: "Wings (Boneless/Bone-in)",
            },
            title: "Wings (Boneless/Bone-in)",
            description: "Tossed in flavorful sauces and served with crunchy crudités.",
        },
        {
            id: "burger",
            image: {
                src: "https://daveandbustersindia.com/wp-content/uploads/2025/07/Burger-1.jpg",
                alt: "Loaded Veg Burger",
            },
            title: "Loaded Veg Burger",
            description:
                "A fiery double-patty delight stacked high with chipotle mayo.",
        },
    ],
};

// ─── Menu Card ────────────────────────────────────────────────────────────────
function MenuCard({ card }) {
    return (
        <div className="rounded-3xl overflow-hidden border-0 flex flex-col">
            {/* Image */}
            <div className="overflow-hidden">
                <img
                    src={card.image.src}
                    alt={card.image.alt}
                    className="w-full h-48 sm:h-52 object-cover transition-transform duration-500"
                    loading="lazy"
                    draggable={false}
                />
            </div>

            {/* Card body — matches original bg-gradient-secondary */}
            <div
                className="flex-1 px-5 pt-6 pb-5"
                style={{
                    background: "linear-gradient(180deg, #ff6f00, #FFBA00)",
                }}
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

// ─── Main Component ───────────────────────────────────────────────────────────
export default function MenuHighlights() {
    return (
        <section
            className="py-16 md:py-20"
        // style={{
        //     background:
        //         "linear-gradient(135deg, #0d1b40 0%, #1a2f6e 60%, #0d1b40 100%)",
        // }}
        >
            <div className="container mx-auto px-4 xl:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

                    {/* ── Left: text content ───────────────────────────────────────── */}
                    <div className="flex flex-col justify-center">
                        <h2 className="text-2xl md:text-3xl xl:text-4xl font-extrabold text-[#15189a] uppercase leading-tight">
                            {content.headline}
                        </h2>

                        <div className="mt-5 text-[#15189a] text-sm md:text-base leading-relaxed">
                            <p>{content.body}</p>
                        </div>

                        {content.highlights.length > 0 && (
                            <ul className="mt-6 space-y-2">
                                {content.highlights.map((item) => (
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

                    {/* ── Right: 2-col staggered card grid ─────────────────────────── */}
                    <div className="grid grid-cols-2 gap-4 sm:gap-5">
                        {/* Column A — cards 0 & 2, offset down */}
                        <div className="flex flex-col gap-4 sm:gap-5 lg:mt-8">
                            {[content.cards[0], content.cards[2]].map((card) => (
                                <MenuCard key={card.id} card={card} />
                            ))}
                        </div>

                        {/* Column B — cards 1 & 3, no offset */}
                        <div className="flex flex-col gap-4 sm:gap-5">
                            {[content.cards[1], content.cards[3]].map((card) => (
                                <MenuCard key={card.id} card={card} />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
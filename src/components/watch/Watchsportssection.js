"use client";

import Link from "next/link";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    heading: "Watch Sports at Dave & Buster's – The Ultimate Game Day Destination",
    body: "If you are looking for the best sports bar in Bangalore, Dave & Buster's in Koramangala is the place to be. This high-energy sports bar in Koramangala is built for serious fans who want to watch live sports with big sound, big screens, and even bigger vibes. Catch every moment of cricket, F1, football, UFC, basketball, hockey, and global tournaments like the Olympics and FIFA World Cup with crystal-clear live sports action on 25+ mega 4K screens. With dedicated sports screening zones, you never miss a key over, lap, goal, or knockout. Pair the action with a full-service bar, signature cocktails, and a loaded food menu that keeps the energy high from kick-off to the final whistle. Whether you are planning a squad night or a solo game-day outing, this sports bar in Bangalore is your go-to spot to watch live sports in Koramangala with unbeatable atmosphere and comfort.",
    images: [
        {
            id: "eat",
            src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/EAT.jpg",
            alt: "Person eating wings and other dishes at a table with drinks, with the word 'EAT' overlaid prominently.",
            href: "/bangalore/eat-drink/",
        },
        {
            id: "drink",
            src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/Drink-1.jpg",
            alt: "Friends clinking refreshing drinks at Dave & Buster's India during a night out",
            href: "/bangalore/eat-drink/",
        },
        {
            id: "play",
            src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/PLAY.jpg",
            alt: "Two happy women playing billiards, with the word 'PLAY' overlaid.",
            href: "/bangalore/play/",
        },
        // 4th slot intentionally empty in source — add src/alt/href when asset is ready
        {
            id: "placeholder",
            src: "",
            alt: "",
            href: "/bangalore/play/",
        },
    ],
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function WatchSportsSection() {
    // Filter out empty image slots
    const validImages = content.images.filter((img) => img.src);

    return (
        <section className="bg-[#15189a] pb-8 pt-8">
            {/* ── Text block ──────────────────────────────────────────────────── */}
            <div className="container mx-auto px-4 xl:px-8 mb-10 mt-12 sm:mt-10">
                <div className="flex justify-center">
                    <div className="w-full md:w-10/12 text-center">
                        <h2 className="text-2xl md:text-3xl xl:text-4xl font-extrabold text-white uppercase leading-tight mb-4">
                            {content.heading}
                        </h2>
                        <p className="text-white/75 text-sm md:text-base leading-relaxed">
                            {content.body}
                        </p>
                    </div>
                </div>
            </div>

            {/* ── Full-bleed image columns ─────────────────────────────────────── */}
            <div className="w-full px-0">
                <div className="flex justify-center">
                    {validImages.map((img) => (
                        <div
                            key={img.id}
                            className="w-1/3 px-1 md:px-3"
                        >
                            <Link href={img.href} className="block overflow-hidden">
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    className="w-full h-auto object-cover transition-transform duration-500"
                                    loading="lazy"
                                    draggable={false}
                                />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
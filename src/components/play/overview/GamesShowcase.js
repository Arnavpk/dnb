"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    rows: [
        {
            id: "arcade",
            imageLeft: true,
            headline: "ARCADE",
            body: [
                { text: "It's hard to beat the thrill of joystick flicking. If you are looking for the best ", bold: false },
                { text: "games in Bangalore", bold: true },
                { text: ", our arcade is the place. It is packed with classic and modern ", bold: false },
                { text: "arcade games", bold: true },
                { text: " that remind us of being a kid again.", bold: false },
            ],
            image: {
                src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/arcade.jpg",
                alt: "Three people playing an NBA-themed basketball arcade game at Dave & Buster's, with a vibrant gaming setup and digital scoreboard in the background.",
            },
            ctas: [{ label: "Book Now", href: "/book/power-card/" }],
        },
        {
            id: "vr",
            imageLeft: false,
            headline: "VIRTUAL REALITY GAMES",
            body: [
                { text: "In ", bold: false },
                { text: "virtual reality games", bold: true },
                { text: ", you're the hero. And everyone in that world is counting on you. Don't let them down.", bold: false },
            ],
            image: {
                src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/virtual-reality.jpg",
                alt: "Woman smiling while playing a VR racing game at Dave & Buster's, surrounded by neon lights",
            },
            ctas: [{ label: "Book Now", href: "/book/power-card/" }],
        },
        {
            id: "darts",
            imageLeft: true,
            headline: "HI-TECH DARTS",
            body: [
                { text: "Time to take your best shot! We bring you the latest in ", bold: false },
                { text: "hi tech games", bold: true },
                { text: " with our Hi-Tech Darts—competition, strategy, and fun all in one. How many bullseyes can you hit?", bold: false },
            ],
            image: {
                src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/DARTS.jpg",
                alt: "Man aiming a dart at an electronic dartboard at Dave & Buster's Mumbai.",
            },
            ctas: [{ label: "Book Now", href: "/book/game-bookings" }],
        },
        {
            id: "bowling",
            imageLeft: false,
            headline: "Nitro Bowling",
            body: [
                { text: "Step into the future with ", bold: false },
                { text: "Nitro Bowling", bold: true },
                { text: ". Watch your lanes come alive with mesmerizing visuals, turning every roll into an epic experience. Tomorrow's innovation is here to blow your mind today!", bold: false },
            ],
            image: {
                src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/Bowling.jpg",
                alt: "Person bowling on an interactive lane at Dave & Buster's, with a glowing ball and digital graphics",
            },
            ctas: [{ label: "Book Now", href: "/book/game-bookings" }],
        },
        {
            id: "pool",
            imageLeft: true,
            headline: "Immersive Pool",
            body: [
                { text: "Meet ", bold: false },
                { text: "Immersive Pool", bold: true },
                { text: ": where the classic pool gets a tech glow-up! Dive into augmented reality magic with ultra-bright visuals. The modern pool just got way more fun.", bold: false },
            ],
            image: {
                src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/pool.jpg",
                alt: "Glowing pool table with a cosmic galaxy-themed projection at Dave & Buster's, featuring billiard balls set for a game in a neon-lit entertainment space.",
            },
            ctas: [{ label: "Book Now", href: "/book/game-bookings" }],
        },
    ],
};

// ─── Rich text renderer (bold spans) ─────────────────────────────────────────
function RichBody({ segments }) {
    return (
        <p className="mt-4 text-black text-sm md:text-base leading-relaxed">
            {segments.map((seg, i) =>
                seg.bold ? (
                    <strong key={i} className="text-black font-bold">
                        {seg.text}
                    </strong>
                ) : (
                    <span key={i}>{seg.text}</span>
                )
            )}
        </p>
    );
}

// ─── Single alternating row ───────────────────────────────────────────────────
function GameRow({ row, isLast }) {
    const textContent = (
        <div className="flex flex-col justify-center h-full">
            <h3 className="text-2xl md:text-3xl font-extrabold text-[#15189a] uppercase leading-tight">
                {row.headline}
            </h3>
            <RichBody segments={row.body} />
            {row.ctas.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-6">
                    {row.ctas.map((cta) => (
                        <Link
                            key={cta.label}
                            href={cta.href}
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
            {/* Mobile: image always first. Desktop: honour imageLeft flag. */}
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
export default function GamesShowcase() {
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
                    <GameRow
                        key={row.id}
                        row={row}
                        isLast={index === content.rows.length - 1}
                    />
                ))}
            </div>
        </section>
    );
}
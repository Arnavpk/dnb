"use client";

import Link from "next/link";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    imageLeft: true,
    headline: "Dave & Buster's birthday parties are perfect for all ages.",
    body: "Dave & Buster's birthday parties in Bangalore are perfect for all ages, from little gamers to grown-up thrill seekers. Packed with gourmet-friendly food, signature snacks, and hundreds of arcade and midway games, every birthday party in Bangalore here feels like a full-scale festival. Among all the birthday party places in Bangalore, Dave & Buster's stands out because the team handles the planning and setup, so you just show up and celebrate.",
    image: {
        src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/Dave-Busters-birthday.jpg",
        alt: "Two friends giving each other a high-five in front of a dartboard at Dave & Buster's.",
    },
    ctas: [],
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function BirthdayPromo() {
    return (
        <section
            className="py-16 md:py-20"
        // style={{ background: "linear-gradient(135deg, #15189a 0%, #0d1440 60%, #15189a 100%)" }}
        >
            <div className="container mx-auto px-4 xl:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                    {/* Image — top on mobile, honours imageLeft on desktop */}
                    <div className={`order-1 ${content.imageLeft ? "lg:order-1" : "lg:order-2"}`}>
                        <div className="relative overflow-hidden rounded-[24px] shadow-2xl">
                            <img
                                src={content.image.src}
                                alt={content.image.alt}
                                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                                loading="lazy"
                                draggable={false}
                            />
                        </div>
                    </div>

                    {/* Text */}
                    <div className={`order-2 ${content.imageLeft ? "lg:order-2" : "lg:order-1"}`}>
                        {/* text-primary-color on dark bg → use --yellow for contrast */}
                        <h3 className="text-2xl md:text-3xl font-extrabold text-[#15189a] leading-tight font-din">
                            {content.headline}
                        </h3>
                        <p className="mt-4 text-black text-sm md:text-base leading-relaxed">
                            {content.body}
                        </p>
                        {content.ctas.length > 0 && (
                            <div className="flex flex-wrap gap-3 mt-6">
                                {content.ctas.map((cta) => (
                                    <Link
                                        key={cta.label}
                                        href={cta.href}
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                               text-white font-bold text-sm uppercase tracking-wide transition-all duration-300"
                                        style={{ background: "linear-gradient(to bottom, #ff6f00, #FFBA00)" }}
                                        onMouseEnter={(e) => (e.currentTarget.style.background = "linear-gradient(to bottom, #040651, #15189a)")}
                                        onMouseLeave={(e) => (e.currentTarget.style.background = "linear-gradient(to bottom, #ff6f00, #FFBA00)")}
                                    >
                                        {cta.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
}
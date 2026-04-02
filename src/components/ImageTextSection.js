"use client";

import Link from "next/link";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    rows: [
        {
            id: "unseated",
            headline: "Don't Leave Yourself Unseated",
            body: "Whether you're at the bar or the back booth, you'll enjoy a best-in-class dining experience. It's no secret that the service is top tier. Our hosts are happy to accommodate the whole crew or a party of one. Make the decision to skip the line & book your table, today!",
            image: {
                src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/Dont-Leave-Yourself-Unseated.jpg",
                alt: "Group of friends toasting with various drinks at Dave & Buster's.",
            },
            ctas: [],
            // imageLeft: false → image renders on the LEFT on desktop (order-lg-1)
            imageLeft: true,
        },
        {
            id: "power-card",
            headline: "Get Powered Up Before You Play!",
            body: "Grab your rechargeable Card at the store and top it up to jump straight into the action with 75+ arcade and VR games. Reload anytime at the front desk and let the games begin!",
            image: {
                src: "https://daveandbustersindia.com/wp-content/uploads/2024/10/DB-PresidentsDay-Web-EnhancedPowerCard-540x380-1.jpg",
                alt: "Get Powered Up Before You Play",
            },
            ctas: [],
            // imageLeft: false → image renders on the RIGHT on desktop
            imageLeft: false,
        },
    ],
};

// ─── Single alternating row ───────────────────────────────────────────────────
function ImageTextRow({ row, isLast }) {
    const textContent = (
        <div className="flex flex-col justify-center h-full">
            <h3 className="text-2xl md:text-3xl font-extrabold text-[#15179a] uppercase leading-tight">
                {row.headline}
            </h3>
            <p className="mt-4 text-black text-sm md:text-base leading-relaxed">
                {row.body}
            </p>
            {row.ctas.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-6">
                    {row.ctas.map((cta) => (
                        <Link
                            key={cta.label}
                            href={cta.href}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-bold uppercase tracking-wide transition-colors"
                        >
                            {cta.label}
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
            {/* On mobile: image always renders first, then text.
          On desktop: honour imageLeft flag via order utilities. */}
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
export default function ImageTextSection() {
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
                    <ImageTextRow
                        key={row.id}
                        row={row}
                        isLast={index === content.rows.length - 1}
                    />
                ))}
            </div>
        </section>
    );
}
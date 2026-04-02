"use client";

import Link from "next/link";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    href: "/",
    image: {
        src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/DNB-Bangalore.jpg",
        alt: "Eat Drink Play & Watch",
    },
};

// ─── Full-Width Banner Component ──────────────────────────────────────────────
export default function FullWidthBanner() {
    return (
        <section className="w-full p-0 block">
            <Link href={content.href} className="block w-full">
                <img
                    src={content.image.src}
                    alt={content.image.alt}
                    className="w-full h-auto object-cover block"
                    loading="lazy"
                    draggable={false}
                />
            </Link>
        </section>
    );
}
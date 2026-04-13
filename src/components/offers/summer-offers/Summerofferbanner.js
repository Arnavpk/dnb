"use client";

import Link from "next/link";

const content = {
    heading: "SUMMER EXCLUSION OFFER",
    body: "This summer, keep things simple — more games, more time, more fun. With our Summer Exclusion Offer, you get unlimited access to 75/60+ arcade & VR games, so you can play what you want, as much as you want.",
    cta: {
        label: "Book Now",
        href: (location) => `/${location}/bookings/`,
    },
    image: {
        desktop: "https://daveandbustersindia.com/wp-content/uploads/2025/04/DNB-Bangalore.jpg",
        mobile: "https://daveandbustersindia.com/wp-content/uploads/2025/04/banner_mobile.jpg",
    },
};

export default function SummerOfferBanner({ location = "bangalore" }) {
    return (
        <>
            {/* ── Banner image only — no text overlay ─── */}
            <section className="relative w-full h-[400px] md:h-[560px] overflow-hidden">
                <picture>
                    <source media="(max-width: 991px)" srcSet={content.image.mobile} />
                    <img
                        src={content.image.desktop}
                        alt={content.heading}
                        className="absolute inset-0 w-full h-full object-cover object-center"
                        loading="eager"
                        draggable={false}
                    />
                </picture>

                {/* Book Now button centered at bottom of banner */}
                <div className="absolute bottom-8 left-0 right-0 flex justify-center z-10">
                    <Link
                        href={content.cta.href(location)}
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wide text-black transition-all duration-300"
                        style={{ background: "linear-gradient(to bottom, #ff6f00, #FFBA00)" }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "linear-gradient(to bottom, #e66400, #e6a800)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "linear-gradient(to bottom, #ff6f00, #FFBA00)"; }}
                    >
                        {content.cta.label}
                    </Link>
                </div>
            </section>

            {/* ── Heading + body below banner ─── */}
            <section className="py-10 md:py-14 bg-white">
                <div className="container mx-auto px-4 xl:px-8">
                    <div className="flex justify-center">
                        <div className="w-full md:w-10/12 text-center">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase leading-tight tracking-tight text-[#15189a] font-din mb-4">
                                {content.heading}
                            </h1>
                            <p className="text-sm md:text-base text-black leading-relaxed">
                                {content.body}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
"use client";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    // Heading has a mixed-color span: primary + secondary
    headingPrimary: "CELEBRATE YOUR BIRTHDAY AT",
    headingSecondary: "DAVE & BUSTER'S",
    subheading:
        "Celebrate your special day with free bowling, delicious food & exciting arcade games — unforgettable fun with friends and family!",
    image: {
        src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/company-outings.jpg",
        alt: "Birthday celebration at Dave & Buster's Bangalore",
    },
    features: [
        {
            id: "experience",
            icon: {
                src: "https://daveandbustersindia.com/wp-content/uploads/2025/09/Group.png",
                alt: "Target Icon",
            },
            title: "The Ultimate Birthday Experience",
            body: "Plan your perfect day with bowling, arcade games, great food, and signature drinks. With exciting birthday deals and vibrant vibes, few birthday offers in the city can match this one.",
        },
        {
            id: "flexible",
            icon: {
                src: "https://daveandbustersindia.com/wp-content/uploads/2025/09/Group-1.png",
                alt: "Target Icon",
            },
            title: "FLEXIBLE BOOKING WINDOW",
            body: "Your party, your schedule. This birthday offer is valid for five days surrounding your special day – two days before, on your birthday, and two days after.",
        },
        {
            id: "booking",
            icon: {
                src: "https://daveandbustersindia.com/wp-content/uploads/2025/09/Group-2.png",
                alt: "Target Icon",
            },
            title: "EASY ONLINE BOOKING",
            body: "Booking your birthday discounts is simple. Visit the official Dave & Buster's India website and schedule your celebration hassle-free. The offer is available exclusively through online reservations.",
        },
    ],
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function BirthdayCelebrate() {
    return (
        // bg-white section
        <section className="bg-white pb-0 pt-[81px] mb-0">

            {/* ── Centered heading block ─────────────────────────────────────── */}
            <div className="pb-10">
                <div className="container mx-auto px-4 xl:px-8">
                    <div className="flex justify-center">
                        <div className="w-full md:w-10/12 text-center">
                            {/* Mixed-color heading: primary + secondary span */}
                            <h3 className="text-2xl md:text-3xl font-extrabold text-[#15189a] uppercase tracking-tight mb-2 font-din">
                                {content.headingPrimary}{" "}
                                <span className="text-[#ff6f00]">{content.headingSecondary}</span>
                            </h3>
                            <p className="text-[#15189a] text-sm md:text-base leading-relaxed">
                                {content.subheading}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Image + feature list ───────────────────────────────────────── */}
            <div className="container mx-auto px-4 xl:px-8 pb-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">

                    {/* Image — left on desktop */}
                    <div className="order-1 lg:order-1">
                        <div className="overflow-hidden rounded-[24px] shadow-lg">
                            <img
                                src={content.image.src}
                                alt={content.image.alt}
                                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                                loading="lazy"
                                draggable={false}
                            />
                        </div>
                    </div>

                    {/* Feature list — right on desktop */}
                    <div className="order-2 lg:order-2 flex flex-col gap-8">
                        {content.features.map((feature) => (
                            <div key={feature.id} className="flex items-start gap-4">
                                {/* Icon */}
                                <div className="shrink-0 w-12 h-12 flex items-center justify-center">
                                    <img
                                        src={feature.icon.src}
                                        alt={feature.icon.alt}
                                        className="w-full h-full object-contain"
                                        loading="lazy"
                                        draggable={false}
                                    />
                                </div>

                                {/* Text */}
                                <div>
                                    {/* text-primary-color: #15189a */}
                                    <h5 className="text-base font-extrabold text-[#15189a] uppercase font-din mb-1">
                                        {feature.title}
                                    </h5>
                                    <p className="text-black text-sm leading-relaxed">
                                        {feature.body}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
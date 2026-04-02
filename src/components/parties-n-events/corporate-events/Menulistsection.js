"use client";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    // bg-secondary-color → --secondary-color: #ff6f00
    imageLeft: true,
    image: {
        src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/NO-HANGRY-HANGS-1.jpg",
        alt: "A group of friends enjoying food and drinks at Dave & Buster's, smiling and raising their glasses in a lively, neon-lit atmosphere.",
    },
    // Each item: bold label + plain description
    items: [
        {
            id: "cocktails",
            label: "Cocktails",
            body: "From old-school cocktails to exclusive house specials, our bar has something for everyone.",
        },
        {
            id: "mocktails",
            label: "Mocktails",
            body: "Cheers without the cheers-ing regrets.",
        },
        {
            id: "shareables",
            label: "Shareables",
            body: "Share-worthy bites with big-time flavor.",
        },
        {
            id: "entree",
            label: "Entrée",
            body: "The kind of food your team will talk about long after the last bite.",
        },
        {
            id: "desserts",
            label: "Desserts",
            body: "Sweet endings that steal the spotlight.",
        },
    ],
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function MenuListSection() {
    return (
        // bg-secondary-color: #ff6f00
        <section className="py-16 md:py-20 bg-[#ff6f00]">
            <div className="container mx-auto px-4 xl:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                    {/* Image — left on desktop */}
                    <div className={`order-1 ${content.imageLeft ? "lg:order-1" : "lg:order-2"}`}>
                        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                            <img
                                src={content.image.src}
                                alt={content.image.alt}
                                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                                loading="lazy"
                                draggable={false}
                            />
                        </div>
                    </div>

                    {/* Menu list — right on desktop */}
                    <div className={`order-2 ${content.imageLeft ? "lg:order-2" : "lg:order-1"}`}>
                        <div className="space-y-4">
                            {content.items.map((item) => (
                                <p key={item.id} className="text-black text-sm md:text-base leading-relaxed">
                                    {/* Bold label matches original <b>Label :</b> */}
                                    <strong className="font-extrabold text-black">
                                        {item.label} :&nbsp;
                                    </strong>
                                    {item.body}
                                </p>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
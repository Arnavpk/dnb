"use client";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    rows: [
        {
            id: "first-store",
            imageLeft: false,
            headline: "FIRST STORE OPENS IN DALLAS, 1982",
            body: "The two young men headed to Restaurant Row in Dallas where they found an empty 40,000 square-foot warehouse. Having been proclaimed certifiably crazy by many in the restaurant industry, Dave and Buster dove headlong into construction. With Dave's name first because he won a coin toss, they opened the first Dave & Buster's in December 1982.",
            image: {
                src: "https://daveandbustersindia.com/wp-content/uploads/2024/10/Website-Replacement-Image_476x395_History_FirstStore.png",
                alt: "Restaurant Row - First Restaurant",
            },
            ctas: [],
        },
        {
            id: "200-locations",
            imageLeft: true,
            headline: "OVER 200 D&B LOCATIONS",
            body: "Each store has more state of the art games than ever, more mouthwatering menu items and the most innovative drinks anywhere. From wings to steaks, we've got whatever suits your appetite and our premium bar assures we're stocked to satisfy! Plus, you can watch your game on one of our massive HDTVs with epic stadium sound.",
            image: {
                src: "https://daveandbustersindia.com/wp-content/uploads/2024/10/Website-Replacement-Image_476x340_History_140Locations.png",
                alt: "Group of excited friends gathered around an arcade machine at Dave & Buster's, enjoying a competitive and fun gaming experience in a lively atmosphere.",
            },
            ctas: [],
        },
    ],
};

// ─── Single alternating row ───────────────────────────────────────────────────
function HistoryRow({ row, isLast }) {
    return (
        <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${isLast ? "" : "mb-16 sm:mb-14"
                }`}
        >
            {/* Image — top on mobile, honours imageLeft on desktop */}
            <div className={`order-1 ${row.imageLeft ? "lg:order-1" : "lg:order-2"}`}>
                <div className="relative overflow-hidden rounded-[24px] shadow-2xl">
                    <img
                        src={row.image.src}
                        alt={row.image.alt}
                        className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                        draggable={false}
                    />
                </div>
            </div>

            {/* Text */}
            <div className={`order-2 ${row.imageLeft ? "lg:order-2" : "lg:order-1"}`}>
                {/* text-primary-color on dark bg → #FFBA00 | alt-font → font-din */}
                <h3 className="text-2xl md:text-3xl font-extrabold text-[#15189a] uppercase leading-tight font-din">
                    {row.headline}
                </h3>
                <p className="mt-4 text-black text-sm md:text-base leading-relaxed">
                    {row.body}
                </p>
            </div>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function HistoryTimeline() {
    return (
        <section
            className="py-16 md:py-20"
        // style={{ background: "linear-gradient(135deg, #15189a 0%, #0d1440 60%, #15189a 100%)" }}
        >
            <div className="container mx-auto px-4 xl:px-8">
                {content.rows.map((row, index) => (
                    <HistoryRow
                        key={row.id}
                        row={row}
                        isLast={index === content.rows.length - 1}
                    />
                ))}
            </div>
        </section>
    );
}
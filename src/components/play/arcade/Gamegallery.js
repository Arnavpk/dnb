"use client";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    heading: "Game Your Way",
    images: [
        {
            id: "halo",
            src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/Halo.jpg",
            alt: "Halo arcade game at Dave & Buster's",
        },
        {
            id: "img7",
            src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/image7-1.jpg",
            alt: "Games at Dave & Buster's",
        },
        {
            id: "img5",
            src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/image5-1.jpg",
            alt: "Games at Dave & Buster's",
        },
        {
            id: "img6",
            src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/image6-1.jpg",
            alt: "Games at Dave & Buster's",
        },
        {
            id: "img2",
            src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/images2-1.jpg",
            alt: "Games at Dave & Buster's",
        },
    ],
};

// ─── Main Component ───────────────────────────────────────────────────────────
// Grid layout:
//   Desktop (5 images):
//     Row 1: [img1 — large] [img2 — tall, spans 2 rows] ← cols 1+2 of 3
//     Row 2: [img3] [img4]                               ← cols 1+2, row 2
//   But original CSS grid_gallery typically does:
//     [1 large] [2 medium] stacked on right
//     [3 medium] [4 medium] [5 medium] bottom row
//   Replicated below with CSS grid areas.

export default function GameGallery() {
    const [imgs] = [content.images];

    return (
        <section
            className="pb-8 pt-8"
        // style={{
        //     background:
        //         "linear-gradient(135deg, #0d1b40 0%, #1a2f6e 60%, #0d1b40 100%)",
        // }}
        >
            <div className="container mx-auto px-4 xl:px-8">
                {/* Heading */}
                <div className="mb-6">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#ff6f00] uppercase tracking-tight">
                        {content.heading}
                    </h2>
                </div>

                {/* ── Gallery grid ─────────────────────────────────────────────── */}
                {/* Mobile: single column stack
            md:   2-column masonry-style
            lg:   5-image editorial layout:
                  [ large ]  [ top-right  ]
                  [ large ]  [ bot-right  ]
                  [ bot-l  ]  [ bot-m ] [ bot-r ] */}
                <div
                    className="grid gap-3 md:gap-4"
                    style={{
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gridTemplateRows: "auto",
                    }}
                >
                    {/* Image 1 — large, spans 2 rows on desktop */}
                    <div
                        className="overflow-hidden rounded-2xl"
                        style={{ gridColumn: "1 / 3", gridRow: "1 / 3" }}
                    >
                        <img
                            src={imgs[0].src}
                            alt={imgs[0].alt}
                            className="w-full h-full object-cover min-h-[200px] md:min-h-[320px] transition-transform duration-500 hover:scale-105"
                            loading="lazy"
                            draggable={false}
                        />
                    </div>

                    {/* Image 2 — top right */}
                    <div className="overflow-hidden rounded-2xl" style={{ gridColumn: "3", gridRow: "1" }}>
                        <img
                            src={imgs[1].src}
                            alt={imgs[1].alt}
                            className="w-full h-full object-cover min-h-[140px] md:min-h-[155px] transition-transform duration-500 hover:scale-105"
                            loading="lazy"
                            draggable={false}
                        />
                    </div>

                    {/* Image 3 — bottom right */}
                    <div className="overflow-hidden rounded-2xl" style={{ gridColumn: "3", gridRow: "2" }}>
                        <img
                            src={imgs[2].src}
                            alt={imgs[2].alt}
                            className="w-full h-full object-cover min-h-[140px] md:min-h-[155px] transition-transform duration-500 hover:scale-105"
                            loading="lazy"
                            draggable={false}
                        />
                    </div>

                    {/* Images 4 & 5 — bottom row spanning full width */}
                    <div className="overflow-hidden rounded-2xl" style={{ gridColumn: "1 / 3", gridRow: "3" }}>
                        <img
                            src={imgs[3].src}
                            alt={imgs[3].alt}
                            className="w-full h-full object-cover min-h-[140px] md:min-h-[180px] transition-transform duration-500 hover:scale-105"
                            loading="lazy"
                            draggable={false}
                        />
                    </div>

                    <div className="overflow-hidden rounded-2xl" style={{ gridColumn: "3", gridRow: "3" }}>
                        <img
                            src={imgs[4].src}
                            alt={imgs[4].alt}
                            className="w-full h-full object-cover min-h-[140px] md:min-h-[180px] transition-transform duration-500 hover:scale-105"
                            loading="lazy"
                            draggable={false}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
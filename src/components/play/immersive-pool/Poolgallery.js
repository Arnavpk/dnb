"use client";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    heading: "Game Your Way",
    subheading:
        "Picture yourself leading a campaign with Master Chief or lining up a shot on an advanced pool table game. From arcade classics to VR thrills and an interactive pool table, there's a battle station waiting for every kind of player.",
    images: [
        {
            id: "pool-1",
            src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/pool.jpg",
            alt: "Immersive pool table at Dave & Buster's",
        },
        {
            id: "pool-2",
            src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/Pool-Gallery.jpg",
            alt: "Pool gallery at Dave & Buster's",
        },
        {
            id: "pool-3",
            src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/Pool-Image.jpg",
            alt: "Pool experience at Dave & Buster's",
        },
        {
            id: "pool-4",
            src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/Pool-Game.jpg",
            alt: "Pool game at Dave & Buster's",
        },
        {
            id: "pool-5",
            src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/Pool-Playing.jpg",
            alt: "Playing pool at Dave & Buster's",
        },
    ],
};

// ─── Main Component ───────────────────────────────────────────────────────────
// Grid layout (3-col):
//   Row 1-2: [ img1 large (col 1-2, row 1-2) ] [ img2 (col 3, row 1) ]
//                                               [ img3 (col 3, row 2) ]
//   Row 3:   [ img4 (col 1-2, row 3)          ] [ img5 (col 3, row 3) ]
export default function PoolGallery() {
    const imgs = content.images;

    return (
        <section
            className="pb-8 pt-8"
        // style={{
        //     background:
        //         "linear-gradient(135deg, #0d1b40 0%, #1a2f6e 60%, #0d1b40 100%)",
        // }}
        >
            <div className="container mx-auto px-4 xl:px-8">
                {/* Heading + subheading */}
                <div className="mb-6">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#ff6f00] uppercase tracking-tight">
                        {content.heading}
                    </h2>
                    {content.subheading && (
                        <p className="mt-3 text-black text-sm md:text-base leading-relaxed max-w-3xl">
                            {content.subheading}
                        </p>
                    )}
                </div>

                {/* Gallery grid */}
                <div
                    className="grid gap-3 md:gap-4"
                    style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
                >
                    {/* img1 — large, spans col 1-2, row 1-2 */}
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

                    {/* img2 — top right */}
                    <div
                        className="overflow-hidden rounded-2xl"
                        style={{ gridColumn: "3", gridRow: "1" }}
                    >
                        <img
                            src={imgs[1].src}
                            alt={imgs[1].alt}
                            className="w-full h-full object-cover min-h-[140px] md:min-h-[155px] transition-transform duration-500 hover:scale-105"
                            loading="lazy"
                            draggable={false}
                        />
                    </div>

                    {/* img3 — bottom right */}
                    <div
                        className="overflow-hidden rounded-2xl"
                        style={{ gridColumn: "3", gridRow: "2" }}
                    >
                        <img
                            src={imgs[2].src}
                            alt={imgs[2].alt}
                            className="w-full h-full object-cover min-h-[140px] md:min-h-[155px] transition-transform duration-500 hover:scale-105"
                            loading="lazy"
                            draggable={false}
                        />
                    </div>

                    {/* img4 — bottom left wide */}
                    <div
                        className="overflow-hidden rounded-2xl"
                        style={{ gridColumn: "1 / 3", gridRow: "3" }}
                    >
                        <img
                            src={imgs[3].src}
                            alt={imgs[3].alt}
                            className="w-full h-full object-cover min-h-[140px] md:min-h-[180px] transition-transform duration-500 hover:scale-105"
                            loading="lazy"
                            draggable={false}
                        />
                    </div>

                    {/* img5 — bottom right */}
                    <div
                        className="overflow-hidden rounded-2xl"
                        style={{ gridColumn: "3", gridRow: "3" }}
                    >
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
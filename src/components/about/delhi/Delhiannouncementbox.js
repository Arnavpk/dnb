"use client";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    // Each string renders as a separate <h4> block — matches source structure
    paragraphs: [
        "Dave & Buster's is coming to town with everything you love – mouth-watering food, buzzing bar, high-energy arcade games, and 6 lane nitro bowling, all packed into one unforgettable experience.",
        "Whether you're here to strike it big on the lanes, challenge your friends in the arcade, catch the game with a drink in hand, or just soak in the vibe – this is where it all comes together.",
        "WE'RE BRINGING THE FUN TO PACIFIC MALL TAGORE GARDEN WEST DELHI, AND WE CAN'T WAIT TO WELCOME YOU!",
    ],
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function DelhiAnnouncementBox() {
    return (
        // mt-0 mb-0 pt-30px pb-50px pe-30px ps-30px
        <section className="mt-0 mb-0 pb-[50px] px-[30px]"
        // style={{ background: "linear-gradient(135deg, #15189a 0%, #0d1440 60%, #15189a 100%)" }}
        >
            <div className="container mx-auto px-4 xl:px-8">
                {/* box-shadow + pt-30px pb-30px + border-radius-50px */}
                <div
                    className="pt-[30px] pb-[30px] px-8 md:px-12"
                    style={{
                        borderRadius: "50px",
                        boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.1)",
                    }}
                >
                    <div className="flex justify-center">
                        {/* col-md-10 */}
                        <div className="w-full md:w-10/12 text-center">
                            {/* alt-font + text-secondary-color: #ff6f00 */}
                            <div className="space-y-5">
                                {content.paragraphs.map((para, i) => (
                                    <h4
                                        key={i}
                                        className="text-base md:text-lg font-semibold leading-relaxed font-din"
                                        style={{ color: "#ff6f00" }}
                                    >
                                        {para}
                                    </h4>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
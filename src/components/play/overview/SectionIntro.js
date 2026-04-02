"use client";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    heading: "PLAN YOUR DAY OF GAMING",
    body: [
        { text: "Make a game plan to maximize your fun at the top spot for ", bold: false },
        { text: "indoor games in Bangalore", bold: true },
        { text: ". Whether you are looking for ", bold: false },
        { text: "fun games in Bangalore", bold: true },
        { text: " or serious competition, we are the #1 ", bold: false },
        { text: "gaming zone in Bangalore", bold: true },
        { text: ".", bold: false },
    ],
};

// ─── Rich text renderer ───────────────────────────────────────────────────────
function RichBody({ segments }) {
    return (
        <p className="text-sm md:text-base leading-relaxed text-[#ff6f00]">
            {segments.map((seg, i) =>
                seg.bold ? (
                    <strong key={i} className="text-[#ff6f00] font-bold">
                        {seg.text}
                    </strong>
                ) : (
                    <span key={i}>{seg.text}</span>
                )
            )}
        </p>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function SectionIntro() {
    return (
        <section className="py-12 md:py-16"
        // style={{
        //     background:
        //         "linear-gradient(135deg, #0d1b40 0%, #1a2f6e 60%, #0d1b40 100%)",
        // }}
        >
            <div className="container mx-auto px-4 xl:px-8">
                <div className="flex justify-center">
                    <div className="w-full md:w-10/12 text-center">
                        <h3 className="text-2xl md:text-3xl xl:text-4xl font-extrabold text-[#ff6f00] uppercase tracking-tight mb-3">
                            {content.heading}
                        </h3>
                        <div className="mt-2">
                            <RichBody segments={content.body} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
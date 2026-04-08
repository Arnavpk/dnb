"use client";

// Props:
//   section — shared.quote from getQuoteSection(sections)
//             title → heading
//             body  → paragraph text
export default function SectionIntro({ section }) {
    const heading = section?.title || "PLAN YOUR DAY OF GAMING";
    const body = section?.body || "Make a game plan to maximize your fun at the top spot for indoor games in Bangalore.";

    return (
        <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 xl:px-8">
                <div className="flex justify-center">
                    <div className="w-full md:w-10/12 text-center">
                        <h3 className="text-2xl md:text-3xl xl:text-4xl font-extrabold text-[#ff6f00] uppercase tracking-tight mb-3">
                            {heading}
                        </h3>
                        <p className="mt-2 text-sm md:text-base leading-relaxed text-[#ff6f00]">
                            {body}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
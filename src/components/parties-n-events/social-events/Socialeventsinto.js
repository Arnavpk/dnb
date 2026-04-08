"use client";

const FALLBACK = {
    // heading: "Any reason's a good reason to celebrate at Dave & Buster's",
};

// Props:
//   section — shared.quote from getQuoteSection(sections)
//             title → heading
//             body  → subheading (optional)
export default function SocialEventsIntro({ section }) {
    const heading = section?.title || FALLBACK.heading;
    const body = section?.body ?? null;

    return (
        <section className="pb-0 pt-6">
            <div className="container mx-auto px-4 xl:px-8">
                <div className="flex justify-center">
                    <div className="w-full md:w-10/12 text-center">
                        <h2 className="text-2xl md:text-3xl xl:text-4xl font-extrabold text-[#15189a] uppercase tracking-tight mb-2">
                            {heading}
                        </h2>
                        {body && (
                            <p className="mt-3 text-black text-sm md:text-base leading-relaxed">{body}</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
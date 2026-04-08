"use client";

const FALLBACK = {
    heading: "Where Birthdays Go Big",
    body: "Gaming, grub, and good times come together for the ultimate birthday celebration in Bangalore. Plan your arcade birthday party at Dave & Buster's in Koramangala, where flashing lights, buzzing machines, and high-score chases turn every moment into a memory.",
};

// Props:
//   section — shared.quote from getQuoteSection(sections)
//             title → heading
//             body  → paragraph text
export default function BirthdayIntro({ section }) {
    const heading = section?.title || FALLBACK.heading;
    const body = section?.body || FALLBACK.body;

    return (
        <section className="pb-6 pt-0">
            <div className="container mx-auto px-4 xl:px-8">
                <div className="flex justify-center">
                    <div className="w-full md:w-10/12 text-center">
                        <h2 className="text-2xl md:text-3xl xl:text-4xl font-extrabold text-[#ff6f00] uppercase tracking-tight mb-3">
                            {heading}
                        </h2>
                        <p className="text-black text-sm md:text-base leading-relaxed">
                            {body}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
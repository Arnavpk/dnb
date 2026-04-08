"use client";

export default function PartiesSectionIntro({ section }) {
    const heading = section?.title ?? "PICK YOUR PARTY OPTION";
    const body = section?.body ?? "Give the party planning committee the day off. No matter the event or celebration, we have everything you require to have a great time.";

    return (
        <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 xl:px-8">
                <div className="flex justify-center">
                    <div className="w-full md:w-10/12 text-center">
                        <h2 className="text-2xl md:text-3xl xl:text-4xl font-extrabold text-[#ff6f00] uppercase tracking-tight mb-3">
                            {heading}
                        </h2>
                        <p className="mt-2 text-black text-sm md:text-base leading-relaxed">
                            {body}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
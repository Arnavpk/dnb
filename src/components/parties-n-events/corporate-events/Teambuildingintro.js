"use client";

export default function TeamBuildingIntro({ section }) {
    const heading = section?.title ?? "This is NOT your average team-building";
    const body = section?.body ?? "At Dave & Buster's, the games do the bonding for you.";

    return (
        <section className="pt-6 pb-6">
            <div className="container mx-auto px-4 xl:px-8">
                <div className="flex justify-center">
                    <div className="w-full md:w-10/12 text-center">
                        <h2 className="text-2xl md:text-3xl xl:text-4xl font-extrabold text-[#15189a] uppercase tracking-tight mb-3 font-din">
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
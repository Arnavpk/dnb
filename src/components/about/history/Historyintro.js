"use client";

export default function HistoryIntro({ section }) {
    const heading = section?.title ?? "Yes, they're real guys!";
    const body = section?.body ?? "Back in the late 1970s, Buster opened a restaurant known for its tasty food and friendly service.";

    return (
        <section className="pb-0 pt-12 md:pt-16">
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
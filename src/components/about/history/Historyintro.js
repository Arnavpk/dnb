"use client";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    heading: "Yes, they're real guys!",
    body: "Back in the late 1970s, Buster opened a restaurant known for its tasty food and friendly service. A few doors down, Dave opened an outrageous place for entertainment and games where adults were irresistibly drawn for fun. The two young entrepreneurs noticed people rotating between their establishments, and an idea started to form: What if they put both under one roof?",
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function HistoryIntro() {
    return (
        <section
            className="pb-0 pt-12 md:pt-16"
        // style={{ background: "linear-gradient(135deg, #15189a 0%, #0d1440 60%, #15189a 100%)" }}
        >
            <div className="container mx-auto px-4 xl:px-8">
                <div className="flex justify-center">
                    {/* col-md-10 → md:w-10/12 */}
                    <div className="w-full md:w-10/12 text-center">
                        {/* alt-font + text-primary-color on dark bg → #FFBA00 + uppercase */}
                        <h2 className="text-2xl md:text-3xl xl:text-4xl font-extrabold text-[#15189a] uppercase tracking-tight mb-3 font-din">
                            {content.heading}
                        </h2>
                        <p className="text-black text-sm md:text-base leading-relaxed">
                            {content.body}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
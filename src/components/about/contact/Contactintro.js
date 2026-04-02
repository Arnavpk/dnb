"use client";

import Link from "next/link";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    heading: "Have thoughts, ideas, or just want to say hey?",
    body: {
        prefix: "For general inquiries, please fill out the form below or you can call us at ",
        phone: {
            display: "+91 90280 43567",
            href: "tel:9028043567",
        },
        suffix: ", Monday-Sunday from 12PM-12AM IST.",
    },
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ContactIntro() {
    return (
        <section
            className="pt-10 pb-0"
        // style={{ background: "linear-gradient(135deg, #15189a 0%, #0d1440 60%, #15189a 100%)" }}
        >
            <div className="container mx-auto px-4 xl:px-8">
                <div className="flex justify-center">
                    {/* col-md-10 → md:w-10/12 */}
                    <div className="w-full md:w-10/12 text-center">

                        {/* alt-font + text-primary-color on dark bg → #FFBA00 */}
                        <h2 className="text-2xl md:text-3xl xl:text-4xl font-extrabold text-[#15189a] uppercase tracking-tight mb-3 font-din">
                            {content.heading}
                        </h2>

                        {/* sub-heading alt-font → font-din on body too */}
                        <p className="text-black text-sm md:text-base leading-relaxed font-din">
                            {content.body.prefix}
                            <Link
                                href={content.body.phone.href}
                                className="text-[#15189a] font-bold hover:underline underline-offset-2 transition-colors"
                            >
                                {content.body.phone.display}
                            </Link>
                            {content.body.suffix}
                        </p>

                    </div>
                </div>
            </div>
        </section>
    );
}